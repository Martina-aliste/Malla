const ramosPorSemestre = [
  {
    semestre: 1,
    ramos: [
      { id: 'quimica', nombre: 'Química general y orgánica' },
      { id: 'antropologia', nombre: 'Antropología' },
      { id: 'intro', nombre: 'Introducción a la tecnología médica' },
      { id: 'biologia', nombre: 'Biología celular' },
      { id: 'matematica', nombre: 'Matemáticas básica' },
      { id: 'habilidades', nombre: 'Integrado en habilidades científicas para la tecnología médica' }
    ]
  },
  {
    semestre: 2,
    ramos: [
      { id: 'bioquimica', nombre: 'Bioquímica general', prereqs: ['quimica'] },
      { id: 'morfologia', nombre: 'Morfología básica' },
      { id: 'etica', nombre: 'Ética', prereqs: ['antropologia'] },
      { id: 'tecnologia_equipo', nombre: 'Tecnología médica en el equipo de salud', prereqs: ['intro'] },
      { id: 'bioseguridad', nombre: 'Bioseguridad y procedimientos de apoyo diagnóstico' },
      { id: 'psicologia', nombre: 'Psicología de atención al paciente' }
    ]
  },
  {
    semestre: 3,
    ramos: [
      { id: 'fisiologia1', nombre: 'Fisiología - Fisiopatología - Farmacología I', prereqs: ['bioquimica'] },
      { id: 'salud', nombre: 'Salud poblacional' },
      { id: 'inmunologia', nombre: 'Inmunología', prereqs: ['morfologia'] },
      { id: 'bioanalisis', nombre: 'Bioanálisis instrumental y clínico', prereqs: ['bioquimica'] }
    ]
  },
  {
    semestre: 4,
    ramos: [
      { id: 'fisiologia2', nombre: 'Fisiología - Fisiopatología - Farmacología II', prereqs: ['fisiologia1'] },
      { id: 'bioetica', nombre: 'Bioética' },
      { id: 'epidemiologia', nombre: 'Epidemiología', prereqs: ['salud'] },
      { id: 'inmunologia_clinica', nombre: 'Inmunología clínica', prereqs: ['inmunologia'] },
      { id: 'microbiologia', nombre: 'Microbiología para laboratorio clínico', prereqs: ['inmunologia'] },
      { id: 'hito_integrativo', nombre: 'Hito evaluativo integrativo', prereqs: ['nivel2', 'nivel3'] }
    ]
  },
  {
    semestre: 5,
    ramos: [
      { id: 'persona_sociedad', nombre: 'Persona y sociedad', prereqs: ['etica'] },
      { id: 'bioestadistica', nombre: 'Bioestadística', prereqs: ['matematica'] },
      { id: 'bioquimica_clinica', nombre: 'Bioquímica clínica', prereqs: ['bioanalisis'] },
      { id: 'infectologia', nombre: 'Infectología clínica', prereqs: ['microbiologia'] },
      { id: 'parasitologia', nombre: 'Parasitología humana', prereqs: ['microbiologia'] }
    ]
  },
  {
    semestre: 6,
    ramos: [
      { id: 'gestion', nombre: 'Gestión en equipos para el alto desempeño' },
      { id: 'electivo1', nombre: 'Electivo 1: formación integral' },
      { id: 'diagnostico_bioquimico', nombre: 'Diagnóstico bioquímico', prereqs: ['bioquimica_clinica'] },
      { id: 'diagnostico_microbiologico', nombre: 'Diagnóstico microbiológico', prereqs: ['infectologia'] },
      { id: 'diagnostico_parasitologico', nombre: 'Diagnóstico parasitológico', prereqs: ['parasitologia'] }
    ]
  },
  {
    semestre: 7,
    ramos: [
      { id: 'electivo2', nombre: 'Electivo 2: formación profesional' },
      { id: 'metodologia', nombre: 'Metodología de la investigación' },
      { id: 'hematologia', nombre: 'Hematología clínica', prereqs: ['diagnostico_bioquimico'] },
      { id: 'inmunohematologia', nombre: 'Inmunohematología', prereqs: ['inmunologia_clinica'] },
      { id: 'diagnostico_molecular', nombre: 'Diagnóstico molecular clínico', prereqs: ['inmunologia_clinica'] }
    ]
  },
  {
    semestre: 8,
    ramos: [
      { id: 'electivo3', nombre: 'Electivo 3: formación profesional' },
      { id: 'diagnostico_hematologico', nombre: 'Diagnóstico hematológico', prereqs: ['hematologia'] },
      { id: 'medicina_transfusional', nombre: 'Medicina transfusional', prereqs: ['inmunohematologia'] },
      { id: 'salud_digital', nombre: 'Salud digital' },
      { id: 'hito_interprofesional', nombre: 'Hito evaluativo integrado interprofesional', prereqs: ['nivel6', 'nivel7'] }
    ]
  },
  {
    semestre: 9,
    ramos: [
      { id: 'gestion_carrera', nombre: 'Gestión de carrera y desarrollo profesional' },
      { id: 'taller_investigacion', nombre: 'Taller de investigación aplicado en tecnología médica', prereqs: ['nivel7', 'nivel8'] },
      { id: 'electivo2_rep', nombre: 'Electivo 2' },
      { id: 'electivo3_rep', nombre: 'Electivo 3' },
      { id: 'acreditacion', nombre: 'Gestionar preferencias y acreditación en laboratorio clínico' }
    ]
  },
  {
    semestre: 10,
    ramos: [
      { id: 'internado', nombre: 'Internado', prereqs: ['nivel7', 'nivel8'] }
    ]
  }
];

let aprobados = JSON.parse(localStorage.getItem('aprobados')) || [];

function crearMalla() {
  const container = document.getElementById('malla');
  container.innerHTML = '';

  ramosPorSemestre.forEach(({ semestre, ramos }) => {
    const bloque = document.createElement('div');
    bloque.className = 'semestre';
    const titulo = document.createElement('h2');
    titulo.textContent = `Semestre ${semestre}`;
    bloque.appendChild(titulo);

    ramos.forEach(ramo => {
      const div = document.createElement('div');
      div.className = 'ramo';
      div.dataset.id = ramo.id;
      div.textContent = ramo.nombre;
      div.addEventListener('click', () => aprobarRamo(div));
      bloque.appendChild(div);
    });

    container.appendChild(bloque);
  });

  actualizarEstado();
}

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

  localStorage.setItem('aprobados', JSON.stringify(aprobados));
  actualizarEstado();
}

function actualizarEstado() {
  // Calcular niveles
  const niveles = {};
  for (let i = 0; i < ramosPorSemestre.length; i++) {
    const nivel = i + 1;
    const ramosNivel = ramosPorSemestre[i].ramos.map(r => r.id);
    niveles[`nivel${nivel}`] = ramosNivel.every(r => aprobados.includes(r));
  }

  document.querySelectorAll('.ramo').forEach(ramo => {
    const id = ramo.dataset.id;
    const data = ramosPorSemestre.flatMap(s => s.ramos).find(r => r.id === id);
    const prereqs = data.prereqs || [];

    ramo.classList.remove('aprobado', 'bloqueado');
    if (aprobados.includes(id)) {
      ramo.classList.add('aprobado');
    } else {
      const bloqueado = prereqs.some(p => {
        if (p.startsWith('nivel')) {
          return !niveles[p];
        }
        return !aprobados.includes(p);
      });
      if (bloqueado) {
        ramo.classList.add('bloqueado');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', crearMalla);
