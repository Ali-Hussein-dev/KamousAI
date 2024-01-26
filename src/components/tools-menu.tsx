"use client";
import {  ScrollArea } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbPencilMinus } from "react-icons/tb";
import { GiSpellBook } from "react-icons/gi";
import { AiOutlineSwap } from "react-icons/ai";
import { BsTranslate, BsJournalText } from "react-icons/bs";
import { MdOutlineShortText } from "react-icons/md";
import { cn } from "@/utils/helpers";

export const toolsLinks = [
  {
    label: "AI Dictionary",
    href: "/tools/dictionary",
    icon: <GiSpellBook className="text-white" />,
  },
  {
    label: "Reverse Dictionary",
    href: "/tools/reverse-dictionary",
    icon: <AiOutlineSwap className="text-white" />,
  },
  {
    label: "Grammar Corrector",
    href: "/tools/grammar-corrector",
    icon: <TbPencilMinus className="text-white" />,
  },
  {
    label: "Translator",
    href: "/tools/translator",
    icon: <BsTranslate className="text-white" />,
  },
  {
    label: "Paraphraser",
    href: "/tools/text-optimizer",
    icon: <BsJournalText className="text-white" />,
  },
  {
    label: "Summarizer",
    href: "/tools/summarizer",
    icon: <MdOutlineShortText className="text-white" />,
    isNew: true,
  },
];
//======================================
// export const ToolsMenu = () => {
//   const pathname = usePathname();
//   return (
//     <CustomMenu>
//       <Menu.Target>
//         <Button radius="lg" rightSection={<TbChevronDown />} variant="light">
//           Tools
//         </Button>
//       </Menu.Target>
//       <Menu.Dropdown p="sm">
//         {languagetoolsList.map((item) => (
//           <Link
//             key={item.label}
//             href={item.href}
//             className="w-full no-underline"
//           >
//             <Menu.Item
//               key={item.label}
//               leftSection={
//                 <span className="center h-7 w-7 rounded-lg bg-primary-500">
//                   {item.icon}
//                 </span>
//               }
//             >
//               <div className="w-full flex-row-between">
//                 <span>{item.label}</span>
//                 {pathname == item.href && (
//                   <span className="">
//                     <LuCheck />
//                   </span>
//                 )}
//               </div>
//             </Menu.Item>
//           </Link>
//         ))}
//       </Menu.Dropdown>
//     </CustomMenu>
//   );
// };

export const ToolsBar = () => {
  const pathname = usePathname();
  return (
    <nav className="mx-auto mb-3 max-w-lg rounded-lg bg-slate-900/60 px-2 py-1 sm:hidden">
      <ScrollArea className="w-full max-w-lg">
        <div className="gap-1 flex-row-between">
          {toolsLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn("pb-1 pt-1 no-underline duration-500")}
            >
              {/* <ActionIcon >{item.icon}</ActionIcon> */}
              <span
                className={cn(
                  "center h-9 w-9 rounded-lg border border-solid border-slate-600 duration-300 group-hover:border-transparent group-hover:bg-primary-600",
                  pathname == item.href && "border-transparent bg-primary-600"
                )}
              >
                {item.icon}
              </span>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </nav>
  );
};
