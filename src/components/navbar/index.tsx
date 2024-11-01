import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/sdk/auth";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { Logo } from "../logo";
import { Profile } from "../profile";
import Menu from "../menu";
import { LanguageToggle } from "../language-toggle";
import { getTranslations } from "next-intl/server";

export async function Navbar() {
  const session = await auth();
  const t = await getTranslations();

  return (
    <nav className="-translate-x-1/2 fixed top-6 left-1/2 z-50 mx-auto flex w-full max-w-[96%] items-center justify-between gap-2 rounded-2xl border bg-background/70 px-6 py-4 backdrop-blur-xl transition-all duration-300 lg:max-w-6xl">
      <div className="flex gap-4 items-center ">
        <Menu />
        <Logo />
      </div>
      <div className="flex gap-2 items-center">
        <LanguageToggle />
        <ModeToggle />
        {!session && (
          <form
            action={async () => {
              "use server";
              await signIn("discord", { redirectTo: "/" });
            }}
          >
            <Button type="submit">
              <DiscordLogoIcon className="mr-2 h-4 w-4" />
              {t("LoginButton.signIn")}
            </Button>
          </form>
        )}

        <Profile />
      </div>
    </nav>
  );
}
