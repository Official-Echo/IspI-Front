import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const url = new URL(req.url);
  const filters = {
    workType: url.searchParams.get("workType") || "",
    subject: url.searchParams.get("subject") || "",
    dateFrom: url.searchParams.get("dateFrom") || "",
    dateTo: url.searchParams.get("dateTo") || "",
    priceMin: url.searchParams.get("priceMin") || "",
    priceMax: url.searchParams.get("priceMax") || "",
    sortBy: url.searchParams.get("sortBy") || "date",
    sortOrder: url.searchParams.get("sortOrder") || "desc",
    query: url.searchParams.get("query") || "",
  };

  const documents = await fetchDocuments({ filters, limit: 20 });
  return Response.json(documents);
});

async function fetchDocuments(
  { filters, limit }: { filters: any; limit: number },
) {
  let documents = [
    {
      id: 1,
      name: "Constitutional Law Analysis",
      work_type: "coursework",
      subject_area: "Law",
      upload_date: new Date("2024-01-15"),
    },
    {
      id: 2,
      name: "Calculus Notes",
      work_type: "notes",
      subject_area: "Math",
      upload_date: new Date("2024-02-01"),
    },
    {
      id: 3,
      name: "Physics Lab Report",
      work_type: "lab_report",
      subject_area: "Physics",
      upload_date: new Date("2024-01-20"),
    },
    {
      id: 4,
      name: "Shakespeare Essay",
      work_type: "essay",
      subject_area: "Literature",
      upload_date: new Date("2024-02-10"),
    },
    {
      id: 5,
      name: "Chemistry Experiment Results",
      work_type: "lab_report",
      subject_area: "Chemistry",
      upload_date: new Date("2024-01-25"),
    },
    {
      id: 6,
      name: "History of World War II",
      work_type: "essay",
      subject_area: "History",
      upload_date: new Date("2024-02-05"),
    },
    {
      id: 7,
      name: "Computer Science Algorithms",
      work_type: "notes",
      subject_area: "Computer Science",
      upload_date: new Date("2024-01-30"),
    },
    {
      id: 8,
      name: "Economics Market Analysis",
      work_type: "coursework",
      subject_area: "Economics",
      upload_date: new Date("2024-02-08"),
    },
  ];

  console.log("API: Filtering with query:", filters.query);

  if (filters.query && filters.query.trim()) {
    const query = filters.query.toLowerCase();
    documents = documents.filter((doc) =>
      doc.name.toLowerCase().includes(query) ||
      doc.work_type.toLowerCase().includes(query) ||
      doc.subject_area.toLowerCase().includes(query)
    );
    console.log("API: After search filtering:", documents.length, "documents");
  } else {
    console.log(
      "API: No search query - showing all documents:",
      documents.length,
    );
  }

  if (filters.workType) {
    documents = documents.filter((doc) => doc.work_type === filters.workType);
  }

  if (filters.subject) {
    documents = documents.filter((doc) => doc.subject_area === filters.subject);
  }

  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom);
    documents = documents.filter((doc) => doc.upload_date >= fromDate);
  }

  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo);
    documents = documents.filter((doc) => doc.upload_date <= toDate);
  }

  documents.sort((a, b) => {
    let comparison = 0;
    switch (filters.sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "subject":
        comparison = a.subject_area.localeCompare(b.subject_area);
        break;
      case "type":
        comparison = a.work_type.localeCompare(b.work_type);
        break;
      case "date":
      default:
        comparison = a.upload_date.getTime() - b.upload_date.getTime();
        break;
    }
    return filters.sortOrder === "desc" ? -comparison : comparison;
  });

  return documents.slice(0, limit);
}
