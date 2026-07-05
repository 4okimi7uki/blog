import { twMerge } from "tailwind-merge";

type Props = {
  currentPath: string;
};

const navItems = [
  { href: "/", label: "About" },
  { href: "/posts", label: "Posts" },
  { href: "/misc", label: "Misc" },
];

export const Navigation = ({ currentPath }: Props) => {
  return (
    <nav>
      <ul
        class="flex flex-row md:flex-col space-x-4 md:space-x-0 pr-10 md:px-0 md:pb-0 px-4 pb-4"
        id="nav"
      >
        {navItems.map(({ href, label }) => {
          const isActive = currentPath === href || (href !== "/" && currentPath.startsWith(href));
          return (
            <li key={label} class="flex flex-col-reverse md:flex-row text-sm py-1 items-center">
              <div
                class={twMerge(
                  `md:relative rounded-full md:mr-2 md:left-px w-1 h-1 mt-1 md:mt-0 transition-transform ${isActive ? "scale-125 bg-primary-500" : "scale-0"}`,
                )}
                data-is-active={isActive}
              ></div>
              <a
                href={href}
                class={twMerge(
                  `transition-opacity ${isActive ? "text-primary-500" : "hover:opacity-60 dark:text-gray-400"}`,
                )}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
