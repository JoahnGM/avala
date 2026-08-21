import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClosingSection } from "@/components/closing-section";

describe("ClosingSection", () => {
  it("renders the closing heading", () => {
    render(<ClosingSection />);

    expect(
      screen.getByRole("heading", { name: /devuélvele a tu equipo/i }),
    ).toBeInTheDocument();
  });

  it("anchors the section at #contacto", () => {
    const { container } = render(<ClosingSection />);

    expect(container.querySelector("#contacto")).toBeInTheDocument();
  });

  it("converts straight into WhatsApp, with no questions first", () => {
    render(<ClosingSection />);

    const link = screen.getByRole("link", { name: /agenda una demo/i });
    expect(link.getAttribute("href")).toContain("https://wa.me/");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(
      screen.queryByText(/¿qué quieres resolver con tus proveedores\?/i),
    ).not.toBeInTheDocument();
  });

  // claims-audit.md finding 16 / N-019 — the landing collects nothing now, but
  // the purpose limitation and the deletion channel are still owed.
  it("keeps the Ley 1581 notice next to the ask", () => {
    render(<ClosingSection />);

    expect(screen.getByText(/ley 1581 de 2012/i)).toBeInTheDocument();
    expect(screen.getByText(/los eliminamos cuando nos lo pidas/i)).toBeInTheDocument();
  });

  // The first step used to say "te escribimos"; the visitor now writes first.
  it("describes what happens after, starting from their message", () => {
    render(<ClosingSection />);

    expect(screen.getByText(/nos escribes por whatsapp/i)).toBeInTheDocument();
  });
});
