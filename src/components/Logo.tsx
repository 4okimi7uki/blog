import { GirigiriFillIcon } from "../assets/Icon";

export const Logo = () => {
  return (
    <div className="mb-2 px-4 md:px-0 md:mb-20 flex flex-col md:flex-row items-start">
      <a href="/" class="group no-underline">
        <div class="flex gap-4 items-center text-white ">
          <GirigiriFillIcon width={38} />
          <div class="transition-all w-fit duration-700 overflow-hidden flex flex-col items-center justify-center h-9.5 text-[12px] after:w-full after:bg-white after:h-px group-hover:after:bg-gray-400 after:transition-all after:duration-700 group-hover:text-gray-400">
            4okimi7uki
          </div>
        </div>
      </a>
    </div>
  );
};
