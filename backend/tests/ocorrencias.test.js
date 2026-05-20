const { validateStatus, validateOcorrencia } = require('./helpers');

describe('Validacao de Status de Ocorrencia', () => {
  test('status pendente e valido', () => {
    expect(validateStatus('pendente')).toBe(true);
  });

  test('status em andamento e valido', () => {
    expect(validateStatus('em andamento')).toBe(true);
  });

  test('status concluido e valido', () => {
    expect(validateStatus('concluido')).toBe(true);
  });

  test('status invalido retorna false', () => {
    expect(validateStatus('cancelado')).toBe(false);
  });

  test('status vazio retorna false', () => {
    expect(validateStatus('')).toBe(false);
  });
});

describe('Validacao de Campos de Ocorrencia', () => {
  test('ocorrencia valida passa na validacao', () => {
    const ocorrencia = {
      animal: 'Cao',
      porte: 'Medio',
      localizacao: 'Setor A',
      estado_aparente: 'Saudavel'
    };
    expect(validateOcorrencia(ocorrencia)).toBe(true);
  });

  test('ocorrencia sem animal falha na validacao', () => {
    const ocorrencia = {
      animal: '',
      porte: 'Medio',
      localizacao: 'Setor A',
      estado_aparente: 'Saudavel'
    };
    expect(validateOcorrencia(ocorrencia)).toBe(false);
  });

  test('ocorrencia sem localizacao falha na validacao', () => {
    const ocorrencia = {
      animal: 'Gato',
      porte: 'Pequeno',
      localizacao: '',
      estado_aparente: 'Ferido'
    };
    expect(validateOcorrencia(ocorrencia)).toBe(false);
  });

  test('ocorrencia com coordenadas validas passa', () => {
    const ocorrencia = {
      animal: 'Ave',
      porte: 'Pequeno',
      localizacao: 'Patio Norte',
      estado_aparente: 'Assustada',
      latitude: -3.7318,
      longitude: -38.5267
    };
    expect(validateOcorrencia(ocorrencia)).toBe(true);
  });
});
