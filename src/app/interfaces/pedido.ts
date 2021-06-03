import { Produto } from "./produto";
import firebase from "firebase/app"

export interface Pedido {
    id?: string;
    produtos?: Produto[];
    subtotal?: number;
    frete?: number;
    total?: number;
    data?: firebase.firestore.Timestamp;
    endereco?: string;
    numero?: number;
}[];
