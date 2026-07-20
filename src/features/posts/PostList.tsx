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
      <div>
        {posts.length > 0 ? (
          <ul class="flex flex-col gap-1 pb-4 divide-y divide-line-default divide-dotted">
            {posts.map((post) => {
              return (
                <li key={post.id} class="transition-all transition-duration-[.4s]">
                  <a
                    href={`posts/${post.id}`}
                    class="hover:opacity-80 text-white transition-all flex justify-between items-center px-5 py-1 no-underline"
                  >
                    <div>{post.title}</div>
                    <div class="text-[12px] ml-1 w-28 text-right text-gray-300">
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
