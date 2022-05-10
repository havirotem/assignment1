import './App.css';
var express = require('express');
var router = express.Router();

function App() {
    router.get('/localhost/3001', (req,res) => {
      res.send('ggg')
    })
  
  return (
    <div className="App">

    </div>
  );
}

export default App;
