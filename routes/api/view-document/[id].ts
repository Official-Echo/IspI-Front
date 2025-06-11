import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const documentId = parseInt(id);

  const documents = {
    1: {
      id: 1,
      name: "Constitutional Law Analysis",
      filePath: "./sample.pdf",
      contentType: "application/pdf",
    },
    2: {
      id: 2,
      name: "Calculus Notes",
      filePath: "./sample.pdf",
      contentType: "application/pdf",
    },
    3: {
      id: 3,
      name: "Physics Lab Report",
      filePath: "./sample.pdf",
      contentType: "application/pdf",
    },
    4: {
      id: 4,
      name: "Shakespeare Essay",
      filePath: "./sample.pdf",
      contentType: "application/pdf",
    },
    5: {
      id: 5,
      name: "Chemistry Experiment Results",
      filePath: "./sample.pdf",
      contentType: "application/pdf",
    },
    6: {
      id: 6,
      name: "History of World War II",
      filePath: "./sample.pdf",
      contentType: "application/pdf",
    },
    7: {
      id: 7,
      name: "Computer Science Algorithms",
      filePath: "./sample.pdf",
      contentType: "application/pdf",
    },
    8: {
      id: 8,
      name: "Economics Market Analysis",
      filePath: "./sample.pdf",
      contentType: "application/pdf",
    },
  };

  const document = documents[documentId as keyof typeof documents];

  if (!document) {
    return new Response("Document not found", { status: 404 });
  }

  try {
    const fileData = await Deno.readFile(document.filePath);

    return new Response(fileData, {
      headers: {
        "Content-Type": document.contentType,
        "Content-Disposition": `inline; filename="${document.name}.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return new Response("File not found", { status: 404 });
  }
});
