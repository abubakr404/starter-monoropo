// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=5-53
// source=packages/ui/src/atoms/toggle.tsx
// component=Toggle
import figma from "figma";

const instance = figma.selectedInstance;
const label = instance.getString("Label");
const pressed = instance.getEnum("State", {
  Off: false,
  On: true,
});

export default {
  example: figma.code`
    <Toggle variant="outline" ${pressed ? "pressed" : ""}>${label}</Toggle>
  `,
  imports: ['import { Toggle } from "@starter-monoropo/ui/atoms/toggle"'],
  id: "starter-toggle",
  metadata: { nestable: true },
};
