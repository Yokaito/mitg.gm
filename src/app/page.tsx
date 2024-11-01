import { Layout } from "@/components/layout";
import { auth } from "@/sdk/auth";

export default async function Home() {
  const session = await auth();

  if (session) {
    return (
      <Layout>
        <div className="flex flex-wrap justify-start gap-5">
          <div className="border rounded-2xl p-4">Guilherme</div>
          <div className="border rounded-2xl p-4">Guilherme</div>
          <div className="border rounded-2xl p-4">Guilherme</div>
          <div className="border rounded-2xl p-4">Guilherme</div>
          <div className="border rounded-2xl p-4">Guilherme</div>
        </div>
      </Layout>
    );
  }

  return <Layout>Não Logado</Layout>;
}
