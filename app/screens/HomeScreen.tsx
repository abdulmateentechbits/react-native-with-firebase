import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { FlatList, ScrollView, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors } from "../theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { MediaStream, RTCView, mediaDevices } from "react-native-webrtc"
import firestore from '@react-native-firebase/firestore';
import { Button, Icon, Screen, Text, TextField, Todo } from "app/components"
import auth from '@react-native-firebase/auth';


interface HomeScreenProps extends DemoTabScreenProps<"Home"> { }

interface TodoProps {
  id: string;
  complete: boolean;
  title: string;
}
type OrderByProps = {
  orderBy: "asc" | "desc";
}


export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(
  _props,
) {

  const { navigation } = _props;
  const [todo, setTodo] = useState('');
  const ref = firestore().collection('todos');
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('asc');


  const {
    authenticationStore: { logout, setAuthToken },
  } = useStores();


  function logoutUser() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        logout();
      });

  }

  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logoutUser,
    },
    [logoutUser],
  );

  useEffect(() => {
    return ref.orderBy('title', orderBy).onSnapshot((snapShots) => {
      let todoItems = [];
      snapShots.forEach((doc) => {
        if (doc.exists) {
          const { title, complete } = doc.data();
          todoItems.push({ id: doc.id, complete, title });
        } else {
          console.log("Document does not exist");
        }
      })
      setTodos(todoItems);
      console.log("todo items: ", todoItems);
      if (loading) {
        setLoading(false);
      }
    });
  }, [orderBy])


  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false
    })
    setTodo('');
  }

  if (loading) {
    return console.log("Loading...");
  }

  return (
    <View
      style={$container}>
      <View style={{ backgroundColor: colors.background }}>
        <Text style={{ textAlign: 'center', color: colors.text, marginBottom: 5 }}>Data Lists</Text>
      </View>
      <View style={{ backgroundColor: colors.background }}>
        <Text style={{ textAlign: 'left', color: colors.text, marginBottom: 5 }}>Filters</Text>
        <View style={{ flexDirection: 'row', marginLeft: 5, marginTop: 10, marginBottom: 10 }}>
          <Icon icon="asc" onPress={() => setOrderBy("asc")} color={orderBy === 'asc' ? 'lightblue' : 'black'} />
          <Icon icon="desc" style={{ marginLeft: 10 }} onPress={() => setOrderBy("desc")} color={orderBy === 'desc' ? 'lightblue' : 'black'} />
        </View>

      </View>
      <FlatList
        style={{ flex: 1 }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />

      <View>
        <TextField
          value={todo}
          label="New Data"
          placeholder="Enter data here"
          onChangeText={setTodo}
        />
        <Button
          testID="next-screen-button"
          preset="default"
          text="Add Data"
          onPress={() => addTodo()}
          style={{ marginTop: 10 }}
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: 13
}


const $container2: ViewStyle = {
  flex: 1,
  padding: 16,
}
const $row: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 28,

}
const $label: TextStyle = {
  fontWeight: 'bold',
  marginRight: 8,
}
const $value: TextStyle = {}
