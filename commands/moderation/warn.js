const Discord = require('discord.js');
const  Commando  = require('discord.js-commando');
const db = require('quick.db');
const ms = require('ms');
const config = require('../../config.json');

module.exports = class muteCommand extends Commando.Command{
  constructor(client) {
    super(client, {
      name: 'warn',
      group: 'moderation',
      memberName: 'warn',
      userPermissions: ['ADMINISTRATOR'],
      description: '',
      argsType: 'multiple',
    });
  }
  run = async (message, args) => {
    const member = message.mentions.members.first();
    let muteRole = message.guild.roles.cache.find(role => role.name === '👎Muted');

    if(!member){
        message.reply('Musisz kogoś oznaczyć!');
        return;
    }

    if(message.mentions.users.first().bot){
        message.reply('Nie możesz warnować botów!');
        return;
    }

    const reason = args.slice(1).join(' ');

    if(!reason){
        message.reply('Nie podałeś powodu!');
        return;
    }

    let warnings = db.get(`warnings_${message.guild.id}_${member.id}`);
    
    if(warnings === 2){
        member.roles.add(muteRole.id);
            const muteEmbed = new Discord.MessageEmbed()
            .setTitle('Mute')
            .setDescription(`${member} został zmutowany/a.`)
            .addField('Administrator', message.member, true)
            .addField('Użytkownik', member, true)
            .addField('Czas', `\`${ms(ms('24h'))}\``, true)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
            message.client.channels.cache.get(config.channelToBansId).send(muteEmbed);
            member.send(muteEmbed);

            if(member.voice.channel){
                member.voice.kick();
            }

            db.delete(`warnings_${message.guild.id}_${member.id}`);

            setTimeout(function(){

                member.roles.remove(muteRole.id);
                message.client.channels.cache.get(config.channelToBansId).send(`<@${member.user.id}> został/a automatycznie odmutowany/a!`);
                return;
            }, ms('24h'));

            return;
    }

    if(warnings === null) {
        db.set(`warnings_${message.guild.id}_${member.id}`,1);
        const warnEmbed = new Discord.MessageEmbed()
            .setTitle('Warn #1')
            .setDescription(`${member} został(a) ostrzeżony(a)!`)
            .addField('Administrator', message.member, true)
            .addField('Użytkownik', member, true)
            .addField('Powód', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
            message.client.channels.cache.get(config.channelToBansId).send(warnEmbed);
            member.send(warnEmbed);

    }else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${member.id}`,1);
        warnings = db.get(`warnings_${message.guild.id}_${member.id}`);
        const warnEmbed = new Discord.MessageEmbed()
            .setTitle(`Warn #${warnings}`)
            .setDescription(`${member} został(a) ostrzeżony(a)!`)
            .addField('Administrator', message.member, true)
            .addField('Użytkownik', member, true)
            .addField('Powód', reason)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
            message.client.channels.cache.get(config.channelToBansId).send(warnEmbed);
            member.send(warnEmbed);
    }
  }
}