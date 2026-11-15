// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=5-15
// source=packages/ui/src/atoms/checkbox.tsx
// component=Checkbox
import figma from "figma";

const instance = figma.selectedInstance;
const state = instance.getEnum("State", {
  Unchecked: false,
  Checked: true,
});

export default {
  example: figma.code`
    <Checkbox ${state ? "checked" : ""} />
  `,
  imports: ['import { Checkbox } from "@starter-monoropo/ui/atoms/checkbox"'],
  id: "starter-checkbox",
  metadata: { nestable: true },
};
