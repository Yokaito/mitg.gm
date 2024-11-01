import { auth } from "../auth";

export default async function Authenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    return { children };
  }

  return <div>Not Authenticated</div>;
}
