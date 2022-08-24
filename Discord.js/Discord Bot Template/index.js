const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS]})
client.commands = new Collection();

// Importing modules
// const moduleFiles = fs.readdirSync('./modules').filter(file => file.endsWith('.js'));
// for (const file of moduleFiles) {
//     const module = require(`./modules/${file}`);
//     module.initiateModule();
//     console.log(`${file} module has started`);
// }

// Import commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

module.exports.postToChannel = function (channelId, msg) {
    try {
        const channel = client.channels.cache.find(channel => channel.id === channelId)

        // Value gets assigned by catch-block, will tell the caller on what to do when an exception is caught
        var returnValue = null;

        // Validate if channel exists
        if (channel === undefined) {

            let user = await client.users.fetch(channel['guild']['ownerId']);

            try {
                await user.send('The specified channel Glush is attempting to send a message to can no longer be found!')
            } catch (error) {
                Logger.log( { level: 'error', message: error } );
                returnValue = 'DELETE'
            }

            if (returnValue == null)
                return false
            else
                return returnValue
        }

        // Validate if bot has correct access to channel
        if (!channel.permissionsFor(client.user).has(PermissionsBitField.Flags.ViewChannel)) {
            let user = await client.users.fetch(channel['guild']['ownerId']);

            try {
                await user.send('Glush is unable to access a channel specified for one of your node(s)/device(s)!')
            } catch (error) {
                Logger.log( { level: 'error', message: error } );
                returnValue = 'DELETE'
            }

            if (returnValue == null)
                return false
            else
                return returnValue
        }

        if (!channel.permissionsFor(client.user).has(PermissionsBitField.Flags.SendMessages)) {
            let user = await client.users.fetch(channel['guild']['ownerId']);

            try {
                await user.send('The specified channel Glush is attempting to send a message to can no longer be found!')
            } catch (error) {
                Logger.log( { level: 'error', message: error } );
                returnValue = 'DELETE'
            }

            if (returnValue == null)
                return false
            else
                return returnValue
        }

        channel.send(msg)

        return true

    } catch (error) {
        console.error(error)
        return 'unexpected error, please try again later'
    }
}

client.login(token);