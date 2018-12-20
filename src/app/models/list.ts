import { Card } from "./card";

export interface List {
    id: number,
    name: string,
    cards: Card[]
}