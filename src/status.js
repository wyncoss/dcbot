const { ActivityType } = require('discord.js');

function setStatus(client) {
  client.user.setPresence({
    activities: [
      {
        name: 'las manqueadas de Parasitus en Fortnite',
        type: ActivityType.Streaming,
        url: 'https://twitch.tv/parasitus',
        timestamps: {
          start: Date.now(),
        },
      },
    ],
    status: 'online',
  });
  // // Accepted activity types
  // ActivityType.Playing
  // ActivityType.Listening
  // ActivityType.Watching
  // ActivityType.Competing
  // ActivityType.Streaming // Lets you use url parameter. This can be a YouTube or Twitch link.
  // ActivityType.Custom // Unsupported in discord.js. Will be added at some point.

  // // Accepted statusses
  // "online"
  // "offline"
  // "idle"
  // "dnd"
}

module.exports = {
  setStatus,
};
