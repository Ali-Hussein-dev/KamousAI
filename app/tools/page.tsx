import { ToolsBentoTools } from "@/components/homepage/tools-grid";

//======================================
const ToolsPage = () => {
  return (
    <div
      className="bg-slate-900"
      style={{
        width: "100%",
        backgroundRepeat: "repeat",
        backgroundSize: "250px 250px",
        backgroundImage: "url(/tool_layout_grid.svg)",
      }}
    >
      <section className="center mx-auto min-h-screen bg-gradient-to-tr from-slate-900/[0.91] from-50% via-slate-900/70 to-slate-900 px-2 py-14">
        <div className="mx-auto max-w-4xl">
          <ToolsBentoTools />
        </div>
      </section>
    </div>
  );
};
export default ToolsPage;
