import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeaderUser } from "@shared/components/layout/Header/HeaderUser"

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}))

describe("HeaderUser", () => {
  it("shows login and register links when user is null", () => {
    render(<HeaderUser user={null} />)
    expect(screen.getByText("Entrar")).toBeInTheDocument()
    expect(screen.getByText("Cadastrar")).toBeInTheDocument()
  })

  it("shows user initials in avatar when logged in", () => {
    render(
      <HeaderUser
        user={{
          id: 1,
          name: "Caio Planinschek",
          email: "c@x.com",
          createdAt: new Date(),
        }}
      />,
    )
    expect(screen.getByText("CP")).toBeInTheDocument()
  })
})
