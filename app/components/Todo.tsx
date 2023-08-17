import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import { Card } from "./Card"
import firestore from '@react-native-firebase/firestore';
import { Icon } from "./Icon";
import { Text } from "./Text";



interface TodoProps {
  id: string
  title: string
  complete: boolean
}
/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Todo(props: TodoProps) {
  const { id, title, complete } = props

  async function toggleComplete() {
    await firestore().collection('todos').doc(id).update({
      complete: !complete
    })
  }
  async function deleteTodo(){
    await firestore().collection('todos').doc(id).delete()
  }

  return (
    <View>
      <Card
        // onPress={toggleComplete}
        verticalAlignment="center"
        ContentComponent={
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ width: '5%', marginLeft: 5 }}>
                <Icon icon={complete ? 'check' : 'x'} />
              </View>
              <View style={{ width: '50%' }}><Text>{title}</Text></View>
              <View style={{ width: '25%' }}>
                <TouchableOpacity
                onPress={toggleComplete}
                  style={{
                    marginBottom: 5,
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                    borderRadius: 5
                  }}>
                  <Text style={{ color: 'white' }}>Toggle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={deleteTodo} 
                style={{
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  borderRadius: 5
                }}>
                  <Text style={{ color: 'white' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        style={{ marginBottom: 5, elevation: 0, minHeight: 60, borderRadius:0 }}
      />
    </View>
  )
}
