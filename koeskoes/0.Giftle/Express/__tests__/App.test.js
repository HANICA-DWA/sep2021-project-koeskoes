const axios = require("axios");
const mongoose = require("mongoose");
const generateRandomFileName = require("../commonFunctions/generateRandomFileName");
const MailModule = require("../commonFunctions/sendMails");
require("../model/uploadModel");

const Uploads = mongoose.model("UploadSchema");

let order = {
  _id: "619b7c66d79dad758c1e5519",
  nameGifter: "firstname lastname",
  emailGifter: "mail@mail.com",
  videoName: "video.mp4",
  prePrinted: false,
  printed: false,
  textCode: "123abc",
};

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/giftle", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  await Uploads.deleteMany({});
});

beforeEach(async () => {
  await Uploads.create(order);
});

afterEach(async () => {
  await Uploads.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Express route tests", () => {
  test("get orders from mongoose route", async () => {
    const orders = await axios.get("http://localhost:4000/api/orders/all/false/");

    expect(orders.data).toEqual([order]);
  });

  test("create new order without file route", async () => {
    const orders = await axios.patch(
      `http://localhost:4000/api/orders/order/video/${order.textCode}`
    );

    expect(orders.data).toEqual({
      status: "error",
      message: "No file has been uploaded",
    });
  });

  test("change order route", async () => {
    const orderChange = await axios.patch(
      "http://localhost:4000/api/orders/" + order._id
    );

    expect(orderChange.data).toEqual({
      status: "success",
      message: "Order change saved",
    });
  });
});

describe("Database tests", () => {
  test("create new order in database", async () => {
    const duplicateOrder = {
      ...order,
      _id: "619b7c66d79dad758c1e5520",
      videoName: "duplicateVideo.mp4",
      textCode: "456def",
    };

    const createdOrder = await Uploads.create(duplicateOrder);

    expect(!!createdOrder).toEqual(true);
  });

  test("check if video is mp4", async () => {
    const orderWithMp4 = await Uploads.findOne(
      {
        videoName: {
          $exists: true,
          $regex: /.*.mp4.*/,
        },
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
      }
    ).lean();

    orderWithMp4._id = orderWithMp4._id.toString();

    expect({ ...orderWithMp4 }).toEqual({
      _id: "619b7c66d79dad758c1e5519",
      nameGifter: "firstname lastname",
      emailGifter: "mail@mail.com",
      videoName: "video.mp4",
      prePrinted: false,
      printed: false,
      textCode: "123abc",
    });
  });

  test("check if video is not mp4", async () => {
    const duplicateOrder = {
      ...order,
      _id: "619b7c66d79dad758c1e5520",
      videoName: "video.mov",
      textCode: "456def",
    };

    await Uploads.create(duplicateOrder);

    const orderWithNoMp4 = await Uploads.findOne(
      {
        videoName: {
          $exists: true,
          $not: /.*.mp4.*/,
        },
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
      }
    ).lean();

    orderWithNoMp4._id = orderWithNoMp4._id.toString();

    expect({ ...orderWithNoMp4 }).toEqual(duplicateOrder);
  });

  test("get order by id from database", async () => {
    const findOrderById = await Uploads.findOne(
      {
        _id: order._id,
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
      }
    ).lean();

    findOrderById._id = findOrderById._id.toString();

    expect(findOrderById).toEqual(order);
  });

  test("get order by textcode from database", async () => {
    const findOrderByTextCode = await Uploads.findOne(
      {
        textCode: order.textCode,
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
      }
    ).lean();

    findOrderByTextCode._id = findOrderByTextCode._id.toString();

    expect(findOrderByTextCode).toEqual(order);
  });

  test("get order by emailGifter from database", async () => {
    const findOrderByEmailGifter = await Uploads.findOne(
      {
        emailGifter: order.emailGifter,
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
      }
    ).lean();

    findOrderByEmailGifter._id = findOrderByEmailGifter._id.toString();

    expect(findOrderByEmailGifter).toEqual(order);
  });

  test("get order by printed from database", async () => {
    const findOrderByPrinted = await Uploads.findOne(
      {
        printed: order.printed,
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
      }
    ).lean();

    findOrderByPrinted._id = findOrderByPrinted._id.toString();

    expect(findOrderByPrinted).toEqual(order);
  });

  test("get order by pre printed from database", async () => {
    const findOrderByPrePrinted = await Uploads.findOne(
      {
        prePrinted: order.prePrinted,
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
      }
    ).lean();

    findOrderByPrePrinted._id = findOrderByPrePrinted._id.toString();

    expect(findOrderByPrePrinted).toEqual(order);
  });

  test("set printed model method (printed false -> true)", async () => {
    const newOrder = await new Uploads({
      ...order,
      _id: "619b7c66d79dad758c1e5521",
      textCode: "456def",
      videoName: "newVideo.mp4",
    });

    await newOrder.setPrinted();

    const printedOrders = await Uploads.find(
      {
        printed: true,
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
        __v: 1,
      }
    ).lean();

    expect(JSON.stringify(printedOrders)).toEqual(JSON.stringify([newOrder]));
  });

  test("set pre printed model method (prePrinted false -> true)", async () => {
    const newOrder = await new Uploads({
      ...order,
      _id: "619b7c66d79dad758c1e5521",
      textCode: "456def",
      videoName: "newVideo.mp4",
    });

    await newOrder.setPrePrinted();

    const prePrintedOrders = await Uploads.find(
      {
        prePrinted: true,
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
        __v: 1,
      }
    ).lean();

    expect(JSON.stringify(prePrintedOrders)).toEqual(
      JSON.stringify([newOrder])
    );
  });

  test("method setCode test", async () => {
    const setCodeTest = await Uploads.findOne(
      {
        _id: order._id,
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        videoName: 1,
        prePrinted: 1,
        printed: 1,
        textCode: 1,
      }
    ).exec();

    await setCodeTest.setCode();

    expect(setCodeTest).not.toEqual(order);
  });
});

