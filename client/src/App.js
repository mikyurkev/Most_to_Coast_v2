import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import LoginSignUp from './pages/LoginSignUp';
import Main from './pages/Main';
import Account from './pages/Account';
import Planner from './pages/Planner';
import View from './pages/YourPlanner';
import SinglePlan from './pages/SinglePlan';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  let path = window.location.href.split("/")[3];
  return (
    <ApolloProvider client={client}>
      <Router >
        {path === '' ? '' : (<Header />)}
        <Routes>
          <Route
            path="/"
            element={<LoginSignUp />}
          />
          <Route
            path="/main"
            element={<Main />}
          />
          <Route
            path="/account"
            element={<Account />}
          />
          <Route
            path="/planner"
            element={<Planner />}
          />
          <Route path="/view-planner">
            <Route path=':planId' element={<SinglePlan />} />
            <Route path='' element={<View />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
