import React, { Component } from 'react'
import 'antd/dist/antd.css'
// import Music from './components/Music'
import SearchBar from './components/SearchBar'
import VideoList from './components/VideoList'
import VideoDetail from './components/VideoDetail'
import YTSearch from 'youtube-api-search'
import { Icon, notification } from 'antd'
import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.REACT_APP_API_KEY

export default class App extends Component {

  constructor( props ) {
    super(props);
    this.state = {
       videos: [],
       search: true,
       selectedVideo: {}
    };

    this.welcome();
  }


  //!USING ANTD
   welcome = () => {
    notification.open({
      message: `Welcome to our APP`,
      description: `Let us start by searching for some videos`,
      icon: <Icon type="smile" style={{color: 'red'}}/>
    })
  }


videoSearch = (term) => {
  if(this.state.search){
    YTSearch({key: API_KEY, term}, (data) => {
      try {
        if(data && data.data && data.data.error.message) {
          console.log(data);
          console.error(`IDK WHY IT WANTED THIS ERROR`)
        }
        this.setState({ videos:[...data], selectedVideo: data[0]  });
        console.log(this.state.videos)
      } catch (err) {
        notification['error']({
          message: `Daily Limit Exceeded`,
          description: `YouTube data API daily limit exceeded.`
        })
      }
    })
  }
}

handleChange = (value) => {
  setTimeout( () => {
    if( value === ''){
      this.setState({ videos: [], selectedVideo: null });
      return;
    }

    if( this.state.search ) {
      this.videoSearch( value );
    }

    setTimeout( () => {
      this.setState({ search: true });
    }, 5000);

  }, 2000);

};

render() {
  return (
    <div>
      {process.env.REACT_APP_BASE_URL}
      <h2>My Music App</h2>
        <div
        style={{display: 'flex', flexDirection: 'column'}}>
        <div
        style={{display: 'flex', justifyContent: 'space-between',background: 'red'}}>
        <h1
        style={{color: '#efefef', alignSelf: 'center', flexBasis: '4', paddingTop:'20px', padingLeft: '30px' }}>
        YTSearch   <Icon type={'search'}/></h1>
        <SearchBar videos={this.state.videos} video={this.state.selectedVideo} onChange={this.handleChange} 
        handleSearch={(video)=> this.setState({ selectedVideo: this.state.videos[video], search: false  })}/>
        </div>

        <div 
        style={{display: 'flex'}}>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList videos={this.state.videos}
        onVideoSelect={(userSelected)=> {this.setState({ selectedVideo: this.state.videos[userSelected]  })}}/>

        </div>
        </div>

    </div>
  )
}
}


