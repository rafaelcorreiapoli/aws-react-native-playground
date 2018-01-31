import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
} from 'react-native';

import Amplify, { Analytics, withAuthenticator, API } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {
  state = {
    items: []
  }
  componentDidMount() {
    Analytics.record('componentDidMount');
  }
  handlePress = () => {
    API.get(`test`, `/items`).then(response => {
      this.setState({
        items: response.items
      })
    });
  }

  saveTodo = async () => {
    let profile = await Auth.currentUserInfo();
    const newTodo = {
      body: {
        name: 'My first todo!',
        done: false,
        date: new Date().toString(),
        id: '1234',
        userId: profile.id
      }
    }
    const path = "/todos";

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.put("todosCRUD", path, newTodo)
      alert(JSON.stringify(apiResponse))
    } catch (e) {
      alert('error')
      console.log(e);
    }
  }

  renderItem = ({ item }) => (
    <Text style={{ padding: 10 }}>
      {item.name}
    </Text>
  )
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome! {JSON.stringify(this.state.items)}
        </Text>
        
        <FlatList
          style={{flex: 1, alignSelf: `stretch`}}
          data={this.state.items}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.name}
        />
        <Button title="API CALL!"
          onPress={this.handlePress}
        />
        <Button title="SAVE TODO!"
          onPress={this.saveTodo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default withAuthenticator(App)