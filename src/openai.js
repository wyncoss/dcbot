const { OpenAI } = require("openai");

const IGNORE_PREFIX = "!";
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_TOKEN,
});
const channels = ["1020341423528218625"];
async function chatBot(client, message) {
  if (message.author.bot) return;
  if (message.content.startsWith(IGNORE_PREFIX)) return;
  if (
    !channels.includes(message.channelId) &&
    !message.mentions.has(client.user.id)
  )
    return;

  const response = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          // name:
          role: "system",
          content: "Hola, soy Cou cuéntame tus problemas, te escucho.",
        },
        {
          role: "user",
          content: message.content,
        },
      ],
    })
    .catch((error) => console.error("Error:", error));

  if (response.choices && response.choices.length > 0) {
    const botReply = response.choices[0].message.content;

    // Send the reply to the same channel where the message was received
    message.channel.send(botReply);
  } else {
    console.error("Error: Empty or undefined response from OpenAI API");
  }

  //   message.reply(response.choices[0].message.content);
}

module.exports = {
  chatBot,
};
