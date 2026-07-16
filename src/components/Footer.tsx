import { GitHubIcon, XIcon } from "../assets/Icon";

export const Footer = () => {
  return (
    <footer class="md:w-9/12 text-sm flex justify-between items-center mt-20">
      <div>©︎ 2026 Mizuki Aoki.</div>
      <ul className="flex gap-2">
        <li>
          <a href="https://github.com/4okimi7uki" class="text-line-default">
            <GitHubIcon width={18} />
          </a>
        </li>
        <li>
          <a href="https://x.com/0000ff_ki" class="text-line-default">
            <XIcon width={18} />
          </a>
        </li>
      </ul>
    </footer>
  );
};
