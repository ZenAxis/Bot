const { Client } = require("discord.js");
const chalk = require("chalk");
const path = require("node:path");
const fs = require("node:fs");
const InteractionAlreadyExists = require("./Errors/InteractionAlreadyExists")

/**
 * @param {Client} client 
 */
const interactionLoader = (client) => {
    const filePath = fs.readdirSync(path.join(__dirname, "../interactions"));

    for (const file of filePath) {
        const stats = fs.statSync(path.join(__dirname, "../interactions", file));

        if (stats.isDirectory()) {
            const dirfiles = fs.readdirSync(path.join(__dirname, "../interactions", file)).filter(f => f.endsWith(".js"));

            for (const dirfile of dirfiles) {
                const interaction = require(path.join(__dirname, "../interactions", file, dirfile));

                if (client.interactions.has(file)) {
                    const ints = client.interactions.get(file);
                    if (ints.find(c => c.id === interaction.id)) {
                        throw new InteractionAlreadyExists(`'${interaction.id}' already exists in '${file}'`);
                    } else {
                        client.interactions.get(file).push(interaction);
                    }
                } else {
                    client.interactions.set(file, [interaction]);
                }

                console.log(`${chalk.green("Loaded")} ${chalk.cyan("Subcommand")} ${chalk.blue(interaction.id)} from ${chalk.cyan(file)}`);
            }
        } else {}
    }
}

module.exports = interactionLoader;