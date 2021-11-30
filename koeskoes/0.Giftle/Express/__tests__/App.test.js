const axios = require("axios");
const mongoose = require("mongoose");
const generateUniqueRandomCode = require("../commonFunctions/generateUniqueRandomCode");
const generateRandomFileName = require("../commonFunctions/generateRandomFileName");
require("../model/uploadModel");

const uploads = mongoose.model("UploadSchema");

let order = {
  _id: "619b7c66d79dad758c1e5519",
  nameGifter: "firstname lastname",
  emailGifter: "mail@mail.com",
  videoName: "video.mp4",
  printed: false,
  textCode: "123abc",
};

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/giftle", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  await uploads.deleteMany({});
});

beforeEach(async () => {
  await uploads.create(order);
});

afterEach(async () => {
  await uploads.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Express route tests", () => {
  test("get orders from mongoose", async () => {
    const orders = await axios.get("http://localhost:4000/orders/all/");

    expect(orders.data).toEqual([order]);
  });

  test("create new order without file", async () => {
    const orders = await axios.post("http://localhost:4000/orders/new/");

    expect(orders.data).toEqual({
      status: "error",
      message: "No file has been uploaded",
    });
  });

  test("change order", async () => {
    const orderChange = await axios.patch(
      "http://localhost:4000/orders/" + order._id
    );

    expect(orderChange.data).toEqual({
      status: "success",
      message: "Order change saved",
    });
  });
});

describe("database tests", () => {
  test("create new order", async () => {
    const duplicateOrder = {
      ...order,
      _id: "619b7c66d79dad758c1e5520",
      videoName: "duplicateVideo.mp4",
      textCode: "456def",
    };

    const createdOrder = await uploads.create(duplicateOrder);

    expect(!!createdOrder).toEqual(true);
  });

  test("check if video is mp4", async () => {
    const orderWithMp4 = await uploads
      .findOne(
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
          printed: 1,
          textCode: 1,
        }
      )
      .lean();

    orderWithMp4._id = orderWithMp4._id.toString();

    expect({ ...orderWithMp4 }).toEqual({
      _id: "619b7c66d79dad758c1e5519",
      nameGifter: "firstname lastname",
      emailGifter: "mail@mail.com",
      videoName: "video.mp4",
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

    await uploads.create(duplicateOrder);

    const orderWithNoMp4 = await uploads
      .findOne(
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
          printed: 1,
          textCode: 1,
        }
      )
      .lean();

    orderWithNoMp4._id = orderWithNoMp4._id.toString();

    expect({ ...orderWithNoMp4 }).toEqual(duplicateOrder);
  });

  test("get order by id", async () => {
    const findOrderById = await uploads
      .findOne(
        {
          _id: order._id,
        },
        {
          _id: 1,
          nameGifter: 1,
          emailGifter: 1,
          videoName: 1,
          printed: 1,
          textCode: 1,
        }
      )
      .lean();

    findOrderById._id = findOrderById._id.toString();

    expect(findOrderById).toEqual(order);
  });

  test("get order by textcode", async () => {
    const findOrderById = await uploads
      .findOne(
        {
          textCode: order.textCode,
        },
        {
          _id: 1,
          nameGifter: 1,
          emailGifter: 1,
          videoName: 1,
          printed: 1,
          textCode: 1,
        }
      )
      .lean();

    findOrderById._id = findOrderById._id.toString();

    expect(findOrderById).toEqual(order);
  });

  test("get printed orders", async () => {
    const duplicateOrder = {
      ...order,
      _id: "619b7c66d79dad758c1e5520",
      videoName: "duplicateVideo.mp4",
      printed: true,
      textCode: "456def",
    };

    await uploads.create(duplicateOrder);

    const printedOrders = await uploads
      .find(
        {
          printed: true,
        },
        {
          _id: 1,
          nameGifter: 1,
          emailGifter: 1,
          videoName: 1,
          printed: 1,
          textCode: 1,
        }
      )
      .lean();
    
    printedOrders.forEach(printedOrder => {
      printedOrder._id = printedOrder._id.toString();
    });

    expect(printedOrders).toEqual([duplicateOrder]);
  });

  test("get not printed orders", async () => {
    const notPrintedOrders = await uploads
      .find(
        {
          printed: false,
        },
        {
          _id: 1,
          nameGifter: 1,
          emailGifter: 1,
          videoName: 1,
          printed: 1,
          textCode: 1,
        }
      )
      .lean();
    
    notPrintedOrders.forEach(notPrintedOrder => {
      notPrintedOrder._id = notPrintedOrder._id.toString();
    });

    expect(notPrintedOrders).toEqual([order]);
  });
});

describe("commonFunctions tests", () => {
  test("generate textcode", async () => {
    const randomCode = await generateUniqueRandomCode();

    expect(randomCode).not.toEqual(order.textCode);
  });

  test("generate filename", () => {
    const files = generateRandomFileName(
      "videoname.mp4.mp3.avi",
      "randomNumber123"
    );

    expect(files).toEqual({
      finalFileName: "videoname.mp4.mp3randomNumber123.mp4",
      uploadPath: "videos/videoname.mp4.mp3randomNumber123.mp4",
    });
  });
});
