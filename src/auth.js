const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const usersFile = 'users.json';

const SECRET_KEY = 'your_secret_key'; // Change this to a secure key

async function register(req, res) {
    const { email, password } = req.body;
    const users = JSON.parse(await fs.readFile(usersFile, 'utf-8')) || [];
    
    const existingUser  = users.find(user => user.email === email);
    if (existingUser ) {
        return res.status(400).json({ message: 'User  already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = { id: uuidv4(), email, password: hashedPassword };
    users.push(newUser );
    
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
    res.status(201).json({ message: 'User  registered successfully' });
}

async function login(req, res) {
    const { email, password } = req.body;
    const users = JSON.parse(await fs.readFile(usersFile, 'utf-8')) || [];
    const user = users.find(u => u.email === email);
    
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

function authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(403);
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = { register, login, authenticate };
