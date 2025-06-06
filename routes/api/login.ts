import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const formData = await req.formData();
  const email = (formData.get("email") as string).trim();
  const password = (formData.get("password") as string).trim();

  const user = await authenticateUser(email, password);

  if (user) {
    const response = new Response(null, {
      status: 302,
      headers: { Location: "/cabinet" },
    });

    response.headers.set(
      "Set-Cookie",
      `auth-token=valid-token-${user.id}; Path=/; HttpOnly`,
    );
    return response;
  } else {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login?error=invalid" },
    });
  }
}

async function authenticateUser(email: string, password: string) {
  const mockUsers = [
    {
      id: 1,
      pib: "John Doe",
      email: "student@example.com",
      password: "password",
      role: "student",
      subscription: true,
      activation_date: new Date(),
      bank_card_number: "1234-5678-9012-3456",
    },
    {
      id: 2,
      pib: "Jane Smith",
      email: "teacher@example.com",
      password: "password",
      role: "teacher",
      subscription: false,
      activation_date: new Date(),
      bank_card_number: "9876-5432-1098-7654",
    },
    {
      id: 3,
      pib: "Vaas Montenegro",
      email: "moderator@example.com",
      password: "password",
      role: "moderator",
      subscription: true,
      activation_date: new Date(),
      bank_card_number: "1111-2222-3333-4444",
    },
  ];

  return mockUsers.find((user) =>
    user.email === email && user.password === password
  );
}
