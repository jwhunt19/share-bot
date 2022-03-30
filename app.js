import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log('share bot is online!')
});

client.on('messageCreate', (m) => {
  if (m.content === 'ping') {
    m.reply({
      content: 'pong'
    })
  }
});

client.login(process.env.TOKEN);
