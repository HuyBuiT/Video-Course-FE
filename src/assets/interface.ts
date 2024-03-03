import { LucideIcon } from "lucide-react"
export interface ISidebarItem {
    _id?: string
    name: string;
    icon: LucideIcon;
    path: string;
    items?: ISidebarItem[];
}

export interface ISubItem {
    name: string;
    path: string;
}
export interface ICourse {
    name: string;
    _id: string;
}

export interface ListProps {
    items: ISidebarItem[];
}