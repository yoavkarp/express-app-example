import { Router } from "../router";
import { WorkoutController } from "../controllers/workout.controller";

export class WorkoutRouter extends Router {
    readonly workoutController: WorkoutController;

    constructor() {
        super('/workout');
        this.workoutController = new WorkoutController();

        this.setRoutes();
    }

    setRoutes() {
        this.router.route('/:id')
            .get(this.workoutController.getWorkoutById)
            .put(this.workoutController.updateWorkout)
            .delete(this.workoutController.deleteWorkout)

        this.router.post('/', this.workoutController.createWorkout);
    }
}