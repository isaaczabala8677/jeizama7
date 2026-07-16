# Voces que Restauran

Recurso web interactivo para GitHub Pages basado en la unidad didáctica **“Voces que Restauran: inteligencia artificial para narrar, reflexionar y construir convivencia escolar”**.

## ¿Qué incluye?

- Diseño responsive con estética cálida, escolar, moderna y profesional.
- Navegación por secciones.
- Modo docente y modo estudiante.
- Ruta didáctica desplegable en cuatro momentos.
- Rúbrica interactiva con retroalimentación automática.
- Cronograma visual.
- Recursos complementarios.
- Sección **App futura**, que aclara que la app funcional de recolección de datos se diseñará más adelante con participación estudiantil.

## Estructura

```text
docs/
├── index.html
├── assets/
│   ├── app.js
│   └── styles.css
└── data/
    └── unit-content.json
```

## Desarrollo local

Por usar `fetch` para leer `docs/data/unit-content.json`, abre el sitio con un servidor local:

```bash
python3 -m http.server 8000 --directory docs
```

Luego visita `http://localhost:8000`.

## Activar GitHub Pages desde `/docs`

1. Sube los cambios a GitHub.
2. En el repositorio, entra a **Settings**.
3. Abre **Pages** en el menú lateral.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. En **Branch**, elige la rama principal y la carpeta **/docs**.
6. Guarda los cambios y espera a que GitHub publique la URL del sitio.

## Nota ética

Esta primera versión no recolecta información de estudiantes. Cualquier app futura deberá diseñarse con consentimiento, minimización de datos, protección de privacidad y revisión humana de las decisiones apoyadas por IA.
