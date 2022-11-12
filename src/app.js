require('dotenv').config();

const TOKEN = process.env.TOKEN;
const CLIENTID = process.env.CLIENTID;

const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const client = new Client({ intents: GatewayIntentBits.Guilds });

const QR = require('./qr');

const COMMANDS = require('./commands');

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        var data = await rest.put(
            Routes.applicationCommands(CLIENTID),
            { body: COMMANDS },
        );

        console.log('Successfully reloaded ' + data.length + ' application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'qr') {
        const text = interaction.options.getString('text');
        const qr = await QR.getQR(text);
        interaction.reply({ files: [qr] });
    }
});

client.login(TOKEN);