const config = require("../config.json");
const chalk = require("chalk");
const { Interaction } = require("discord.js");


const types = {
    "BUTTON": "buttons",
    "SELECT_MENU": "selects",
    "MODAL_SUBMIT": "modals",
}

module.exports = {
    event: "interactionCreate",
    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    run: async (client, interaction) => {

        const type = types[interaction?.componentType ?? interaction?.type] || null;

        if (!type) {
            if (!interaction.isRepliable) return;

            interaction.reply({
                content: "This interaction is not supported! Please Contact DarkerInk#1750",
                ephemeral: true
            })

            return;
        }

        const int = client.interactions.get(type).find(i => i.id === interaction?.customId);

        if (!int) {
            if (!interaction.isRepliable) return;

            interaction.reply({
                content: "Interaction not found, Contact DarkerInk#1750",
                ephemeral: true
            })

            return;
        }

        int.run(client, interaction, null);
    }
}