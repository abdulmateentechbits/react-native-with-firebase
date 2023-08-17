import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { colors } from "../theme"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"


interface OtpVerificationScreenProps extends DemoTabScreenProps<"Home"> { }



export const OtpVerificationScreen: FC<OtpVerificationScreenProps> = observer(function OtpVerificationScreen(
  _props,
) {

  const { navigation } = _props;
 

  return (
    <View
      style={$container}>
      
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: 13
}



