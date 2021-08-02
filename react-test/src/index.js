import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

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

// class Clock extends React.Component {

//   constructor(props) {
//     super(props);
//     console.log('create >>', props)
//     this.state = {
//       date: new Date(),
//       title: 'sss',
//     };
//   }

//   componentDidMount() {
//     console.log('didMount>>')
//     this.timerID = setInterval(() => {
//       this.tick()
//     }, 1000);
//   }

//   componentWillUnmount() { 
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({date: new Date()}); 
//   }

//   render() {
//     console.log('render >>')
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     )
//   }

// }

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


