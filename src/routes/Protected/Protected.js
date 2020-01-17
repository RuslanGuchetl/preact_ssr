import {Component, h} from "preact";
import {Link} from "react-router-dom";

export class Protected extends Component {
  render() {
    return (
        <div class="flex-container">
          <p>This component only visible for logged in user.</p>
          <Link to="/">Home</Link>
        </div>
    )
  }
}
