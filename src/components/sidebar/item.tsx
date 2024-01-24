"use client"
import React, { useMemo, useState } from "react";
import { LucideIcon, Home, FileVideo, ChevronDown  } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import SubmenuItem from "./submenu-item";
interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
    items?: ISidebarItem[];
}

interface ISubItem {
    name: string;
    path: string;
}

const SidebarItem = ({item}: {item: ISidebarItem}) => {
    const {name, icon: Icon, items, path} = item;
    const [expanded, setExpanded] = useState(false);

    const router = useRouter();
    const pathName = usePathname();
    const onClick = () =>{
        if(items && items.length > 0) {
            setExpanded(!expanded);
            return expanded;
        }
        router.push(path);
    }
    const isActive = useMemo(() =>{
        return path === pathName;
    },[path,pathName]);
    return (
        <>
        <div
        className={`flex items-center space-x-2 p-3 hover:bg-sidebar-background rounded-lg cursor-pointer hover:text-sidebar-active 
        ${isActive && "text-sidebar-active" && "bg-sidebar-background" }`}
         onClick={onClick}>
            <Icon size={19}/>
            <p
            className="font-semibold">
                {name}
            </p>

            {items && items.length >0 && (
                <ChevronDown size= {19} className={expanded ? "rotate-180 duration-150" : ""}/>
            )}
        </div>
            {expanded && items && items.length > 0 && (<div
            className="flex flex-col space-y-1 ml-10">
                {items.map((subItem) => <SubmenuItem key = {item.path} item={subItem}/>)}
            </div>)
                
            }
        </>
    );
}

export default SidebarItem;