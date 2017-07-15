import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import { NotFound, Redirect } from 'kit/lib/routing';
import allMessages from 'src/queries/all_messages.gql';

import Navbar from './components/navbar';
// Styles
import sass from './styles/main.scss';

// Get the ReactQL logo.  This is a local .svg file, which will be made
// available as a string relative to [root]/dist/assets/img/
// import logo from './reactql-logo.svg';

// ----------------------

// We'll display this <Home> component when we're on the / route
const Home = () => (
  <h1>You&apos;re on the home page - click another link above</h1>
);

// Helper component that will be conditionally shown when the route matches.
// This gives you an idea how React Router v4 works
const Page = ({ match }) => (
  <h1>Changed route: {match.params.name}</h1>
);

// Create a route that will be displayed when the code isn't found
const WhenNotFound = () => (
  <NotFound>
    <h1>Unknown route - the 404 handler was triggered!</h1>
  </NotFound>
);

// Specify PropTypes if the `match` object, which is injected to props by
// the <Route> component
Page.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

// ... then, let's create the component and decorate it with the `graphql`
// HOC that will automatically populate `this.props` with the query data
// once the GraphQL API request has been completed
@graphql(allMessages)
class GraphQLMessage extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      allMessages: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
        }),
      ),
    }),
  }

  render() {
    const { data } = this.props;
    const message = data.allMessages && data.allMessages[0].text;
    const isLoading = data.loading ? 'yes' : 'nope';
    return (
      <div>
        <h2>Message from GraphQL server: <em>{message}</em></h2>
        <h2>Currently loading?: {isLoading}</h2>
      </div>
    );
  }
}

// Sample component that demonstrates using a part of the Redux store
// outside of Apollo.  We can import own custom reducers in `kit/lib/redux`
// and 'listen' to them here
@connect(state => ({ counter: state.counter }))
class ReduxCounter extends React.PureComponent {
  static propTypes = {
    counter: PropTypes.shape({
      count: PropTypes.number.isRequired,
    }),
  };

  // Trigger the `INCREMENT_COUNTER` action in Redux, to add 1 to the total
  triggerIncrement = () => {
    this.props.dispatch({
      type: 'INCREMENT_COUNTER',
    });
  }

  render() {
    const { count } = this.props.counter;
    return (
      <div>
        <h2>Listening to Redux counter: {count}</h2>
        <button onClick={this.triggerIncrement}>Increment</button>
      </div>
    );
  }
}

// Export a simple component that allows clicking on list items to change
// the route, along with a <Route> 'listener' that will conditionally display
// the <Page> component based on the route name
export default () => (
  <div>
    <Navbar />
    <Helmet
      title="ReactQL application"
      meta={[{
        name: 'description',
        content: 'ReactQL starter kit app',
      }]} />
    <section className={[sass.section, sass.isMedium].join(' ')}>
      <div className={sass.container}>
        <div className={sass.columns}>
          <div className={sass.column}>
            <GraphQLMessage />
          </div>
          <div className={sass.column}>
            <hr />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/page/about">About</Link></li>
              <li><Link to="/page/contact">Contact</Link></li>
              <li><Link to="/old/path">Redirect from /old/path &#8594; /new/path</Link></li>
            </ul>
            <hr />
            <ReduxCounter />
            <hr />
          </div>
        </div>
      </div>
    </section>

    <section className={sass.section}>
      <div className={sass.container}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/page/:name" component={Page} />
          <Redirect from="/old/path" to="/new/path" />
          <Route component={WhenNotFound} />
        </Switch>
      </div>
    </section>
  </div>
);
