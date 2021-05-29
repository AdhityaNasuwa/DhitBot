const fs = require("fs");
const axios = require("axios");
const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");

const SESSION_FILE_PATH = "./session.json";
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({
  puppeteer: { headless: true },
  session: sessionCfg,
});
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("QR RECEIVED", qr);
});

client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

const info = `
*Assalamualaikum..*\nSaya Adhitya Nasuwa berterima kasih karena anda telah mencoba bot WhatsApp saya.\nContoh perintah yang bisa anda masukan :\n~ !Quotes\n~ I Love You\n\n\n*Perhatian:* Masukan perintah sesuai perintah di atas, Huruf Kapital, Spasi\n\nHormat saya : Adhitya Nasuwa
`;
// axios({
//   method: "get",
//   url: "https://zenquotes.io/api/random",
//   responseType: "json",
// }).then((response) => {
//   response.data.forEach(myFunc);
//   function myFunc(item, index) {
//     const uote = `*“ ${item["q"]} ”*\n_~${item["a"]}_\n\n*Random Quotes WhatsApp by Adhitya*
//     `;
//     msg.reply(uote);
//   }
// });
client.on("message", (msg) => {
  if (msg.body == "!Quotes") {
    msg.reply("COBA");
  } else if (msg.body == "!info") {
    msg.reply(info);
  }
});

client.initialize();
