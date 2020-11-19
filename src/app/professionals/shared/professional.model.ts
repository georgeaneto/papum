export interface IProfessional {
    id: string;
    name: string;
    email: string;
    mobile: number;
    birthday: Date;
    descriptionWork: string;
    attendanceType: boolean;
    weekDays: Array<string>;
}
