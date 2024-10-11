const { ApplicationCommandOptionType, REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'chat',
    description: 'Miau Miau!',
    options: [
      {
        name: 'mensaje',
        description: 'Miau Miau!',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );
  } catch (e) {
    console.log(`Error: ${e}`);
  }
})();

module.exports = {
  commands,
  rest,
};
