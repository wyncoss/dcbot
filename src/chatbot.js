const { EmbedBuilder } = require("discord.js");
const puppeteer = require("puppeteer");

let conversationHistory = {};

async function execute(interaction) {
  await interaction.reply({
    content: "Tu respuesta viene en camino...",
    ephemeral: false,
  });
  const { options, member, user } = interaction;
  const prompt = options.getString("mensaje");

  // Initialize user's conversation history if not existent
  if (!conversationHistory[user.id]) {
    conversationHistory[user.id] = [];
  }

  // Add new user prompt to history
  conversationHistory[user.id].push({ type: "user", text: prompt });

  // Determine the relevant portion of history to send
  // This example sends the last user prompt and the last bot response (if available)
  let historyToSend = "";
  const lastTwoMessages = conversationHistory[user.id].slice(-2);
  if (lastTwoMessages.length === 2 && lastTwoMessages[0].type === "bot") {
    historyToSend = lastTwoMessages[0].text + "\n";
  }
  historyToSend += prompt;

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://andres.zapier.app/");

  const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]';
  await page.waitForSelector(textBoxSelector);
  await page.type(textBoxSelector, historyToSend);

  await page.keyboard.press("Enter");
  await page.waitForSelector('[data-testid="final-bot-response"] p');

  var value = await page.$$eval(
    '[data-testid="final-bot-response"]',
    async (elements) => {
      return elements.map((element) => element.textContent);
    }
  );

  setTimeout(async () => {
    if (value.length === 0) {
      return await interaction.editReply({
        content: "Miau no pudo responder :(",
      });
    }
  }, 30e3);

  await browser.close();

  value.shift();

  if (value.length > 0) {
    conversationHistory[user.id].push({ type: "bot", text: value.join("\n") });
  }

  const embed = new EmbedBuilder()
    .setColor("Random")
    .setTitle(`${member.displayName}(${user.tag}) dice: \`${prompt}\``)
    .setDescription(`\`\`\`${value.join(`\n\n\n\n`)}\`\`\``);

  await interaction.editReply({
    content: "",
    embeds: [embed],
  });
}

module.exports = {
  execute,
};
