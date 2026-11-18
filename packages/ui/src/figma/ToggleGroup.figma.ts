// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System
// source=packages/ui/src/atoms/toggle-group.tsx
// component=ToggleGroup
import figma from "figma";

const instance = figma.selectedInstance;
const variant = instance.getEnum("Variant", {
  Default: "default",
  Outline: "outline",
});

export default {
  example: figma.code`
    <ToggleGroup type="single" variant="${variant}">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
    </ToggleGroup>
  `,
  imports: [
    'import { ToggleGroup, ToggleGroupItem } from "@starter-monoropo/ui/atoms/toggle-group"',
  ],
  id: "starter-toggle-group",
  metadata: { nestable: true },
};
