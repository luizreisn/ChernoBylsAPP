export interface Produto {
    id?: string;
    categoria?: string;
    nome?: string;
    descricao?: string;
    valor?: number;
    imagem?: string;
    condimentos?: {
        nome?: string;
        marcado?: boolean;
    }[];
    quantidade?: number;
    valorTotal?: number;
}
