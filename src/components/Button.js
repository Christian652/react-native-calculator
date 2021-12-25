import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4,
    padding: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#888',
  },
  operationButton: {
    color: '#fff',
    backgroundColor: '#fa8231'
  },
  doubleSize: {
    width: (Dimensions.get('window').width / 4) * 2
  },
  tripleSize: {
    width: (Dimensions.get('window').width / 4) * 3
  }
});

export default props => {
  const { double, triple, operation } = props;
  const styles_ = [styles.button];

  if (double) styles_.push(styles.doubleSize);
  if (triple) styles_.push(styles.tripleSize);
  if (operation) styles_.push(styles.operationButton);
  
  return (
    <TouchableHighlight onPress={() => { props.onClick(props.label) }}>
      <Text style={styles_}>{props.label}</Text>
    </TouchableHighlight>
  );
};
