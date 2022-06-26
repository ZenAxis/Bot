class DatabaseConnectionError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);

        this.message = message;
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

module.exports = DatabaseConnectionError;