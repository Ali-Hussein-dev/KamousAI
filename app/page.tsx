import { AppLayout } from "@/components/app-layout";
import { EasyAccess } from "@/components/easy-access";
import { ToolsBentoTools } from "@/components/tools-bento-grid";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <AppLayout>
      <div className="mx-auto h-full w-full max-w-4xl pb-3 pt-5">
        <div className="mx-auto space-y-12">
          <div className="mb-12">
            <h1 className="mb-2 text-center text-2xl font-black capitalize text-primary-100 md:text-4xl">
              Language Learning Tools
            </h1>
            <h2 className="mt-0 text-center text-xl font-normal text-slate-300">
              Advanced your language skills with AI
            </h2>
          </div>
          <ToolsBentoTools />
          <EasyAccess />
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
