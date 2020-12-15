import { IProfessionalService } from '../../professional-services/shared/professional-services.model';

export interface IProfessional {
    id: string;
    name: string;
    email: string;
    mobile: number;
    birthday: Date;
    descriptionWork: string;
    attendanceType: boolean;
    weekDays: WeekDays[];
    lat: number;
    lng: number;
    services: IProfessionalService[];
    avatar: string;
    cep: string;
    houseNumber: string;
    district: string;
    state: string;
    city: string;
    street: string;
    complement: string;
    startHour: string;
    endHour: string;
}

export enum WeekDays {
    Domingo = 0,
    Segunda = 1,
    Terca = 2,
    Quarta = 3,
    Quinta = 4,
    Sexta = 5,
    Sabado = 6
}
