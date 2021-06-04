import { DadoEndereco } from "./dado-endereco";
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
    dadosEndereco?: DadoEndereco;  
    produtosFavoritos?: string[];
    carrinho?: Produto[];
    pedido?: Pedido[];
}
