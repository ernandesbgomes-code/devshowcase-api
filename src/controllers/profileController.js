const { Profile, Project } = require('../models');
const { validateProfileDTO } = require('../dtos/validations');

module.exports = {
  async create(req, res) {
    const errors = validateProfileDTO(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    try {
      const { name, bio, githubUrl } = req.body;
      const profile = await Profile.create({ name, bio, githubUrl });
      
      return res.status(201).json({
        id: profile.id,
        name: profile.name,
        bio: profile.bio,
        githubUrl: profile.githubUrl,
        createdAt: profile.createdAt
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar perfil.' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const profile = await Profile.findByPk(id, {
        include: [{ model: Project, as: 'projects' }]
      });

      if (!profile) {
        return res.status(404).json({ error: 'Perfil não encontrado.' });
      }

      return res.status(200).json(profile);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar perfil.' });
    }
  }
};
