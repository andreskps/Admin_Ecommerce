import Link from "next/link";
import React from "react";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";

interface Props {
  title: string;
  path?: string;
  icon: React.ReactNode;
  subLinks?: { title: string; path: string }[];
}

export const SidebarItem = ({ title, path, icon, subLinks }: Props) => {
  return (
    <>
      {subLinks ? (
        <div className="relative">
          <Collapsible>
            <CollapsibleTrigger>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                {icon}
                <span>{title}</span>
                {/* <ChevronDownIcon className="ml-auto h-4 w-4 rotate-0 transition-transform" /> */}
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="grid gap-1 px-4 text-sm font-medium">
                {subLinks.map((subItem) => (
                  <Link href={subItem.path} key={subItem.title}>
                    <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                      {subItem.title}
                    </span>
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ) : (
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href={path || "/"}
        >
          {icon}
          <span>{title}</span>
        </Link>
      )}
    </>
  );
};
