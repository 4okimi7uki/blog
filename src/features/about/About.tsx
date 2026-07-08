import { Layout } from "../../components/Layout";

export const About = () => {
  return (
    <Layout title="About" currentPath="/">
      <h1 class="mb-4">About</h1>

      <div class="text-white px-[1%] flex flex-col gap-4">
        <p>4okimi7uki です。ソフトウェアエンジニアをしてます。</p>
        <p>
          仕事では主に、Webアプリケーションやメディアサイトに携わっています。
          フロントエンド・バックエンドに限らず、幅広い領域に興味があります。
        </p>
        <p>
          個人では、仕事でも使えるちょっと便利なツールを作ったり、TypeScriptやGoを書いていたりします。🍕
        </p>
      </div>
    </Layout>
  );
};
