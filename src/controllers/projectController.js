const { Project, Profile, Technology, Feedback } = require('../models');
const { validateProjectDTO } = require('../dtos/validations');

module.exports = {
  async create(req, res) {
    const errors = validateProjectDTO(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    try {
      const { title, description, repositoryUrl, profileId, technologyIds } = req.body;

      const profile = await Profile.findByPk(profileId);
      if (!profile) {
        return res.status(404).json({ error: 'Profile informado não existe.' });
      }

      const project = await Project.create({ title, description, repositoryUrl, profileId });

      if (technologyIds && Array.isArray(technologyIds)) {
        await project.setTechnologies(technologyIds);
      }

      return res.status(201).json(project);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar projeto.' });
    }
  },

  async getAll(req, res) {
    try {
      const projects = await Project.findAll({
        include: [
          { model: Profile, as: 'profile', attributes: ['id', 'name'] },
          { model: Technology, as: 'technologies', through: { attributes: [] } },
          { model: Feedback, as: 'feedbacks' }
        ]
      });

      return res.status(200).json(projects);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar projetos.' });
    }
  }
};
