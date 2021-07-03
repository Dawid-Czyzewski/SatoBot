const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const config = require('../../config.json');
const ms = require('ms');

module.exports = class TempbanCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'tempban',
            group: 'moderation',
            memberName: 'tempban',
            userPermissions: ['ADMINISTRATOR'],
            description: '',
            argsType: 'multiple',

        });
    }

    run = async (message, args) => {
        
        const {guild} = message;
        
        let reason = args.slice(2).join(' ');
        const target = message.mentions.users.first();
        
        args.shift();

       
        if(target){
            if(args[0] == null){
                message.reply('Musisz podać czas!');
                return;
            }


            const targetMember = guild.members.cache.get(target.id);


                const banEmbed = new Discord.MessageEmbed()
                .setTitle('Ban')
                .setDescription(`${targetMember} został(a) zbanowany(a) na ${args[0]}!`)
                .addField('Administrator', message.member, true)
                .addField('Użytkownik', targetMember, true)
                .addField('Czas', `\`${ms(ms(args[0]))}\``, true)
                .addField('Powód', reason)
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);
    
                message.client.channels.cache.get(config.channelToBansId).send(banEmbed);
                targetMember.send(banEmbed);
    
    
                setTimeout(function(){
                    targetMember.ban();
                    return;
                }, 1000);
                
              
                setTimeout(function(){
                    message.guild.members.unban(targetMember.id);
                    message.client.channels.cache.get(config.channelToBansId).send(`<@${targetMember.user.id}> został(a) automatycznie unbanowany(a)!`);
                    return;
                }, ms(args[0])); 
        }
    }
}