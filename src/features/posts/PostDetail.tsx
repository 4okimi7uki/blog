import { Layout } from "../../components/Layout";

type Props = {
  post: any;
};

export const PostDetail = ({ post }: Props) => {
  return (
    <Layout title={post?.title}>
      <div dangerouslySetInnerHTML={{ __html: post?.content }} />
    </Layout>
  );
};
