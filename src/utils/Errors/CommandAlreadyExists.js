class CommandAlreadyExists extends Error {
    constructor(name, message) {
        super(name, message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);

        this.message = message;
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

module.exports = CommandAlreadyExists;