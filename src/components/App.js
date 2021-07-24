import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './NavBar.js'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard.js'
import Poll from './Poll.js'
import NewPoll from './NewPoll.js'
import Leaderboard from './Leaderboard'
import Login from './Login'
import NotFound from './NotFound'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  
  DefaultContainer = () => (
    
    <div className="container">
      <NavBar />
      <Route exact path='/home' component={Dashboard} />
      <Route path='/questions/:question_id ' component={Poll} />
      <Route exact path='/add' component={NewPoll} />
      <Route exact path='/leaderboard' component={Leaderboard} />
    </div>

 )

  render(){

  return (
    <Router>
      <Fragment>

        <div className='container'>
          {/* <NavBar /> */}
          <Switch>
          <Route exact path='/' component={Login} /> 
          <Route exact path='/home' component={Dashboard} />
          <Route exact path='/questions/:question_id' component={Poll} />
          <Route exact path='/add' component={NewPoll} />
          <Route exact path='/leaderboard' component={Leaderboard} />
          <Route component={NotFound} />
          </Switch>
        </div>
        {/* <div className='container'>
          <Switch>
            <Route exact path='/' component={Login} /> 
            <Route component={this.DefaultContainer}/>
          </Switch>
          </div>  */}
      </Fragment>
    </Router>
  );
  }
}

export default connect()(App) 
