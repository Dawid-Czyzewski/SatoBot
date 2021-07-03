const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = class BanCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            userPermissions: ['ADMINISTRATOR'],
            description: '',
            argsType: 'multiple',

        });
    }

    run = async (message, args) => {
        if(!args[0] == null){
            const target = message.mentions.users.first();

            if(!target){
                message.reply('Musisz kogoś spingować!');
                return;
            }else{
                const targetMember = message.guild.members.cache.get(target.id);
        
        
                if(args[0] == null){
                    message.reply("musisz podać powód!");
                    return;
                }
        
                const reason = args.join(' ');
            
                const banEmbed = new Discord.MessageEmbed()
                        .setTitle('Ban')
                        .setDescription(`${targetMember} został(a) zbanowany(a)!`)
                        .addField('administrator', message.member, true)
                        .addField('użytkownik', targetMember, true)
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
            
            }
        }else{
            message.reply('Musisz kogoś osznaczyć');
        }
       
        
    }
}

