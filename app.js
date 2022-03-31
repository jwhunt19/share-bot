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

// commands
client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  
  let msgContent = msg.content.toLocaleLowerCase()
  
  // send custom message to specific channel
  if (msgContent.startsWith('!send')) {
    // build command array
    let cmd = msgContent.split(/ (.*)/s)
    cmd.pop()
    let lastIndex = cmd[1].lastIndexOf(' ')
    cmd = [cmd[0], cmd[1].slice(0, lastIndex), cmd[1].slice(lastIndex + 1)]
    lastIndex = cmd[1].lastIndexOf(' ')
    cmd = [cmd[0], cmd[1].slice(0, lastIndex), cmd[1].slice(lastIndex + 1), cmd[2]]
    
    // typo handling
    if (cmd.length !== 4 || cmd[2] !== 'to') {
      msg.reply('There seems to be a typo in your request, please try again!')
    }
    
    // TODO - add error handling, text search instead of direct channel id using this func
    // const ch = client.channels.cache.filter(channel => channel.name === "test-zone").map(channel => channel.id)
    // console.log(ch)
    const ch = await client.channels.fetch(cmd[3].slice(2, cmd[3].length - 1));
    if (ch.isText) {
      ch.send(`<@!${msg.author.id}> says ${cmd[1]}`);
    }
  }
});

client.login(process.env.TOKEN);
