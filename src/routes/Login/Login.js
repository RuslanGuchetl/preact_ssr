import {h, Component} from 'preact'
import {connect} from 'unistore/preact'
import {actions} from '../../store/store'
import http from '../../helpers/api'
import {useHistory} from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.history = useHistory();
  }

  componentDidMount() {
    if (this.props && this.props.token) {
      this.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('componentWillReceiveProps', nextProps, nextContext)
  }

  setEmail(email) {
    this.setState({email});
  };

  setPassword(password) {
    this.setState({password});
  };

  emptyForm() {
    this.setState({email: "", password: ""})
  }

  validateForm() {
    const {email, password} = this.state;
    return !!(email && email.length > 0 && password && password.length > 0);
  };

  handleSubmit(e) {
    e.preventDefault();
    const {email, password} = this.state;
    const {login} = this.props;

    if (!this.validateForm()) {
      return alert('form is not valid');
    }

    const user = {email, password};

    http.post('/login', {email, password})
        .then(res => {
          if (!res || !res.token) return false;
          const {token} = res;
          login({user, token});
          this.emptyForm();
          this.history.push('/protected');
        })
        .catch(err => {
          console.log('err', err);
        });
  };

  render({user}, {email, password}) {
    return (
        <div class="flex-container">
          <div class="card">
            <article class="card-body">
              <h4 class="card-title mb-4 mt-1">Sign in</h4>
              <form onSubmit={e => this.handleSubmit(e)}>
                <div class="form-group">
                  <label>Your email</label>
                  <input class="form-control"
                         placeholder="Email"
                         type="email"
                         value={email}
                         onChange={e => this.setEmail(e.target.value)}
                         required={true}
                  />
                </div>
                <div class="form-group">
                  <label>Your password</label>
                  <input class="form-control"
                         placeholder="******"
                         type="password"
                         value={password}
                         onChange={e => this.setPassword(e.target.value)}
                         required={true}
                  />
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
              </form>
            </article>
          </div>
        </div>
    )
  }
}

export const Login = connect(['user', 'token'], actions)(LoginForm);