export type IInterval = {
    weight?: IWeightParameter;
    distance?: IDistanceParameter;
    duration?: IDurationParameter;
    tempo?: ITempoParameter;
    intensity?: IIntensityParameter;
    thr?: IThrParameter;
    angle?: IAngleParameter;
    resistance?: IResistanceParameter;
    rest?: IRestParameter;
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

// distance
export const DISTANCE_UNITS = ['m', 'km'] as const;
export type DistanceUnit = typeof DISTANCE_UNITS[number];
export type IMaxDistance = { units: 'max' }
export type IDistanceParameter = IMaxDistance | {
    val: number;
    max?: number;
    units: DistanceUnit
}

// duration
export type IMaxDuration = { units: 'max' }
export type IDurationParameter = IMaxDuration | {
    val: number;
    max?: number;
    units: TimeUnit
}

// tempo
export const TEMPO_UNITS = ['s/m', 'm/s', 'km/h'] as const;
export type TempoUnit = typeof TEMPO_UNITS[number];
export type IMaxTempo = { units: 'max' }
export type ITempoParameter = IMaxTempo | {
    val: number;
    units: TempoUnit;
}

// intensity
export const INTENSITY_UNITS = ['%'] as const;
export type IntensityUnit = typeof INTENSITY_UNITS[number];
export type IMaxIntensity = { units: 'max' }
export type IIntensityParameter = IMaxIntensity | {
    val: number;
    units: IntensityUnit;
}

// target heart rate
export const THR_UNITS = ['bpm'] as const;
export type ThrUnit = typeof THR_UNITS[number];
export type IMaxThr = { units: 'max' }
export type IThrParameter = IMaxThr | {
    val: number;
    units: ThrUnit;
}

// angle
export type IMaxAngle = { units: 'max' }
export type IAngleParameter = IMaxAngle | {
    val: number;
}

// resistance
export type IMaxResistance = { units: 'max' }
export type IResistanceParameter = IMaxResistance | {
    val: number;
}

// rest
export const TIME_UNITS = ['s', 'm', 'h'] as const;
export type TimeUnit = typeof TIME_UNITS[number];
export type IRestParameter = {
    val: number;
    max?: number;
    units: TimeUnit;
}