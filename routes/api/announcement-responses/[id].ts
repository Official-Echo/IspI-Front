import { defineRoute } from "$fresh/server.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const announcementId = parseInt(id);

  const mockResponses = {
    1: [
      {
        id: 101,
        teacher_id: 201,
        teacher_name: "Dr. Elena Kovalenko",
        teacher_experience: "15 years in Constitutional and Contract Law",
        teacher_rating: 4.8,
        suggested_price: 750,
        current_price: 750,
        estimated_days: 7,
      },
      {
        id: 102,
        teacher_id: 202,
        teacher_name: "Prof. Dmitri Petrov",
        teacher_experience: "12 years in Civil and Commercial Law",
        teacher_rating: 4.6,
        suggested_price: 650,
        current_price: 700,
        estimated_days: 5,
      },
      {
        id: 103,
        teacher_id: 203,
        teacher_name: "Dr. Anna Shevchenko",
        teacher_experience: "8 years in Legal Research and Analysis",
        teacher_rating: 4.9,
        suggested_price: 800,
        current_price: 800,
        estimated_days: 6,
      },
    ],
    2: [
      {
        id: 201,
        teacher_id: 301,
        teacher_name: "Dr. Oleksandr Tkachenko",
        teacher_experience: "10 years in AI and Machine Learning",
        teacher_rating: 4.7,
        suggested_price: 550,
        current_price: 580,
        estimated_days: 4,
      },
      {
        id: 202,
        teacher_id: 302,
        teacher_name: "Prof. Maria Bondarenko",
        teacher_experience: "14 years in Data Science and AI",
        teacher_rating: 4.9,
        suggested_price: 620,
        current_price: 620,
        estimated_days: 3,
      },
      {
        id: 203,
        teacher_id: 303,
        teacher_name: "Dr. Viktor Lysenko",
        teacher_experience: "6 years in Neural Networks and Deep Learning",
        teacher_rating: 4.5,
        suggested_price: 480,
        current_price: 520,
        estimated_days: 5,
      },
      {
        id: 204,
        teacher_id: 304,
        teacher_name: "Dr. Oksana Melnyk",
        teacher_experience: "9 years in Computer Vision and NLP",
        teacher_rating: 4.8,
        suggested_price: 600,
        current_price: 600,
        estimated_days: 4,
      },
      {
        id: 205,
        teacher_id: 305,
        teacher_name: "Prof. Andriy Kovalchuk",
        teacher_experience: "16 years in Machine Learning Research",
        teacher_rating: 4.6,
        suggested_price: 700,
        current_price: 650,
        estimated_days: 3,
      },
    ],
    3: [
      {
        id: 301,
        teacher_id: 401,
        teacher_name: "Dr. Roman Ivanov",
        teacher_experience: "12 years in IoT and Embedded Systems",
        teacher_rating: 4.7,
        suggested_price: 1400,
        current_price: 1450,
        estimated_days: 21,
      },
      {
        id: 302,
        teacher_id: 402,
        teacher_name: "Prof. Natalia Fedorenko",
        teacher_experience: "18 years in Systems Engineering",
        teacher_rating: 4.9,
        suggested_price: 1600,
        current_price: 1550,
        estimated_days: 18,
      },
    ],
  };

  const responses =
    mockResponses[announcementId as keyof typeof mockResponses] || [];

  return Response.json(responses);
});
