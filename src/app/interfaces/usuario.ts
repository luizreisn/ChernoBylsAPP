import { Pedido } from "./pedido";
import { Produto } from "./produto";

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
    carrinho?: Produto[];
    pedido?: Pedido[];
}
