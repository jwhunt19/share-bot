import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!'

client.on('ready', async () => {
  console.log('share bot is online!')
  
  const ch = await client.channels.fetch('958233169247760455');
  if (ch.isText) {
    ch.send('I AM ONLINE');
  }
  
});

// responds to any message in the test channel, tagging the author
client.on('messageCreate', (msg) => {
  if (msg.author.bot) return;
  
  if (msg.channelId === '958943290848321536') {
    msg.reply(`<@!${msg.author.id}> said "${msg.content}" \n\n I think that's a cool message`)
  }
});

// bot commands
client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  
  let msgContent = msg.content.toLocaleLowerCase()
  
  // send custom message to specific channel
  if (msgContent.startsWith('!send')) {
    // build command array
    function buildCommand(text) {
      const reg = /^!send\s(.*)\sto\s<#(\d+)>$/;
      const ms = text.match(reg);

      if (!ms) {
          console.warn('no matches found');
        return;
      }
      
      return [ms[1], ms[2]]
    }

    const [message, channel] = buildCommand(msg.content)
    
    // TODO - add error handling, text search instead of direct channel id using this func
    // const ch = client.channels.cache.filter(channel => channel.name === "test-zone").map(channel => channel.id)
    const ch = await client.channels.fetch(channel);
    if (ch.isText) {
      ch.send(`<@!${msg.author.id}> says ${message}`);
    }
  }
});

client.login(process.env.TOKEN);
