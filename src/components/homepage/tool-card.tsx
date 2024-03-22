import Link from "next/link";
import { type IconType } from "react-icons/lib";
import { PiCaretCircleDoubleRightThin } from "react-icons/pi";

type Props = {
  label: string;
  description: string;
  href: string;
  Icon: IconType;
  keywords: string[];
  i: number;
};
const Blob = ({ i, Icon }: Pick<Props, "Icon" | "i">) => (
  <div
    className={
      "center order-first size-[8rem] rounded-full bg-no-repeat p-2 sm:order-last sm:size-24 md:size-[9rem]"
    }
    style={{
      backgroundImage: `url(/blob_${i}.svg)`,
    }}
  >
    <Icon className="size-8 sm:size-9 md:size-14" />
  </div>
);

//======================================
export const ToolCard = ({
  label,
  href,
  description,
  Icon,
  keywords,
  i,
}: Props) => {
  return (
    <div
      className="rounded-xl border-0 border-l-[.5px] border-t-[.5px] border-theme-secondary/20 bg-slate-900 bg-repeat p-3 md:p-6 md:pb-3"
      style={{
        boxShadow: "6px 6px 0px #BFB173",
        backgroundSize: "250px",
        backgroundImage: "url('/grain-white.svg')",
      }}
    >
      <div className="">
        <div className="flex w-full flex-col items-center gap-4 pr-4 sm:flex-row sm:justify-between md:pr-16">
          <div className="w-fit sm:grow">
            <h3 className="mb-1 text-xl font-extrabold text-theme-primary md:text-3xl">
              {label}
            </h3>
            <p className="mt-0 tracking-wider text-slate-300 sm:max-w-md md:text-xl">
              {description}
            </p>
          </div>
          <Blob i={i} Icon={Icon} />
        </div>
        <div className="mt-2 w-full flex-row-between">
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-theme-accent sm:text-base"
              >
                {keyword}
              </span>
            ))}
          </div>
          <Link href={href} className=" text-theme-secondary">
            <PiCaretCircleDoubleRightThin
              size="40"
              className="rounded-full bg-slate-900"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
