const { Client, Message, MessageEmbed } = require("discord.js");
const Punishments = require("../utils/Schemas/Punishments");

module.exports = {
    name: "stats",
    description: "Get the stats about the bot",
    usage: "stats",
    example: "stats",
    requiredPermissions: [],
    checks: [],
    cooldown: 1000,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async (client, message, args) => {

        const msgThen = Date.now();

        const msg = await message.channel.send("Fetching stats...");

        const msgPing = Math.round(Date.now() - msgThen);

        const dbThen = Date.now();

        await Punishments.findOne({ userID: message.author.id });

        const dbPing = Math.round(Date.now() - dbThen);

        const cacheThen = Date.now();

        await client.cache.get("users");

        const cachePing = Math.round(Date.now() - cacheThen);

        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} | Stats`)
            .addField("Ram Usage", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
            .addField("Bot Uptime", `${Math.round(client.uptime / 1000)}s`, true)
            .addField("WS Ping", `${Math.round(client.ws.ping)}ms`, true)
            .addField("Cache Ping", `${cachePing}ms`, true)
            .addField("Database Ping", `${dbPing}ms`, true)
            .addField("Message Ping", `${msgPing}ms`, true)
            .setTimestamp()
            .setColor("BLUE")

        msg.edit({ content: " ", embeds: [embed] });
    },
}