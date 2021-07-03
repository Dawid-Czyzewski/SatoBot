const Commando = require('discord.js-commando');

module.exports = class BanCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'sban',
            group: 'moderation',
            memberName: 'sban',
            userPermissions: ['ADMINISTRATOR'],
            description: '',
            argsType: 'multiple',

        });
    }

    run = async (message, args) => {
        
        if(args.length == 0){
            message.reply('Musisz podać id!');
        }else{
            message.guild.members.ban(args[0]);
            message.reply(`Pomyślnie zbanowano gracza o id ${args[0]}!`);
        }
        return;
        
    }
}
