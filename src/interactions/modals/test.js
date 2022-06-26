const { Client, ModalSubmitInteraction } = require("discord.js");

module.exports = {
    id: "test",
    checks: [],
    /**
     * @param {Client} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        const why = interaction.fields.getTextInputValue('why');

        interaction.reply({
            content: `You are applying for staff because \`${why}\``,
        })
    }
}