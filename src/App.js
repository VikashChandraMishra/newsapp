import './App.css';
import News from './components/News';
import Navbar from './components/Navbar';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default class App extends Component {
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Routes>
            {/* React will not remount the components(as they are all the same) unless they are distinguished by a unique key */}
            <Route exact path="/" element={<News apiKey={this.apiKey} key="general" pageSize={this.pageSize} country='us' category='general' />} />
            <Route exact path="/business" element={<News apiKey={this.apiKey} key="business" pageSize={this.pageSize} country='us' category='business' />} />
            <Route exact path="/entertainment" element={<News apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country='us' category='entertainment' />} />
            <Route exact path="/general" element={<News  apiKey={this.apiKey} key="general" pageSize={this.pageSize} country='us' category='general' />} />
            <Route exact path="/health" element={<News apiKey={this.apiKey} key="health" pageSize={this.pageSize} country='us' category='health' />} />
            <Route exact path="/science" element={<News apiKey={this.apiKey} key="science" pageSize={this.pageSize} country='us' category='science' />} />
            <Route exact path="/sports" element={<News apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country='us' category='sports' />} />
            <Route exact path="/technology" element={<News apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country='us' category='technology' />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
