import { IInterval } from "./interval.interface";
import { ISet } from "./set.interface";

export type IWorkout = {
    _id: string;
    name: string;
    notes?: string;
    exercises: (IStrengthWorkoutExercise | ICardioWorkoutExercise)[];

    writerId: string;
    readerId: string;

    createdAt: Date;
    updatedAt: Date;
}

export type IWorkoutExercise = {
    xid: string;
    name: string;
    notes?: string;
} & (IStrengthWorkoutExercise | ICardioWorkoutExercise);

export type IStrengthWorkoutExercise = {
    sets: ISet[];
    type: "strength"
}

export type ICardioWorkoutExercise = {
    intervals: IInterval[];
    type: "cardio"
}

export type IExercise = {
    _id: string;
    name: {
        en: string;
        he: string;
    };

    type: "strength" | "cardio";
    video_url: string;

    createdAt: Date;
    updatedAt: Date;
}