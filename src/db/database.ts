import mongoose from "mongoose";

export class Database {

    connection: mongoose.Connection | null = null;

    constructor() {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
    }

    async connect() {
        if (!this.connection) {
            this.connection = (await mongoose.connect(process.env.MONGODB_URI || '')).connection;
        }
        return this.connection
    }

    async disconnect() {
        if (this.connection) {
            await this.connection.close();
        }
    }
}