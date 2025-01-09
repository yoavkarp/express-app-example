import { IWorkoutExercise } from "../../interfaces/workout.interface";
import { modelOptions, prop } from "@typegoose/typegoose";
import { StrengthWorkoutExerciseClass } from "./strengthExercise.model";
import { CardioWorkoutExerciseClass } from "./cardioExercise.model";

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
export class WorkoutClass {
    @prop({ type: String, required: true, maxlength: 255 })
    name!: string;

    @prop({ type: String, maxlength: 255 })
    notes?: string;

    @prop({ type: [StrengthWorkoutExerciseClass, CardioWorkoutExerciseClass], required: true, default: [] })
    exercises!: IWorkoutExercise[];

    @prop({ type: String, required: true })
    writerId!: string;

    @prop({ type: String, required: true })
    readerId!: string;

    @prop({ type: Date, required: true, default: () => new Date() })
    updatedAt!: Date;

    @prop({ type: Date, required: true, default: () => new Date() })
    createdAt!: Date;
}