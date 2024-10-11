function customMessages(client, message) {
  if (message.content.toLowerCase() === "miau") {
    message.reply("Grrrrr :3");
  } else if (
    message.content.toLowerCase() === "pau" ||
    message.content.toLowerCase() === "parasitus"
  ) {
    message.reply("Me cae mal :3");
  }
  const owner = message.mentions.users.find(
    (user) => user.id === process.env.OWNER_ID
  );
  // if (owner) {
  //   if (!message.author.bot) {
  //     const randomMsgs = [
  //       `Puede que ${owner.globalName} esté cagando. :poop:`,
  //       `Puede que ${owner.globalName} esté durmiendo. :sleeping:`,
  //       `${owner.globalName} no está. Manda a decir que odia a Parasitus`,
  //       `Hora de fornai? :hot_face:`,
  //     ];
  //     const randomMsg =
  //       randomMsgs[Math.floor(Math.random() * randomMsgs.length)];
  //     message.reply(randomMsg);
  //   }
  // }
}

module.exports = {
  customMessages,
};
