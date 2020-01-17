import {Component, h} from "preact";
import {Link} from "react-router-dom";

export class About extends Component {
  render() {
    return (
        <div class="flex-container">
          <p>This is a Preact app being rendered on the server. It uses Unistore for state management and react-router
            for routing.</p>
          <Link to="/">Home</Link>
        </div>
    )
  }
}
