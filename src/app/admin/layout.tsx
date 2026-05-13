export const metadata = { title: "Admin · Novaterra" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Both /admin/login and /admin/(panel)/* render through here. The (panel) route
  // group wraps everything else with the AdminShell. Login renders bare.
  return <>{children}</>;
}
