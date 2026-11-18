// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System
// source=packages/ui/src/atoms/chip.tsx
// component=Chip
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const tone = instance.getEnum("Tone", {
  Neutral: "neutral",
  Primary: "primary",
  Secondary: "secondary",
  Success: "success",
  Warning: "warning",
  Destructive: "destructive",
  Info: "info",
});
const size = instance.getEnum("Size", {
  Sm: "sm",
  Default: "default",
  Lg: "lg",
});

export default {
  example: figma.code`
    <Chip tone="${tone}" size="${size}">
      ${label}
    </Chip>
  `,
  imports: ['import { Chip } from "@starter-monoropo/ui/atoms/chip"'],
  id: "starter-chip",
  metadata: { nestable: true },
};
