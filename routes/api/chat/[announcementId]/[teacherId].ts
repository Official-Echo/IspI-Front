import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { announcementId, teacherId } = ctx.params;

  if (req.method === "GET") {
    const mockMessages = [
      {
        id: 1,
        sender: "teacher",
        suggested_price: parseInt(teacherId) === 201
          ? 750
          : parseInt(teacherId) === 301
          ? 580
          : 1450,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: 2,
        sender: "student",
        suggested_price: parseInt(teacherId) === 201
          ? 700
          : parseInt(teacherId) === 301
          ? 550
          : 1400,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
      {
        id: 3,
        sender: "teacher",
        suggested_price: parseInt(teacherId) === 201
          ? 680
          : parseInt(teacherId) === 301
          ? 530
          : 1350,
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
    ];

    return Response.json({ messages: mockMessages });
  }

  if (req.method === "POST") {
    console.log(
      `New price offer from user to teacher ${teacherId} for announcement ${announcementId}`,
    );
    const body = await req.json();
    console.log("Price offer:", body);

    return Response.json({ success: true });
  }

  return new Response("Method not allowed", { status: 405 });
});
