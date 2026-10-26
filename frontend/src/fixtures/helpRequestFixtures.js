const helpRequestFixtures = {
  oneHelpRequest: {
      id: 1,
      requesterEmail: "email@ucsb.edu",
      teamId: "f26-6pm-11",
      tableOrBreakoutRoom: "11",
      requestTime: "2026-01-02T12:00:00",
      explanation: "Dokku problems",
      solved: false,
  },
  threeHelpRequests: [
    {
      id: 1,
      requesterEmail: "email@ucsb.edu",
      teamId: "f26-6pm-11",
      tableOrBreakoutRoom: "11",
      requestTime: "2026-01-02T12:00:00",
      explanation: "Dokku problems",
      solved: false,
    },
    {
      id: 2,
      requesterEmail: "otheremail@ucsb.edu",
      teamId: "f26-5pm-3",
      tableOrBreakoutRoom: "3",
      requestTime: "2026-02-03T12:00:00",
      explanation: "Github problems",
      solved: false,
    },
    {
      id: 3,
      requesterEmail: "student@ucsb.edu",
      teamId: "f26-6pm-12",
      tableOrBreakoutRoom: "12",
      requestTime: "2026-06-04T12:00:00",
      explanation: "Merge conflict",
      solved: false,
    },
  ],
};

export { helpRequestFixtures };
