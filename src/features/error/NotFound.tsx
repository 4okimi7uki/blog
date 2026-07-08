import { GhostIcon } from "../../assets/Icon";
import { Layout } from "../../components/Layout";

export const NotFound = () => {
  return (
    <Layout title="404 Not Found" currentPath="">
      <div class="icon z-0 opacity-20 pointer-events-none motion-reduce:animate-none animate-spin absolute w-full">
        <GhostIcon height={200} />
      </div>

      <div className="flex flex-col gap-10">
        <span className="select-none font-[Manrope] text-[clamp(4rem,10vw,7rem)] font-medium text-primary-500 tracking-[-0.03em]">
          404
        </span>
        <span className="text-xs tracking-widest uppercase font-[monospace] text-line-default">
          not_found
        </span>
      </div>

      {/* Divider */}
      <div class="border-t border-line-default w-full" />

      {/* Message */}
      <div className="flex flex-col gap-2 my-3">
        <p className="text-sm text-[#e6edf3]">お探しのページは見つかりませんでした。</p>
      </div>
    </Layout>
  );
};
