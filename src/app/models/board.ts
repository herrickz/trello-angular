import { List } from "./list";

export interface Board {
    id: number,
    name: string,
    hashId: string,
    lists: List[]
}