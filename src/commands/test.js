const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "test",
    description: "Example Command",
    usage: "example",
    example: "example",
    requiredPermissions: [],
    checks: [],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async (client, message, args) => {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("test")
            .setLabel("Test")
            .setStyle("SUCCESS")
        )

        message.reply({
            components: [row],
            content: "Testing.."
        })
    },
}