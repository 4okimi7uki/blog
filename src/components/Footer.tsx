import { GitHubIcon, MailIcon, XIcon } from "../assets/Icon";

export const Footer = () => {
  return (
    <footer class="md:w-9/12 text-sm flex justify-between items-center mt-20 font-[system-ui]">
      <div>©︎ 2026 Mizuki Aoki.</div>
      <ul className="flex space-x-2">
        <li>
          <a
            href="mailto:contact@4okimi7uki.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#9198a1]"
            aria-label="mail"
          >
            <MailIcon width={18} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/4okimi7uki"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#9198a1]"
            aria-label="GitHub"
          >
            <GitHubIcon width={18} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            href="https://x.com/0000ff_ki"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#9198a1]"
            aria-label="X"
          >
            <XIcon width={18} aria-hidden="true" />
          </a>
        </li>
      </ul>
    </footer>
  );
};
