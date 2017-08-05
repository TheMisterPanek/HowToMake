import 'bootstrap';
import Rails from 'rails-ujs';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import manual from '../reducers/manual.js';
import connection from '../reducers/connection.js'
import App from '../components/app.js';
import Footer from '../components/footer.js';

import Dropzone from 'dropzone';

import '../styles/application.scss';

const InitializeAnimationForIcons = ()=>{
  let icons = $(".sigin-icon");
  if(icons[0] && icons[1] && icons[2] ){
    const onMouseOverToIcon = (e)=>{
      e.target.style.height = "350px";
      e.target.style.width = "350px";
    }

    const onMouseLeaveFromIcon = (e)=>{
      e.target.style.height = "250px";
      e.target.style.width = "250px";
    }

    for (var i = icons.length - 1; i >= 0; i--) {
      icons[i].onmouseover = onMouseOverToIcon;
      icons[i].onmouseleave = onMouseLeaveFromIcon;

    };
  }
} 

document.addEventListener("DOMContentLoaded", () => {
  Rails.start();

  InitializeAnimationForIcons();

  const rootElement = $("#manual");
  if (rootElement[0]) {
    const data = rootElement.data('initialState');
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const rootReducer = combineReducers({ manual, connection });
    const store = createStore(rootReducer,
                              fromJS({manual: data, connection: {connected: false}}),
                              composeEnhancers(applyMiddleware(thunk)));
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      rootElement[0]
    );
    ReactDOM.render(
      <Provider store = {store}>
        <Footer/>
      </Provider> ,
      $("#footer")[0])
  }

  const footer = $("#footer");
  if(footer[0])
    {
      $("#footer-content-left").innerText = "lel";
    }

  const profile = $("#image");
  if (profile[0]){
    var myDropzone = new Dropzone(profile[0], {
      uploadMultiple: false,
      acceptedFiles:'.jpg,.png,.jpeg,.gif',
      url: 'https://api.cloudinary.com/v1_1/dz2gzsnxo/image/upload',
    });
    myDropzone.on('sending', function (file, xhr, formData) {
      console.log(xhr)
      formData.append('api_key', 531494765937474);
      formData.append('timestamp', Date.now() / 1000 | 0);
      formData.append('upload_preset', 'zs2nzpf4');
    });
    myDropzone.on('success', function (file, response) {
      console.log('Success! Cloudinary public ID is', response.public_id);
      $.ajax({
        url: "/users/"+profile.data("user-id"),    
        type: 'PUT',   
        dataType:'json',    
        data: { user: { image: response.public_id } },
      });
      $("#image").attr("src","http://res.cloudinary.com/dz2gzsnxo/image/upload/c_fill,h_200,w_200/" + response.public_id);
    });
  }

  let a = $("#sign-in");
  if(a[0])
    {
      console.log(a);
    }
});


