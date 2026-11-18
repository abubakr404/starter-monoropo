// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System
// source=packages/ui/src/molecules/stepper.tsx
// component=Stepper
import figma from "figma";

const instance = figma.selectedInstance;
const orientation = instance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
});

export default {
  example: figma.code`
    <Stepper
      orientation="${orientation}"
      activeStep={2}
      steps={[
        { id: "1", label: "Details" },
        { id: "2", label: "Confirm" },
        { id: "3", label: "Done" },
      ]}
    />
  `,
  imports: ['import { Stepper } from "@starter-monoropo/ui/molecules/stepper"'],
  id: "starter-stepper",
  metadata: { nestable: true },
};
