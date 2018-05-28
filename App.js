import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Counter App!</Text>
        <Counter />
      </View>
    );
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miliseconds: 0,
      result: [],
      bStart: false
    }
  }

  tick() {
    this.setState(prev => ({
      miliseconds: prev.miliseconds + 1
    }))
  }

  componentDidMount () {
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  toggle() {
    let bHasStarted = !this.state.bStart
    let timeElapsed = this.state.miliseconds
    let allTime = this.state.result
    this.setState({
      bStart: bHasStarted
    })
    if (bHasStarted) {
      this.interval = setInterval(this.tick.bind(this), 1)
      this.setState({
        miliseconds: 0
      })
    } else {
      allTime.push(timeElapsed)
      this.setState({
        miliseconds: 0,
        result: allTime
      })
      clearInterval(this.interval)
    }
  }

  render() {
    return (
      <View>
        <Button 
        onPress={this.toggle.bind(this)} 
        title={this.state.bStart ? 'Stop Counter' : 'Start Counter'}>
        </Button>
        <Text>{this.state.miliseconds / 100}</Text>
        <PrintResult result={this.state.result} />
      </View>
    );
  }
}

class PrintResult extends Component {
  render() {
    console.log(this.props.result)
    let result = this.props.result.map((x, i)=> {
      return (
        <Text key={i}> {x / 100} </Text>
      )
    })
    return (
      <View>
        { result }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6961',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
