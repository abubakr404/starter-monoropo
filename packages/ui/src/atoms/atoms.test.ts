import { describe, expect, it } from "vitest";
import { buttonVariants } from "./button";
import { toggleVariants } from "./toggle";
import { themeTokenGroups } from "../theme/tokens";
import { figmaComponentNodes } from "../theme/figma-bridge";

describe("ui atoms expansion", () => {
  it("exposes button icon size for IconButton", () => {
    expect(buttonVariants({ size: "icon" })).toContain("h-control-md");
  });

  it("exposes toggle outline variant", () => {
    expect(toggleVariants({ variant: "outline" })).toContain("border");
  });

  it("keeps theme color groups for bridge", () => {
    expect(themeTokenGroups.colors).toContain("primary");
    expect(Object.keys(figmaComponentNodes).length).toBeGreaterThan(0);
  });
});
