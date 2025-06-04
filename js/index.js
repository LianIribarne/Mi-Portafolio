// =========================================
// ANIMACIÓN DE CARGA INICIAL (LOADER)
// =========================================

$(window).on('load', function () {
  document.getElementById('navigation-bar').classList.add('hidden');

  // Mueve y desvanece el loader después de 3s
  gsap.to('#loader', {
    duration: 1,
    y: "-100%",
    opacity: 0,
    delay: 1
  });

  // Luego oculta completamente el loader
  gsap.to('#loader', {
    duration: 0,
    display: "none",
    delay: 6
  });

  // Muestra el header (contenido principal)
  gsap.to('#home-link', {
    duration: 0,
    display: "block",
    delay: 6
  });

  // Oculta navigation-content para prevenir visualización inicial
  gsap.to('#navigation-content', {
    duration: 0,
    display: "none",
    delay: 6
  });

  // Lo deja listo como flex para uso posterior (menú abierto)
  gsap.to('#navigation-content', {
    duration: 0,
    display: "flex",
    delay: 6
  });
});

// =========================================
// MENÚ DE NAVEGACIÓN (ABRIR / CERRAR)
// =========================================

$(function () {
  // Abrir menú
  $('.menubar').on('click', function () {
    gsap.to('#navigation-content', 0.6, { y: 0 });
  });

  // Cerrar menú
  $('.navigation-close').on('click', function () {
    gsap.to('#navigation-content', 0.6, { y: "-100%" });
  });
});

// =========================================
// TEXTO ROTATIVO (EFECTO MÁQUINA DE ESCRIBIR)
// =========================================

$(function () {
  // Constructor del efecto
  var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
  };

  // Método principal del efecto
  TxtRotate.prototype.tick = function () {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);

    // Render seguro del texto
    const span = document.createElement('span');
    span.className = 'wrap';
    span.textContent = this.txt;
    this.el.innerHTML = '';
    this.el.appendChild(span);

    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 100;
    }

    setTimeout(() => this.tick(), delta);
  };

  // Al cargar la página
  window.onload = function () {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
      const toRotate = elements[i].getAttribute('data-rotate');
      const period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }

    // Estilo adicional (opcional)
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0em solid #666; }";
    document.body.appendChild(css);
  };
});

// =========================================
// NAVEGACIÓN ENTRE SECCIONES CON TRANSICIONES
// =========================================

$(function () {
  // Función común para cambiar entre secciones
  function navigateTo(targetId) {
    const sections = ['#header', '#about', '#projects', '#contact'];
    
    // Oculta navegación (sube menú)
    gsap.to('#navigation-content', 0, { display: "none", delay: 1 });
    gsap.to('#navigation-content', 0, { y: "-100%", delay: 0.8 });

    // Oculta todas las secciones
    sections.forEach(id => gsap.to(id, 0, { display: "none" }));

    // Muestra breaker animado
    gsap.to('#breaker', 0, { display: "block", delay: 0.1 });

    // Oculta breaker luego de 2s
    gsap.to('#breaker', 0, { display: "none", delay: 2 });

    // Muestra sección destino luego de transición
    gsap.to(targetId, 0, { display: "block", delay: 0.1 });

    // Restaura navegación para futuros clics
    gsap.to('#navigation-content', 0, { display: "flex", delay: 2 });
  }

  // Eventos de navegación
  $('#about-link').on('click', () => {
    navigateTo('#about'),
    document.getElementById('navigation-bar').classList.remove('hidden');
  });
  $('#projects-link').on('click', () => {
    navigateTo('#projects'),
    document.getElementById('navigation-bar').classList.remove('hidden');
  });
  $('#contact-link').on('click', () => {
    navigateTo('#contact')
    document.getElementById('navigation-bar').classList.remove('hidden');
  });
  $('#home-link').on('click', () => {
    navigateTo('#header'),
    document.getElementById('navigation-bar').classList.add('hidden');
  });
});

// =========================================
// CURSOR PERSONALIZADO (INTERACTIVO)
// =========================================

$(function () {
  const $cursor = $('.cursor');

  // Mueve el cursor personalizado al moverse el mouse
  function cursorMover(e) {
    gsap.to($cursor, {
      x: e.clientX,
      y: e.clientY,
      stagger: 0.002
    });
  }

  // Agranda el cursor al pasar por enlaces o botones
  function cursorHover() {
    gsap.to($cursor, {
      scale: 1.4,
      opacity: 1
    });
  }

  // Restaura el cursor a su tamaño/opacidad normal
  function cursorNormal() {
    gsap.to($cursor, {
      scale: 1,
      opacity: 0.6
    });
  }

  // Evento: seguir el mouse
  $(window).on('mousemove', cursorMover);

  // Eventos: hover para agrandar y restaurar
  $('.menubar, .navigation-close, a').hover(cursorHover, cursorNormal);
});

// =========================================
// BLOQUEO DE CLIC DERECHO
// =========================================

document.addEventListener('contextmenu', function (e) {
  e.preventDefault(); // Desactiva menú contextual al hacer clic derecho
});

// =========================================
// FORMULARIO
// =========================================

// Inicializa EmailJS
(function() {
  emailjs.init({
    publicKey: "aJVs5VH7Rgzr6nehY",
  });
})();

// Manejo del formulario
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;
  const successMsg = document.getElementById("form-success");
  const errorMsg = document.getElementById("form-error");

  // Función auxiliar para mostrar mensaje
  function showMessage(type) {
    const el = type === "success" ? successMsg : errorMsg;
    const other = type === "success" ? errorMsg : successMsg;

    // Ocultar el otro mensaje si está visible
    other.classList.remove("show");
    other.style.display = "none";

    // Mostrar este mensaje
    el.style.display = "block";
    setTimeout(() => el.classList.add("show"), 10); // permite que se aplique transición

    // Ocultar suavemente después de 4s
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => (el.style.display = "none"), 600); // coincide con transition CSS
    }, 4000);
  }

  // Enviar con EmailJS
  emailjs.sendForm("service_cbt3l2h", "template_4n85oyh", form)
    .then(() => {
      form.reset();
      showMessage("success");
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      showMessage("error");
    });
});

