import { ChevronDown, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface ISubItem {
    name: string;
    path: string;
}

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
    items?: ISidebarItem[];
}
const SubmenuItem = ({item}:{item:ISidebarItem}) => {
    const {name, path, icon:Icon, items} = item;
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();
    const onclick= () => {
        if(items && items.length > 0) {
            setExpanded(!expanded);
            return expanded;
        }
        router.push(path);
    }
    return(
        <>
        <div
        className="flex items-center hover:text-sidebar-active cursor-pointer" onClick={onclick}
        >
            <Icon size={15} className="mr-2"/>
            {name}
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
    )
};

export default SubmenuItem