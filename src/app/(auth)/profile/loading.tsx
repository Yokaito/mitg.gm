import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[250px] h-[20px] rounded-full" />
      <Separator />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[300px] h-[35px]" />
      <Skeleton className="w-[200px] h-[20px] rounded-full" />
      <Skeleton className="w-[130px] h-[35px]" />
    </div>
  );
}
