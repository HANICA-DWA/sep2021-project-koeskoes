import { Selector } from "testcafe";

const checkoutFixture = (skip = false) => {
  const page = "http://localhost:3000/checkout";
  if (skip) {
    fixture.skip("Checkout").page(page);
  } else {
    fixture("Checkout").page(page);
  }
};

const uploadVideoFixture = (skip = false) => {
  const page = "http://localhost:3000/ordercontrol/abc123";
  if (skip) {
    fixture.skip("Upload").page(page);
  } else {
    fixture("Upload").page(page);
  }
};

const checkOrdersFixture = (skip = false) => {
  const page = "http://localhost:3000/employee/checkorders";
  if (skip) {
    fixture.skip("Checkorders").page(page);
  } else {
    fixture("Checkorders").page(page);
  }
};

checkoutFixture(true);

test.skip("Create new order (happy path)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("h1").innerText)
    .eql("Bedankt voor het kopen van een Giftle!");
});

test.skip("Create new order (no e-mail)", async (test) => {
  await test
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql("E-mailadres mag niet leeg zijn!");
});

test.skip("Create new order (no firstname)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#lastname", "lastname")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql("De voor- en achternaam moeten ingevuld worden!");
});

test.skip("Create new order (no lastname)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql("De voor- en achternaam moeten ingevuld worden!");
});

test.skip("Create new order (firstname too long > 300 characters)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText(
      "#firstname",
      "ibhjasfeijhbawedijbjbiawjbawjibadefwaefuiiuwadkhjbadwkhbaewfbseafbjikesbfibeihjkfbasjkefdbiukajwbndkjawbvkjda ihfdbnawjkbfiuabfdhkjabkjdbaiwudnbjkhabidawnihdhakwjbdiuasbdchjasbkjdbaiudbnwakhbdkjabidbakjwbdkajwbdkujabnkjdwbakjdbakwjhbdkjawbdkjasbjhkdbakjsdbkjasndkjasnkjdabnskjdbakjsbdkjahbsdjkabjkwdbk"
    )
    .typeText("#lastname", "lastname")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql(
      "De voor- en/of achternaam die je hebt ingevuld is te lang! De naam mag maximaal 300 karakters lang zijn."
    );
});

test.skip("Create new order (lastname too long > 300 characters)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .typeText(
      "#lastname",
      "ibhjasfeijhbawedijbjbiawjbawjibadefwaefuiiuwadkhjbadwkhbaewfbseafbjikesbfibeihjkfbasjkefdbiukajwbndkjawbvkjda ihfdbnawjkbfiuabfdhkjabkjdbaiwudnbjkhabidawnihdhakwjbdiuasbdchjasbkjdbaiudbnwakhbdkjabidbakjwbdkajwbdkujabnkjdwbakjdbakwjhbdkjawbdkjasbjhkdbakjsdbkjasndkjasnkjdabnskjdbakjsbdkjahbsdjkabjkwdbk"
    )
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql(
      "De voor- en/of achternaam die je hebt ingevuld is te lang! De naam mag maximaal 300 karakters lang zijn."
    );
});

test.skip("Create new order (firstname empty string)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", " ")
    .typeText("#lastname", "lastname")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql("De voor- en achternaam moeten ingevuld worden!");
});

test.skip("Create new order (lastname empty string)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", " ")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql("De voor- en achternaam moeten ingevuld worden!");
});

test.skip("Create new order (e-mail empty string)", async (test) => {
  await test
    .typeText("#email", " ")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql("E-mailadres mag niet leeg zijn!");
});

test.skip("Create new order (wrong e-mail format without @)", async (test) => {
  await test
    .typeText("#email", "mailmail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql("Vul een geldig e-mailadres in.");
});

test.skip("Create new order (wrong e-mail format without .)", async (test) => {
  await test
    .typeText("#email", "mail@mailcom")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click('input[id="checkBoxGiftle"]')
    .click('div[id="createOrder"] button')
    .expect(Selector("div.alert").find("div").innerText)
    .eql("Vul een geldig e-mailadres in.");
});

test.skip("Create new order (checkbox not checked)", async (test) => {
  await test
    .typeText("#email", "mail@mail.com")
    .typeText("#firstname", "firstname")
    .typeText("#lastname", "lastname")
    .click('div[id="createOrder"] button')
    .expect(Selector("h1").innerText)
    .eql("Bedankt voor het plaatsen van een bestelling bij onze webshop!");
});

uploadVideoFixture();

test("Upload testFile1.mp4", async (test) => {
  await test
    .click("#uploadVideo")
    .setFilesToUpload("#fileInput", "./testFiles/testFile1.mp4")
    .click("#upload")
    .expect(Selector("#rewatchVideoComponent").innerText)
    .eql("Uw video terugkijken")
    .click("#fullscreen")
    .expect(Selector(".container-flex").exists)
    .ok()
    .click("#fullscreen")
    .expect(Selector(".container").exists)
    .ok()
    .click("#personalize")
    .expect(Selector("#personalizationForm").find("div.row").nth(0).innerText)
    .eql("Video personaliseren")
    .typeText("#nameReceiver", "Voornaam Achternaam")
    .typeText("#emailReceiver", "mail@mail.com")
    .click("#sendVideoMessage")
    .expect(Selector('h1').innerText).eql('Bedankt voor het versturen van je Giftle!');
});

checkOrdersFixture();

test("Print QR-code (websockets)", async (test) => {
  const window1 = await test.openWindow('http://localhost:3000/employee/checkorders');
  const window2 = await test.openWindow('http://localhost:3000/employee/checkorders');
  const checkableTableData = ['Sjoerd de Bruin', 'sjoerddebruin1@hotmail.com', 'Voornaam Achternaam', 'Voornaam Achternaam'];

  await test.switchToWindow(window1);

  await test.expect(Selector('#checkOrdersTable').exists).ok();

  const tableW1 = Selector('#checkOrdersTable');
  const rowsW1 = tableW1.find('tr');
  const columnsW1 = rowsW1.nth(0).find('td');

  await test.expect(rowsW1.count).eql(2);

  for (let i = 1; i < columnsW1.count - 1; i++) {
    await test
      .expect(rowsW1.nth(1).find('td').nth(i).textContent).eql(checkableTableData[i]);
  }

  await test.switchToWindow(window2);

  await test.expect(Selector('#checkOrdersTable').exists).ok();

  const tableW2 = Selector('#checkOrdersTable');
  const rowsW2 = tableW2.find('tr');
  const columnsW2 = rowsW2.nth(0).find('td');

  await test.expect(rowsW2.count).eql(2);

  for (let i = 1; i < columnsW2.count - 1; i++) {
    await test
      .expect(rowsW2.nth(1).find('td').nth(i).textContent).eql(checkableTableData[i]);
  }

  const prePrintOrder = Selector('#prePrintOrder').nth(0);
console.log(prePrintOrder.innerText);
  await test
    .expect(prePrintOrder.exists).ok()
    .click(prePrintOrder)
});