const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const jwt = require('jsonwebtoken');

    const app = express();
    const PORT = 5000;
    const SECRET_KEY = 'your_secret_key';

    app.use(cors());
    app.use(bodyParser.json());

    const DEMO_USERS = [
      { id: '1', name: 'John Doe', email: 'john@test.com', role: 'team_member', department: 'Engineering' },
      { id: '2', name: 'Jane Smith', email: 'jane@test.com', role: 'department_head', department: 'Marketing' }
    ];

    let updates = [];

    app.post('/login', (req, res) => {
      const { email } = req.body;
      const user = DEMO_USERS.find(u => u.email === email);
      if (user) {
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, user });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    });

    app.get('/updates', (req, res) => {
      res.json(updates);
    });

    app.post('/updates', (req, res) => {
      const update = req.body;
      updates.push(update);
      res.status(201).json(update);
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
