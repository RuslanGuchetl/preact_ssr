import {h} from 'preact'
import {connect} from 'unistore/preact'
import {actions} from '../../store/store'
import {Link} from "react-router-dom";

export const App = connect('count', actions)(
    ({count, increment, decrement}) => {
      return (
          <div class="flex-container">
            <div class="count">
              <p>{count}</p>
              <button class="increment-btn" onClick={increment}>Increment</button>
              <button class="decrement-btn" onClick={decrement}>Decrement</button>
              <Link to="/about">About</Link>
            </div>
          </div>
      )
    }
);