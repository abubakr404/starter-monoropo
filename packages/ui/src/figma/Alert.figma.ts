// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=5-58
// source=packages/ui/src/atoms/alert.tsx
// component=Alert
import figma from "figma";

const instance = figma.selectedInstance;
const title = instance.getString("Title");
const description = instance.getString("Description");
const variant = instance.getEnum("Variant", {
  Default: "default",
  Destructive: "destructive",
  Success: "success",
  Warning: "warning",
});

export default {
  example: figma.code`
    <Alert variant="${variant}">
      <AlertTitle>${title}</AlertTitle>
      <AlertDescription>${description}</AlertDescription>
    </Alert>
  `,
  imports: [
    'import { Alert, AlertTitle, AlertDescription } from "@starter-monoropo/ui/atoms/alert"',
  ],
  id: "starter-alert",
  metadata: { nestable: false },
};
