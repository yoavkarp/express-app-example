import { modelOptions, Severity, prop } from "@typegoose/typegoose";
import { SetClass } from "./set.model";
import { ISet } from "@/interfaces/set.interface";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class StrengthWorkoutExerciseClass {
    @prop({ type: String, required: true, ref: "Exercise" })
    xid!: string;

    @prop({ type: String, maxlength: 255 })
    name!: string;

    @prop({ type: String, maxlength: 255 })
    notes?: string;

    @prop({ type: String, enum: ['strength'], required: true, default: "strength", immutable: true })
    type!: Readonly<'strength'>;

    @prop({ type: [SetClass], required: true, default: [] })
    sets!: ISet[];
}