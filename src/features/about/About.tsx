import { Child } from "hono/jsx";

import { Layout } from "../../components/Layout";

const DIVIDER = "=".repeat(41);

const Command = ({ children }: { children: Child }) => (
  <p>
    <span aria-hidden="true">
      <span class="text-primary-500">root@4okimi7uki.com:~</span>{" "}
      <span class="text-term-cyan">$</span>{" "}
    </span>
    <span class="text-term-white">{children}</span>
  </p>
);

const SKILLS: [string, string][] = [
  ["Languages", "TypeScript, Go"],
  ["Frameworks", "React, Next.js, Hono"],
  ["Platforms", "Cloudflare, Vercel"],
  ["Tools", "Docker, GitHub Actions"],
  ["Interests", "Rust, CLI tooling, Developer Experience, Workout"],
];

const PROFILE_NOTES = [
  " - ものづくりが好きです。",
  " - フロントエンドを軸に、プロダクトを良くするために必要な領域まで手を伸ばします。",
  " - かゆいところに手が届くような、ちょっと便利なツールを作るのが好きです。",
  " - 遊び心のある冗長性と業務効率化にも取り組んでいます。",
];

export const About = () => {
  return (
    <Layout title="About" currentPath="/">
      <section class="terminal flex flex-col gap-6">
        <div>
          <Command>cat ~/profile.txt</Command>
          <p>{DIVIDER}</p>
          <h1 class="font-bold text-term-white"> Mizuki Aoki</h1>
          <p>
            {" ➤ "}
            <span class="font-bold">Software Engineer</span> based in Japan
          </p>
          <p class="mb-4">{DIVIDER}</p>
          {PROFILE_NOTES.map((note) => (
            <p>{note}</p>
          ))}
        </div>

        <div>
          <Command>npx my-skills get --table</Command>
          <p>
            <span class="text-term-cyan">Fetching...</span>{" "}
            <span class="text-term-green">████████████████████</span>{" "}
            <span class="text-term-white">100%</span>
          </p>
          <p class="mb-4">
            <span class="text-term-green">✓</span> Profile loaded
          </p>
          <div class="grid grid-cols-[12ch_1fr] gap-x-3">
            <p class="font-bold text-term-white">CATEGORY</p>
            <p class="font-bold text-term-white">STACK</p>
            {SKILLS.map(([category, stack]) => (
              <>
                <p class="text-term-purple">{category}</p>
                <p>{stack}</p>
              </>
            ))}
          </div>
        </div>

        <Command>
          <span class="term-cursor"></span>
        </Command>
      </section>
    </Layout>
  );
};
