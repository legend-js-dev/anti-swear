console.log("[INFO]: Loading...")
//anti Swear bot coded by legend :D
const { Client, Collection } = require("discord.js");
const { prefix, token } = require("./config.json")
//dont touch the credits or i will find you and u will have to commit die >:)
const client = new Client({
    disableMentions: "everyone"
})
const db = require("quick.db")

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

console.log("-------------------------------------")
console.log(`
██╗     ███████╗ ██████╗ ███████╗███╗   ██╗██████╗         ██╗███████╗
██║     ██╔════╝██╔════╝ ██╔════╝████╗  ██║██╔══██╗        ██║██╔════╝
██║     █████╗  ██║  ███╗█████╗  ██╔██╗ ██║██║  ██║        ██║███████╗
██║     ██╔══╝  ██║   ██║██╔══╝  ██║╚██╗██║██║  ██║   ██   ██║╚════██║
███████╗███████╗╚██████╔╝███████╗██║ ╚████║██████╔╝██╗╚█████╔╝███████║
╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚════╝ ╚══════╝
`)
console.log("-------------------------------------")
//this took me a long time so dont you dare remove credits, if u do remove credits then you will have copy right issues.
client.on("ready", () => {
    console.log(`[INFO]: Ready on client (${client.user.tag})`)
    client.user.setActivity("anti-swear bot by legendjs :D", { type: "WATCHING" })
})

client.on("message", async message => {
   

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) 
        command.run(client, message, args, db);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  let words = db.get(`words_${message.guild.id}`)
  let yus = db.get(`message_${message.guild.id}`)
  if (yus === null) {
    yus = ":x: | **{user-mention}, The Word You said is blacklisted!**"
  }
  if (message.content.startsWith(prefix + "addword")) return;
    if (message.content.startsWith(prefix + "delword")) return;
      if (message.content.startsWith(prefix + "set-warn-msg")) return;
        if (message.content.startsWith(prefix + "words")) return;
  let pog = yus.split("{user-mention}").join("<@"+message.author.id+">").split("{server-name}").join(message.guild.name).split("{user-tag}").join(message.author.tag).split("{user-username}").join(message.author.username)
  if (words === null) return;
  function check(msg) { //is supposed to check if message includes da swear word
    return words.some(word => message.content.toLowerCase().split(" ").join("").includes(word.word.toLowerCase()))
  }
  if (check(message.content) === true) {
    message.delete()
    message.channel.send(pog)
  }
})

client.login(token).catch(err => {
  console.log("[ERROR]: Invalid Token Provided")
})
