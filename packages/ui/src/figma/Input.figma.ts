// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=1-271
// source=packages/ui/src/atoms/input.tsx
// component=Input
import figma from "figma";

const instance = figma.selectedInstance;
const placeholder = instance.getString("Placeholder");

export default {
  example: figma.code`
    <Input placeholder="${placeholder}" />
  `,
  imports: ['import { Input } from "@starter-monoropo/ui/atoms/input"'],
  id: "starter-input",
  metadata: { nestable: true },
};
