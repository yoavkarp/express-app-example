import { ErrorRequestHandler, NextFunction } from "express";

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message, status: error.status });
}