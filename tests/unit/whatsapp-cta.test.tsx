import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { AVALA_WHATSAPP } from "@/lib/handoff";

describe("WhatsAppCta", () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it("links straight to WhatsApp instead of an on-page anchor", () => {
    render(<WhatsAppCta location="hero" />);

    const link = screen.getByRole("link", { name: /agenda una demo/i });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining(`https://wa.me/${AVALA_WHATSAPP}`),
    );
    // The old CTAs pointed at "#contacto", 7.6 phone screens down, where a
    // four-question form waited. Nothing may point there again.
    expect(link.getAttribute("href")).not.toContain("#contacto");
  });

  it("opens in a new tab without handing the opener over", () => {
    render(<WhatsAppCta location="hero" />);

    const link = screen.getByRole("link", { name: /agenda una demo/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("says what pressing it does, so leaving the page is predictable", () => {
    render(<WhatsAppCta location="cierre" />);

    expect(screen.getByText(/se abre whatsapp/i)).toBeInTheDocument();
  });

  it("drops the note where there is no room for it", () => {
    render(<WhatsAppCta location="header" note={false} />);

    expect(screen.queryByText(/se abre whatsapp/i)).not.toBeInTheDocument();
  });

  it("reports which instance was pressed", async () => {
    const user = userEvent.setup();
    render(<WhatsAppCta location="demo" label="Agenda una demo · 20 min" />);

    await user.click(screen.getByRole("link", { name: /agenda una demo/i }));

    expect(window.dataLayer).toEqual([
      {
        event: "whatsapp_click",
        cta_location: "demo",
        channel: "whatsapp",
      },
    ]);
  });
});
