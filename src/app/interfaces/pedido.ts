import { Produto } from "./produto";
import firebase from "firebase/app"

export interface Pedido {
    produtos?: Produto[];
    subtotal?: number;
    frete?: number;
    total?: number;
    data?: firebase.firestore.Timestamp;
    id?: string;
}[];
