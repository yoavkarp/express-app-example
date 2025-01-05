import mongoose from "mongoose";

export class Database {

    connection: mongoose.Connection | null = null;

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