import { Separator } from "@/components/ui/separator";
import { auth } from "@/sdk/auth";
import { getTranslations } from "next-intl/server";
import { ProfileForm } from "./components/profile-form";
import { dbUserConfig } from "@/sdk/database/models/user-config";
import { firestoreAuthenticatedServer } from "@/sdk/firebase/firestore.server";

export default async function Profile() {
  const session = await auth();
  const t = await getTranslations();

  const { firestore } = await firestoreAuthenticatedServer();

  const userConfig = await dbUserConfig(firestore).createDefaultIfNeeded(
    session!.user.id
  );

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{t("Profile.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("Profile.description")}
          </p>
        </div>
        <Separator />
        <ProfileForm userConfig={userConfig} />
      </div>
    </>
  );
}
