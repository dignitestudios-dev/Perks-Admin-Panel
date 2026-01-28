import Link from "next/link";

export const metadata = {
  title: "Users",
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">Manage users and blocked accounts</p>
        </div>
        <nav className="flex items-center gap-2">
          <Link
            href="/dashboard/users"
            className="px-3 py-1 rounded-md text-sm bg-primary/5 text-primary hover:bg-primary/10"
          >
            All Users
          </Link>
          <Link
            href="/dashboard/users/blocked"
            className="px-3 py-1 rounded-md text-sm hover:bg-muted/5"
          >
            Blocked Users
          </Link>
        </nav>
      </div>
      <div className="px-4 lg:px-6">{children}</div>
    </div>
  );
}
