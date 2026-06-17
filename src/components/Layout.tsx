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
        <main class="bg-[#0D1117] w-full h-[calc(100svh-25px)] flex justify-center text-white">{children}</main>
        <footer class="text-center text-[11px] bg-[#0D1117] text-[#9198a1] py-1 fix bottom-0">©︎Mizuki Aoki</footer>
      </body>
    </html>
  );
};
