export interface Estudiante {
    cedula: string;
    nombre: string;
    carrera: string;
}

export interface Patrullero {
    id: string;
    nombre: string;
    cedula: string;
    pdfUrl?: string;
    lista1x10: Estudiante[];
}