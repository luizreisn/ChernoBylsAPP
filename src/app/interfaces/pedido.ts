import { Produto } from "./produto";

export interface Pedido {
    produtos?: Produto[];
    subtotal?: number;
    frete?: number;
    total?: number;
    data?: Date;
    id?: string;
}[];
