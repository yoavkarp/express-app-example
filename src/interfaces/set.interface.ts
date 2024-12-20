export type ISet = {
    weight?: IWeightParameter;
    reps?: IRepsParameter;
    rest?: IRestParameter;
    dropsets?: IDropset[];
}

// weight
export const WEIGHT_UNITS = ['kg', 'lbs'] as const;
export type WeightUnit = typeof WEIGHT_UNITS[number];
export type IBodyWeightSet = { units: 'body'; }
export type IWeightParameter = IBodyWeightSet | {
    val: number;
    max?: number;
    units: WeightUnit;
}

// reps
export type IMaxReps = { units: 'max' }
export type IRepsParameter = IMaxReps | {
    val: number;
    max?: number;
    units: 'reps' | TimeUnit
}

// rest
export const TIME_UNITS = ['s', 'm', 'h'] as const;
export type TimeUnit = typeof TIME_UNITS[number];
export type IRestParameter = {
    val: number;
    max?: number;
    units: TimeUnit;
}

// dropsets
export type IDropset = {
    weight?: IWeightParameter;
    reps?: IRepsParameter;
}