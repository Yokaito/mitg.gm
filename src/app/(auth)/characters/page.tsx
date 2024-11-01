import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <div className="space-y-6 pb-16 block">
      <div className="flex flex-row justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Characters</h2>
          <p className="text-muted-foreground">
            Manage your characters and create new ones.
          </p>
        </div>
        <Button>Create Character</Button>
      </div>
      <Separator className="my-6" />
    </div>
  );
}
