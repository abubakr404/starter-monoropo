// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=5-36
// source=packages/ui/src/atoms/textarea.tsx
// component=Textarea
import figma from "figma";

const instance = figma.selectedInstance;
const placeholder = instance.getString("Placeholder");

export default {
  example: figma.code`
    <Textarea placeholder="${placeholder}" />
  `,
  imports: ['import { Textarea } from "@starter-monoropo/ui/atoms/textarea"'],
  id: "starter-textarea",
  metadata: { nestable: true },
};
