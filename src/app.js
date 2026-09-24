const express = require('express');
const { sequelize } = require('./models');

const profileRoutes = require('./routes/profileRoutes');
const technologyRoutes = require('./routes/technologyRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
app.use(express.json());

app.use('/api', profileRoutes);
app.use('/api', technologyRoutes);
app.use('/api', projectRoutes);

const PORT = 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados SQLite sincronizado com sucesso.');
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar/sincronizar banco de dados:', err);
});
