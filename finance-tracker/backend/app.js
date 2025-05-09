const express = require('express');
const { sequelize } = require('./models');
const authenticateJWT = require('./middleware/authenticateJWT');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Finance Tracker is up and running !');
})

// Sync database and models
sequelize.sync({ force: false })
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.error('Error syncing database:', err));

    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const User = require('./models/User');
    
    // Register route
app.post('/auth/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
    }

    try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        username,
        email,
        passwordHash: hashedPassword
    });

    // Create JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h'  // Token expires in 1 hour
    });

    // Return JWT
    res.status(201).json({ token });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
    }
});

// Login route
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    // Return JWT
    res.json({ token });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
    }
});

// Protect the /transactions route
app.get('/transactions', authenticateJWT, (req, res) => {
    res.send('This is a protected route, user is authenticated');
});

app.use('/api', authenticateJWT , dashboardRoutes );

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`);
});


