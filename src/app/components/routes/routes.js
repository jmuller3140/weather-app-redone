import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppComponent } from '../../components/app'

export default class RoutesComponent extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AppComponent} />
        </Switch>
      </Router>
    )
  }
}
