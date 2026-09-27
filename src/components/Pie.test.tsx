import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Pie } from "./Pie";

describe("Pie", () => {
  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it("muestra el año actual", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2031-06-15T12:00:00Z"));

    render(<Pie />);

    expect(screen.getByRole("contentinfo").textContent).toBe("orq-sandbox · 2031");
  });
});
