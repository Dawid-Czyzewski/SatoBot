const Commando = require('discord.js-commando');
const config = require('./config.json');
const path = require('path');

const client = new Commando.CommandoClient({
    owner: '605352514879225875',
    commandPrefix: config.prefix,
});


client.on('ready', async () =>{
    console.log("Ready to work!");

    client.user.setActivity('Author: Satoshi', { type: 'PLAYING' });

    client.registry
    .registerGroups([
        ['moderation', 'moderation commands'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

});



client.login(config.token);