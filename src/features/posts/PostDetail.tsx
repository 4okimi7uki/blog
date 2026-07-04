import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

import { Layout } from "../../components/Layout";
import { Post } from "../../lib/microcms";

type Props = {
  post: Post & MicroCMSContentId & MicroCMSDate;
};

export const PostDetail = ({ post }: Props) => {
  return (
    <Layout title={post?.title} currentPath="/posts">
      <div dangerouslySetInnerHTML={{ __html: post?.content }} />
    </Layout>
  );
};
