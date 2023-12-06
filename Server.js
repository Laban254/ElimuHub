const express = require('express');
const app = express();

// load the environment variable configurations
require ('dotenv').config();

const port = process.env.PORT || 3000;

// Define your API routes
app.use('/api', require('./routes/general.routes.js'));
app.use('/api/system-admin',require('./routes/system-admin.routes.js'));
app.use('/api/school-admin', require('./routes/school-admin.routes.js'));
app.use('/api/info', require('./routes/information.routes.js'))
app.use('/api/resources', require('./routes/resources.routes.js'));

// Default route for handling undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
