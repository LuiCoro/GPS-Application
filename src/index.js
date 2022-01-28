import React from "react";
import ReactDom from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (postion) => this.setState({ lat: postion.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderConent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message='Please Accept Loaction Request' />;
  }

  render() {
    return <div className='border red'>{this.renderConent()}</div>;
  }
}

ReactDom.render(<App />, document.querySelector("#root"));

/** NOTE:
 * 
 * vocab:
 * 
 * super() :
 *  is a referance to the parents construcktor function
 * ( NEEDS TO HAPPEN! )
 * set.State()
 * ( NEEDS TO  HAPPEN )
 * 
 * render()
 * ( NEEDS TO HAPPEN )
 * 
 * this.state ()
 * ( NEEDS TO HAPPEN )
 * 
 * --------------------------------------------------
 * 
 *                        COMPONENT LIFECYCLE
 *      TIME|   1)  CONSTRUCTOR
 *          |   
 *          |   2) RENDER
 *          |
 *          | ( CONTENT VISABLE ON SCREEN )
 *          |
 *          |   3) COMPONENTDIDMOUNT
 *          |     componentDidMount(){}
 *          |
 *          | ( SIT AND WAIT FOR UPDATES... )
 *          |
 *          |   4) COMPONENTDIDUPDATE
 *          |     componentDidUpdate(){}
 *          |
 *          | ( SOT AND WAIT UNTIL THIS COMPONENT IS NOT
 *          |                LONGER SHOWN )
 *          |
 *          |   5)  COMPONENTWILLUNMOUNT
 *          |       componentWillUnmount(){}
 * 
 * 1) GOOD PLACE TO DO ONE-TIME SETUPS
 * 2) AVOID DOING ANYTHING BESIDES RETUNRNIG JSX
 * 3) GOOD PLACE TO DO DATA LOADING!
 * 4) FOOD PLACE TO DO MORE DATA LOADING
 *        WHEN STATE/PROPS CHANGE
 * 5) GOOD PLACE TO DO CLEANUP
 * ( ESECPIALLY FOR NON-REACT STUFF! )
 * 
 * 
 * 
 *              EXAMPLE:
 * componentDidMount() {
    console.log("My component was rendered to the screen");
  }

  componentDidUpdate() {
    console.log("My component was just updated - it rerendered!");
  }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * -----------------------------------------------------------
 *
 *                              DIAGRAM:
 * ( HAS CODE TO DETERMINE LOCATION & MONTH)
 *                  |
 *                  |-> APP
 *                       |
 *                       | ( it is winter or it is summer )
 *                       |
 *    ( COMPONENT )SEASON DISPLAY <--|
 *                                   |
 *              ( SHOWS DIFFERENT TEXT/ICONS BASED ON PROPS )
 *
 *  ----------------------------------------------------
 *
 *                   TIME LINE APPLICATION DIAGRAM:
 *
 *      TIME|
 *          |   <------- JS FILE LOADED BY BROWSER
 *          |
 *          |   <------ APP COMPONENT GETS CREATED
 *          |
 *          |   <------ WE CALL  GELOCATION SERVICE
 *          |
 *          |   <------ APP RETURNS JSX, GETS RENDERED
 *          |                TO PAGE AS HTML
 *          |
 *          |                      .... ( LOADING )
 *          |
 *          |   <------ WE GET RESULT OF GEOLOCATION!
 *          |  
 *          |   <---- TELL THE COMPONENT TO RRENDER ITSELF
 *          |              WITH THIS NEW INFORMATION
 *          |
 *          |
 *          V
 *
 *                  WHATS HAPPENING IN THIS index.js
 *      TIME|
 *          |   <------- JS FILE LOADED BY BROWSER
 *          |           ( index.js )
 *          |
 *          |
 *          |   <------INSTANCE OF APP COMPONENT GETS CREATED
 *          |
 *          |
 *          |
 *          |   <------- APP COMPONENTS 'CONSTRUCTOR' FUNCTION
 *          |                      GET CALLED
 *          |           ( constructor(props) {
 *                             super()} )
 *          |
 *          |    <------- STATE OBJECT IS CREATED AND ASSIGNED
 *          |                 TO THE 'this.state' PROPERTY
 *          |              (this.state = { lat: null };)
 *          |
 *          |
 *          |
 *          |   <------ WE CALL  GELOCATION SERVICE
 *          |
 *          |
 *          |  <----- REACT CALLS THE COMPONENTS RENDER MEHOD
 *          |
 *          |   <------ APP RETURNS JSX, GETS RENDERED
 *          |                TO PAGE AS HTML
 *          |
 *          |                      .... ( LOADING )
 *          |
 *          |   <------ WE GET RESULT OF GEOLOCATION!
 *          |  
 *          |   <---- WE UPDATE OUR STATE OBJECT WITH A 
 *          |              CALL TO 'this.setState' 
 *          | this.setState({ lat: postion.coords.latitude });
 *          |
 *          |   <---- REACT SEES THAT WE UPDATED THE STATE 
 *          |                  OF A COMPONENT
 *          |
 *          |    <----- REACT CALLS OUR ' render () ' METHOD
 *          |                      A SECOND TIME
 *          |
 *          |  <-- RENDER METHOD RETUNRS SOME ( UPDATED ) JSX 
 *          |
 *          |
 *          |
 *          V
 * 
 * 
 *---------------------------------------------
 *
 *TURNING FUNCTION COMPONTENT:
 * const App = () => {
  window.navigator.geolocation.getCurrentPosition(
    (postion) => console.log(postion),
    (err) => console.log(err)
  );

  return <div>Latitude: </div>;
};
 * 
 * INTO A  CLASS COMPONTENT:
 * 
 * class App extends React.Component {
  render() {
    window.navigator.geolocation.getCurrentPosition(
      (postion) => console.log(postion),
      (err) => console.log(err)
    );

    return <div>Latitude:</div>;
  }
}
 * 
 * -----------------------------------------------------------
 * 
 *                RULES OF CLASS COMPONENTS:
 * 1) MUST BE A JAVASCRIPT CLASS
 * 2) MUST EXTEND (SUBCLASS) REACT.COMPONENT
 * 3) MUST DEFINE A 'RENDER' METHOD THAT RETURNS SOME AMOUNT
 *                          OF JSX
 * 
 * -------------------------------------------------------
 *
 *                       RULES OF STATES:
 * 1) ONLY USABLE WITH CLASS COMPONENTS
 *  ( TECHNICALLY CAN BE SUED WITH FUNCTIONAL COMPONENTS
 *  USING THE 'HOOKS' SYSTEM) ( PLEASE SEE OTHER NOTES ) 
 * 
 * 2) YOU WILL CONFUSE PROPS WITH STATE :(
 * 3) 'STATE' IS A JS OBJECT THAT CONTAINS DATA REVELENT
 *                   TO A COMPONENT
 * 4) UPDATING 'STATE' ON A COMPONENT CAUSES THE COMPONENT TO
 *             ( ALMOST ) INSTANTLY RERENDER
 * 5) STATE MUST BE INITILAIZED WHEN A COMPONENT IS CREATED
 * 6) NSTATE CAN ONLY BE UPDATED USING THE FUNCTION 'setState'
 * 
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *
 */
