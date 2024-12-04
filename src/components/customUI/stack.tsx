import { defaultShortcuts, ShortcutProps } from "@/src/types/shortcuts"
import { PropsWithChildren, useMemo } from "react"
import { View, ViewProps, ViewStyle } from "react-native"

export interface StackProps
  extends PropsWithChildren,
    ShortcutProps,
    ViewProps {
  flex?: number
  flexDirection?: ViewStyle["flexDirection"]
  gap?: number
  alignItems?: ViewStyle["alignItems"]
  justifyContent?: ViewStyle["justifyContent"]
}

export function Stack({
  flex,
  flexDirection,
  gap,
  alignItems,
  justifyContent,
  children,
  style,
  ...rest
}: StackProps) {
  const styles = useMemo(
    () => ({
      ...defaultShortcuts(rest),
      flex,
      flexDirection,
      gap,
      alignItems,
      justifyContent,
    }),
    [rest, flex, gap, alignItems, justifyContent]
  )
  return (
    <View style={[styles, style]} {...rest}>
      {children}
    </View>
  )
}
