const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const personsRouter = require('./routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, 'api-docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('AncestryMVP API is running');
});

app.use('/api', personsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 