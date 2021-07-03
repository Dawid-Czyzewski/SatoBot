const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = class UnbanCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'unban',
            group: 'moderation',
            memberName: 'unban',
            userPermissions: ['ADMINISTRATOR'],
            description: '',
            argsType: 'multiple',

        });
    }

    run = async (message, args) => {
        
        if(args.length == 0){
            message.reply('Musisz podać id!');
        }else{
   
            message.guild.members.unban(args[0]);
            message.client.channels.cache.get(config.channelToBansId).send(`${args[0]} został unbanowany`);
        }
        

    }
}

