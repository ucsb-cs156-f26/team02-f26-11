const menuItemReviewFixtures = {
  oneReview: {
    id: 0,
    itemid: 0,
    reviewerEmail: "cg@ucsb.edu",
    stars: 5,
    dateReviewed: "2026-10-26T12:15:28",
    comments: "Man I really doubt I could put into words how much I love Carrillo!"
  },
  threeReviews: [
    {
      id: 1,
      itemid: 0,
      reviewerEmail: "cg@ucsb.edu",
      stars: 0,
      dateReviewed: "2026-10-26T20:15:28",
      comments: "I HATE Carrillo."
    },
    {
      id: 2,
      itemid: 1,
      reviewerEmail: "traff@ucsb.edu",
      stars: 3,
      dateReviewed: "2026-12-26T12:15:28",
      comments: "I am impartial to Carrillo."
    },
    {
      id: 3,
      itemid: 7,
      reviewerEmail: "elvis@ucsb.edu",
      stars: 4,
      dateReviewed: "2026-7-26T07:15:28",
      comments: "I wish I wasn't so far from Carrillo, I miss it :("
    },
  ],
};

export { menuItemReviewFixtures };
