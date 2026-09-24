function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function validateProfileDTO(body) {
  const errors = [];
  if (!body.name || body.name.trim() === '') errors.push('O campo "name" é obrigatório.');
  if (!body.githubUrl || !isValidUrl(body.githubUrl)) errors.push('O campo "githubUrl" deve ser uma URL válida.');
  return errors;
}

function validateTechnologyDTO(body) {
  const errors = [];
  if (!body.name || body.name.trim() === '') errors.push('O campo "name" da tecnologia é obrigatório.');
  return errors;
}

function validateProjectDTO(body) {
  const errors = [];
  if (!body.title || body.title.trim() === '') errors.push('O campo "title" é obrigatório.');
  if (!body.description || body.description.trim() === '') errors.push('O campo "description" é obrigatório.');
  if (!body.repositoryUrl || !isValidUrl(body.repositoryUrl)) errors.push('O campo "repositoryUrl" deve conter uma URL válida.');
  if (!body.profileId) errors.push('O campo "profileId" é obrigatório.');
  return errors;
}

module.exports = {
  validateProfileDTO,
  validateTechnologyDTO,
  validateProjectDTO
};
