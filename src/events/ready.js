const { Client } = require("discord.js");
const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("../config.json");

module.exports = {
    event: "ready",
    /**
     * @param {Client} client 
     */
    run: async (client) => {
        console.log(chalk.green("[READY]"), `${chalk.cyan(client.user.tag)} ${chalk.blue("Is Ready!")}`);

        mongoose.connect(config.mongoDB, {}).then(() => {
            console.log(chalk.green("[READY]"), "Connected to MongoDB!");
        }).catch((err) => {
            console.log(chalk.red("[ERROR]"), `Failed to connect to MongoDB! (${err.message})`)
        })

        await client.cache.connect();

        const guild = await client.guilds.fetch(config.bot.guild)

        await guild.members.fetch()
    }
}