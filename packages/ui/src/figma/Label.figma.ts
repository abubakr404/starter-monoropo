// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=1-277
// source=packages/ui/src/atoms/label.tsx
// component=Label
import figma from "figma";

const instance = figma.selectedInstance;
const text = instance.getString("Text");

export default {
  example: figma.code`
    <Label>${text}</Label>
  `,
  imports: ['import { Label } from "@starter-monoropo/ui/atoms/label"'],
  id: "starter-label",
  metadata: { nestable: true },
};
