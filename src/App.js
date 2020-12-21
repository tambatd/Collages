import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as $ from "jquery";
import { authEndpoint, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import "./App.css";
import find_liked from "./song_data";
import Typewriter from 'typewriter-effect';
import ScrollAnimation from 'react-animate-on-scroll';
import { SocialIcon } from 'react-social-icons';
import "./Player.css";


import "animate.css/animate.min.css";

function change(theid){
  if(!document.getElementById(theid).getAttribute("disabled")){
    let tickMark = "<svg width=\"58\" height=\"45\" viewBox=\"0 0 58 45\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" fill-rule=\"nonzero\" d=\"M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65\"/></svg>";
    document.getElementById(theid).className="button_circle";
    document.getElementById(theid).innerHTML=tickMark;
    document.getElementById(theid).setAttribute("disabled", true);
  }
}

//Spotify Client ID
const clientId = "96971f2e67904bae87bdaa0b2190d29c";
//Spotify Client ID

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      pic: null,
      artists: [],
      pictures: [],
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
      uri_name: null,
      uri_screenname: null,
      song_uri: null,
      song_recc: null,
      artist_recc: null,
      selectValue: "long_term",
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getArtists = this.getArtists.bind(this);
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
    this.getArtists();
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
      this.getArtists(_token);
      
    }

  }
  
  getCurrentlyPlaying(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          pic: data.images[0]["url"],
          info: data.id,
          uri_screenname: data.display_name,
          no_data: false, 
        });
      }
      
    });
  }

  getArtists(token){ 
    console.log(this.state.selectValue)
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?time_range="+"long_term",
      type: "get",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        const list = Object.entries(data);
        let empty_list = [];
        let pic_list = [];
        let j;
        for (j=0; j< 12; j++){
          empty_list.push(list[0][1][j]["genres"]);
          pic_list.push(list[0][1][j]["images"][0]["url"])
        }
        let merged = [].concat.apply([], empty_list);
        for(var i = 1 ; i < merged.length ; i++){
          merged[i] = merged[i].charAt(0).toUpperCase() + merged[i].substr(1);
      }    
        this.setState({
          artists: merged,
          pictures: pic_list
        });
        let holder = find_liked(this.state.artists);
        this.setState({
          song_recc: holder[0],
          artist_recc: holder[1],
        });
      }
    })
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?time_range="+"short_term",
      type: "get",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        const list = Object.entries(data);
        let empty_list = [];
        let pic_list = [];
        let j;
        for (j=0; j< 12; j++){
          empty_list.push(list[0][1][j]["genres"]);
          pic_list.push(list[0][1][j]["images"][0]["url"])
        }
        let merged = [].concat.apply([], empty_list);
        for(var i = 1 ; i < merged.length ; i++){
          merged[i] = merged[i].charAt(0).toUpperCase() + merged[i].substr(1);
      }    
        this.setState({
          artists: merged,
          pictures: pic_list
        });
        let holder = find_liked(this.state.artists);
        this.setState({
          song_recc: holder[0],
          artist_recc: holder[1],
        });
      }
    })
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="pink"> 
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>

          {!this.state.token &&(
            <h2 className="header">Japanify</h2>
          )}
          {!this.state.token &&(
            <div>
           <Typewriter options={{
            strings: ['Discover New Japanese Artists 🎨', 'Discover New Japanese Music 🎶'],
            autoStart: true,
            loop: true,
           }}/>
            <br/>
            <a className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=false`}>
              Login to Spotify
            </a>
            <br/>
            <br/>
            <div id="bar"></div>
            <br></br>
            <p>Don't have a Spotify account?<br/>check out a random recommendation</p>
            <br/>
           </div>
          )}
          
          </div>
          <br></br>
          
          <br></br>
        
          {this.state.token &&(
           <div>
              <ScrollAnimation animateIn='fadeIn' animateOut='flipOutY' scrollableParentSelector='#root'  animateOnce={true}>
             <div>
             <br/>  
             <br/>   

              <img src={this.state.pic} alt="Avatar" className="imgcircle"></img>
              <br/>
              <h1>
              Hey {this.state.uri_screenname} <span role="img" aria-label="Wave" className="wave">
              👋</span>
              </h1>
              <br/>
              <h2>
                Let's Japanify your music!
              </h2>
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
                <div id="arrow-wrapper">
                <div className="arrow-border">
                <div className="arrow down"></div>
                <div className='pulse'></div>
                </div>
                </div>
                </ScrollAnimation>
              <br/>  
              <select id="dropdown" onChange={this.handleDropdownChange}>
              <option value="long_term">long_term</option>
              <option value="medium_term">medium_term</option>
              <option value="short_term">short_term</option>
            </select>
            <div>Selected value is : {this.state.selectValue}</div>

              <ScrollAnimation animateIn='fadeIn' animateOut='flipOutY' scrollableParentSelector='#root' animateOnce={true}>
           

              <br/>  
              <div className="picbox"> 
              <div className="pics">
      
              {this.state.pictures.map(long =>(
                      <img src={long} alt="Artist #1"></img>
              ))}
              </div>
              </div>
              </ScrollAnimation>

          </div>)}
        </header>
      </div>
    );
  }
}

const Main = props => (
  <BrowserRouter>
  <Switch>
      <Route path='/' component={App} />
  </Switch>
  </BrowserRouter>
);

export default Main;