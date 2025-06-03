import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  const isAuthenticated = await checkAuth(req);
  const user = isAuthenticated ? await fetchUserData(req) : null;

  ctx.state.isAuthenticated = isAuthenticated;
  ctx.state.user = user;

  return await ctx.next();
}

async function checkAuth(req: Request): Promise<boolean> {
  return req.headers.get("Authorization") === "Bearer example-token";
}

async function fetchUserData(req: Request) {
  const rand = Math.random() % 3;
  if (rand === 1) {
    return {
      id: Math.random() % 1000,
      pib: "John Doe",
      email: "john@example.com",
      role: "student",
      subscription: true,
      activation_date: new Date(),
      bank_card_number: "1234-5678-9012-3456",
    };
  } else if (rand === 2) {
    return {
      id: 2,
      pib: "Jane Smith",
      email: "jane@example.com",
      role: "teacher",
      subscription: false,
      activation_date: new Date(),
      bank_card_number: "9876-5432-1098-7654",
    };
  } else {
    return {
      id: 3,
      pib: "Vaas Montenegro",
      email: "vaas@example.org",
      role: "moderator",
      subscription: true,
      activation_date: new Date(),
      bank_card_number: "1111-2222-3333-4444",
    };
  }
}
