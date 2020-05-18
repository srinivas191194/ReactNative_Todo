import React from 'react';
import {View, Button, Text, ScrollView, StyleSheet, Switch,Alert , TextInput,TouchableOpacity} from 'react-native'
import { CheckBox,Card } from 'react-native-elements'
import Constants from 'expo-constants'


let id = 0
 


const Todo = props => (
  <View style={styles.todoContainer}>
    <CheckBox checked={props.todo.checked} onPress={props.onTodoClick}  />
    <Text style={{fontSize:20,fontWeight:'300',color:'black'}}>{props.todo.text}</Text>
    <TouchableOpacity style={[styles.button]} onPress={props.onDelete}>
       <Text style={[styles.buttontext],[styles.removebutton]}>Remove</Text>
    </TouchableOpacity>

  </View>
)

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      text: '',
    }
  }

  addTodo(text) {
    id++
    this.setState({
      todos: [
        ...this.state.todos,
        {id: id, text: text, checked: false, dueDate:Date.now()},
      ],
      text: '',
    })
  }

  takeInput = (input) => {
      this.setState({ text: input })
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }

  render() {
    return (
      <View style={[styles.appContainer, styles.fill]}>
      <Text style={[styles.heading]}>ToDo List</Text>
      
        <TextInput
          style={[styles.input]}
          placeholder = "Enter your task..."
          placeholderTextColor = "grey"
          onChangeText={this.takeInput}
          value={this.state.text}
        />
        <TouchableOpacity style={[styles.addbutton,styles]} onPress={() => this.addTodo(this.state.text)}>
         <Text style={[styles.buttontext]}>ADD</Text>
        </TouchableOpacity>
        <ScrollView style={{backgroundColor:'white',borderRadius:40}}>
          {this.state.todos.map(todo => (
            <Card style={{borderRadius:30}}>
            <Todo
              onTodoClick={() => this.toggleTodo(todo.id)}
              todo={todo}
              onDelete={() => this.removeTodo(todo.id)}
            />
            </Card>
          ))}

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:10,

  },
  appContainer: {
    paddingTop: Constants.statusBarHeight,
  },
  fill: {
    flex: 1,
    backgroundColor:'black',
    
  },

  addbutton:{
    display: 'flex',
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width:100,
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:40,

    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
 
  },
  button:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
    marginRight:'auto',

  },
  heading:{
    paddingLeft:10,
    fontSize:30,
    fontWeight:'300',
    color:'white',
  },
  input:{
    height: 50, 
    borderWidth: 2, 
    margin: 10, 
    borderColor: 'gray', 
    paddingLeft:10,
    fontWeight:"300",
    fontSize:20,
    color:'white',
    borderRadius:30
  },
  buttontext:{
    fontWeight:'300',
    fontSize:18,
    color:'white',
    textTransform: 'uppercase'
  },
  removebutton:{
    color:'red',
    fontSize:18,
    textTransform: 'uppercase',
    fontWeight:'bold',
  }
})