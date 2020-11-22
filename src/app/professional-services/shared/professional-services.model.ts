export interface IProfessionalService {
    id: string;
    name: string;
    description: string;
    value: number;
    time: Date;
    category: CategoryServices;
}

export enum CategoryServices {
    Unhas = 1,
    Cabelos = 2,
    Barbearia = 3,
    Maquiagem = 4,
    Depilacao = 5,
    Sobrancelhas = 6,
}
