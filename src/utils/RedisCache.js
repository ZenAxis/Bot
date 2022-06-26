const chalk = require("chalk");
const redis = require("redis");
const DatabaseConnectionError = require("./Errors/DatabaseConnectionError");

class RedisCache {
    /**
     * @param {Object} redis The Redis Client
     * @param {String} redis.host The Redis Host
     * @param {Number} redis.port The Redis Port
     * @param {String} redis.username The Redis username 
     * @param {String} redis.password The Redis Password
     */
    constructor(redis) {
        /**
         * @type {Object}
         * @property {String} host The Redis Host
         * @property {Number} port The Redis Port
         * @property {String} username The Redis username
         * @property {String} password The Redis password
         */
        this.redisObject = redis;

        /**
         * @type {import("redis").RedisClientType} redis The Redis Client
         * @private
         * @readonly
         * @memberof RedisCache
         * @instance
         */
        this.redis = null;
    }

    async connect() {

        this.redis = redis.createClient({
            url: `redis://${this.redisObject.host}:${this.redisObject.port}`,
            username: this.redisObject.username,
            password: this.redisObject.password
        })

        this.redis.on("error", (err) => {
            throw new DatabaseConnectionError(`An error occured (${err.message})`);
        })

        this.redis.on("ready", () => {
            console.log(chalk.green("[READY]"), "Connected to Redis!");
        })

        await this.redis.connect();

        return this.redis;
    }

    get(key) {
        new Promise((resolve, reject) => {
            this.redis.get(key, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    set(key, value, expire) {
        if (!expire) {

            new Promise((resolve, reject) => {
                this.redis.set(key, value, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
        } else {
            new Promise((resolve, reject) => {
                this.redis.SETEX(key, expire, value, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
        }
    }

    delete(key) {
        new Promise((resolve, reject) => {
            this.redis.del(key, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    keys(pattern) {
        return new Promise((resolve, reject) => {
            this.redis.keys(pattern, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    close() {
        this.redis.quit();
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.redis.keys("*", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    getTTL(key) {
        return new Promise((resolve, reject) => {
            this.redis.ttl(key, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

module.exports = RedisCache;