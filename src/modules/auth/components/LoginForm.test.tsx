import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/modules/auth/components/LoginForm";

const { mockMutate } = vi.hoisted(() => ({ mockMutate: vi.fn() }));

vi.mock("@/modules/auth/hooks/use-login", () => ({
  useLogin: () => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    error: undefined,
    reset: vi.fn(),
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

describe("LoginForm", () => {
  it("calls mutate with credentials when submitted", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "user@test.com");
    await user.type(screen.getByLabelText("Senha"), "testPassword123");

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Entrar" })).not.toBeDisabled(),
    );

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(mockMutate).toHaveBeenCalledWith(
      { email: "user@test.com", password: "testPassword123" },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });
});
