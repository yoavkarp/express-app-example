import { IWorkout } from "../interfaces/workout.interface";
import { WorkoutService } from "../services/workout.service";
import { createWorkoutSchema, updateWorkoutSchema } from "../validators/workout.validators";
import { HttpError } from "../errors/http.error";
import { ActionLogService } from "../services/actionLog.service";
import { ActionLogType } from "../interfaces/actionLog.interface";
import { validateObjectId } from "../validators/objectId.validator";
import { RequestHandler } from "express";

export class WorkoutController {

    workoutService: WorkoutService;
    actionLogService: ActionLogService;

    constructor() {
        this.workoutService = new WorkoutService();
        this.actionLogService = new ActionLogService();
    }

    createWorkout: RequestHandler = async (req, res) => {
        const validate = createWorkoutSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                message: 'Validation failed',
                errors: validate.error.errors
            });
            return;
        }

        const workout = await this.workoutService.createWorkout(validate.data);
        res.json(workout);

        if (req.isAuthenticated())
            this.actionLogService.create(req.user?._id, 'Workout', workout._id.toHexString(), ActionLogType.CREATE);
    }

    updateWorkout: RequestHandler = async (req, res, next) => {
        const id = req.params.id;
        const isValidId = validateObjectId.safeParse(id);
        if (!isValidId.success) {
            next(new HttpError(400, 'Invalid id'));
            return;
        }
        const validate = updateWorkoutSchema.safeParse(req.body);
        if (!validate.success) {
            next(new HttpError(400, `Validation failed: ${validate.error.errors.map((e) => e.message).join(', ')}`));
            return;
        }
        const workout = await this.workoutService.updateWorkout(id, validate.data);
        if (!workout) {
            next(new HttpError(400, 'Workout not found'));
            return;
        }
        res.json(workout);

        if (req.isAuthenticated())
            this.actionLogService.create("userId", 'Workout', id, ActionLogType.UPDATE, Object.keys(validate.data).reduce<typeof validate.data>((acc, cur) => {
                acc[cur as keyof typeof acc] = workout[cur as keyof typeof acc];
                return acc;
            }, { ...validate.data }), validate.data);

    }

    getWorkoutById: RequestHandler = async (req, res, next) => {
        try {
            const id = req.params.id;
            const workout: IWorkout = await this.workoutService.getWorkoutById(id);
            res.json(workout);
        }
        catch (e: any) {
            next(new HttpError(500, e.message));
        }
    }

    deleteWorkout: RequestHandler = async (req, res) => {
        const id = req.params.id;
        await this.workoutService.deleteWorkout(id);
        res.json({ message: 'Workout deleted', id });

        if (req.isAuthenticated())
            this.actionLogService.create("userId", 'Workout', id, ActionLogType.DELETE);
    }
}