export async function handler(req: Request) {
  const response = new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });

  response.headers.set(
    "Set-Cookie",
    "auth-token=; Path=/; HttpOnly; Max-Age=0",
  );
  return response;
}
