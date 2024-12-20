export type IMeasurement = Partial<IMeasurementInput> & {
    _id: string;
    writerId: string;
    readerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type IMeasurementInput = {
    height: number;
    weight: number;
    bodyFat: number;
    heartRate: number;
}