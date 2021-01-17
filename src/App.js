import React, { Component, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as $ from "jquery";
import { authEndpoint, redirectUri, scopes } from "./config";
import hash from "./hash";
//import Slider, { Range } from 'rc-slider';
//import 'rc-slider/assets/index.css';

import Player from "./Player";
import "./App.css";
//import find_liked from "./song_data";
import Typewriter from 'typewriter-effect';
import ScrollAnimation from 'react-animate-on-scroll';
import { SocialIcon } from 'react-social-icons';
import "./Player.css";
import Draggable from 'react-draggable'; // The default
//import {DraggableCore} from 'react-draggable'; // <DraggableCore>
//import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
//import { PhotoshopPicker  } from 'react-color'
//import { IconButton } from '@material-ui/core';
import { SketchPicker } from 'react-color'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import RubberSlider from "@shwilliam/react-rubber-slider";

import "@shwilliam/react-rubber-slider/dist/styles.css";
//import "./styles.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

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
//let Draggable = require('react-draggable');
//let DraggableCore = Draggable.DraggableCore;
class App extends Component {
  constructor() {
    super();
    this.state = {
      background: '#20b8aa',
      token: null,
      pic: null,
      setValue: "50",
      artists: [],
      pictures: [],
      pictures2: [],
      pictures3: [],
      yes: false,
      no: true,
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
      uri_name: null,
      uri_screenname: null,
      song_uri: null,
      song_recc: null,
      artist_recc: null,
      selectValue: null,
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.gridchange= this.gridchange.bind(this);
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getArtists = this.getArtists.bind(this);
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }
  gridchange(e){
    this.setState({ grid: e.target.value });

  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  setValue = (value) =>{
    this.setState({setValue: Number(value)})
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
    //console.log(this.state.selectValue)
    try{
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
      //  let empty_list = [];
        let pic_list = [];
        let j;
        //console.log(list[0][1])
        for (j=0; j< 20; j++){
         // empty_list.push(list[0][1][j]["genres"]);
          pic_list.push(list[0][1][j]["images"][0]["url"])
        }
        console.log(pic_list);
        //let merged = [].concat.apply([], empty_list);
        //for(var i = 1 ; i < merged.length ; i++){
         // merged[i] = merged[i].charAt(0).toUpperCase() + merged[i].substr(1);
    //  }    
        this.setState({
         // artists: merged,
          pictures: pic_list
        });
        //let holder = find_liked(this.state.artists);
        this.setState({
          //song_recc: holder[0],
          //artist_recc: holder[1],
        });
      }
    })}catch(error){console.log(error);}
    /*try{
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
        for (j=0; j< 20; j++){
          //empty_list.push(list[0][1][j]["genres"]);
          pic_list.push(list[0][1][j]["images"][0]["url"])
        }
        //let merged = [].concat.apply([], empty_list);
      //  for(var i = 1 ; i < merged.length ; i++){
          //merged[i] = merged[i].charAt(0).toUpperCase() + merged[i].substr(1);
     // }    
        this.setState({
         // artists: merged,
          pictures2: pic_list
        });
        //let holder = find_liked(this.state.artists);
        this.setState({
          //song_recc: holder[0],
         // artist_recc: holder[1],
        });
      }
    })}catch(error){console.log(error);}
    try{
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?time_range="+"medium_term",
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
        //let empty_list = [];
        let pic_list = [];
        let j;
        for (j=0; j< 20; j++){
         // empty_list.push(list[0][1][j]["genres"]);
          pic_list.push(list[0][1][j]["images"][0]["url"])
        }
       // let merged = [].concat.apply([], empty_list);
       // for(var i = 1 ; i < merged.length ; i++){
        //  merged[i] = merged[i].charAt(0).toUpperCase() + merged[i].substr(1);
     // }    
        this.setState({
         // artists: merged,
          pictures3: pic_list
        });
        //let holder = find_liked(this.state.artists);
        this.setState({
         // song_recc: holder[0],
         // artist_recc: holder[1],
        });
      }
    })}catch(error){console.log(error);}*/
  }



  render() {
    return (
      
      <div className="App" style={{backgroundColor: this.state.background, height: "100%", width: "100%"}}>
        
        <header className="App-header">
          <div className="pink"> 
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>

          {!this.state.token &&(
            <h2 className="header">Collages</h2>
          )}
          {!this.state.token &&(
            <div>
           <p>Create beautiful collages via spotify</p>
            <br/>
            <BrowserView>
    <h4> This app only works on mobile :( </h4>
</BrowserView>
<MobileView>

            <a className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=false`}>
              Login to Spotify
            </a>
            </MobileView>

            <br/>
            <br/>
            <div id="bar"></div>
            <br></br>
            <br/>
           </div>
          )}
          
          </div>
          <br></br>
          
          <br></br>
        
          {this.state.token &&(
           <div className="centeredsketch">
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
                Let's create some collages!
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
                {this.state.token &&(
                <div>
                   <br/>
                <br/>
                <br/>
                <h2>
                Select a color to begin
              </h2>
              <br/>

                <div className="centeredsketch">
                  <SketchPicker width="100"
                  color={ this.state.background }
                  onChangeComplete={ this.handleChangeComplete }
                />
               </div>
               <br/>

               <h4>
Drag to change art shape <br></br>        </h4>
                    
                <Slider max={40} value={this.state.setValue} onChange={this.setValue} />   
                <br/>

                <p> Drag to move art  </p>

                </div>
              
                )}
              <br/>  
          
         

            
          
          </div>)}
          {this.state.pictures != null &&(
            <div className="pics">
              <br/>  
               

              {this.state.pictures.map(long =>(
                      <Draggable         grid={[1, 1]}
                      >
                        <img src={long} style={{borderRadius: this.state.setValue}} alt="Artist #1"></img>
                      </Draggable>
              ))}
              </div>


              
              )}

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

/*
<p>Top songs?</p>
<select id="dropdown" onChange={this.handleDropdownChange}>
<option value={this.state.pictures}>long_term</option>
<option value={this.state.pictures3}>medium_term</option>
<option value={this.state.pictures2}>short_term</option>
</select>


   <p>Snap to grid?</p>
            <select id="dropdown" onChange={this.gridchange}>
              <option value={this.state.yes}>Yes</option>
              <option value={this.state.no}>No</option>
            </select>
*/