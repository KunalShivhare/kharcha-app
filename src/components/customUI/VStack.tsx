import { Stack, StackProps } from "./stack"

interface VstackProps extends StackProps {}

export function VStack(props: VstackProps) {
  return <Stack {...props} flexDirection="column" />
}
