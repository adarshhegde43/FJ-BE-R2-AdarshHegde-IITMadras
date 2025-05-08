const express = require('express');
const { sequelize } = require('./models');
const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Finance Tracker is up and running !');
})

// Sync database and models
sequelize.sync({ force: false })
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.error('Error syncing database:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`);
});


