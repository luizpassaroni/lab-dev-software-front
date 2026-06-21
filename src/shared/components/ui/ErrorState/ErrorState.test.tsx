import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("renders custom title and description", () => {
    render(
      <ErrorState
        title="Falha ao buscar dados"
        description="Tente novamente em instantes."
      />,
    );

    expect(screen.getByText("Falha ao buscar dados")).toBeInTheDocument();
    expect(
      screen.getByText("Tente novamente em instantes."),
    ).toBeInTheDocument();
  });

  it("does not render retry button without onRetry", () => {
    render(<ErrorState />);

    expect(
      screen.queryByRole("button", { name: "Tentar de novo" }),
    ).not.toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);

    await user.click(screen.getByRole("button", { name: "Tentar de novo" }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("disables retry button while retrying", () => {
    render(<ErrorState onRetry={vi.fn()} retrying />);

    expect(
      screen.getByRole("button", { name: "Tentar de novo" }),
    ).toBeDisabled();
  });
});
