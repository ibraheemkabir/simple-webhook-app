import React from 'react';
import './App.scss';
import {getTransaction} from './Api';
class App extends React.Component{

  state={
    loading:true,
    success:false,
    failure:false,
    canceled:false
  }

  async componentWillMount(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let token = params.get('pay_token');
    let status = params.get('status');
    if(status!==0){
      this.setState({canceled:true,failure:true,loading:false})
    }else{
      const response = await getTransaction(token);
      if(response===200){
        this.setState({success:true,loading:false})
        window.location.replace('exp://192.168.0.144:19000')
      }else{
        alert(response)
        this.setState({failure:true,loading:false})
      }
    }
  }

  render(){
    const {loading,success,failure} = this.state;
    return (
      <div className="App">
     
        <div className="App-header">
          { success  &&
            <>
            <svg id="successAnimation" class="animated" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
              <path id="successAnimationResult" fill="none" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
              <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="none"/>
              <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="none"/>
            </svg>
            <p class="success">Transaction Processed Successfully...</p>
            <span class="right-arrow"></span>
            <a href="kudi://"><p><span>Back to App</span><span class="right-arrow"></span></p></a>
            </>
          }
          {  failure  &&
            <>
            <div className="cross">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="#D06079" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <line class="path line" fill="none" stroke="#282c34" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
            <line class="path line" fill="none" stroke="#282c34" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
            </svg>
            </div>
              <p class="error">Transaction Not Completed... Redirecting</p>
              <a href="kudi://"><p><span>Back to App</span><span class="right-arrow"></span></p></a>
             
            </>
          }
          {
            loading  && 
            <div className="loader"></div>
          }
        </div>
      </div>
    );
  }
}

export default App;
