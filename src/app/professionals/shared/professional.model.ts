import { IProfessionalService } from '../../professional-services/shared/professional-services.model';

export interface IProfessional {
    id: string;
    name: string;
    email: string;
    mobile: number;
    birthday: Date;
    descriptionWork: string;
    attendanceType: boolean;
    weekDays: string[];
    lat: number;
    lng: number;
    services: IProfessionalService[];
}
