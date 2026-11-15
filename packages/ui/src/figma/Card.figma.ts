// url=https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System?node-id=1-313
// source=packages/ui/src/molecules/card.tsx
// component=Card
import figma from "figma";

const instance = figma.selectedInstance;
const title = instance.getString("Title");
const description = instance.getString("Description");

export default {
  example: figma.code`
    <Card>
      <CardHeader>
        <CardTitle>${title}</CardTitle>
        <CardDescription>${description}</CardDescription>
      </CardHeader>
    </Card>
  `,
  imports: [
    'import { Card, CardHeader, CardTitle, CardDescription } from "@starter-monoropo/ui/molecules/card"',
  ],
  id: "starter-card",
  metadata: { nestable: false },
};
