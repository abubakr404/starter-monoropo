// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=1-210
// source=packages/ui/src/atoms/button.tsx
// component=Button
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const variant = instance.getEnum("Variant", {
  Default: "default",
  Destructive: "destructive",
  Outline: "outline",
  Secondary: "secondary",
  Ghost: "ghost",
  Link: "link",
  Success: "success",
});
const size = instance.getEnum("Size", {
  Sm: "sm",
  Default: "default",
  Lg: "lg",
});

export default {
  example: figma.code`
    <Button variant="${variant}" size="${size}">
      ${label}
    </Button>
  `,
  imports: ['import { Button } from "@starter-monoropo/ui/atoms/button"'],
  id: "starter-button",
  metadata: { nestable: true },
};
