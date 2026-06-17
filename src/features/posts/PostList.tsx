import dayjs from "dayjs";
import { Layout } from "../../components/Layout";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { Post } from "../../lib/microcms";

type Props = {
  posts: MicroCMSListResponse<Post>["contents"];
};

export const PostList = ({ posts }: Props) => {
  return (
    <Layout title={"記事一覧"}>
      <div class="w-[90%]">
        <h1 class="pt-2 mb-2.5">Blog</h1>
        <hr class="my-2 text-[#3d444d]" />
        {posts.length > 0 ? (
          <ul class="flex flex-col gap-1 px-[4%] py-4 pt-0">
            {posts.map((post) => {
              return (
                <li key={post.id} class="transition-all transition-duration-[.4s] rounded-sm">
                  <a
                    href={`posts/${post.id}`}
                    class="hover:border-b-white border-b border-dashed border-b-transparent transition-all flex justify-between items-center px-5 py-1"
                  >
                    <div>{post.title}</div>
                    <div class="text-[12px] ml-1 w-31.25">{dayjs(post.publishedAt).format("YYYY/MM/DD HH:mm:ss")}</div>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>投稿データはありません</p>
        )}
      </div>
    </Layout>
  );
};
