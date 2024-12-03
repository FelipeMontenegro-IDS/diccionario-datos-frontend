import { Dispatch, SetStateAction } from "react";

export interface IOpenDawer<T> {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    object?: T;
    reload: () => void;
}