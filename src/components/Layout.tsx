type Props = {
  title: string;
  children: any;
};
export const Layout = ({ title, children }: Props) => {
  return (
    <html lang="ja">
      <head>
        <meta charset={"utf-8"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <main class="bg-gray-700">{children}</main>
      </body>
    </html>
  );
};
