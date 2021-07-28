import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Header from './Header.js';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import history from '../history';


class App extends React.Component{
    render(){
        return (
            <div className="App">
              
              <Router history={history}>
                <Header />
                <Switch>
                  <Route path='/' exact component={StreamList}></Route>
                  <Route path='/stream/create' exact component={StreamCreate}></Route>
                  <Route path='/stream/edit/:id' exact component={StreamEdit}></Route>
                  <Route path='/stream/delete/:id' exact component={StreamDelete}></Route>
                  <Route path='/stream/:id' exact component={StreamShow}></Route>
                </Switch>
              </Router>
            </div>
        );
    }
}

export default App;
  