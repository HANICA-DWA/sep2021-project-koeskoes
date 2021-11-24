const axios = require("axios");
const mongoose = require("mongoose");
const generateUniqueRandomCode = require("../commonFunctions/generateUniqueRandomCode");
require("../model/uploadModel");

const uploads = mongoose.model("UploadSchema");

describe("Express route tests", () => {
  let order = {
    _id: "619b7c66d79dad758c1e5519",
    nameGifter: "firstname lastname",
    emailGifter: "mail@mail.com",
    videoName: "video.mp4",
    printed: false,
  };

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/giftle", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
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

  test("generate textcode", async () => {
    await uploads.deleteMany();
    order.textCode = "123abc";
    await uploads.create(order);

    const randomCode = await generateUniqueRandomCode();

    expect(randomCode).not.toEqual(order.textCode);
  });

  xtest("create new order", async () => {});

  xtest("check if video is mp4", async () => {});

  xtest("check if video is not mp4", async () => {});

  xtest("get order by id", async () => {});

  xtest("get order by gifter", async () => {});

  xtest("get order by receiver", async () => {});

  xtest("get order by text", async () => {});

  xtest("get printed orders", async () => {});

  xtest("get not printed orders", async () => {});

  xtest("generate filename", async () => {});
});
