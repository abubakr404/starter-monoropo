// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System
// source=packages/ui/src/atoms/fab.tsx
// component=Fab
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const variant = instance.getEnum("Variant", {
  Default: "default",
  Soft: "soft",
  Outline: "outline",
});
const size = instance.getEnum("Size", {
  Sm: "sm",
  Default: "default",
  Lg: "lg",
});

export default {
  example: figma.code`
    <Fab variant="${variant}" size="${size}">
      ${label}
    </Fab>
  `,
  imports: ['import { Fab } from "@starter-monoropo/ui/atoms/fab"'],
  id: "starter-fab",
  metadata: { nestable: true },
};
