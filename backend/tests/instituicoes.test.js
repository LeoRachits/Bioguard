const { validateInstituicao } = require('./helpers');

describe('Validacao de Instituicao', () => {
  test('instituicao ONG valida passa', () => {
    const inst = { nome: 'ONG Patinhas Felizes', tipo: 'ONG', local: 'Fortaleza - CE', telefone: '(85) 98888-8888' };
    expect(validateInstituicao(inst)).toBe(true);
  });

  test('instituicao CCZ valida passa', () => {
    const inst = { nome: 'Centro de Zoonoses', tipo: 'CCZ', local: 'Caucaia - CE', telefone: '(85) 97777-7777' };
    expect(validateInstituicao(inst)).toBe(true);
  });

  test('instituicao ABRIGO valida passa', () => {
    const inst = { nome: 'Abrigo Sao Francisco', tipo: 'ABRIGO', local: 'Maracanau - CE', telefone: '(85) 96666-6666' };
    expect(validateInstituicao(inst)).toBe(true);
  });

  test('tipo invalido retorna false', () => {
    const inst = { nome: 'Teste', tipo: 'HOSPITAL', local: 'Fortaleza - CE', telefone: '(85) 91111-1111' };
    expect(validateInstituicao(inst)).toBe(false);
  });

  test('nome vazio retorna false', () => {
    const inst = { nome: '', tipo: 'ONG', local: 'Fortaleza - CE', telefone: '(85) 91111-1111' };
    expect(validateInstituicao(inst)).toBe(false);
  });

  test('telefone vazio retorna false', () => {
    const inst = { nome: 'ONG Teste', tipo: 'ONG', local: 'Fortaleza - CE', telefone: '' };
    expect(validateInstituicao(inst)).toBe(false);
  });
});
