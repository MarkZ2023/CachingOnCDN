import { continueAsGuest, signIn, signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/lib/auth";

type UserAuthProps = {
  returnTo: string;
};

export async function UserAuth({ returnTo }: UserAuthProps) {
  const user = await getAuthUser();

  if (user) {
    return (
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{user}</span>
        </span>
        <form action={signOut}>
          <input type="hidden" name="returnTo" value={returnTo} />
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground">Anonymous</span>
      <form action={signIn} className="flex items-center gap-1.5">
        <input type="hidden" name="returnTo" value={returnTo} />
        <input
          name="username"
          type="text"
          placeholder="Your name"
          required
          minLength={1}
          maxLength={32}
          className="h-7 w-28 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        <Button type="submit" size="sm">
          Sign in
        </Button>
      </form>
      <form action={continueAsGuest}>
        <input type="hidden" name="returnTo" value={returnTo} />
        <Button type="submit" variant="ghost" size="sm">
          Stay anonymous
        </Button>
      </form>
    </div>
  );
}
