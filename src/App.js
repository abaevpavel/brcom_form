import './App.css';
import Form from './topLevelComponents/form';
import Message from './topLevelComponents/message';
import { fetchInfo } from './helpers/airtable';
import parseQueryInputs from './helpers/processInput';
import React, { useState, useEffect } from 'react';

function App() {
  let [submitted, setSubmitted] = useState(false);
  let [config, setConfig] = useState({});
  let path = window.location.pathname;
  let subForm;

  useEffect(() => {
    const urlParams = Object.fromEntries(new URLSearchParams(window.location.search.replaceAll('amp;','')));
    fetchInfo(urlParams.configId, urlParams.id, (result) => {
      setConfig(
        result
        )
    })
  }, [])

  if (path === '/eta') {
    subForm = "ETA";
  }

  let formOrThankYou = () => {
    if (config.config && !submitted) {
      return (<Form parsedInputs={config} showThankYou={setSubmitted} subForm={subForm}></Form>)
    } else {
      if (submitted) {
        return (<Message title={config.item.fields.Item} message="Your submission was received."> </Message>)
      }
      return (<Message title="Loading" message=""> </Message>) 
    }
   
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="container">
        {formOrThankYou()}
      </div>
    </div>
  );
}

export default App;
