export interface SelectOption {
id?: number| string;
label: string| number;
value: string| number;
}

export interface Contact {
    id: number;
    fio: string;
    phone: string;
    email: string;
    tags: string[];
}
