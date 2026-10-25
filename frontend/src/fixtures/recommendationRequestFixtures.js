const recommendationRequestFixtures = {
  oneDate: {
    id: 1,
    requesterEmail: "alice@ucsb.edu",
    professorEmail: "professor@ucsb.edu",
    explanation: "I am applying to graduate school and need a recommendation.",
    dateRequested: "2026-01-02T12:00:00",
    dateNeeded: "2026-01-15T12:00:00",
    done: true,
  },
  threeDates: [
    {
      id: 1,
      requesterEmail: "alice@ucsb.edu",
      professorEmail: "professor@ucsb.edu",
      explanation: "I am applying to graduate school and need a recommendation.",
      dateRequested: "2026-01-02T12:00:00",
      dateNeeded: "2026-01-15T12:00:00",
      done: true,
    },
    {
      id: 2,
      requesterEmail: "bob@ucsb.edu",
      professorEmail: "professor2@ucsb.edu",
      explanation: "I am applying to graduate school and need a recommendation too.",
      dateRequested: "2026-10-01T00:00:00",
      dateNeeded: "2026-10-10T12:00:00",
      done: false,
    },
    {
      id: 3,
      requesterEmail: "charlie@ucsb.edu",
      professorEmail: "professor3@ucsb.edu",
      explanation: "I am also applying to graduate school and need a recommendation.",
      dateRequested: "2026-10-05T00:00:00",
      dateNeeded: "2026-10-15T12:00:00",
      done: false,
    },
  ],
};

export { recommendationRequestFixtures };
