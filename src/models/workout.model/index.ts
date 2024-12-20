import { getModelForClass } from "@typegoose/typegoose";
import { WorkoutClass } from "./workout.model";

export const WorkoutModel = getModelForClass(WorkoutClass);