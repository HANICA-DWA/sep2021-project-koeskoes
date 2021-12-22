const puppeteer = require("puppeteer");
const path = require("path");

jest.setTimeout(60000);

describe("Giftle tests", () => {
  let browserA, pageA;
  let browserB, pageB;

  beforeAll(async () => {
    browserA = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      args: ["--window-size=700,800", "--window-position=0,0"],
    });
    pageA = await browserA.newPage();
  });

  afterAll(async () => {
    await browserA.close();
    await browserB.close();
  });

  describe("Order creation tests", () => {
    test("Create new order (happy path)", async () => {
      await pageA.goto("http://localhost:3000/checkout");

      await pageA.type("#email", "mail@mail.com");

      await pageA.type("#firstname", "firstname");

      await pageA.type("#lastname", "lastname");

      const checkBoxGiftle = await pageA.$('input[id="checkBoxGiftle"]');
      expect(checkBoxGiftle).toBeDefined();
      await checkBoxGiftle.evaluate((b) => b.click());

      const createOrder = await pageA.$('div[id="createOrder"] button');
      expect(createOrder).toBeDefined();
      await createOrder.evaluate((b) => b.click());

      await pageA.waitForSelector("h1");
      const h1 = await pageA.$("h1");
      const value = await pageA.evaluate((el) => el.textContent, h1);
      expect(value).toBe("Bedankt voor het kopen van een Giftle!");
    });

    test("Create new order (no e-mail)", async () => {
      await pageA.goto("http://localhost:3000/checkout");

      await pageA.type("#firstname", "firstname");

      await pageA.type("#lastname", "lastname");

      const checkBoxGiftle = await pageA.$('input[id="checkBoxGiftle"]');
      expect(checkBoxGiftle).toBeDefined();
      await checkBoxGiftle.evaluate((b) => b.click());

      const createOrder = await pageA.$('div[id="createOrder"] button');
      expect(createOrder).toBeDefined();
      await createOrder.evaluate((b) => b.click());

      await pageA.waitForSelector("div.alert");
      const alert = await pageA.$("div.alert > div");
      const value = await pageA.evaluate((el) => el.textContent, alert);
      expect(value).toBe(
        "E-mailadres mag niet leeg zijn. Een e-mailadres moet minimaal 1 teken bevatten."
      );
    });
  });

  describe.skip("Buyer tests", () => {
    test("Upload testFile1.mp4", async () => {
      await pageA.goto("http://localhost:3000/ordercontrol/abc123");

      const uploadVideo = await pageA.$("#uploadVideo");
      expect(uploadVideo).toBeDefined();
      await uploadVideo.evaluate((b) => b.click());

      const fileInput = await pageA.$("input[type=file]");
      expect(fileInput).toBeDefined();
      await fileInput.uploadFile(path.join(__dirname, "testFile1.mp4"));

      const upload = await pageA.$("#upload");
      expect(upload).toBeDefined();
      await upload.evaluate((b) => b.click());

      await pageA.waitForSelector("#rewatchVideoComponent");
      const rewatchVideoComponent = await pageA.$("#rewatchVideoComponent");
      const value = await pageA.evaluate(
        (el) => el.textContent,
        rewatchVideoComponent
      );
      expect(value).toBe("Uw video terugkijken");

      await pageA.waitForSelector("#fullscreen");
      const fullscreen = await pageA.$("#fullscreen");
      expect(fullscreen).toBeDefined();
      await fullscreen.evaluate((b) => b.click());

      const fullScreenState = await pageA.evaluate(() => {
        return !!document.querySelector(".container-flex");
      });
      expect(fullScreenState).toEqual(true);

      await fullscreen.evaluate((b) => b.click());

      const newFullScreenState = await pageA.evaluate(() => {
        return !!document.querySelector(".container");
      });
      expect(newFullScreenState).toEqual(true);

      const personalize = await pageA.$("#personalize");
      expect(personalize).toBeDefined();
      await personalize.evaluate((b) => b.click());

      await pageA.waitForSelector("#personalizationForm");
      const row = await pageA.$("#personalizationForm > div.row");
      const personalizeState = await pageA.evaluate(
        (el) => el.textContent,
        row[0]
      );
      expect(personalizeState).toBe("Video personaliseren");

      await pageA.type("#nameReceiver", "Voornaam Achternaam");

      await pageA.type("#emailReceiver", "mail@mail.com");

      const sendVideoMessage = await pageA.$("#sendVideoMessage");
      expect(sendVideoMessage).toBeDefined();
      await sendVideoMessage.evaluate((b) => b.click());

      await pageA.waitForSelector("h1");
      const h1 = await pageA.$("h1");
      const h1Value = await pageA.evaluate((el) => el.textContent, h1);
      expect(h1Value).toBe("Bedankt voor het versturen van je Giftle!");
    });
  });

  describe("Employee tests", () => {
    beforeAll(async () => {
      browserB = await puppeteer.launch({
        headless: false,
        slowMo: 5,
        args: ["--window-size=1100,800", "--window-position=350,0"],
      });
      pageB = await browserB.newPage();
    });

    afterAll(async () => {
      await browserB.close();
    });

    test("Employee check order page (websocket)", async () => {
      await pageA.goto("http://localhost:3000/employee/checkorders");
      await pageB.goto("http://localhost:3000/employee/checkorders");
      const checkableTableData = [
        "Sjoerd de Bruin",
        "sjoerddebruin1@hotmail.com",
        "Sjoerd de Bruin",
        "sjoerddebruin1@hotmail.com",
      ];

      await pageA.waitForSelector("#checkOrdersTable");
      const pageAResult = await pageA.$$eval("#checkOrdersTable tr", (rows) => {
        return Array.from(rows, (row) => {
          const columns = row.querySelectorAll("td");
          return Array.from(columns, (column) => column.innerText);
        });
      });

      pageAResult[1].pop();

      expect(pageAResult[1]).toEqual(checkableTableData);

      await pageB.waitForSelector("#checkOrdersTable");
      const pageBResult = await pageB.$$eval("#checkOrdersTable tr", (rows) => {
        return Array.from(rows, (row) => {
          const columns = row.querySelectorAll("td");
          return Array.from(columns, (column) => column.innerText);
        });
      });

      pageBResult[1].pop();

      expect(pageBResult[1]).toEqual(checkableTableData);

      await pageA.waitForSelector("#prePrintOrder");
      const pageAPrePrintOrder = await pageA.$$("#prePrintOrder");
      await pageAPrePrintOrder[0].evaluate((b) => b.click());

      await pageB.waitForSelector("#printFinalOrder");
      const pageBPrintFinalOrderCheck = await pageB.$$("#printFinalOrder");

      expect(!!pageBPrintFinalOrderCheck[0]).toEqual(true);

      await pageA.waitForSelector("#printFinalOrder");
      const pageAPrintFinalOrder = await pageA.$$("#printFinalOrder");
      await pageAPrintFinalOrder[0].evaluate((b) => b.click());

      await pageA.waitForSelector("#checkOrdersTable");
      const pageAResultAfter = await pageA.$$eval(
        "#checkOrdersTable tr",
        (rows) => {
          return Array.from(rows, (row) => {
            const columns = row.querySelectorAll("td");
            return Array.from(columns, (column) => column.innerText);
          });
        }
      );

      expect(pageAResultAfter[1]).toEqual([]);

      await pageB.waitForSelector("#checkOrdersTable");
      const pageBResultAfter = await pageB.$$eval(
        "#checkOrdersTable tr",
        (rows) => {
          return Array.from(rows, (row) => {
            const columns = row.querySelectorAll("td");
            return Array.from(columns, (column) => column.innerText);
          });
        }
      );

      expect(pageBResultAfter[1]).toEqual([]);
    });
  });

  describe("Receiver tests", () => {
    test("Switch to videoreaction", async () => {
      await pageA.goto("http://localhost:3000/receiver/watchvideo/abc123");

      const sendReaction = await pageA.$(".reactionButton");
      expect(sendReaction).toBeDefined();
      await sendReaction.evaluate((b) => b.click());

      const goTextReaction = await pageA.$(".text-reaction-button");
      expect(goTextReaction).toBeDefined();
      await goTextReaction.evaluate((b) => b.click());

      const goVideoReactionSwitch = await pageA.$(
        'div[id="video-reaction-switch"] input'
      );
      expect(goVideoReactionSwitch).toBeDefined();
      await goVideoReactionSwitch.evaluate((b) => b.click());

      await pageA.waitForSelector('h1[id="video-reaction-title"]');
      const h1Text = await pageA.$("h1");
      const valueText = await pageA.evaluate((el) => el.textContent, h1Text);
      expect(valueText).toBe("Videoreactie verzenden");
    });

    test("Send textreaction", async () => {
      await pageA.goto("http://localhost:3000/receiver/watchvideo/abc123");

      const sendReaction = await pageA.$(".reactionButton");
      expect(sendReaction).toBeDefined();
      await sendReaction.evaluate((b) => b.click());

      const goTextReaction = await pageA.$(".text-reaction-button");
      expect(goTextReaction).toBeDefined();
      await goTextReaction.evaluate((b) => b.click());

      await pageA.type(
        "#textfield-reaction",
        "Heel erg bedankt voor de video!"
      );

      const createReaction = await pageA.$(
        'div[id="send-text-message"] button'
      );
      expect(createReaction).toBeDefined();
      await createReaction.evaluate((b) => b.click());

      await pageA.waitForSelector('h1[id="reaction-sent"]');
      const h1 = await pageA.$("h1");
      const value = await pageA.evaluate((el) => el.textContent, h1);
      expect(value).toBe("Bedankt voor het versturen van een reactie!");
    });

    test("Send textreaction (reaction has already been sent)", async () => {
      await pageA.goto("http://localhost:3000/receiver/watchvideo/abc123");

      const sendReaction = await pageA.$(".reactionButton");
      expect(sendReaction).toBeDefined();
      await sendReaction.evaluate((b) => b.click());

      await pageA.waitForSelector('h1[id="reaction-already-sent"]');
      const h1Text = await pageA.$("h1");
      const valueText = await pageA.evaluate((el) => el.textContent, h1Text);
      expect(valueText).toBe("Er is al een reactie verstuurd.");
    });
  });
});
