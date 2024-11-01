import { Layout, Section } from "@/components/layout";
import { Separator } from "@/components/ui/separator";

import { SidebarNav } from "./components/sidebar-nav";
import { getTranslations } from "next-intl/server";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();

  const sidebarNavItems = [
    {
      title: t("Profile.title"),
      href: "/profile",
    },
    // {
    //   title: "Account",
    //   href: "/profile/account",
    // },
    // {
    //   title: "Appearance",
    //   href: "/profile/appearance",
    // },
    // {
    //   title: "Notifications",
    //   href: "/profile/notifications",
    // },
    // {
    //   title: "Display",
    //   href: "/profile/display",
    // },
  ];

  return (
    <Layout>
      <Section>
        <div className="space-y-6 pb-16 block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              {t("Profile.settings")}
            </h2>
            <p className="text-muted-foreground">{t("Profile.description")}</p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
