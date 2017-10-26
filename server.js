const express    = require('express');        
const app        = express();                 
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static(path.join(__dirname, '/dist')));
app.use('/', express.static(path.join(__dirname, '/public')));
var port = process.env.PORT || 3083;       

// ROUTES
// =============================================================================
var router = express.Router();              

router.use(function(req, res, next) {
    next();
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server OK, port ' + port);
