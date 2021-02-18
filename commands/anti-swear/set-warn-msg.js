const Discord = require("discord.js")
module.exports = {
  name: "set-warn-msg",
  run: async (client, message, args, db) => {
    let msg = args.join(" ")
    if (!msg) {
      return message.channel.send("Provide a message.")
    }
    db.set(`message_${message.guild.id}`, msg)
    let embed = new Discord.MessageEmbed()
    embed.setTitle("Message Set!")
    embed.setFooter(message.author.tag + " | made by LΣGΣПD#0001", message.author.displayAvatarURL({ dynamic: true }))
    embed.setTimestamp()
    embed.setAuthor(message.guild.name, message.guild.iconURL())
    embed.addField("message", msg)
    embed.addField("preview", msg.split("{user-mention}").join("<@"+message.author.id+">").split("{server-name}").join(message.guild.name).split("{user-tag}").join(message.author.tag).split("{user-username}").join(message.author.username))
    embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    embed.setColor("GREEN")
    return message.channel.send({ embed: embed })
  }
}
