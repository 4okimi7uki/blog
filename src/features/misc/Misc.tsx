import { Layout } from "../../components/Layout";

const Misc = () => {
  return (
    <Layout title="Misc" currentPath="/misc">
      <h1 class="mb-4">Misc.</h1>

      <div class="text-white px-[1%] flex flex-col items-center gap-3 py-20">
        <p class="text-4xl">🚧</p>
        <p class="text-lg font-bold">Under Construction</p>
        <p class="text-sm">このページは準備中です。</p>
      </div>
    </Layout>
  );
};

export default Misc;
