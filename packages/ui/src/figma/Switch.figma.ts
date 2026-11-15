// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=5-25
// source=packages/ui/src/molecules/switch.tsx
// component=Switch
import figma from "figma";

const instance = figma.selectedInstance;
const checked = instance.getEnum("State", {
  Unchecked: false,
  Checked: true,
});

export default {
  example: figma.code`
    <Switch ${checked ? "checked" : ""} />
  `,
  imports: ['import { Switch } from "@starter-monoropo/ui/molecules/switch"'],
  id: "starter-switch",
  metadata: { nestable: true },
};
