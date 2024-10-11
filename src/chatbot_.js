const { EmbedBuilder } = require("discord.js");
const puppeteer = require("puppeteer");

async function execute(interaction) {
  await interaction.reply({
    content: "Tu respuesta viene en camino...",
    ephemeral: false,
  });
  const { options, member, user } = interaction;
  const prompt = options.getString("mensaje");

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();
  await page.goto("https://chat-app-5275fc.zapier.app/");

  const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]';
  await page.waitForSelector(textBoxSelector);
  await page.type(textBoxSelector, prompt);

  await page.keyboard.press("Enter");

  const responseSelector = '[data-testid="final-bot-response"] p';
  try {
    await page.waitForSelector(responseSelector, { timeout: 30e4 });
  } catch (error) {
    await browser.close();
    return await interaction.editReply({
      content: "Lo siento, no puedo responder a eso. :(",
    });
  }

  const value = await page.$$eval(responseSelector, (elements) =>
    elements.map((element) => element.textContent)
  );

  if (value.length === 0) {
    await browser.close();
    return await interaction.editReply({ content: "No response received." });
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
