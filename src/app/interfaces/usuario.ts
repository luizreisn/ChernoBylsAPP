export interface Usuario {
    nome?: string;
    telefone?: number;
    cpf?: number;
    nascimento?: Date;
    sexo?: string;
    email?: string;
    senha?: string;
    dadosEndereco?:{
        cep?: number;
        endereco?: string;
        numero?: number;
        complemento?: string;
    };
    produtosFavoritos?: string[];
    carrinho?:{
        id?: string;
        quantidade?: number;
        valorTotal?: number;
    }[];
}
