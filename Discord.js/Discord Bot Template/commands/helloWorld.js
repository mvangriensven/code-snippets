const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helloworld')
        .setDescription('hello world')
        .setDMPermission(false)
    .addStringOption(option => option.setName('option-name').setDescription('option-description').setRequired(false))
    .addChannelOption(option => option.setName('option-name').setDescription('option-description').setRequired(false))
    .addBooleanOption(option => option.setName('option-name').setDescription('option-description').setRequired(false))
    .addStringOption(option => option.setName('option-name').setDescription('option-description').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageChannels),
    async execute(interaction) {

        return interaction.reply({ content: 'Hello World', ephemeral: true });
    
    }
}