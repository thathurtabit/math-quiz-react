import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import App from './components/pages/App';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Lora']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
