import { User } from "../types/types";

export interface userReaducerInitialState {
    user: User  | null,
    loading : boolean
}