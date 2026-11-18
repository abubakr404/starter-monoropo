import { describe, expect, it } from "vitest";
import { buttonVariants } from "./button";
import { chipVariants } from "./chip";
import { counterBadgeVariants } from "./counter-badge";
import { fabVariants } from "./fab";
import { imageFrameVariants } from "./image";
import { listItemVariants } from "./list-item";
import { overlayVariants } from "./overlay";
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
    expect(themeTokenGroups.colors).toContain("info");
    expect(Object.keys(figmaComponentNodes).length).toBeGreaterThan(0);
  });
});

describe("tour ds adaptation batch 1", () => {
  it("exposes chip tones including info", () => {
    expect(chipVariants({ tone: "info" })).toContain("text-info");
    expect(chipVariants({ selected: true })).toContain("ring-2");
  });

  it("exposes counter badge tones", () => {
    expect(counterBadgeVariants({ tone: "destructive", size: "sm" })).toContain("bg-destructive");
  });

  it("exposes fab soft + extended variants", () => {
    expect(fabVariants({ variant: "soft" })).toContain("bg-primary/15");
    expect(fabVariants({ extended: true })).toContain("rounded-full");
  });

  it("registers tour adaptation component keys in figma bridge", () => {
    expect("Chip" in figmaComponentNodes).toBe(true);
    expect("ToggleGroup" in figmaComponentNodes).toBe(true);
    expect("Stepper" in figmaComponentNodes).toBe(true);
  });
});

describe("tour ds adaptation batch 2", () => {
  it("exposes list item selected styles", () => {
    expect(listItemVariants({ selected: true })).toContain("bg-accent");
  });

  it("exposes image ratio and error state", () => {
    expect(imageFrameVariants({ ratio: "16:9" })).toContain("aspect-video");
    expect(imageFrameVariants({ state: "error" })).toContain("destructive");
  });

  it("exposes overlay opacity tokens", () => {
    expect(overlayVariants({ opacity: "heavy" })).toContain("bg-black/60");
  });

  it("registers media and list figma nodes", () => {
    expect(figmaComponentNodes.CalendarDay).toBeTruthy();
    expect(figmaComponentNodes.Upload).toBeTruthy();
    expect(figmaComponentNodes.ListItem).toBeTruthy();
    expect(figmaComponentNodes.Command).toBeTruthy();
    expect(figmaComponentNodes.Carousel).toBeTruthy();
  });
});
