import { DrawerProps } from "@fluentui/react-components";
import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

type DrawerType = Required<DrawerProps>["type"];

export interface IDrawer {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    type: DrawerType;
    appearance?: "subtle" | "outline" | "primary" | "secondary" | "transparent";
    title: string;
    size?: 'full' | 'large' | 'medium' | 'small';
    position?: 'bottom' | 'start' | 'end';
    children?: ReactNode;
    isvisibleButtomCancel?: boolean;
    isvisibleButtomPrimary?: boolean;
    TitleButtomCancel?: string;
    TitleButtomPrimary?: string;
    onClickButtomPrimary?: () => void;
    onClickButtomCancel?: () => void;
    appearanceButtomPrimary?: "primary" | "outline" | "subtle" | "secondary" | "transparent";
    appearanceButtomCancel?: "primary" | "outline" | "subtle" | "secondary" | "transparent";
}