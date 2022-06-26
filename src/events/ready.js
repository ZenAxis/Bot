const { Client } = require("discord.js");
const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("../config.json");
const DatabaseConnectionError = require("../utils/Errors/DatabaseConnectionError");

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
            throw new DatabaseConnectionError(`${chalk.red("[ERROR]")} Failed to connect to MongoDB! (${err.message})`)
        })

        await client.cache.connect().catch((err) => {
            console.error(err)
        })
    }
}