const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = class KickCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: '',
            clientPermissions: [
                'KICK_MEMBERS'
            ],
            userPermissions: [
                'KICK_MEMBERS'
            ],
            argsType: 'multiple',
        });
    }

    async run(message,args){
        const target = message.mentions.users.first();
        if(!target){
            message.reply('Musisz kogoś oznaczyć');
            return;
        }

        

        const {guild} = message;
        
        args.shift();

        if(args[0] == null){
            message.reply("musisz podać powód!");
            return;
        }

        const reason = args.join(' ');

        const member = guild.members.cache.get(target.id);
        if(member.kickable){

           const kickEmbed = new Discord.MessageEmbed()
                    .setTitle('Kick')
                    .setDescription(`${member} został(a) wyrzucony(a) z serwera!`)
                    .addField('Administrator', message.member, true)
                    .addField('Użytkownik', member, true)
                    .addField('Powód', reason)
                    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor(message.guild.me.displayHexColor);

                    message.client.channels.cache.get(config.channelToBansId).send(kickEmbed);
                    member.send(kickEmbed);

                    setTimeout(function(){
                        member.kick();
                        return;
                    }, 1000);
                   
        }else{
            message.reply('Nie możesz wyrzucić tego użytkownika!');
        }
    }
}