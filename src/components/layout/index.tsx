export function Layout({ children }: { children: React.ReactNode }) {
  return <div className="pt-28 container w-full">{children}</div>;
}

export function Section({ children }: { children: React.ReactNode }) {
  return <section className="border rounded-2xl px-6 py-6">{children}</section>;
}
