# Figma sync checklist

Run after token or core component changes.

## After editing `theme.css`

- [ ] Update matching Figma variables (Color Light/Dark, Spacing, Radius, Control)
- [ ] Confirm WEB code syntax still uses `var(--ui-…)`
- [ ] Update `packages/ui/src/theme/figma-bridge.ts` if names changed
- [ ] Spot-check Foundations / Tokens page in Figma

## After editing a UI atom/molecule

- [ ] Update Figma component variants / TEXT props to match the React API
- [ ] Update `packages/ui/src/figma/<Name>.figma.ts`
- [ ] Refresh Example / Auth and Example / Dashboard if they use the component
- [ ] Re-publish the Figma library if consumers need the change

## After Figma-only design changes

- [ ] Decide whether code should follow (product change) or Figma should revert
- [ ] If code follows: implement in `packages/ui`, then run the atom checklist above
