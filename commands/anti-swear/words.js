const Discord = require('discord.js');
module.exports = {
  name: "words",
  run: async (client, message, args, db) => {
    let embed = new Discord.MessageEmbed()
    embed.setTitle(`${message.guild.name} | Anti Swear words list`)
    embed.setThumbnail(message.guild.iconURL())
    embed.setFooter(message.author.tag, message.author.displayAvatarURL());
    embed.setColor("GREEN")
        let words = db.get(`words_${message.guild.id}`);
        if (words && words.length) {
            let array = [];
            words.forEach((x) => {
                array.push(`**Word:** ${x.word} | **added By:** ${x.author}`);
            });

            embed.setDescription(`${array.join('\n')}`);
            embed.setFooter(message.author.tag + " | made by legendjs#0001", message.author.displayAvatarURL({ dynamic: true }))
        } else {
          return message.channel.send(":x: | **There are No words.**")
        }
        
        return message.channel.send({ embed: embed });
  }
}
