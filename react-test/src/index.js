import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

// function Todo(props) {
//   return (
//     <div>
//       <h3>{props.title}</h3>
//       <p>{props.disc}</p>
//     </div>
//   )
// }
// 
// function TodoTr(props) {
//   return (
//     <tr>
//       <td className="UserInfo">{props.title}</td>
//       <td>{props.desc}</td>
//     </tr>
//   )
// }
// 
// function App() {
//   return (
//     <div>
//       <Todo title='Title' disc='lalalalla...' />
//       <Todo title='Title2' disc='..........' />
//       <table border="1">
//         <tr>
//           <td>Title</td>
//           <td>Desc</td>
//         </tr>
//         <TodoTr title='xxx' disc="bbbbbb" />
//         <TodoTr title='xxx' disc="bbbbbb" />
//         <TodoTr title='xxx' disc="bbbbbb" />
//       </table>
//     </div>
//   );
// }
// 
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

class Clock extends React.Component {

  constructor(props) {
    super(props);
    console.log('create >>', props)
    this.state = {
      date: new Date(),
      title: 'sss',
    };
  }

  componentDidMount() {
    console.log('didMount>>')
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000);
  }

  componentWillUnmount() { 
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({date: new Date()}); 
  }

  render() {
    console.log('render >>')
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }

}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
