import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  const isAuthenticated = await checkAuth(req);
  const user = isAuthenticated ? await fetchUserData(req) : null;

  ctx.state.isAuthenticated = isAuthenticated;
  ctx.state.user = user;

  return await ctx.next();
}

async function checkAuth(req: Request): Promise<boolean> {
  const cookies = req.headers.get("Cookie");
  return cookies?.includes("auth-token=") || false;
}

async function fetchUserData(req: Request) {
  const cookies = req.headers.get("Cookie");

  if (!cookies?.includes("auth-token=")) {
    return null;
  }

  const tokenMatch = cookies.match(/auth-token=valid-token-(\d+)/);
  const userId = tokenMatch ? parseInt(tokenMatch[1]) : null;

  const mockUsers = [
    {
      id: 1,
      pib: "John Doe",
      email: "student@example.com",
      role: "student",
      subscription: "Free",
      activation_date: new Date(),
      bank_card_number: "1234-5678-9012-3456",
      upload_count: 5,
    },
    {
      id: 2,
      pib: "Jane Smith",
      email: "teacher@example.com",
      role: "teacher",
      subscription: "Бібліотекар",
      activation_date: new Date(),
      bank_card_number: "9876-5432-1098-7654",
      upload_count: 12,
    },
    {
      id: 3,
      pib: "Vaas Montenegro",
      email: "moderator@example.com",
      role: "moderator",
      subscription: "Захист+",
      activation_date: new Date(),
      bank_card_number: "1111-2222-3333-4444",
      upload_count: 0,
    },
  ];

  return mockUsers.find((user) => user.id === userId) || null;
}
