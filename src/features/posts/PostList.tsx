import dayjs from "dayjs";
import { MicroCMSListResponse } from "microcms-js-sdk";

import { Layout } from "../../components/Layout";
import { Post } from "../../lib/microcms";

type Props = {
  posts: MicroCMSListResponse<Post>["contents"];
};

export const PostList = ({ posts }: Props) => {
  return (
    <Layout title={"Blog"} currentPath="/posts">
      <div class="w-[90%]">
        <h1 class="mb-4">Blog</h1>
        {posts.length > 0 ? (
          <ul class="flex flex-col gap-1 px-[4%] py-4 pt-0">
            {posts.map((post) => {
              return (
                <li key={post.id} class="transition-all transition-duration-[.4s] rounded-sm">
                  <a
                    href={`posts/${post.id}`}
                    class="hover:opacity-80 text-white transition-all flex justify-between items-center px-5 py-1 no-underline"
                  >
                    <div>{post.title}</div>
                    <div class="text-[12px] ml-1 w-31.25 text-gray-300">
                      {dayjs(post.publishedAt).format("YYYY/MM/DD")}
                    </div>
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
