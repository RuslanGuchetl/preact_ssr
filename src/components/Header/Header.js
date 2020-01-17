import {h} from 'preact';
import {useState, useCallback} from 'preact/hooks'
import {Link} from 'react-router-dom';
import {urls} from "../../helpers/headerLinks";
import http from "../../helpers/api";
import {connect} from 'unistore/preact'
import {actions} from '../../store/store'

export const Header = connect('token', actions)((props) => {
  const [opened, setOpened] = useState(true);
  const toggle = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  const localLogout = () => {
    const {logout} = props;
    console.log('sdfsdfsdf')
    http.post('/logout', {})
        .then(() => {
          logout();
        })
        .catch(err => {
          console.log('err', err);
          logout();
        });
  };

  return (
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link to="/" class="navbar-brand">Navbar</Link>
        <button
            class={`navbar-toggler navbar-toggler-right ${opened && 'collapsed'}`}
            type="button"
            onClick={toggle}
            aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"/>
        </button>

        <div class={`collapse navbar-collapse ${opened && 'show'}`}>
          <ul class="navbar-nav mr-auto">
            {urls && urls.map(url => (
                (props && props.token) && (url.path === '/login') ?
                    <li class="nav-item">
                      <span onClick={localLogout} class="nav-link pointer">Log Out</span>
                    </li> :
                    <li class="nav-item">
                      <Link to={url.path} class="nav-link" onClick={toggle}>{url.name}</Link>
                    </li>
            ))}
          </ul>
        </div>
      </nav>
  )
});
