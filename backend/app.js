const express = require('express');
const cors = require('cors');
const kelpRoutes = require('./routes/kelpRoutes');
const diveSitesRoutes = require('./routes/diveSitesRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/kelp', kelpRoutes);
app.use('/api/dive-sites', diveSitesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
