export interface Usuario {
    nome?: string;
    telefone?: number;
    cpf?: number;
    nascimento?: Date;
    sexo?: string;
    email?: string;
    senha?: string;        
    cep?: number;
    endereco?: string;
    numero?: number;  
    complemento?: string;   
    produtosFavoritos?: string[];
}
