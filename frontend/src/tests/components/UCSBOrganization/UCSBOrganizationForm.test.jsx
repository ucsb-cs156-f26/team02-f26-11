import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router";

import UCSBOrganizationForm from "main/components/UCSBOrganization/UCSBOrganizationForm";
import { ucsbOrganizationFixtures } from "fixtures/ucsbOrganizationFixtures";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockedNavigate = vi.fn();
vi.mock("react-router", async () => {
  const originalModule = await vi.importActual("react-router");
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate,
  };
});

describe("UCSBOrganizationForm tests", () => {
  const queryClient = new QueryClient();

  const expectedHeaders = [
    "Organization Code",
    "Short Organization Name",
    "Full Organization Name",
    "Is the Organization Inactive?",
  ];
  const testId = "UCSBOrganizationForm";

  test("renders correctly with no initialContents", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <UCSBOrganizationForm />
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
          <UCSBOrganizationForm
            initialContents={ucsbOrganizationFixtures.oneOrganization}
          />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expect(await screen.findByTestId(`${testId}-orgCode`)).toBeInTheDocument();
    expect(screen.getByText(`Organization Code`)).toBeInTheDocument();
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <UCSBOrganizationForm />
        </Router>
      </QueryClientProvider>,
    );
    expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
    const cancelButton = screen.getByTestId(`${testId}-cancel`);

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });

  test("that the correct validations are performed", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <UCSBOrganizationForm />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();
    const submitButton = screen.getByText(/Create/);
    fireEvent.click(submitButton);

    await screen.findByText(/Organization code is required/);
    expect(
      screen.getByText(/Short organization name is required/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Full organization name is required/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Organization status is required/),
    ).toBeInTheDocument();

    const orgInput = screen.getByTestId(`${testId}-orgCode`);
    const shortInput = screen.getByTestId(`${testId}-orgTranslationShort`);
    fireEvent.change(orgInput, { target: { value: "a".repeat(4) } });
    fireEvent.change(shortInput, { target: { value: "a".repeat(101) } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Maximum length is 3 characters/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Maximum length is 100 characters/),
      ).toBeInTheDocument();
    });
  });

test("submits valid data with inactive set to true", async () => {
  const submitAction = vi.fn();

  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <UCSBOrganizationForm submitAction={submitAction} />
      </Router>
    </QueryClientProvider>,
  );

  fireEvent.change(screen.getByTestId(`${testId}-orgCode`), {
    target: { value: "ABC" },
  });

  fireEvent.change(screen.getByTestId(`${testId}-orgTranslationShort`), {
    target: { value: "Short Name" },
  });

  fireEvent.change(screen.getByTestId(`${testId}-orgTranslation`), {
    target: { value: "Full Organization Name" },
  });

  fireEvent.change(screen.getByTestId(`${testId}-inactive`), {
    target: { value: "true" },
  });

  fireEvent.click(screen.getByTestId(`${testId}-submit`));

  await waitFor(() => {
    expect(submitAction).toHaveBeenCalledWith({
      orgCode: "ABC",
      orgTranslationShort: "Short Name",
      orgTranslation: "Full Organization Name",
      inactive: true,
    });
  });
});

test("submits valid data with inactive set to true", async () => {
  const submitAction = vi.fn();

  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <UCSBOrganizationForm submitAction={submitAction} />
      </Router>
    </QueryClientProvider>,
  );

  fireEvent.change(screen.getByTestId(`${testId}-orgCode`), {
    target: { value: "ABC" },
  });
  fireEvent.change(screen.getByTestId(`${testId}-orgTranslationShort`), {
    target: { value: "Alphabet Club" },
  });
  fireEvent.change(screen.getByTestId(`${testId}-orgTranslation`), {
    target: { value: "Alphabet Club @ UCSB" },
  });
  fireEvent.change(screen.getByTestId(`${testId}-inactive`), {
    target: { value: "true" },
  });
  fireEvent.click(screen.getByTestId(`${testId}-submit`));

  await waitFor(() => {
    expect(submitAction).toHaveBeenCalledWith({
      orgCode: "ABC",
      orgTranslationShort: "Alphabet Club",
      orgTranslation: "Alphabet Club @ UCSB",
      inactive: true,
    });
  });
});

test("submits valid data with inactive set to false", async () => {
  const submitAction = vi.fn();

  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <UCSBOrganizationForm submitAction={submitAction} />
      </Router>
    </QueryClientProvider>,
  );

  fireEvent.change(screen.getByTestId(`${testId}-orgCode`), {
    target: { value: "ABC" },
  });
  fireEvent.change(screen.getByTestId(`${testId}-orgTranslationShort`), {
    target: { value: "Alphabet Club" },
  });
  fireEvent.change(screen.getByTestId(`${testId}-orgTranslation`), {
    target: { value: "Alphabet Club @ UCSB" },
  });
  fireEvent.change(screen.getByTestId(`${testId}-inactive`), {
    target: { value: "false" },
  });
  fireEvent.click(screen.getByTestId(`${testId}-submit`));

  await waitFor(() => {
    expect(submitAction).toHaveBeenCalledWith({
      orgCode: "ABC",
      orgTranslationShort: "Alphabet Club",
      orgTranslation: "Alphabet Club @ UCSB",
      inactive: false,
    });
  });
});

test("converts defined inactive value to a string", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <UCSBOrganizationForm
          initialContents={{
            orgCode: "ABC",
            orgTranslationShort: "Alphabet Club",
            orgTranslation: "Alphabet Club @ UCSB",
            inactive: true,
          }}
        />
      </Router>
    </QueryClientProvider>,
  );

  expect(screen.getByTestId(`${testId}-inactive`)).toHaveValue("true");
});
});

