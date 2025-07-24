const prerrequisitos = {
  bioquimica: ['quimica'],
  etica: ['antropologia'],
  tecnologia_equipo: ['intro'],
  fisiologia1: ['bioquimica'],
  inmunologia: ['morfologia'],
  bioanalisis: ['bioquimica'],
  fisiologia2: ['fisiologia1'],
  epidemiologia: ['salud'],
  inmunologia_clinica: ['inmunologia'],
  microbiologia: ['inmunologia'],
  hito_integrativo: ['nivel2', 'nivel3'],
  persona_sociedad: ['etica'],
  bioestadistica: ['matematica'],
  bioquimica_clinica: ['bioanalisis'],
  infectologia: ['microbiologia'],
  parasitologia: ['microbiologia'],
  diagnostico_bioquimico: ['bioquimica_clinica'],
  diagnostico_microbiologico: ['infectologia'],
  diagnostico_parasitologico: ['parasitologia'],
  hematologia: ['diagnostico_bioquimico'],
  inmunohematologia: ['inmunologia_clinica'],
  diagnostico_molecular: ['inmunologia_clinica'],
  diagnostico_hematologico: ['hematologia'],
  medicina_transfusional: ['inmunohematologia'],
  hito_interprofesional: ['nivel6', 'nivel7'],
  taller_investigacion: ['nivel7', 'nivel8'],
  internado: ['nivel7', 'nivel8']
};

let aprobados = [];

function aprobarRamo(elemento) {
  const id = elemento.dataset.id;
  if (elemento.classList.contains('bloqueado')) return;

  if (!elemento.classList.contains('aprobado')) {
    elemento.classList.add('aprobado');
    aprobados.push(id);
  } else {
    elemento.classList.remove('aprobado');
    aprobados = aprobados.filter(r => r !== id);
  }
  actualizarEstado();
}

function actualizarEstado() {
  document.querySelectorAll('.ramo').forEach(ramo => {
    const id = ramo.dataset.id;
    const prereqs = prerrequisitos[id] || [];

    const bloqueado = prereqs.some(p => !aprobados.includes(p));
    if (!ramo.classList.contains('aprobado')) {
      ramo.classList.toggle('bloqueado', bloqueado);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarEstado();
});
