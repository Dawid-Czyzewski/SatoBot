const ms = require('ms');
const config = require('../../config.json');
const Discord = require('discord.js');
const  Commando  = require('discord.js-commando');
module.exports = class muteCommand extends Commando.Command{
  constructor(client) {
    super(client, {
      name: 'mute',
      group: 'moderation',
      memberName: 'mute',
      userPermissions: ['ADMINISTRATOR'],
      description: '',
      argsType: 'multiple',
    });
  }
  run = async (message, args) => {
        const target = message.mentions.users.first();
        if(target){
            let muteRole = message.guild.roles.cache.find(role => role.name === '👎Muted');
            let reason = args.slice(2).join(' ');
            let memberTarget = message.guild.members.cache.get(target.id);

          

            if(!args[1] && !args[2]){
                memberTarget.roles.add(muteRole.id);
                const muteEmbed = new Discord.MessageEmbed()
                .setTitle('Mute')
                .setDescription(`${memberTarget} został zmutowany.`)
                .addField('administrator', message.member, true)
                .addField('użytkownik', memberTarget, true)
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);
                message.client.channels.cache.get(config.channelToBansId).send(muteEmbed);
                memberTarget.send(muteEmbed);

                
                return;
            }

            if(!args[2]){
              message.reply('Musisz podać powód!');
              return;
            }

            memberTarget.roles.add(muteRole.id);
            const muteEmbed = new Discord.MessageEmbed()
            .setTitle('Mute')
            .setDescription(`${memberTarget} został zmutowany/a.`)
            .addField('Administrator', message.member, true)
            .addField('Użytkownik', memberTarget, true)
            .addField('Czas', `\`${ms(ms(args[1]))}\``, true)
            .addField('Powód', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
            message.client.channels.cache.get(config.channelToBansId).send(muteEmbed);
            memberTarget.send(muteEmbed);

            if(memberTarget.voice.channel){
                memberTarget.voice.kick();
            }

            setTimeout(function(){
              
                memberTarget.roles.remove(muteRole.id);
                message.client.channels.cache.get(config.channelToBansId).send(`<@${memberTarget.user.id}> został/a automatycznie odmutowany/a!`);
                return;
            }, ms(args[1]));
            
        }else{
            message.reply('Nie ma takiego użytkownika!');
      }
    }
}