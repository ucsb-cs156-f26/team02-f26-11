const helpRequestFixtures = {
  oneHelpRequest: {
      id: 1,
      requesterEmail: "email1@ucsb.edu",
      teamId: "f26-6pm-11",
      tableOrBreakoutRoom: "11",
      requestTime: "2026-01-02T12:00:00",
      explanation: "I need help with problem 23.",
      solved: false,
  },
  threeHelpRequests: [
    {
      id: 1,
      requesterEmail: "email1@ucsb.edu",
      teamId: "f26-6pm-11",
      tableOrBreakoutRoom: "11",
      requestTime: "2026-01-02T12:00:00",
      explanation: "I need help with problem 23.",
      solved: false,
    },
    {
      id: 2,
      requesterEmail: "email2@ucsb.edu",
      teamId: "f26-5pm-3",
      tableOrBreakoutRoom: "3",
      requestTime: "2026-02-03T12:00:00",
      explanation: "I am having trouble on dokku.",
      solved: false,
    },
    {
      id: 3,
      requesterEmail: "email3@ucsb.edu",
      teamId: "f26-6pm-12",
      tableOrBreakoutRoom: "12",
      requestTime: "2026-06-04T12:00:00",
      explanation: "I would like help with a merge conflict.",
      solved: false,
    },
  ],
};

export { helpRequestFixtures };
