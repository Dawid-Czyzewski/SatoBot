const config = require('../../config.json');
const  Commando  = require('discord.js-commando');

module.exports = class unmuteCommand extends Commando.Command{
    constructor(client) {
        super(client, {
          name: 'unmute',
          group: 'moderation',
          memberName: 'unmute',
          userPermissions: ['ADMINISTRATOR'],
          description: '',
          argsType: 'multiple',
        });
    }

    run = async (message) => {
        const target = message.mentions.users.first();
        if(target){
            let muteRole = message.guild.roles.cache.find(role => role.name === '👎Muted');

            let memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.roles.remove(muteRole.id);
            message.client.channels.cache.get(config.channelToBansId).send(`<@${memberTarget.user.id}> został odmutowany!`);
        }else{
            message.channel.send("Nie ma takiego użytkownika!");
        }
    }
}