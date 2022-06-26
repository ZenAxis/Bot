const { Client, ButtonInteraction, MessageActionRow, Modal, TextInputComponent } = require("discord.js");

module.exports = {
    id: "test",
    checks: [],
    /**
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const modal = new Modal()
            .setCustomId('test')
            .setTitle('Staff Application');


        const why = new TextInputComponent()
            .setCustomId('why')
            .setLabel('Why are you applying?')
            .setPlaceholder('I am applying because...')
            .setRequired(true)
            .setStyle("PARAGRAPH");

        const firstActionRow = new MessageActionRow().addComponents(why);

        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);

    }
}