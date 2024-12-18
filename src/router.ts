import express from 'express'

export abstract class Router {

    router: express.Router;
    path: string;

    constructor(path: string) {
        this.path = path;
        this.router = express.Router();
    }
}