import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SourceNote } from "@/components/ui/source-note";

describe("SourceNote", () => {
  it("renders the provenance text it is given", () => {
    render(<SourceNote>Ley 1607/2012 · art. 179</SourceNote>);

    expect(screen.getByText("Ley 1607/2012 · art. 179")).toBeInTheDocument();
  });

  it("renders an illustrative marker just as well", () => {
    render(<SourceNote>Cifra ilustrativa</SourceNote>);

    expect(screen.getByText("Cifra ilustrativa")).toBeInTheDocument();
  });

  // design/tokens.md — provenance is a caption, so it must stay in the muted
  // mono treatment and never borrow the `stamp` accent reserved for actions.
  it("uses the muted mono caption treatment", () => {
    render(<SourceNote>Cifra ilustrativa</SourceNote>);

    const note = screen.getByText("Cifra ilustrativa");
    expect(note).toHaveClass("font-mono", "text-caption", "text-graphite");
    expect(note).not.toHaveClass("text-stamp");
  });
});
