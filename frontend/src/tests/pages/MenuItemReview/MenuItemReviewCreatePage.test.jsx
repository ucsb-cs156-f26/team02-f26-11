import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MenuItemReviewCreatePage from "main/pages/MenuItemReview/MenuItemReviewCreatePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
// import { expect } from "vitest";

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
    Navigate: vi.fn((x) => {
      mockNavigate(x);
      return null;
    }),
  };
});

describe("MenuItemReviewCreatePage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    vi.clearAllMocks();
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  });

  test("renders without crashing", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MenuItemReviewCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Item ID")).toBeInTheDocument();
    });
  });

  test("on submit, makes request to backend, and redirects to /menuitemreview", async () => {
    const queryClient = new QueryClient();
    const review = {
      id: 1,
      itemid: 0,
      reviewerEmail: "cg@ucsb.edu",
      stars: 5,
      dateReviewed: "2022-10-26T00:00:00",
      comments: "I can't describe how much I love Carrillo!",
    };

    axiosMock.onPost("/api/menuitemreview/post").reply(202, review);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MenuItemReviewCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Item ID")).toBeInTheDocument();
    });

    const itemidInput = screen.getByLabelText("Item ID");
    expect(itemidInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText("Reviewer Email");
    expect(emailInput).toBeInTheDocument();

    const starInput = screen.getByLabelText("Stars");
    expect(starInput).toBeInTheDocument();

    const dateInput = screen.getByLabelText("Date (iso format)");
    expect(dateInput).toBeInTheDocument();

    const commentInput = screen.getByLabelText("Comment");
    expect(commentInput).toBeInTheDocument();

    const createButton = screen.getByText("Create");
    expect(createButton).toBeInTheDocument();

    fireEvent.change(itemidInput, { target: { value: 0 } });
    fireEvent.change(emailInput, { target: { value: "cg@ucsb.edu" } });
    fireEvent.change(starInput, { target: { value: 5 } });
    fireEvent.change(dateInput, { target: { value: "2022-10-26T00:00:00" } });
    fireEvent.change(commentInput, {
      target: { value: "I can't describe how much I love Carrillo!" },
    });

    fireEvent.click(createButton);

    await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

    expect(axiosMock.history.post[0].params).toEqual({
      itemid: "0",
      reviewerEmail: "cg@ucsb.edu",
      stars: "5",
      dateReviewed: "2022-10-26T00:00",
      comments: "I can't describe how much I love Carrillo!",
    });

    // assert - check that the toast was called with the expected message
    expect(mockToast).toBeCalledWith(
      "New review Created - id: 1 item id: 0 email: cg@ucsb.edu stars: 5 date: 2022-10-26T00:00:00 comments: I can't describe how much I love Carrillo!",
    );
    expect(mockNavigate).toBeCalledWith({ to: "/menuitemreview" });
  });
});
