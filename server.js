const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/questionModel');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/questions', questionRoutes);

sequelize.sync().then(() => {
  console.log('Question model synced with database');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error syncing Question model:', error);
});
