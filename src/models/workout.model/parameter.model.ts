import { DISTANCE_UNITS, INTENSITY_UNITS, TEMPO_UNITS, THR_UNITS, TIME_UNITS, WEIGHT_UNITS } from "../../interfaces/interval.interface";
import { modelOptions, prop } from "@typegoose/typegoose";

const ALL_UNITS = [...TIME_UNITS, ...THR_UNITS, ...TEMPO_UNITS, ...WEIGHT_UNITS, ...DISTANCE_UNITS, ...INTENSITY_UNITS] as const;

// interval
@modelOptions({
    schemaOptions: {
        _id: false
    },
})
export class ParameterClass {
    @prop({ type: String, maxlength: 255, required: true, enum: ALL_UNITS })
    unit!: string;

    @prop({ type: Number })
    val?: number;

    @prop({ type: Number })
    max?: number;
}