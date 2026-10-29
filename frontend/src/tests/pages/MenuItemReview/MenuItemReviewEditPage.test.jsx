import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import MenuItemReviewEditPage from "main/pages/MenuItemReview/MenuItemReviewEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "tests/testutils/mockConsole";

const mockToast = vi.fn();
vi.mock("react-toastify", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    toast: vi.fn((x) => mockToast(x)),
  };
});

const mockNavigate = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    useParams: vi.fn(() => ({
      id: 1,
    })),
    Navigate: vi.fn((x) => {
      mockNavigate(x);
      return null;
    }),
  };
});

let axiosMock;
describe("MenuItemReviewEditPage tests", () => {
  describe("when the backend doesn't return data", () => {
    beforeEach(() => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock.onGet("/api/menuitemreview", { params: { id: 17 } }).timeout();
    });

    afterEach(() => {
      mockToast.mockClear();
      mockNavigate.mockClear();
      axiosMock.restore();
      axiosMock.resetHistory();
    });

    const queryClient = new QueryClient();
    test("renders header but table is not present", async () => {
      const restoreConsole = mockConsole();

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <MenuItemReviewEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );
      await screen.findByText("Edit MenuItemReview");
      expect(
        screen.queryByTestId("MenuItemReview-itemid"),
      ).not.toBeInTheDocument();
      restoreConsole();
    });
  });

  describe("tests where backend is working normally", () => {
    beforeEach(() => {
      axiosMock = new AxiosMockAdapter(axios);
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock.onGet("/api/menuitemreview", { params: { id: 1 } }).reply(200, {
        id: 1,
        itemid: 0,
        reviewerEmail: "cg@ucsb.edu",
        stars: 5,
        dateReviewed: "2022-10-26T00:00:00",
        comments: "I can't describe how much I love Carrillo!",
      });
      axiosMock.onPut("/api/menuitemreview").reply(200, {
        id: "1",
        itemid: 1,
        reviewerEmail: "cga@ucsb.edu",
        stars: 3,
        dateReviewed: "2026-10-26T00:00:00",
        comments: "I really love Carrillo.",
      });
    });

    afterEach(() => {
      mockToast.mockClear();
      mockNavigate.mockClear();
      axiosMock.restore();
      axiosMock.resetHistory();
    });

    const queryClient = new QueryClient();

    test("Is populated with the data provided", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <MenuItemReviewEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );

      await screen.findByTestId("MenuItemReviewForm-id");

      const idField = screen.getByTestId("MenuItemReviewForm-id");
      const itemidField = screen.getByTestId("MenuItemReviewForm-itemid");
      const emailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
      const starsField = screen.getByTestId("MenuItemReviewForm-stars");
      const dateField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
      const commentField = screen.getByTestId("MenuItemReviewForm-comments");
      const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

      expect(idField).toBeInTheDocument();
      expect(idField).toHaveValue("1");
      expect(itemidField).toBeInTheDocument();
      expect(itemidField).toHaveValue(0);
      expect(emailField).toBeInTheDocument();
      expect(emailField).toHaveValue("cg@ucsb.edu");
      expect(starsField).toBeInTheDocument();
      expect(starsField).toHaveValue(5);
      expect(dateField).toBeInTheDocument();
      expect(dateField).toHaveValue("2022-10-26T00:00");
      expect(commentField).toBeInTheDocument();
      expect(commentField).toHaveValue(
        "I can't describe how much I love Carrillo!",
      );

      expect(submitButton).toHaveTextContent("Update");

      fireEvent.change(itemidField, {
        target: { value: "1" },
      });
      fireEvent.change(emailField, {
        target: { value: "cga@ucsb.edu" },
      });
      fireEvent.change(starsField, {
        target: { value: "3" },
      });
      fireEvent.change(dateField, {
        target: { value: "2026-10-26T00:00:00" },
      });
      fireEvent.change(commentField, {
        target: { value: "I really love Carrillo." },
      });
      fireEvent.click(submitButton);

      await waitFor(() => expect(mockToast).toBeCalled());
      expect(mockToast).toBeCalledWith(
        "Review Updated - id: 1 item id: 1 email: cga@ucsb.edu stars: 3 date: 2026-10-26T00:00:00 comments: I really love Carrillo.",
      );

      expect(mockNavigate).toBeCalledWith({ to: "/menuitemreview" });

      expect(axiosMock.history.put.length).toBe(1); // times called
      expect(axiosMock.history.put[0].params).toEqual({ id: 1 });
      expect(axiosMock.history.put[0].data).toBe(
        JSON.stringify({
          itemid: "1",
          reviewerEmail: "cga@ucsb.edu",
          stars: "3",
          dateReviewed: "2026-10-26T00:00",
          comments: "I really love Carrillo.",
        }),
      ); // posted object
    });

    test("Changes when you click Update", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <MenuItemReviewEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );

      await screen.findByTestId("MenuItemReviewForm-id");

      const idField = screen.getByTestId("MenuItemReviewForm-id");
      const itemidField = screen.getByTestId("MenuItemReviewForm-itemid");
      const emailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
      const starsField = screen.getByTestId("MenuItemReviewForm-stars");
      const dateField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
      const commentField = screen.getByTestId("MenuItemReviewForm-comments");
      const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

      expect(idField).toBeInTheDocument();
      expect(idField).toHaveValue("1");
      expect(itemidField).toBeInTheDocument();
      expect(itemidField).toHaveValue(0);
      expect(emailField).toBeInTheDocument();
      expect(emailField).toHaveValue("cg@ucsb.edu");
      expect(starsField).toBeInTheDocument();
      expect(starsField).toHaveValue(5);
      expect(dateField).toBeInTheDocument();
      expect(dateField).toHaveValue("2022-10-26T00:00");
      expect(commentField).toBeInTheDocument();
      expect(commentField).toHaveValue(
        "I can't describe how much I love Carrillo!",
      );

      expect(submitButton).toHaveTextContent("Update");

      fireEvent.change(itemidField, {
        target: { value: "1" },
      });
      fireEvent.change(emailField, {
        target: { value: "cga@ucsb.edu" },
      });
      fireEvent.change(starsField, {
        target: { value: "3" },
      });
      fireEvent.change(dateField, {
        target: { value: "2026-10-26T00:00:00" },
      });
      fireEvent.change(commentField, {
        target: { value: "I really love Carrillo." },
      });
      fireEvent.click(submitButton);

      await waitFor(() => expect(mockToast).toBeCalled());
      expect(mockToast).toBeCalledWith(
        "Review Updated - id: 1 item id: 1 email: cga@ucsb.edu stars: 3 date: 2026-10-26T00:00:00 comments: I really love Carrillo.",
      );
      expect(mockNavigate).toBeCalledWith({ to: "/menuitemreview" });
    });
  });
});
