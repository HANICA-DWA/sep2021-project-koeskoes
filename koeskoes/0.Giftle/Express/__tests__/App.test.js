const axios = require("axios");
const mongoose = require("mongoose");
const generateRandomCode = require('../commonFunctions/generateTextcode');
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
      useUnifiedTopology: true
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
    const orders = await axios.get("http://localhost:4000/orders/");

    expect(orders.data).toEqual([order]);
  });

  test("create new order without file", async () => {
    const orders = await axios.post("http://localhost:4000/orders/");

    expect(orders.data).toEqual({
      status: "error",
      message: "No file has been uploaded",
    });
  });

  // test("create new order with file", async () => {
  //   const formData = new FormData({writable:true});

  //   const blob = new File(
  //     [JSON.stringify({ test: "something to test with" })],
  //     { type: "video/mp4" }
  //   );

  //   console.log(blob);

  //   formData.append("video", blob);

  //   formData.append("name", "firstname lastname");
  //   formData.append("email", "firstnamelastname@mail.com");

  //   console.log(formData)

  //   const orders = await axios.post(
  //     `http://localhost:4000/orders/`,
  //     formData
  //   );

  //   expect(orders.data).toEqual({
  //     status: "success",
  //     message: "File uploaded",
  //   });
  // });

  test("change order", async () => {
    const orderChange = await axios.patch("http://localhost:4000/orders/", {
      orderNumber: order._id,
    });

    expect(orderChange.data).toEqual({
      status: "success",
      message: "Order change saved",
    });
  });

  test("generate textcode", async () => {
    await uploads.deleteMany();
    order.textCode = "123abc";
    await uploads.create(order);

    const randomCode = await generateRandomCode();

    expect(randomCode).not.toEqual(order.textCode);
  })
});
