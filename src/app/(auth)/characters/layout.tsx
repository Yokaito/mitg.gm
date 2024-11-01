import { Layout, Section } from "@/components/layout";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Section>{children}</Section>
    </Layout>
  );
}
