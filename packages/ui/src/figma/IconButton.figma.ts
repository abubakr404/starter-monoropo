// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=5-86
// source=packages/ui/src/atoms/icon-button.tsx
// component=IconButton
import figma from "figma";

export default {
  example: figma.code`
    <IconButton aria-label="Action">{/* icon */}</IconButton>
  `,
  imports: ['import { IconButton } from "@starter-monoropo/ui/atoms/icon-button"'],
  id: "starter-icon-button",
  metadata: { nestable: true },
};
