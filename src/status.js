const { ActivityType } = require('discord.js');

function setStatus(client) {
  client.user.setPresence({
    activities: [
      {
        name: 'The melodic blue',
        type: ActivityType.Listening,
        url: 'https://twitch.tv/',
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
