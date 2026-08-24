// ============================================================
// script.js — Lógica del portafolio
// 1) Renderiza los datos personales desde data.js
// 2) Obtiene los repositorios desde la API pública de GitHub
// ============================================================

// ---------- Utilidad corta para seleccionar elementos ----------
const $ = (selector) => document.querySelector(selector);

// ============================================================
// 1) RENDERIZAR DATOS PERSONALES (desde data.js)
// ============================================================
function renderizarDatosPersonales() {
  // Hero
  $("#nombre").textContent = DATOS.nombre;
  $("#titulo").textContent = DATOS.titulo;
  document.title = `${DATOS.nombre} | Portafolio`;

  // Avatar: usa el definido en data.js o el de GitHub
  const urlAvatar =
    DATOS.avatar ||
    `https://github.com/${DATOS.githubUsuario}.png?size=240`;
  $("#avatar").src = urlAvatar;

  // Bio
  $("#bio").textContent = DATOS.bio;

  // Enlaces del hero
  $("#link-github-hero").href = `https://github.com/${DATOS.githubUsuario}`;
  $("#link-email-hero").href = `mailto:${DATOS.contacto.email}`;

  // Sección contacto
  $("#c-email").textContent = DATOS.contacto.email;
  $("#c-email").href = `mailto:${DATOS.contacto.email}`;
  $("#c-github").href = DATOS.contacto.github;
  $("#link-github-error").href = `https://github.com/${DATOS.githubUsuario}?tab=repositories`;

  // LinkedIn (se oculta si está vacío)
  if (DATOS.contacto.linkedin) {
    $("#c-linkedin").href = DATOS.contacto.linkedin;
    $("#c-linkedin").hidden = false;
  }

  // Otras redes definidas en data.js
  const contenedorOtras = $("#c-otras");
  DATOS.contacto.otras.forEach((red) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = red.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = red.nombre;
    li.appendChild(a);
    contenedorOtras.appendChild(li);
  });

  // Habilidades
  const listaHabilidades = $("#lista-habilidades");
  DATOS.habilidades.forEach((hab) => {
    const div = document.createElement("div");
    div.className = "habilidad";
    div.innerHTML = `<span>${hab.icono}</span><span>${hab.nombre}</span>`;
    listaHabilidades.appendChild(div);
  });

  // Año actual en el footer
  $("#anio").textContent = new Date().getFullYear();
}

// ============================================================
// 2) FETCH DE REPOSITORIOS DESDE GITHUB
// ============================================================
async function cargarRepos() {
  const loading = $("#repos-loading");
  const errorBox = $("#repos-error");
  const contenedor = $("#lista-repos");

  // URL de la API pública (sin autenticación)
  const url = `https://api.github.com/users/${DATOS.githubUsuario}/repos?sort=updated&per_page=100`;

  try {
    const respuesta = await fetch(url);

    // 403 suele significar rate limit de la API sin token
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

    let repos = await respuesta.json();

    // Filtros configurables en data.js
    if (DATOS.repos.excluirForks) {
      repos = repos.filter((r) => !r.fork);
    }
    if (DATOS.repos.excluirArchivados) {
      repos = repos.filter((r) => !r.archived);
    }

    // Ordenar por última actualización (más reciente primero)
    repos.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );

    // Limitar cantidad
    repos = repos.slice(0, DATOS.repos.cantidadMaxima);

    loading.hidden = true;

    // Caso: no hay repos que mostrar
    if (repos.length === 0) {
      contenedor.innerHTML =
        '<p class="estado">Aún no hay repositorios públicos para mostrar.</p>';
      return;
    }

    // Crear una tarjeta por cada repo
    repos.forEach((repo) => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "repo";

      tarjeta.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
        <p class="descripcion">${repo.description ?? "Sin descripción."}</p>
        <div class="meta">
          ${
            repo.language
              ? `<span><span class="lenguaje-punto" style="background:${colorLenguaje(repo.language)}"></span>${repo.language}</span>`
              : ""
          }
          <span>⭐ ${repo.stargazers_count}</span>
          <span>📅 ${new Date(repo.updated_at).toLocaleDateString("es-CL")}</span>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
  } catch (err) {
    console.error("Error al cargar repos:", err);
    loading.hidden = true;
    errorBox.hidden = false;
  }
}

// Mapa simple de colores por lenguaje (los mismos que usa GitHub aprox.)
function colorLenguaje(lenguaje) {
  const colores = {
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    TypeScript: "#3178c6",
    SQL: "#e38c00",
    PLSQL: "#dad8d8",
    Shell: "#89e051"
  };
  return colores[lenguaje] || "#8b949e";
}

// ============================================================
// 3) MODO OSCURO / CLARO
// ============================================================
function iniciarTema() {
  const btn = $("#btn-tema");

  // Recuperar preferencia guardada o respetar la del sistema
  const preferido = localStorage.getItem("tema");
  const sistemaOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (preferido === "oscuro" || (!preferido && sistemaOscuro)) {
    document.body.classList.add("oscuro");
    btn.textContent = "☀️";
  }

  btn.addEventListener("click", () => {
    const oscuro = document.body.classList.toggle("oscuro");
    btn.textContent = oscuro ? "☀️" : "🌙";
    localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
  });
}

// ============================================================
// INICIO
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderizarDatosPersonales();
  iniciarTema();
  cargarRepos();
});
