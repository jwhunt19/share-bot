import { Client, Intents } from 'discord.js';
import { buildCommand } from './helper.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!';

client.on('ready', async () => {
  console.log('share bot is online!')
  
  const ch = await client.channels.fetch(process.env.CHANNEL);
  if (ch.isText) {
    ch.send('I AM ONLINE');
  } 
});

// bot commands
client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  
  // send custom message to specific channel
  if (msgContent.startsWith('!send')) {
    let msgContent = msg.content
    let msgAuthor = msg.author.id

    // check if reply
    if (msg.type === 'REPLY') {
      const messageBody = await (await msg.channel.messages.fetch(msg.reference.messageId)).content
      const request = msgContent.split(' ')

      if (request.length > 3) return

      msgContent = `${request[0]} ${messageBody} ${request[1]} ${request[2]}`
      msgAuthor = msg.mentions.repliedUser.id
    }

    // channel query check
    const chQuery = msgContent.match(/^!send\s.*\sto\s(.*)/)[1]
    if (!chQuery.match(/^<#\d+>$/)) {
      const ch = client.channels.cache.filter(channel => channel.name === chQuery).map(channel => channel.id)
      
      if (ch.length > 0) {
        msgContent = `${msgContent.match(/^(!send\s.*\sto\s).*$/)[1]}<#${ch[0]}>`
      }
    }

    // build message and designated channel array
    const [message, channel] = buildCommand(msgContent)

    // send message to designated channel if text channel
    if (message) {
      const ch = await client.channels.fetch(channel); // FIXME handle channel permission errors
      if (ch.isText) {
        ch.send(`<@!${msgAuthor}> says ${message}`);
      }
    } else {
      msg.reply('there seems to be an error in your request, please try again.')
    }
  }
});

client.login(process.env.TOKEN);
