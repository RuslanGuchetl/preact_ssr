import {Fragment, h} from 'preact'
import {Route, Switch, Redirect} from 'react-router-dom'
import {routes} from '../../helpers/routes'
import {Header} from '../Header/Header'

export default (props) => {
  const isLoggedIn = () => {
    if (typeof window !== 'undefined') {
      return window && window.__STATE__ && window.__STATE__.token;
    } else {
      return props && props.reqCookies && props.reqCookies.token;
    }
  };

  return (
      <Fragment>
        <Header token={isLoggedIn()}/>
        <Switch>
          {routes.map(route => (
              (!route.isPrivate) ?
                  <Route {...route} /> : isLoggedIn() ? <Route {...route} /> : <Redirect to="/"/>
          ))}
        </Switch>
      </Fragment>
  )
};
