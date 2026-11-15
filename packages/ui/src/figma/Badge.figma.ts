// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=1-283
// source=packages/ui/src/atoms/badge.tsx
// component=Badge
import figma from "figma";

const instance = figma.selectedInstance;
const label = instance.getString("Label");
const variant = instance.getEnum("Variant", {
  Default: "default",
  Secondary: "secondary",
  Destructive: "destructive",
  Success: "success",
  Warning: "warning",
  Outline: "outline",
});

export default {
  example: figma.code`
    <Badge variant="${variant}">${label}</Badge>
  `,
  imports: ['import { Badge } from "@starter-monoropo/ui/atoms/badge"'],
  id: "starter-badge",
  metadata: { nestable: true },
};
