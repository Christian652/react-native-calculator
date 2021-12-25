/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

export default () => {
  let [displayValue, setDisplayValue] = useState('0');
  let [clearDisplay, setClearDisplay] = useState(false);
  let [currentOperation, setCurrentOperation] = useState(null);
  let [values, setValues] = useState([0, 0]);
  let [current, setCurrent] = useState(0);

  const addDigit = n => {
    const clearDisplay_ = displayValue === '0' || clearDisplay;

    if (n === '.' && displayValue.includes(".") && !clearDisplay_) return;
    
    const currentValue_ = clearDisplay_ ? '' : displayValue;
    const displayValue_ = currentValue_ + n;

    setDisplayValue(displayValue_);
    setClearDisplay(false);

    if (n !== '.') {
      const newValue = parseFloat(displayValue_);
      const values_ = [...values];
      values_[current] = newValue;
      setValues(values_);
    }
  }

  const clearMemory = () => {
    setDisplayValue('0');
    setClearDisplay(false);
    setCurrentOperation(null);
    setValues([0, 0]);
    setCurrent(0);
  }

  const clearLastDigit = () => {
    let displayValue_ = displayValue.split("");
    displayValue_.pop();
    setDisplayValue(displayValue_.join(''));
  }

  const setCacheOperation = operation_ => {
    if (current === 0) {
      setCurrentOperation(operation_);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = operation_ === '=';
      const values_ = [...values];

      try {
        values_[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (error) {
        values_[0] = values[0];
      }
      
      values_[1] = 0;
      setValues(values_)
      setDisplayValue(`${values_[0]}`);
      setCurrentOperation(equals ? null : operation_);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals); 
    }
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" double onClick={clearMemory} />
        <Button label="C" onClick={clearLastDigit} />
        <Button label="/" operation onClick={setCacheOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setCacheOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setCacheOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setCacheOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setCacheOperation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