// =========================================
// TRADUCCION
// =========================================

const translations = {
  en: {
    home: "HOME",
    aboutme: "ABOUT ME",
    projects: "PROJECTS",
    contact: "CONTACT",
    menu: "Menu",
    about_header: "ABOUT ME",
    about_intro: "Hi! I'm Lian Iribarne, a student passionate about programming and deeply interested in becoming a data scientist. I'm currently studying a programming degree at UTN (National Technological University), where I've acquired skills in software development, data analysis, and algorithms.",
    about_goals: "PROFESSIONAL OBJECTIVES",
    about_detail: "My goal is to specialize in data science and apply my knowledge to solve complex problems through the analysis of large volumes of information. I'm looking for opportunities to learn, grow, and contribute to projects that allow me to develop my skills in this field.",
    education: "ACADEMIC BACKGROUND",
    degree_1_title: "Technical Degree in Programming",
    degree_1_desc: "Programming technical degree at UTN <br>(in progress)",
    degree_2_title: "Bachelor of Visual Arts",
    degree_2_desc: "High school at Centro Polivalente de Arte \"Prof. Diana Cotorruelo\" <br>graduation: 10/12/2021",
    skills: "TECHNICAL SKILLS",
    certs: "CERTIFICATES",
    projects_header: "PROJECTS",
    project_in_progress: "In Progress",
    project_view: "View",
    contactme: "CONTACT ME",
    send_message: "Send Me a Message",
    placeholder_name: "Name",
    placeholder_email: "Email",
    placeholder_subject: "Subject",
    placeholder_message: "Message",
    send: "Send",
    contact_info: "Contact Information",
    info_name: "Name",
    info_location: "Location",
    info_country: "Argentina",
    success: "Message sent successfully",
    error: "An error occurred while sending the message"
  },
  es: {
    home: "INICIO",
    aboutme: "SOBRE MÍ",
    projects: "PROYECTOS",
    contact: "CONTACTO",
    menu: "Menú",
    about_header: "SOBRE MÍ",
    about_intro: "¡Hola! soy Lian Iribarne, un estudiante apasionado por la programación y con un fuerte interés en convertirme en científico de datos. Actualmente estoy cursando una tecnicatura en programación en la UTN (Universidad Tecnológica Nacional), donde he adquirido habilidades en desarrollo de software, análisis de datos, y algoritmos.",
    about_goals: "OBJETIVOS PROFESIONALES",
    about_detail: "Mi objetivo es especializarme en ciencia de datos y aplicar mis conocimientos para resolver problemas complejos mediante el análisis de grandes volúmenes de información. Estoy buscando oportunidades para aprender, crecer, y contribuir a proyectos que me permitan desarrollar mis habilidades en este campo.",
    education: "FORMACIÓN ACADÉMICA",
    degree_1_title: "Tecnicatura en Programación",
    degree_1_desc: "Tecnicatura en programación en la UTN <br>(en curso)",
    degree_2_title: "Bachiller en Artes Visuales",
    degree_2_desc: "Educación secundaria en el Centro Polivalente de Arte \"Prof. Diana Cotorruelo\" <br>graduación: 10/12/2021",
    skills: "HABILIDADES TÉCNICAS",
    certs: "CERTIFICADOS",
    projects_header: "PROYECTOS",
    project_in_progress: "En Proceso",
    project_view: "Ver",
    contactme: "CONTÁCTAME",
    send_message: "Envíame un Mensaje",
    placeholder_name: "Nombre",
    placeholder_email: "Correo Electrónico",
    placeholder_subject: "Asunto",
    placeholder_message: "Mensaje",
    send: "Enviar",
    contact_info: "Información de Contacto",
    info_name: "Nombre",
    info_location: "Localidad",
    info_country: "Argentina",
    success: "Mensaje enviado correctamente",
    error: "Hubo un error al enviar el mensaje"
  }
};

let currentLang = 'es'; // Idioma predeterminado

function changeLanguage(lang) {
  currentLang = lang; // Actualiza idioma actual

  const elements = document.querySelectorAll('[data-key]');
  elements.forEach(el => {
    const key = el.getAttribute('data-key');
    const translation = translations[lang][key];
    if (translation) {
      if (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA") {
        el.innerHTML = translation;
      }
      el.setAttribute('data-text', translation);
    }
  });

  // Traducción de placeholders
  document.querySelector("input[name='from_name']").setAttribute("placeholder", translations[lang].placeholder_name);
  document.querySelector("input[name='from_email']").setAttribute("placeholder", translations[lang].placeholder_email);
  document.querySelector("input[name='subject']").setAttribute("placeholder", translations[lang].placeholder_subject);
  document.querySelector("textarea[name='message']").setAttribute("placeholder", translations[lang].placeholder_message);
  document.querySelector("button[type='submit'] .index").textContent = translations[lang].send;

  // Mensajes de éxito y error
  document.getElementById("form-success").textContent = translations[lang].success;
  document.getElementById("form-error").textContent = translations[lang].error;

  // Cambiar texto del botón de idioma
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.textContent = (lang === 'es') ? 'EN' : 'ES';
  }
}

// Toggle automático con un solo botón
document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const newLang = currentLang === 'es' ? 'en' : 'es';
      changeLanguage(newLang);
    });
  }
});
