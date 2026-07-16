// Interactividad ligera para GitHub Pages: carga contenido, alterna modos y calcula rúbrica.
const state = { content: null, rubricScores: {} };

const modeCopy = {
  docente: {
    title: 'Orientaciones para facilitar la unidad',
    items: [
      'Cuida acuerdos de confidencialidad: trabajar con casos ficticios o anonimizados.',
      'Prioriza preguntas restaurativas antes que soluciones rápidas generadas por IA.',
      'Evalúa el proceso con evidencias narrativas, diálogo y acuerdos construidos.'
    ]
  },
  estudiante: {
    title: 'Tu misión durante la experiencia',
    items: [
      'Escucha sin interrumpir y habla desde tu experiencia, sin señalar personas.',
      'Usa la IA como apoyo para mejorar ideas, no como reemplazo de tu criterio.',
      'Propón acciones pequeñas que ayuden a reparar confianza y convivencia.'
    ]
  }
};

const $ = (selector) => document.querySelector(selector);

function renderMode(mode = 'docente') {
  const panel = $('#modePanel');
  const copy = modeCopy[mode];
  panel.innerHTML = `<h3>${copy.title}</h3><ul>${copy.items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  document.querySelectorAll('.mode-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
}

function renderMoments(moments) {
  $('#momentsAccordion').innerHTML = moments.map((moment, index) => `
    <article class="accordion-item ${index === 0 ? 'open' : ''}">
      <button class="accordion-trigger" type="button" aria-expanded="${index === 0}">
        <span><span class="moment-number">${moment.numero}</span>${moment.titulo}</span><span>${moment.duracion}</span>
      </button>
      <div class="accordion-content">
        <p><strong>Pregunta guía:</strong> ${moment.pregunta}</p>
        <ul>${moment.actividades.map((activity) => `<li>${activity}</li>`).join('')}</ul>
        <p class="product">Producto esperado: ${moment.producto}</p>
      </div>
    </article>`).join('');
}

function renderRubric(rubric) {
  $('#rubricGrid').innerHTML = rubric.map((row, rowIndex) => `
    <article class="rubric-card">
      <h3>${row.criterio}</h3>
      <div class="rubric-options">
        ${row.niveles.map((level, levelIndex) => `<button type="button" data-row="${rowIndex}" data-level="${levelIndex + 1}"><strong>Nivel ${levelIndex + 1}:</strong> ${level}</button>`).join('')}
      </div>
    </article>`).join('');
}

function updateRubricResult() {
  const values = Object.values(state.rubricScores);
  const result = $('#rubricResult');
  if (!values.length) return;
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const message = average >= 3.5
    ? 'Proceso destacado: el grupo muestra autonomía restaurativa y criterio ético.'
    : average >= 2.5
      ? 'Proceso sólido: hay avances claros y oportunidades para profundizar acuerdos.'
      : 'Proceso inicial: conviene reforzar escucha, cuidado narrativo y revisión crítica.';
  result.value = `${message} Promedio actual: ${average.toFixed(1)} / 4.`;
}

function renderTimeline(moments) {
  $('#timeline').innerHTML = moments.map((moment) => `
    <article class="timeline-card">
      <strong>Momento ${moment.numero}</strong>
      <h3>${moment.titulo}</h3>
      <p>${moment.duracion}</p>
    </article>`).join('');
}

function renderResources(resources) {
  $('#resourcesGrid').innerHTML = resources.map((resource) => `
    <article class="resource-card">
      <strong>${resource.tipo}</strong>
      <h3>${resource.titulo}</h3>
      <p>${resource.descripcion}</p>
    </article>`).join('');
}

async function loadContent() {
  const response = await fetch('data/unit-content.json');
  state.content = await response.json();
  $('#unitTitle').textContent = state.content.titulo;
  $('#unitSubtitle').textContent = state.content.subtitulo;
  $('#unitPurpose').textContent = state.content.proposito;
  $('#unitDuration').textContent = state.content.duracion;
  $('#unitAudience').textContent = state.content.publico;
  renderMoments(state.content.momentos);
  renderRubric(state.content.rubrica);
  renderTimeline(state.content.momentos);
  renderResources(state.content.recursos);
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('.accordion-trigger');
  if (trigger) {
    const item = trigger.closest('.accordion-item');
    item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', item.classList.contains('open'));
  }

  const rubricButton = event.target.closest('.rubric-options button');
  if (rubricButton) {
    const row = rubricButton.dataset.row;
    state.rubricScores[row] = Number(rubricButton.dataset.level);
    rubricButton.parentElement.querySelectorAll('button').forEach((button) => button.classList.remove('selected'));
    rubricButton.classList.add('selected');
    updateRubricResult();
  }
});

$('.menu-toggle').addEventListener('click', (event) => {
  const links = $('#navLinks');
  const isOpen = links.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.mode-button').forEach((button) => {
  button.addEventListener('click', () => renderMode(button.dataset.mode));
});

renderMode();
loadContent();
