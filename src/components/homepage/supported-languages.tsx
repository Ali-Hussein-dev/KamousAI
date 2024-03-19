//======================================
export const SupportedLanguages = () => {
  return (
    <div className="pb-3 pt-20">
      <div
        className="mx-auto max-w-3xl rounded-lg border-[1px] border-theme-secondary/30 bg-slate-950/50 px-3 md:px-7"
        // style={{ boxShadow: "0px 5px #BFB173" }}
      >
        <div
          className="h-[22rem] w-full -translate-y-8 overflow-hidden rounded-lg border-[1px] border-theme-secondary/30 bg-gradient-to-br from-slate-950 to-slate-800"
          style={{
            boxShadow: "0px 5px #BFB173",
          }}
        >
          <div
            className="h-full w-full bg-left-bottom bg-no-repeat"
            style={{
              backgroundImage: "url(/cloud.svg)",
            }}
          >
            <div className="h-full w-full bg-slate-800/30 backdrop-blur-lg">
              <div className="mx-auto h-full px-4 py-6 flex-col-center">
                <h3 className="text-center text-xl font-extrabold text-theme-secondary md:text-3xl">
                  +90 Supported Languages
                </h3>
                <p className="mt-0 max-w-lg text-center text-lg tracking-wider text-slate-300">
                  We now boasts support for over 90 languages, providing a
                  diverse and inclusive experience for users around the globe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
