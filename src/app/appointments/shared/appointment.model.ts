import { IProfessionalService } from '../../professional-services/shared/professional-services.model';
import { IProfessional } from '../../professionals/shared/professional.model';

export interface IAppointment {
    id: string;
    professional: IProfessional;
    service: IProfessionalService;
    date: any;
    time: any;
}
