import { Child } from "hono/jsx";

import ANSI_LOGO from "../../assets/ascii-art.txt";
import BANNER_SP from "../../assets/banner-sp.txt";
import BANNER from "../../assets/banner.txt";
import MY_HISTORY from "../../assets/my-history.txt";
import { Layout } from "../../components/Layout";
import { parseAnsi } from "../../lib/ansi";

// Parsed once per isolate, not per request
const LOGO_SEGMENTS = parseAnsi(ANSI_LOGO.replace(/\n$/, ""));

// Split each `tree` line into its branch prefix and entry name, e.g. "    ├── " / "2016_shibaura-it"
const HISTORY_LINES = MY_HISTORY.trimEnd()
  .split("\n")
  .map((line) => {
    const [, branch = "", name = ""] = line.match(/^([\s│├└─]*)(.*)$/) ?? [];
    return { branch, name };
  });

const TreeEntry = ({ name }: { name: string }) => {
  const [link, target] = name.split(" -> ");
  if (target) {
    return (
      <>
        <span class="text-term-purple">{link}</span>
        <span class="text-term-gray">{" -> "}</span>
        <span class="text-term-cyan font-bold">{target}</span>
      </>
    );
  }
  if (name.endsWith(".md")) return <span>{name}</span>;
  return <span class="text-term-cyan font-bold">{name}</span>;
};

const LAST_LOGIN_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tokyo",
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const MOTD_LINKS: [string, string][] = [
  ["GitHub", "https://github.com/4okimi7uki"],
  ["X", "https://x.com/0000ff_ki"],
];

// macOS style, e.g. "Thu Nov 12 23:18:34"
const formatLastLogin = (date: Date) => {
  const p = Object.fromEntries(
    LAST_LOGIN_FORMAT.formatToParts(date).map(({ type, value }) => [type, value]),
  );
  return `${p.weekday} ${p.month} ${p.day.padStart(2, " ")} ${p.hour}:${p.minute}:${p.second}`;
};

const Command = ({ children }: { children: Child }) => (
  <p>
    <span aria-hidden="true">
      <span class="text-primary-500">root@4okimi7uki.com:~</span>{" "}
      <span class="text-term-cyan">$</span>{" "}
    </span>
    <span class="text-term-white">{children}</span>
  </p>
);

const FASTFETCH: [string, string][] = [
  ["OS", "Human 30.0"],
  ["Kernel", "Curiosity-driven"],
  ["Role", "Software Engineer"],
  ["Languages", "TypeScript, Go"],
  ["Frameworks", "React, Next.js, Hono"],
  ["Platforms", "Cloudflare, Vercel"],
  ["Hobbies", "Development, Design, Workout"],
  ["Motto", "Measure twice, run once."],
];

const palette = {
  normal: [
    "#0D1117", // Black
    "#E6B800", // Yellow
    "#E6488F", // Passion Pink
    "#2AA198", // Teal
    "#D97706", // Orange
    "#6786B0", // Blue
    "#8B949E", // Gray
    "#E6EDF3", // White
  ],
  bright: ["#161B22", "#FFD84D", "#FF80B4", "#60C9BD", "#F4A340", "#93B5DC", "#B1BAC4", "#FFFFFF"],
} as const;

export const About = () => {
  return (
    <Layout title="About" currentPath="/">
      <section class="terminal flex flex-col gap-6">
        <div>
          <p>Last login: {formatLastLogin(new Date())} on ttys005</p>
          <pre aria-hidden="true" class="mt-4 mb-5 hidden text-primary-500 sm:block">
            {BANNER.trimEnd()}
          </pre>
          <pre aria-hidden="true" class="mt-4 mb-5 text-primary-500 sm:hidden">
            {BANNER_SP.trimEnd()}
          </pre>
          <p class="mb-4">Welcome to 4okimi7uki.com (Human 30.0 Curiosity-driven)</p>
          <ul class="mb-4">
            {MOTD_LINKS.map(([label, href]) => (
              <li>
                {` * ${`${label}:`.padEnd(9)}`}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-term-fg decoration-term-gray/50 underline-offset-2 hover:text-primary-500"
                >
                  {href}
                </a>
              </li>
            ))}
          </ul>
          <p>0 updates can be applied immediately.</p>
        </div>

        <div>
          <Command>fastfetch</Command>
          <div class="flex flex-col gap-5 sm:flex-row">
            <pre aria-hidden="true" class="shrink-0 text-[8px] leading-[1.2]">
              {LOGO_SEGMENTS.map(({ color, text }) =>
                color ? <span style={`color:${color}`}>{text}</span> : text,
              )}
            </pre>
            <div>
              <ul>
                <li>xxxxxx@4okimi7uki.com</li>
                <li>--------------------------</li>
                {FASTFETCH.map(([category, stack]) => (
                  <li class="grid grid-cols-5 gap-1">
                    <p class="text-term-purple col-span-2">{category}:</p>
                    <p class="col-span-3">{stack}</p>
                  </li>
                ))}
              </ul>
              <div>
                <div class="flex mt-6">
                  {palette.normal.map((c) => {
                    return <span class="block w-8 h-6" style={{ background: c }}></span>;
                  })}
                </div>
                <div class="flex">
                  {palette.bright.map((c) => {
                    return <span class="block w-8 h-6" style={{ background: c }}></span>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Command>tree -C my_history</Command>
          <pre>
            {HISTORY_LINES.map(({ branch, name }, i) => (
              <>
                {i > 0 && "\n"}
                <span class="text-term-gray">{branch}</span>
                <TreeEntry name={name} />
              </>
            ))}
          </pre>
        </div>

        <Command>
          <span class="term-cursor"></span>
        </Command>
      </section>
    </Layout>
  );
};
