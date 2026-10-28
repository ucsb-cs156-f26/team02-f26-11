import React from "react";
import RecommendationRequestsTable from "main/components/RecommendationRequests/RecommendationRequestTable";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { http, HttpResponse } from "msw";

export default {
  title: "components/RecommendationRequests/RecommendationRequestsTable",
  component: RecommendationRequestsTable,
};

const Template = (args) => {
  return <RecommendationRequestsTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  recommendationRequests: [],
  currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
  recommendationRequests: recommendationRequestFixtures.threeDates,
  currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
  recommendationRequests: recommendationRequestFixtures.threeDates,
  currentUser: currentUserFixtures.adminUser,
};

ThreeItemsAdminUser.parameters = {
  msw: {
    handlers: [
      http.delete("/api/recommendationrequests", () => {
        return HttpResponse.json({ message: "Recommendation request deleted" });
      }),
    ],
  },
};
