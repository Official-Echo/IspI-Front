import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const announcementId = parseInt(id);

  const mockAnnouncements = {
    1: {
      id: 1,
      description: "Contract law coursework with case studies",
      work_type: "coursework",
      subject_area: "Law",
      university: "Kyiv National University",
      initial_price: 800,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    },
    2: {
      id: 2,
      description: "Machine learning algorithms analysis",
      work_type: "essay",
      subject_area: "Computer Science",
      university: "Taras Shevchenko University",
      initial_price: 600,
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    },
    3: {
      id: 3,
      description: "IoT system design and implementation",
      work_type: "diploma",
      subject_area: "Engineering",
      university: "Igor Sikorsky Polytechnic",
      initial_price: 1500,
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    },
  };

  const announcement =
    mockAnnouncements[announcementId as keyof typeof mockAnnouncements];

  if (!announcement) {
    return new Response("Announcement not found", { status: 404 });
  }

  return Response.json(announcement);
});
