const sequelize = require('../config/database');
const Profile = require('./Profile');
const Project = require('./Project');
const Technology = require('./Technology');
const Feedback = require('./Feedback');

// 1. Profile 1 : N Project
Profile.hasMany(Project, { foreignKey: 'profileId', as: 'projects' });
Project.belongsTo(Profile, { foreignKey: 'profileId', as: 'profile' });

// 2. Project N : N Technology
Project.belongsToMany(Technology, { through: 'ProjectTechnologies', as: 'technologies' });
Technology.belongsToMany(Project, { through: 'ProjectTechnologies', as: 'projects' });

// 3. Project 1 : N Feedback
Project.hasMany(Feedback, { foreignKey: 'projectId', as: 'feedbacks' });
Feedback.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

module.exports = {
  sequelize,
  Profile,
  Project,
  Technology,
  Feedback
};