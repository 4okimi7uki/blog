import dayjs from "dayjs";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

import { ChevronLeft, ChevronRight } from "../../assets/Icon";
import { Layout } from "../../components/Layout";
import { Post } from "../../lib/microcms";

type link = {
  id: string;
  title: string;
};

type Props = {
  post: Post & MicroCMSContentId & MicroCMSDate;
  prevPost: link | null;
  nextPost: link | null;
};

export const PostDetail = ({ post, prevPost, nextPost }: Props) => {
  const publicAt = dayjs(post.publishedAt).format("YYYY-MM-DD");
  return (
    <Layout title={post?.title} currentPath="/posts">
      <div class="text-center flex flex-col gap-6 mb-4">
        <h1 class="text-3xl font-bold text-white">{post.title}</h1>
        <time datetime={publicAt} class="text-[15px]">
          {publicAt}
        </time>
      </div>
      {post.eyecatch?.url && (
        <div class="w-full h-[300px] bg-black overflow-hidden relative mb-8">
          <img
            src={post.eyecatch?.url}
            alt="eyecatch"
            class="block h-full w-full object-contain absolute inset-0 z-1 p-2"
          />
          <img
            src={post.eyecatch?.url}
            alt="eyecatch"
            class="block h-full w-full object-cover blur-[9px] opacity-40"
          />
        </div>
      )}
      <div class="border-line-default border-t pt-6">
        <div
          dangerouslySetInnerHTML={{ __html: post?.content }}
          class="flex flex-col gap-1 prose"
        />
      </div>

      <div class="flex mt-8 border-t-2 border-line-default py-3">
        {prevPost && (
          <a href={`/posts/${prevPost.id}`} class="flex gap-0.5 items-center w-[50%]">
            <ChevronLeft />
            <span class="inline-block max-w-full truncate">{prevPost.title}</span>
          </a>
        )}
        {nextPost && (
          <a
            href={`/posts/${nextPost.id}`}
            class="ml-auto flex gap-0.5 justify-end items-center truncate w-[50%]"
          >
            <span class="inline-block max-w-full truncate">{nextPost.title}</span>
            <ChevronRight />
          </a>
        )}
      </div>
    </Layout>
  );
};