describe("CommonFunctions tests", () => {
  test("generate filename", () => {
    const files = generateRandomFileName(
      "videoname.mp4.mp3.avi",
      "randomNumber123"
    );

    expect(files).toEqual({
      finalFileName: "videoname.mp4.mp3randomNumber123.mp4",
      uploadPath: "videos/",
    });
  });
});

describe("Mail tests", () => {
  let mail;

  const convertMailData = (response) => {
    if (response.status === "success") {
      return {
        status: response.status,
        message: {
          accepted: response.message.accepted,
          rejected: response.message.rejected,
          envelope: response.message.envelope,
        },
      };
    } else {
      return {
        status: response.status,
        message: response.message,
      };
    }
  };

  beforeAll(async () => {
    mail = new MailModule();
  });

  describe("Send mail with textcode", () => {
    test("send mail with textcode (happy path)", async () => {
      const happyMailPath = await mail.sendTextCode(
        "mail@mail.com",
        "receiver",
        "buyer",
        "123abc"
      );

      const checkableData = convertMailData(happyMailPath);

      expect(checkableData).toEqual({
        status: "success",
        message: {
          accepted: ["mail@mail.com"],
          rejected: [],
          envelope: { from: "info@giftle.nl", to: ["mail@mail.com"] },
        },
      });
    });
    test("send mail with textcode (no receiver mail)", async () => {
      const noReceiverMailPath = await mail.sendTextCode(
        "",
        "receiver",
        "buyer",
        "123abc"
      );

      const checkableData = convertMailData(noReceiverMailPath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Mail not included",
      });
    });
    test("send mail with textcode (no receiver name)", async () => {
      const noReceiverMailPath = await mail.sendTextCode(
        "mail@mail.com",
        "",
        "buyer",
        "123abc"
      );

      const checkableData = convertMailData(noReceiverMailPath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Receiver not included",
      });
    });
    test("send mail with textcode (no buyer name)", async () => {
      const noReceiverMailPath = await mail.sendTextCode(
        "mail@mail.com",
        "receiver",
        "",
        "123abc"
      );

      const checkableData = convertMailData(noReceiverMailPath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Buyer not included",
      });
    });
    test("send mail with textcode (no textcode)", async () => {
      const noReceiverMailPath = await mail.sendTextCode(
        "mail@mail.com",
        "receiver",
        "buyer",
        ""
      );

      const checkableData = convertMailData(noReceiverMailPath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Textcode not included",
      });
    });
  });

  describe("Send mail with notification that video has been watched by the receiver", () => {
    test("send mail (happy path)", async () => {
      const happyMailPath = await mail.sendReminderVideoWatched(
        "mail@mail.com",
        "buyer",
        "receiver"
      );

      const checkableData = convertMailData(happyMailPath);

      expect(checkableData).toEqual({
        status: "success",
        message: {
          accepted: ["mail@mail.com"],
          rejected: [],
          envelope: { from: "info@giftle.nl", to: ["mail@mail.com"] },
        },
      });
    });
    test("send mail (no buyer mail)", async () => {
      const noBuyerMailPath = await mail.sendReminderVideoWatched(
        "",
        "buyer",
        "receiver"
      );

      const checkableData = convertMailData(noBuyerMailPath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Mail not included",
      });
    });
    test("send mail (no buyer name)", async () => {
      const noBuyerNamePath = await mail.sendReminderVideoWatched(
        "mail@mail.com",
        "",
        "receiver"
      );

      const checkableData = convertMailData(noBuyerNamePath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Buyer not included",
      });
    });
    test("send mail (no receiver name)", async () => {
      const noReceiverNamePath = await mail.sendReminderVideoWatched(
        "mail@mail.com",
        "buyer",
        ""
      );

      const checkableData = convertMailData(noReceiverNamePath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Receiver not included",
      });
    });
  });

  describe("Send mail with notification that no video has been uploaded", () => {
    test("send mail (happy path)", async () => {
      const happyMailPath = await mail.sendReminderUploadVideo(
        "mail@mail.com",
        "buyer",
        "123abc"
      );

      const checkableData = convertMailData(happyMailPath);

      expect(checkableData).toEqual({
        status: "success",
        message: {
          accepted: ["mail@mail.com"],
          rejected: [],
          envelope: { from: "info@giftle.nl", to: ["mail@mail.com"] },
        },
      });
    });
    test("send mail (no buyer mail)", async () => {
      const noBuyerMailPath = await mail.sendReminderUploadVideo("", "buyer");

      const checkableData = convertMailData(noBuyerMailPath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Mail not included",
      });
    });
    test("send mail (no buyer name)", async () => {
      const noBuyerNamePath = await mail.sendReminderUploadVideo(
        "mail@mail.com",
        ""
      );

      const checkableData = convertMailData(noBuyerNamePath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Buyer not included",
      });
    });
  });

  describe("Send mail with notification of order", () => {
    test("send mail (happy path)", async () => {
      const happyMailPath = await mail.sendMailOrderPlaced(
        "mail@mail.com",
        "buyer"
      );

      const checkableData = convertMailData(happyMailPath);

      expect(checkableData).toEqual({
        status: "success",
        message: {
          accepted: ["mail@mail.com"],
          rejected: [],
          envelope: { from: "info@giftle.nl", to: ["mail@mail.com"] },
        },
      });
    });
    test("send mail (no buyer mail)", async () => {
      const noBuyerMailPath = await mail.sendMailOrderPlaced("", "buyer");

      const checkableData = convertMailData(noBuyerMailPath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Mail not included",
      });
    });
    test("send mail (no buyer name)", async () => {
      const noBuyerNamePath = await mail.sendMailOrderPlaced(
        "mail@mail.com",
        ""
      );

      const checkableData = convertMailData(noBuyerNamePath);

      expect(checkableData).toEqual({
        status: "error",
        message: "Buyer not included",
      });
    });
    test("send mail (w/ textCode)", async () => {
      const textCodeMailPath = await mail.sendMailOrderPlaced(
        "mail@mail.com",
        "buyer",
        "123abc"
      );

      const checkableData = convertMailData(textCodeMailPath);

      expect(checkableData).toEqual({
        status: "success",
        message: {
          accepted: ["mail@mail.com"],
          rejected: [],
          envelope: {
            from: "info@giftle.nl",
            to: ["mail@mail.com"],
          },
        },
      });
    });
  });
});
