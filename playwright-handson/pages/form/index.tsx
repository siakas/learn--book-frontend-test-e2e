import Head from "next/head";
import { Layout } from "@/common/components/layout/Layout";
import { ShuffleMemberForm } from "@/features/form/components/ShuffleMemberForm";

export default function FormPage() {
  return (
    <>
      <Head>
        <title>入力フォーム</title>
        <meta
          name="description"
          content="Playwright ハンズオンの第二ステップ"
        />
      </Head>
      <Layout>
        <h1 className="mb-6 text-4xl font-bold">入力フォーム</h1>
        <ShuffleMemberForm />
      </Layout>
    </>
  );
}
