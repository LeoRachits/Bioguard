function validateStatus(status) {
  const statusValidos = ['pendente', 'em andamento', 'concluido'];
  return statusValidos.includes(status);
}

function validateOcorrencia(ocorrencia) {
  if (!ocorrencia.animal || ocorrencia.animal.trim() === '') return false;
  if (!ocorrencia.porte || ocorrencia.porte.trim() === '') return false;
  if (!ocorrencia.localizacao || ocorrencia.localizacao.trim() === '') return false;
  if (!ocorrencia.estado_aparente || ocorrencia.estado_aparente.trim() === '') return false;
  return true;
}

function validateInstituicao(inst) {
  const tiposValidos = ['ONG', 'CCZ', 'ABRIGO'];
  if (!inst.nome || inst.nome.trim() === '') return false;
  if (!tiposValidos.includes(inst.tipo)) return false;
  if (!inst.local || inst.local.trim() === '') return false;
  if (!inst.telefone || inst.telefone.trim() === '') return false;
  return true;
}

module.exports = { validateStatus, validateOcorrencia, validateInstituicao };
