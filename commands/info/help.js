const Discord = require("discord.js")
module.exports = {
  name: "help",
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    embed.setTitle("Help | " + client.user.username)
    embed.setThumbnail(client.user.displayAvatarURL())
    embed.setFooter(client.user.tag + " | made by legendjs#0001", client.user.displayAvatarURL())
    embed.setTimestamp()
    embed.setDescription(`The commands are listed below:`)
    embed.addField("anti-swear", '`addword` | `delword` | `set-warn-msg` | `words`')
    embed.addField("info", '`help` | `ping`')
    embed.setColor("GREEN")
    message.channel.send({ embed: embed })
  }
}
