import { modelOptions, prop } from "@typegoose/typegoose";
import { ParameterClass } from "./parameter.model";
import { IRepsParameter, IRestParameter, IWeightParameter } from "@/interfaces/set.interface";

// set
@modelOptions({})
export class SetClass {
    @prop({ type: ParameterClass })
    weight?: IWeightParameter;

    @prop({ type: ParameterClass })
    reps?: IRepsParameter;

    @prop({ type: ParameterClass })
    rest?: IRestParameter;

    // todo: add dropsets
}