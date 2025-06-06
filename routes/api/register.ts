import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const formData = await req.formData();
  const pib = formData.get("pib") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone_number = formData.get("phone_number") as string;
  const role = formData.get("role") as string;
  const bank_card_number = formData.get("bank_card_number") as string;

  const existingUser = await checkUserExists(email);

  if (existingUser) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/register?error=exists" },
    });
  }

  const newUser = await createUser({
    pib,
    email,
    password,
    phone_number,
    role,
    bank_card_number,
  });

  if (newUser) {
    const response = new Response(null, {
      status: 302,
      headers: { Location: "/login?success=registered" },
    });
    return response;
  } else {
    return new Response(null, {
      status: 302,
      headers: { Location: "/register?error=failed" },
    });
  }
}

async function checkUserExists(email: string) {
  const mockUsers = [
    { email: "student@example.com" },
    { email: "teacher@example.com" },
    { email: "moderator@example.com" },
  ];
  return mockUsers.find((user) => user.email === email);
}

async function createUser(userData: any) {
  console.log("Creating user:", userData);
  return { id: Date.now(), ...userData };
}
