NOTE

class App extends React.Component {
// constructor(props) {
// super(props);
// /\*_
// _ WE CREATED A JAVASCRIPT OGJECT AND ASIGNED IT KEY VALUE PAIR Null meaning not know yet but will know
// _ THEN REASSINED THE RESULT { lat: null } TO
// _ this.state
// \*/

// // THIS IS THE ONLY TIME WE DO A DIRECT ASSINGMENT
// // TO this.state

// // ONE METHOD TO UNITALIZE STATE!
// // this.state = { lat: null, errorMessage: "" };

// this.state = { lat: null, errorMessage: "" };

// // ONE METHOD:
// // window.navigator.geolocation.getCurrentPosition(
// // (postion) => {
// // // WE CALLLED SETSTATE!!!
// // this.setState({ lat: postion.coords.latitude });

// // // WE DID NOT WRITE ( THIS IS A NO NO! )!!
// // // this.state.lat = postion.coords.latitude;
// // },
// // (err) => {
// // this.setState({ errorMessage: err.message });
// // }
// // );
// // }
// }

// CAN ALSO BE CODED AS SEEN ON LINE 5 WITH CONSTRUCTOR
state = { lat: null, errorMessage: "" };

// PERFERED METHODS:
componentDidMount() {
window.navigator.geolocation.getCurrentPosition(
(postion) => this.setState({ lat: postion.coords.latitude }),
(err) => this.setState({ errorMessage: err.message })
);
}

// REACT SAYS WE HAVE TO DEFINE RENDER!!!
render() {
if (this.state.errorMessage && !this.state.lat) {
return <div>Error: {this.state.errorMessage}</div>;
}

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <div>Loading...</div>;

}
}

ReactDom.render(<App />, document.querySelector("#root"));
