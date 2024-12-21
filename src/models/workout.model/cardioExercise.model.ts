import { IInterval } from "@/interfaces/interval.interface";
import { modelOptions, Severity, prop } from "@typegoose/typegoose";
import { IntervalClass } from "./interval.model";

// cardio
@modelOptions({
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class CardioWorkoutExerciseClass {
    @prop({ type: String, required: true, ref: "Exercise" })
    xid!: string;

    @prop({ type: String, maxlength: 255 })
    name!: string;

    @prop({ type: String, maxlength: 255 })
    notes?: string;

    @prop({ type: [IntervalClass], required: true, default: [] })
    intervals!: IInterval[];

    @prop({ type: String, enum: ['cardio'], required: true, default: "cardio", immutable: true })
    type!: Readonly<'cardio'>;
}