const { Technology } = require('../models');
const { validateTechnologyDTO } = require('../dtos/validations');

module.exports = {
  async create(req, res) {
    const errors = validateTechnologyDTO(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    try {
      const { name } = req.body;
      const tech = await Technology.create({ name });
      return res.status(201).json(tech);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar tecnologia ou nome já existente.' });
    }
  },

  async getAll(req, res) {
    try {
      const list = await Technology.findAll();
      return res.status(200).json(list);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar tecnologias.' });
    }
  }
};
