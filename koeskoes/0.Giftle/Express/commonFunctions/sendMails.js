const nodemailer = require("nodemailer");
const mailTextCode = require("../mail/mailTextCode");
const mailVideoWatched = require("../mail/mailVideoWatched");
const mailUploadReminder = require("../mail/mailUploadReminder");
const mailOrderPlaced = require("../mail/mailOrderPlaced");

/**
 * This class adds the ability to send mails via an SMTP server.
 * It will send multiple presets that have been built specifically for this application.
 */
class mailModule {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "faithspooky@gmail.com",
        pass: "bwtmtzbeexpuxoms",
      },
    });
  }

  /**
   * 
   * @param {string} to
   * @param {string} receiver 
   * @param {string} buyer 
   * @param {string} textCode 
   * @returns 
   */
  sendTextCode = async (to, receiver, buyer, textCode) => {
    if (to === "null" || !to)
      return { status: "error", message: "Mail not included" };
    if (!receiver) return { status: "error", message: "Receiver not included" };
    if (!buyer) return { status: "error", message: "Buyer not included" };
    if (!textCode) return { status: "error", message: "Textcode not included" };

    try {
      const mailInfo = await this.transport.sendMail({
        from: '"Giftle.nl" info@giftle.nl',
        to: to,
        subject: `Giftle - ${buyer} heeft jou een videoboodschap gestuurd!`,
        html: mailTextCode(receiver, buyer, textCode),
      });

      return { status: "success", message: mailInfo };
    } catch (e) {
      return { status: "error", message: e };
    }
  };

  /**
   * 
   * @param {string} to
   * @param {string} buyer 
   * @param {string} receiver 
   * @returns 
   */
  sendReminderVideoWatched = async (to, buyer, receiver) => {
    if (!to) return { status: "error", message: "Mail not included" };
    if (!buyer) return { status: "error", message: "Buyer not included" };
    if (!receiver) return { status: "error", message: "Receiver not included" };

    try {
      const mailInfo = await this.transport.sendMail({
        from: '"Giftle.nl" info@giftle.nl',
        to: to,
        subject: "Giftle - Jouw videoboodschap is ontvangen en bekeken!",
        html: mailVideoWatched(buyer, receiver),
      });

      return { status: "success", message: mailInfo };
    } catch (e) {
      return { status: "error", message: e };
    }
  };

  /**
   * 
   * @param {string} to 
   * @param {string} buyer 
   * @returns 
   */
  sendReminderUploadVideo = async (to, buyer) => {
    if (!to) return { status: "error", message: "Mail not included" };
    if (!buyer) return { status: "error", message: "Buyer not included" };

    try {
      const mailInfo = await this.transport.sendMail({
        from: '"Giftle.nl" info@giftle.nl',
        to: to,
        subject: "Giftle - Je hebt nog geen videoboodschap geüpload!",
        html: mailUploadReminder(buyer),
      });

      return { status: "success", message: mailInfo };
    } catch (e) {
      return { status: "error", message: e };
    }
  };

  /**
   * 
   * @param {string} to 
   * @param {string} buyer 
   * @returns 
   */
  sendMailOrderPlaced = async (to, buyer) => {
    if (!to) return { status: "error", message: "Mail not included" };
    if (!buyer) return { status: "error", message: "Buyer not included" };

    try {
      const mailInfo = await this.transport.sendMail({
        from: '"Giftle.nl" info@giftle.nl',
        to: to,
        subject: "Giftle - Bedankt voor je bestelling!",
        html: mailOrderPlaced(buyer),
      });

      return { status: "success", message: mailInfo };
    } catch (e) {
      return { status: "error", message: e };
    }
  };
}

module.exports = mailModule;
