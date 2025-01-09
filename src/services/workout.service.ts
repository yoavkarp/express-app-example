import { HttpError } from "../errors/http.error";
import { CreateWorkoutInput, UpdateWorkoutInput } from "../validators/workout.validators";
import { WorkoutModel } from "../models/workout.model";
import { IWorkout } from "../interfaces/workout.interface";

export class WorkoutService {
    public async getWorkoutById(id: string) {
        const workout = await WorkoutModel.findById(id).lean<IWorkout>();
        if (!workout) {
            throw new HttpError(400, 'Workout not found');
        }
        return workout;
    }

    public async createWorkout(data: CreateWorkoutInput) {
        const workout = await WorkoutModel.create(data);
        return workout.toJSON();
    }

    public async updateWorkout(id: string, data: UpdateWorkoutInput) {
        const workout = await WorkoutModel.findByIdAndUpdate(id, data).lean<IWorkout>();
        return workout;
    }

    public async deleteWorkout(id: string) {
        const workout = await WorkoutModel.findByIdAndDelete(id).lean<IWorkout>();
        return workout;
    }
}