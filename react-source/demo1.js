import React, { useState, useEffect, useReducer, useRef } from 'react';
import logo from './logo.svg';
import './App.css';


function TestHooks() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(88);

  useEffect(() => {
    console.log('use effect');
    return () => {
      ((c) => {
        console.log('useEffect return func ' + c);
      })(count)

    };
  }, [count]);
  return (
    <p>
      count: { count } <br/>
      count: { age } <br/>
      <button onClick={() => setCount(count + 1)}> + 1</button>
      <button onClick={() => setCount(count - 1)}> - 1</button>
      <button onClick={() => setAge(age + 1)}> age + 1</button>
    </p>
  );
}


const initialState = {count: 0};
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}


function App() {


  const [state , setState] = useState(() => ({
    name: 'lxfriday',
    age: 10,
    school: 'hzau',
  }));

  const [show , setShow] = useState(true);
  const [state1 , dispacth] = useReducer(reducer, initialState);

  const inputEl = useRef(null);
  
  useEffect(() => {
    console.log('inputEl', inputEl);
    setTimeout(() => {
      inputEl.current.focus();
    }, 500);
  });

  function focus() {
  }

  console.log('render');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>

          <input ref={inputEl} type="text"/> <br/>

          <button onClick={focus}>focus</button> <br/>

          name: { state.name } <br/>
          age: { state.age } <br/>
          school: { state.school } <br/>

          <button onClick={() => setState(prev => ({ ...prev, name: 'John' }))}>change name</button>
          <button onClick={() => setState(prev => ({ ...prev, age: 100 }))}>change age</button>
          <button onClick={() => setState(state)}>change to the same state</button>
        </p>
        <p>
          state1.count { state1.count } <br/>
          <button onClick={() => dispacth({ type: 'increment' })}>+ 1</button>
          <button onClick={() => dispacth({ type: 'decrement' })}>- 1</button>
        </p>
        <p>
          <button onClick={() => setShow(!show)}> toggle show useEffect</button>
        </p>

        { show && <TestHooks /> }
      </header>
    </div>
  );
}

export default App;
