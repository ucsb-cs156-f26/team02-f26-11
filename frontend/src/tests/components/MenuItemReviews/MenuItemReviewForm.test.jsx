import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router";

import MenuItemReviewForm from "main/components/MenuItemReview/MenuItemReviewForm";
import { menuItemReviewFixtures } from "fixtures/menuItemReviewFixtures";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { test } from "vitest";

const mockedNavigate = vi.fn();
vi.mock("react-router", async () => {
  const originalModule = await vi.importActual("react-router");
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate,
  };
});

describe("MenuItemReviewForm tests", () => {
  const queryClient = new QueryClient();

  const expectedHeaders = [
    "Reviewer Email",
    "Date (iso format)",
    "Item ID",
    "Stars",
    "Comment",
  ];
  const testId = "MenuItemReviewForm";

  test("renders correctly with no initialContents", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <MenuItemReviewForm />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });
  });

  test("renders correctly when passing in initialContents", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <MenuItemReviewForm
            initialContents={menuItemReviewFixtures.oneReview}
          />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expect(await screen.findByTestId(`${testId}-id`)).toBeInTheDocument();
    expect(screen.getByText(`Id`)).toBeInTheDocument();
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <MenuItemReviewForm />
        </Router>
      </QueryClientProvider>,
    );
    expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
    const cancelButton = screen.getByTestId(`${testId}-cancel`);

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });

  test("Correct error messages with no input", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <MenuItemReviewForm />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();
    const submitButton = screen.getByText(/Create/);
    fireEvent.click(submitButton);
    // await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    // checking for required fields
    await screen.findByText(/Reviewer Email is required./);
    expect(screen.getByText(/Date Reviewed is required./)).toBeInTheDocument();
    expect(screen.getByText(/Item ID is required./)).toBeInTheDocument();
    expect(screen.getByText(/Star rating is required./)).toBeInTheDocument();
    expect(screen.getByText(/Comment is required./)).toBeInTheDocument();
  });

  test("Correct error messages on bad input", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <MenuItemReviewForm />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();
    const submitButton = screen.getByText(/Create/);

    const dateInput = screen.getByTestId(`${testId}-dateReviewed`);
    const itemidInput = screen.getByTestId(`${testId}-itemid`);
    const starInput = screen.getByTestId(`${testId}-stars`);
    fireEvent.change(dateInput, { target: { value: "bad-input" } });
    fireEvent.change(itemidInput, { target: { value: -1 } });
    fireEvent.change(starInput, { target: { value: -1 } });
    fireEvent.click(submitButton);

    // await screen.findByText(/dateReviewed must be in iso format/);
    // expect(screen.getByText(/dateReviewed must be in iso format/)).toBeInTheDocument();
    await screen.findByText(/No negative Item ID's allowed./);
    expect(
      screen.getByText(/No negative Item ID's allowed./),
    ).toBeInTheDocument();
    await screen.findByText(/No star ratings lower than 0./);
    expect(
      screen.getByText(/No star ratings lower than 0./),
    ).toBeInTheDocument();

    fireEvent.change(starInput, { target: { value: 6 } });
    fireEvent.click(submitButton);
    // await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    await screen.findByText(/No star ratings higher than 5./);
    expect(
      screen.getByText(/No star ratings higher than 5./),
    ).toBeInTheDocument();
  });

  test("No Error messsages on good input", async () => {
    const mockSubmitAction = vi.fn();

    render(
      <Router>
        <MenuItemReviewForm submitAction={mockSubmitAction} />
      </Router>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();
    const submitButton = screen.getByText(/Create/);

    await screen.findByTestId(`${testId}-reviewerEmail`);
    const reviewerEmailField = screen.getByTestId(`${testId}-reviewerEmail`);
    const dateField = screen.getByTestId(`${testId}-dateReviewed`);
    const itemidField = screen.getByTestId(`${testId}-itemid`);
    const starField = screen.getByTestId(`${testId}-stars`);
    const commentField = screen.getByTestId(`${testId}-comments`);

    fireEvent.change(reviewerEmailField, { target: { value: "cg@ucsb.edu" } });
    fireEvent.change(dateField, {
      target: { value: "2022-01-02T12:00" },
    });
    fireEvent.change(itemidField, { target: { value: 1 } });
    fireEvent.change(starField, { target: { value: 3 } });
    fireEvent.change(commentField, { target: { value: "Yummers" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    expect(
      screen.queryByText(/dateReviewed must be in ISO format/),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/No negative Item ID's allowed./),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/No star ratings lower than 0./),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/No star ratings higher than 5./),
    ).not.toBeInTheDocument();
  });
});
