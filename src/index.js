require('dotenv').config();
const { client } = require('./client');
const { setStatus } = require('./status');
const { customMessages } = require('./custom_messages');
// const { execute } = require("./chatbot");
// const { commands, rest } = require("./commands");
// const { chatBot } = require("./openai");

// status
client.on('ready', () => {
  setStatus(client);
});

// custom messages
client.on('messageCreate', (message) => {
  customMessages(client, message);
});

// // chatbot under maintenance
// client.on("interactionCreate", (interaction) => {
//   if (!interaction.isChatInputCommand()) return;
//   if (interaction.commandName === "chat") {
//     execute(interaction);
//   }
// });

// // openai
// client.on("messageCreate", (message) => {
//   chatBot(client, message);
// });

client.login(process.env.BOT_TOKEN);
