import { Layout } from "@/common/components/layout/Layout";
import { Button } from "@/common/components/ui/button";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>最初のページ</title>
        <meta
          name="description"
          content="Playwright ハンズオンの最初のステップ"
        />
      </Head>
      <Layout>
        <h1 className="mb-6 text-4xl font-bold">Playwright のハンズオン</h1>
        <p className="my-2">
          あなたは１週間後には E2E テストのエキスパートです。
        </p>
        <p className="my-8">
          <Button>操作ボタン</Button>
        </p>
      </Layout>
    </>
  );
}
