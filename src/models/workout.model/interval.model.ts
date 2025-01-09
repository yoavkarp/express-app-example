import { modelOptions, prop } from "@typegoose/typegoose";
import { ParameterClass } from "./parameter.model";
import { IAngleParameter, IDistanceParameter, IDurationParameter, IIntensityParameter, IResistanceParameter, IRestParameter, ITempoParameter, IThrParameter, IWeightParameter, WEIGHT_UNITS } from "../../interfaces/interval.interface";

@modelOptions({})
export class IntervalClass {
    @prop({ type: ParameterClass })
    weight?: IWeightParameter;

    @prop({ type: ParameterClass })
    distance?: IDistanceParameter;

    @prop({ type: ParameterClass })
    duration?: IDurationParameter;

    @prop({ type: ParameterClass })
    tempo?: ITempoParameter;

    @prop({ type: ParameterClass })
    intensity?: IIntensityParameter;

    @prop({ type: ParameterClass })
    thr?: IThrParameter;

    @prop({ type: ParameterClass })
    angle?: IAngleParameter;

    @prop({ type: ParameterClass })
    resistance?: IResistanceParameter;

    @prop({ type: ParameterClass })
    rest?: IRestParameter;
}