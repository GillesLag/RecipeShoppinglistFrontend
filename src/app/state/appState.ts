import { Shoppinglist } from "../models/Shoppinglist";

export interface AppState{
    shoppinglists: ReadonlyArray<Shoppinglist>;
}
