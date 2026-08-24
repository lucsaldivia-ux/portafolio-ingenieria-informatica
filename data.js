// ============================================================
// data.js — Datos personales centralizados
// Edita SOLO este archivo para actualizar tu info,
// no necesitas tocar el HTML.
// ============================================================

const DATOS = {
  // --- Información personal ---
  nombre: "Lucas Saldivia Belmar",
  titulo: "Estudiante de Ingeniería en Informática",
  bio: "Actualmente estudiante de ingeniería en informática del instituto profesional DuocUC, en formación para ser informático, con buena capacidad de aprendizaje y trabajo en equipo. Estoy en mi segundo año de carrera; me fascina la ciencia de datos y actualmente curso ingeniería de software, adquiriendo cada vez más conocimientos de este mundo.",
  avatar: "", // Deja vacío "" para usar el avatar de GitHub automáticamente

  // --- Usuario de GitHub (para el fetch de repos) ---
  githubUsuario: "lucsaldivia-ux",

  // --- Contacto / redes ---
  contacto: {
    email: "luc.saldivia@duocuc.cl",
    github: "https://github.com/lucsaldivia-ux",
    linkedin: "", // Agrega tu URL de LinkedIn aquí, ej: "https://linkedin.com/in/tu-usuario"
    otras: [] // Otras redes, ej: [{ nombre: "Kaggle", url: "https://kaggle.com/tuusuario" }]
  },

  // --- Habilidades (con ícono emoji como placeholder simple) ---
  habilidades: [
    { nombre: "Python", icono: "🐍" },
    { nombre: "JavaScript", icono: "🟨" },
    { nombre: "Spring Boot", icono: "🍃" },
    { nombre: "SQL / Oracle PL-SQL", icono: "🗄️" },
    { nombre: "Bases de datos", icono: "📊" },
    { nombre: "IA y agentes de IA", icono: "🤖" },
    { nombre: "AWS", icono: "☁️" }
  ],

  // --- Opciones de repos ---
  repos: {
    excluirForks: true,      // true = no mostrar repos forkeados
    excluirArchivados: true, // true = no mostrar repos archivados
    cantidadMaxima: 12       // Máximo de repos a mostrar
  }
};
