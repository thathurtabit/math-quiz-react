import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import App from './components/pages/App';
import registerServiceWorker from './registerServiceWorker';

document.getElementsByTagName('body')[0].style.cssText = 'padding:0;margin:0;height:100vh;';
document.getElementById('root').style.cssText = 'background:#FFE45A;color:#666;height:100vh;display:flex;flex-direction: column;align-items: center;justify-content: center;';

WebFont.load({
  google: {
    families: ['Lora']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
