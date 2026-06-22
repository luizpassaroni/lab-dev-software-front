import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("renders the requested amount of poster skeleton cards", () => {
    const { container } = render(<LoadingState count={4} />);

    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(
      12,
    );
  });
});
