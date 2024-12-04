import { Stack, StackProps } from "./stack"

interface HstackProps extends StackProps {}

export function HStack(props: HstackProps) {
  return <Stack {...props} flexDirection="row" />
}
