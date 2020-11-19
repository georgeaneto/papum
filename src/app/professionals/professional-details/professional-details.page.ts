import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'firebase/firestore';
import { take } from 'rxjs/operators';

import { IProfessional } from '../shared/professional.model';
import { ProfessionalService } from '../shared/professional.service';

@Component({
    selector: 'app-professional-details',
    templateUrl: './professional-details.page.html',
    styleUrls: ['./professional-details.page.scss'],
})
export class ProfessionalDetailsPage implements OnInit {

    public professional: IProfessional;

    constructor(
        private professionalService: ProfessionalService,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        const professionalId: string = this.route.snapshot.paramMap.get('id');
        this.professionalService
            .getById(professionalId)
            .pipe(take(1))
            .subscribe({
                next: (professional) => {
                    this.professional = professional;
                }
            });
    }
}
