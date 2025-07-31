//scroll oscuro cuando baja
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("scrollspy");

  if (!navbar) {
    console.warn("No se encontró el elemento con id 'scrollspy'");
    return;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-gray-900");
    } else {
      navbar.classList.remove("bg-gray-900");
    }
  });
});


//barra de navegacion desplegable
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.navbar-nav a'); // cambiamos selector a los <a> reales
  const menuButton = document.getElementById("menu-button");
  const menuIcon = document.querySelector(".menu-icon");
  const navbarCollapse = document.getElementById("navbarSupportedContent");

  // Función para manejar visibilidad según el tamaño de la ventana
  function handleResize() {
    if (window.innerWidth >= 992) { // Escritorio (breakpoint Bootstrap)
      navbarCollapse.classList.add("open");
    } else {
      navbarCollapse.classList.remove("open");
    }
  }

  // Ejecutar al cargar
  handleResize();

  // Ejecutar al cambiar tamaño
  window.addEventListener("resize", handleResize);

  // Toggle menú con animación SOLO para móviles
  menuButton.addEventListener("click", function () {
    if (window.innerWidth < 992) {
      menuIcon.classList.toggle("open");
      navbarCollapse.classList.toggle("open");
    }
  });

  // Scroll suave y cierre del menú al hacer clic en un enlace (solo en móviles)
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth < 992) {
        // Cerrar menú solo si estamos en móviles
        menuIcon.classList.remove("open");
        navbarCollapse.classList.remove("open");
      }
    });
  });
});

//aparece la alerta y se desvanece
document.addEventListener("DOMContentLoaded", () => {
  const alerts = document.querySelectorAll(".alert");

  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = "opacity 0.5s ease-out";
      alert.style.opacity = "0";
      setTimeout(() => alert.remove(), 500); // Lo remueve después de desvanecerse
    }, 4000); // Espera 4 segundos antes de empezar a desvanecer
  });
});


//boton siguiente y atras en imagenes
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".gallery-image");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  showImage(currentIndex);
});

//zoom a la imagen
document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery-image");
  const zoomOverlay = document.getElementById("zoom-overlay");
  const zoomedImage = document.getElementById("zoomed-image");
  const closeBtn = document.getElementById("close-btn");

  // Al hacer clic en una imagen, mostrar overlay con zoom
  galleryImages.forEach(img => {
    img.addEventListener("click", function () {
      zoomedImage.src = this.src;
      zoomOverlay.style.display = "flex"; // Mostrar overlay

      // Forzar reinicio de la animación (opcional, si tienes animación CSS)
      zoomedImage.style.animation = "none";
      void zoomedImage.offsetWidth; // Reflow
      zoomedImage.style.animation = "zoomIn 0.3s ease";
    });
  });

  // Al hacer clic en la X, cerrar el overlay
  closeBtn.addEventListener("click", function () {
    zoomOverlay.style.display = "none";
    zoomedImage.src = ""; // Limpia la imagen al cerrar
  });

  // Opcional: cerrar haciendo clic fuera de la imagen
  zoomOverlay.addEventListener("click", function (e) {
    if (e.target === zoomOverlay) {
      zoomOverlay.style.display = "none";
      zoomedImage.src = "";
    }
  });
});


//menu principal desplegado
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll('[data-menu]');
  const menuDesplegado = document.querySelector('.menu_desplegado');
  let menuActual = null;
  let menuAbierto = false;

  botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita cierre inmediato al hacer clic en el botón

      const menu = boton.dataset.menu;
      const urls = JSON.parse(boton.getAttribute('data-urls'));

      // Si se está mostrando otro menú, primero cerrarlo con animación
      if (menuAbierto && menuActual !== menu) {
        menuDesplegado.classList.remove('expandido');
        menuDesplegado.classList.add('colapsando');

        menuDesplegado.addEventListener('transitionend', function handler() {
          menuDesplegado.removeEventListener('transitionend', handler);
          menuDesplegado.classList.remove('colapsando');
          mostrarNuevoMenu(menu, urls);
        });

        menuActual = menu;
        return;
      }

      // Si es el mismo menú, cerrarlo directamente
      if (menuAbierto && menuActual === menu) {
        menuDesplegado.classList.remove('expandido');
        menuActual = null;
        menuAbierto = false;
        return;
      }

      // Si está cerrado, mostrar directamente
      mostrarNuevoMenu(menu, urls);
    });
  });

  // Cerrar el menú si se hace clic fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-menu]') && !e.target.closest('.menu_desplegado')) {
      if (menuAbierto) {
        menuDesplegado.classList.remove('expandido');
        menuActual = null;
        menuAbierto = false;
      }
    }
  });

  function mostrarNuevoMenu(menu, urls) {
    menuDesplegado.innerHTML = `
      <div class="opciones_contenedor">
        <a class="titulo_menu" href="${urls[0]?.url || '#'}">
          ${menu.charAt(0).toUpperCase() + menu.slice(1)}
        </a>
      </div>
      <div class="opciones_contenedor">
        ${urls.map(op => `<a class="opcion_item" href="${op.url}">${op.nombre}</a>`).join('')}
      </div>
    `;

    void menuDesplegado.offsetHeight; // Forzar reflow para reiniciar animación
    menuDesplegado.classList.add('expandido');

    menuAbierto = true;
    menuActual = menu;
  }
});


//filtro de contactos
document.addEventListener("DOMContentLoaded", () => {
  const inputUsuario = document.getElementById('buscarUsuario');
  const inputUbicacion = document.getElementById('buscarUbicacion');
  const filas = document.querySelectorAll('table tbody tr');

  function filtrarTabla() {
    const usuarioFiltro = inputUsuario.value.toLowerCase();
    const ubicacionFiltro = inputUbicacion.value.toLowerCase();

    filas.forEach(fila => {
      const usuario = fila.cells[1].textContent.toLowerCase();
      const ubicacion = fila.cells[3].textContent.toLowerCase();

      const coincideUsuario = usuario.includes(usuarioFiltro);
      const coincideUbicacion = ubicacion.includes(ubicacionFiltro);

      fila.style.display = (coincideUsuario && coincideUbicacion) ? '' : 'none';
    });
  }

  inputUsuario.addEventListener('input', filtrarTabla);
  inputUbicacion.addEventListener('input', filtrarTabla);
});


//filtras clientes
document.addEventListener("DOMContentLoaded", function () {
  const razonInput = document.getElementById('filterRazon');
  const ciudadSelect = document.getElementById('filterCiudad');
  const vendedorSelect = document.getElementById('filterVendedor');
  const estadoSelect = document.getElementById('filterEstado');
  const ordenFechaSelect = document.getElementById('ordenFecha');
  const tbody = document.querySelector('#tablaClientes tbody');

  // 🧠 Rellena un <select> con valores únicos de las celdas indicadas
  function llenarSelectUnicos(select, className) {
    const valores = new Set();
    tbody.querySelectorAll(`.${className}`).forEach(cell => {
      const texto = cell.textContent.trim();
      if (texto) valores.add(texto);
    });

    // Borra opciones previas
    select.innerHTML = '<option value="">MOSTRAR TODOS</option>';

    // Añade opciones únicas ordenadas
    Array.from(valores).sort().forEach(valor => {
      const option = document.createElement('option');
      option.value = valor;
      option.textContent = valor;
      select.appendChild(option);
    });
  }

  function filtrarYOrdenar() {
    const razon = razonInput.value.toLowerCase();
    const ciudad = ciudadSelect.value.toLowerCase();
    const vendedor = vendedorSelect.value.toLowerCase();
    const estado = estadoSelect.value.toLowerCase();

    let rows = Array.from(tbody.querySelectorAll('tr'));

    rows.forEach(row => {
      const razonCell = row.querySelector('td:nth-child(3)')?.textContent.toLowerCase() || '';
      const ciudadCell = row.querySelector('.ciudad')?.textContent.toLowerCase() || '';
      const vendedorCell = row.querySelector('.vendedor')?.textContent.toLowerCase() || '';
      const estadoCell = row.querySelector('.estado')?.textContent.toLowerCase() || '';

      const matchRazon = razonCell.includes(razon);
      const matchCiudad = ciudad === '' || ciudadCell === ciudad;
      const matchVendedor = vendedor === '' || vendedorCell === vendedor;
      const matchEstado = estado === '' || estadoCell === estado;

      row.style.display = (matchRazon && matchCiudad && matchVendedor && matchEstado) ? '' : 'none';
    });

    // 🔃 Ordenar por fecha
    const orden = ordenFechaSelect.value;
    rows = Array.from(tbody.querySelectorAll('tr')).filter(row => row.style.display !== 'none');

    rows.sort((a, b) => {
      const fechaA = new Date(a.querySelector('.fecha')?.textContent.trim() || '2000-01-01');
      const fechaB = new Date(b.querySelector('.fecha')?.textContent.trim() || '2000-01-01');
      return orden === 'asc' ? fechaA - fechaB : fechaB - fechaA;
    });

    rows.forEach(row => tbody.appendChild(row));
  }

  // Inicializar filtros únicos
  llenarSelectUnicos(ciudadSelect, 'ciudad');
  llenarSelectUnicos(vendedorSelect, 'vendedor');
  llenarSelectUnicos(estadoSelect, 'estado');

  // Eventos
  razonInput.addEventListener('input', filtrarYOrdenar);
  ciudadSelect.addEventListener('change', filtrarYOrdenar);
  vendedorSelect.addEventListener('change', filtrarYOrdenar);
  estadoSelect.addEventListener('change', filtrarYOrdenar);
  ordenFechaSelect.addEventListener('change', filtrarYOrdenar);
});


//abre modal de formulario
document.addEventListener('DOMContentLoaded', function () {
  // Abre el modal
  window.abrir_modal = function (url) {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar el modal');
        return response.text();
      })
      .then(html => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.innerHTML = html;

        const modal = document.getElementById("modal");
        if (modal) {
          modal.classList.add("show");
          modal.style.display = "flex";
          document.body.style.overflow = "hidden";


          activarTogglePrendas();

          // Cierra al hacer clic fuera del modal
          modal.addEventListener("click", function (e) {
            if (e.target === modal) {
              cerrar_modal();
            }
          });

          // Cierra con botón interno
          const closeBtn = modal.querySelector(".close-btn");
          if (closeBtn) {
            closeBtn.addEventListener("click", cerrar_modal);
          }
        }
      })
      .catch(error => console.error(error));

    return false;
  };


  // Cierra el modal
  window.cerrar_modal = function () {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  };
});


//modal del descargar pdf
function mostrar_modal_pdf(pdfUrl, titulo) {
  const modal = document.getElementById("modal-pdf");
  const iframe = document.getElementById("visor-pdf");
  const link = document.getElementById("descargar-pdf");
  const title = document.getElementById("modal-title");

  iframe.src = pdfUrl;
  link.href = pdfUrl;
  title.textContent = titulo;

  modal.classList.add("show");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function cerrar_modal_pdf() {
  const modal = document.getElementById("modal-pdf");
  const iframe = document.getElementById("visor-pdf");

  iframe.src = "";  // Limpia el iframe al cerrar
  modal.classList.remove("show");
  modal.style.display = "none";
  document.body.style.overflow = "";
}

// Cierra si se hace clic fuera del contenido
document.addEventListener("click", function (e) {
  const modal = document.getElementById("modal-pdf");
  if (e.target === modal) {
    cerrar_modal_pdf();
  }
});


//preview de las imagenes en
document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('id_Imagen');  // Campo de imagen generado por Django
  const previewImg = document.getElementById('preview-imagen') || document.getElementById('preview-img');

  if (fileInput && previewImg) {
    fileInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImg.src = e.target.result;
          previewImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        previewImg.src = '#';
        previewImg.style.display = 'none';
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const tbodies = document.querySelectorAll('tbody[id^="tbodyClientes"]');

  tbodies.forEach(tbody => {
    let draggedRow = null;

    tbody.addEventListener('mousedown', (e) => {
      const handle = e.target.closest('.handle');
      if (handle) {
        const tr = handle.closest('tr');
        if (tr && !tr.hasAttribute('draggable')) {
          tr.setAttribute('draggable', 'true');

          tr.addEventListener('dragend', () => {
            tr.removeAttribute('draggable');
          }, { once: true });
        }
      }
    });

    tbody.addEventListener('dragstart', (e) => {
      const tr = e.target.closest('tr');
      if (!tr || !tr.hasAttribute('draggable')) {
        e.preventDefault();
        return;
      }
      draggedRow = tr;
      e.dataTransfer.effectAllowed = 'move';

      if (e.dataTransfer.setDragImage) {
        e.dataTransfer.setDragImage(tr, 0, 0);
      }
    });

    tbody.addEventListener('dragover', (e) => {
      e.preventDefault();
      const target = e.target.closest('tr');
      if (!target || target === draggedRow) return;

      const bounding = target.getBoundingClientRect();
      const offset = e.clientY - bounding.top;

      if (offset > bounding.height / 2) {
        target.after(draggedRow);
      } else {
        target.before(draggedRow);
      }
    });

    tbody.addEventListener('drop', (e) => {
      e.preventDefault();
      draggedRow = null;

      // Solo actualizar orden dentro de este tbody
      actualizarNumerosOrden(tbody);
      enviarOrdenAlBackend(tbody); // ← si usas AJAX
    });

    // Inicializar orden dentro de cada tbody
    actualizarNumerosOrden(tbody);
  });
});



function actualizarNumerosOrden() {
  const tbodys = document.querySelectorAll('tbody[id^="tbodyClientes"]');

  tbodys.forEach(tbody => {
    let contador = 1;
    const filas = tbody.querySelectorAll('tr');

    filas.forEach(fila => {
      const tdOrden = fila.querySelector('td.orden');
      if (tdOrden) {
        tdOrden.textContent = contador;
        contador++;
      }
    });
  });
}

function enviarOrdenAlBackend(tbody) {
  const url = tbody.dataset.url; // debe estar definido en cada <tbody data-url="...">

  const filas = tbody.querySelectorAll('tr');
  const orden = Array.from(filas)
    .map(fila => fila.dataset.id)
    .filter(id => id !== undefined && id !== null && id !== '');

  console.log("Orden a enviar:", orden); // para debug

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': obtenerCSRFToken()
    },
    body: JSON.stringify({ orden: orden })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        console.log('Orden guardada con éxito');
      } else {
        console.error('Error al guardar el orden:', data.error);
      }
    })
    .catch(err => {
      console.error('Error en la petición:', err);
    });
}

// Obtener token CSRF de cookies
function obtenerCSRFToken() {
  const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
  return cookieValue ? cookieValue[1] : '';
}



document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const contenedor = document.getElementById('tallas-precios-container');
  const btnAgregar = document.getElementById('agregar-talla-precio');
  const inputJSON = document.getElementById('id_Referencia_color_talla_Costo_precio');
  const dataJsonTag = document.getElementById('referencia-color-talla-costo-precio-json');

  btnAgregar?.classList.add('btn-primary');

  function crearFila(referencia = '', color = '', talla = '', costo = '', precio = '', mostrarEliminar = true) {
    const div = document.createElement('div');
    div.className = 'talla-precio-pair mb-2';

    div.innerHTML = `
      <input type="text" name="referencia" placeholder="Referencia" class="input-user" required value="${referencia}">
      <input type="text" name="color" placeholder="Color" class="input-user" required value="${color}">
      <input type="text" name="talla" placeholder="Talla" class="input-user" required value="${talla}">
      <input type="number" name="costo" placeholder="Costo" class="input-user" required value="${costo}">
      <input type="number" name="precio" placeholder="Precio" class="input-user" required value="${precio}">
      ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-pair" style="margin-left: 8px;">Eliminar</button>' : ''}
    `;

    contenedor.appendChild(div);
  }

  contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-pair')) {
      e.target.parentElement.remove();
    }
  });

  btnAgregar?.addEventListener('click', () => {
    crearFila('', '', '', '', '', true);
  });

  // Prellenar desde el <script type="application/json">
  if (dataJsonTag && dataJsonTag.textContent.trim() !== '') {
    const data = JSON.parse(dataJsonTag.textContent || '[]');
    data.forEach((item, index) => {
      crearFila(
        item.referencia || '',
        item.color || '',
        item.talla || '',
        item.costo || '',
        item.precio || '',
        true
      );
    });
  } else {
    crearFila('', '', '', '', '', false);
  }

  form.addEventListener('submit', (e) => {
    const pares = contenedor.querySelectorAll('.talla-precio-pair');
    const resultado = [];

    pares.forEach(par => {
      const referencia = par.querySelector('input[name="referencia"]').value;
      const color = par.querySelector('input[name="color"]').value;
      const talla = par.querySelector('input[name="talla"]').value;
      const costo = par.querySelector('input[name="costo"]').value;
      const precio = par.querySelector('input[name="precio"]').value;

      resultado.push({ referencia, color, talla, costo, precio });
    });

    // Validación rápida
    if (!inputJSON) {
      alert("No se encontró el input hidden para guardar el JSON.");
      e.preventDefault();
      return;
    }

    inputJSON.value = JSON.stringify(resultado);
    console.log("📤 JSON enviado:", inputJSON.value);
  });

});


document.addEventListener('DOMContentLoaded', () => {
  const fichaInput = document.getElementById('id_Ficha');
  const previewDiv = document.getElementById('ficha-preview');
  const previewContainer = document.getElementById('ficha-preview-container');

  if (fichaInput) {
    fichaInput.addEventListener('change', () => {
      const file = fichaInput.files[0];
      if (file && file.type === "application/pdf") {
        previewDiv.style.display = 'block';
        previewDiv.innerHTML = `
          <p><strong>PDF seleccionado:</strong> ${file.name}</p>
          <span class="badge bg-info">✓ Archivo listo para subir</span>
        `;
      } else {
        previewDiv.style.display = 'block';
        previewDiv.innerHTML = `<p>No hay PDF cargado o el archivo no es válido</p>`;
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const submitBtn = form.querySelector('[type="submit"]');

  // 1. Evitar múltiples envíos
  form.addEventListener('submit', function (e) {
    if (submitBtn.disabled) {
      e.preventDefault(); // Evita envío doble
      return;
    }
    submitBtn.disabled = true;
    submitBtn.innerText = "Guardando..."; // Opcional
  });

  // 2. Prevenir envío con Ctrl+Enter o Cmd+Enter
  form.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("id_categorias_prenda") || document.getElementById("id_categorias_original");
  const container = document.getElementById("categoria-selector");

  if (!select || !container) return;  // No hace nada si no encuentra los elementos

  function renderSelectedOptions() {
    container.innerHTML = '';

    Array.from(select.options).forEach(option => {
      if (option.selected) {
        const tag = document.createElement('span');
        tag.className = 'badge';
        tag.textContent = option.text;

        const close = document.createElement('span');
        close.textContent = ' ×';
        close.onclick = () => {
          option.selected = false;
          renderSelectedOptions();
        };

        tag.appendChild(close);
        container.appendChild(tag);
      }
    });

    const dropdown = document.createElement('select');
    dropdown.className = 'form-select categoria-dropdown';
    const defaultOpt = document.createElement('option');
    defaultOpt.text = 'Agregar categoría...';
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    dropdown.appendChild(defaultOpt);

    Array.from(select.options).forEach(option => {
      if (!option.selected) {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.text = option.text;
        dropdown.appendChild(opt);
      }
    });

    dropdown.onchange = function () {
      const selectedOption = select.querySelector(`option[value="${this.value}"]`);
      if (selectedOption) {
        selectedOption.selected = true;
        renderSelectedOptions();
      }
    };

    container.appendChild(dropdown);
  }

  renderSelectedOptions();
});



document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("categorias-container");
  if (container) {
    const raw = container.dataset.categorias;
    const categorias = raw ? raw.split('').map(c => c.trim()).filter(Boolean) : [];

    if (categorias.length > 0) {
      categorias.forEach(cat => {
        const span = document.createElement("span");
        span.className = "categoria-badge";
        span.textContent = cat;
        container.appendChild(span);
      });
    } else {
      container.innerHTML = '<span>Sin categorías asignadas</span>';
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.categoria-custom-selector').forEach(div => {
    const textoCategorias = div.getAttribute('data-categorias');
    if (textoCategorias) {
      const categorias = textoCategorias.split(',').map(cat => cat.trim()).filter(Boolean);
      if (categorias.length > 0) {
        div.innerHTML = '';
        categorias.forEach(cat => {
          const span = document.createElement('span');
          span.classList.add('badge');
          span.textContent = cat;
          div.appendChild(span);
        });
      }
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("cliente-input");
  const hiddenInput = document.getElementById("id_cliente_id");
  const options = document.querySelectorAll("#clientes-list option");

  input.addEventListener("input", function () {
    let found = false;
    options.forEach(option => {
      if (option.value === input.value) {
        hiddenInput.value = option.dataset.id;
        found = true;
      }
    });
    if (!found) {
      hiddenInput.value = "";
    }
  });
});


function activarTogglePrendas() {
  const btnToggle = document.getElementById('mostrarPrendasBtn');
  const tablaWrapper = document.getElementById('tablaPrendasWrapper');

  if (btnToggle && tablaWrapper) {
    btnToggle.addEventListener('click', () => {
      const visible = tablaWrapper.style.display === 'block';
      tablaWrapper.style.display = visible ? 'none' : 'block';
      btnToggle.textContent = visible ? 'Mostrar prendas asociadas' : 'Ocultar prendas';
    });
  }
}



document.addEventListener("DOMContentLoaded", function () {
  const proveedorSelect = document.getElementById("id_Proveedor");
  const prendaSelect = document.getElementById("id_prenda");

  if (!proveedorSelect || !prendaSelect) {
    console.error("No se encontraron los campos necesarios.");
    return;
  }

  proveedorSelect.addEventListener("change", function () {
    const proveedorId = this.value;
    console.log("🔍 Proveedor seleccionado:", proveedorId);

    if (!proveedorId) {
      console.warn("⚠️ No se seleccionó ningún proveedor.");
      prendaSelect.innerHTML = '<option value="">Seleccione una prenda</option>';
      return;
    }

    fetch(`/ajax/obtener-prendas/?proveedor_id=${proveedorId}`)
      .then(response => {
        console.log("📡 Estado del fetch:", response.status);
        return response.json();
      })
      .then(data => {
        console.log("📥 Respuesta del servidor:", data);

        prendaSelect.innerHTML = ''; // Limpiar select
        if (data.prendas.length === 0) {
          prendaSelect.innerHTML = '<option value="">Sin prendas disponibles</option>';
          return;
        }

        prendaSelect.innerHTML = '<option value="">Seleccione una prenda</option>';
        data.prendas.forEach(prenda => {
          const option = document.createElement('option');
          option.value = prenda.id;
          option.text = prenda.descripcion;
          option.dataset.precio = prenda.precio;
          prendaSelect.appendChild(option);
        });

        // ✅ Volver a calcular el total (para que bordados, botones, etc. se mantengan actualizados)
        window.actualizarTotalCostos?.();
      })
      .catch(error => {
        console.error("❌ Error al obtener prendas:", error);
      });
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const proveedorSelect = document.getElementById('id_Proveedor');
  const prendaSelect = document.getElementById('id_prenda');
  const forroSelect = document.getElementById('id_Forro');
  const lavadoSelect = document.getElementById('id_Lavado');
  const estampadoInput = document.getElementById('id_Estampado');
  const fusionadoSelect = document.getElementById('id_Fusionado');

  const precioPrendaInput = document.getElementById('precio-prenda');
  const precioForroInput = document.getElementById('precio-forro');
  const precioLavadoInput = document.getElementById('precio-lavado');
  const precioEstampadoInput = document.getElementById('precio-estampado');
  const precioFusionadoInput = document.getElementById('precio-fusionado');
  const totalCostosInput = document.getElementById('total-costos');

  let prendasData = [];
  let preciosForro = {};
  let preciosLavado = {};
  let preciosFusionado = {};



  proveedorSelect.addEventListener('change', function () {
    const proveedorId = this.value;
    if (!proveedorId) return;

    fetch(`/ajax/obtener-prendas/?proveedor_id=${proveedorId}`)
      .then(response => response.json())
      .then(data => {
        prendasData = data.prendas || [];
        preciosForro = data.precios_forro || {};
        preciosLavado = data.precios_lavado || {};
        preciosFusionado = data.precios_fusionado || {};

        prendaSelect.innerHTML = '<option value="">Seleccione una prenda</option>';
        prendasData.forEach(prenda => {
          const option = document.createElement('option');
          option.value = prenda.id;
          option.textContent = prenda.descripcion;
          option.dataset.precio = prenda.precio;
          prendaSelect.appendChild(option);
        });

        precioPrendaInput.value = 'No definido';
        precioForroInput.value = 'No definido';
        precioLavadoInput.value = 'No definido';
        precioEstampadoInput.value = 'No definido';
        precioFusionadoInput.value = 'No definido';
        totalCostosInput.value = '$0';
      });
  });

  prendaSelect.addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    const precio = selectedOption?.dataset?.precio;
    precioPrendaInput.value = precio ? `$${precio}` : 'No definido';
    actualizarTotalCostos();
  });

  forroSelect?.addEventListener('change', function () {
    const selected = this.value;
    const precio = preciosForro[selected];
    precioForroInput.value = precio !== undefined ? `$${precio}` : 'No definido';
    actualizarTotalCostos();
  });

  lavadoSelect?.addEventListener('change', function () {
    const selected = this.value;
    const precio = preciosLavado[selected];
    precioLavadoInput.value = precio !== undefined ? `$${precio}` : 'No definido';
    actualizarTotalCostos();
  });

  estampadoInput?.addEventListener('input', function () {
    const cantidad = parseInt(this.value);
    let precio = 0;
    if (!isNaN(cantidad) && cantidad > 1) {
      precio = cantidad * 1000;
    }
    precioEstampadoInput.value = `$${precio}`;
    actualizarTotalCostos();
  });

  fusionadoSelect?.addEventListener('change', function () {
    const selected = this.value;
    const precio = preciosFusionado[selected];
    precioFusionadoInput.value = precio !== undefined ? `$${precio}` : 'No definido';
    actualizarTotalCostos();
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bordados-container');
  const btnAgregar = document.getElementById('agregar-bordado');
  const inputHidden = document.getElementById('id_Bordado');

  function crearFilaBordado(precio = '', cantidad = '', mostrarEliminar = true) {
    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 bordado-fila';

    div.innerHTML = `
  <div class="form-group half-width">
    <label>Precio de bordado</label>
    <input type="number" class="input-user precio-bordado" min="0" step="1" value="${precio}">
  </div>

  <div class="form-group half-width">
    <label>Cantidad de bordado</label>
    <input type="number" class="input-user cantidad-bordado" min="0" step="1" value="${cantidad}">
  </div>

  <div class="form-group half-width">
    <label>Costo total de bordado</label>
    <input type="text" class="input-user costo-bordado" readonly value="No definido">
  </div>

  ${mostrarEliminar
        ? `<div style="width: 100%; display: flex; justify-content: center; margin-top: 1.8rem;">
           <button type="button" class="btn btn-download btn-sm eliminar-bordado">Eliminar</button>
         </div>`
        : ''
      }
`;


    container.appendChild(div);
    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.bordado-fila');

    filas.forEach(fila => {
      const precioInput = fila.querySelector('.precio-bordado');
      const cantidadInput = fila.querySelector('.cantidad-bordado');
      const costoOutput = fila.querySelector('.costo-bordado');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.(); // ✅ Se actualiza el total general
      };

      precioInput.addEventListener('input', calcular);
      cantidadInput.addEventListener('input', calcular);

      const btnEliminar = fila.querySelector('.eliminar-bordado');
      if (btnEliminar) {
        btnEliminar.onclick = () => {
          fila.remove(); // ✅ Elimina la fila
          guardarJSON(); // 🔁 Guarda nuevo JSON sin esa fila
          window.actualizarTotalCostos?.(); // ✅ Actualiza el total general
        };
      }
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.bordado-fila').forEach(fila => {
      const precio = parseFloat(fila.querySelector('.precio-bordado')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.cantidad-bordado')?.value || 0);
      const total = precio * cantidad;

      datos.push({
        precio_unitario: precio,
        cantidad: cantidad,
        costo_total: total
      });
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Bordados guardados:', inputHidden.value);
  }

  // Crear primera fila sin botón de eliminar
  crearFilaBordado('', '', false);

  btnAgregar.addEventListener('click', () => {
    crearFilaBordado('', '', true);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script de cintas cargado');

  const cintaDataElement = document.getElementById('cintas-data');
  if (!cintaDataElement) {
    console.error('❌ No se encontró el script con id="cintas-data"');
    return;
  }

  const cintasDisponibles = JSON.parse(cintaDataElement.textContent || '[]');
  console.log('🎀 Cintas cargadas:', cintasDisponibles);

  const container = document.getElementById('cinta-container');
  const btnAgregar = document.getElementById('agregar-cinta');
  const inputHidden = document.getElementById('id_Cinta');

  function crearFilaCinta(cintaId = '', cantidad = '', mostrarEliminar = true) {
    const cinta = cintasDisponibles.find(c => c.ID == cintaId);
    const precio = cinta ? cinta.precio : '';

    const opciones = (cintaId === '' ? '<option disabled selected>Seleccione una cinta</option>' : '') +
      cintasDisponibles.map(c =>
        `<option value="${c.ID}" ${c.ID == cintaId ? 'selected' : ''}>${c.descripcion}</option>`
      ).join('');

    const costoTotal = (precio > 0 && cantidad > 0) ? `$${precio * cantidad}` : 'No definido';

    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 cinta-fila';

    div.innerHTML = `
  <div class="form-group">
    <label>Tipo de cinta</label>
    <select class="form-select cinta-select">
      ${opciones}
    </select>
  </div>

  <div class="form-group">
    <label>Precio de cinta</label>
    <input type="number" class="input-user cinta-precio" readonly value="${precio}">
  </div>

  <div class="form-group">
    <label>Cantidad</label>
    <input type="number" class="input-user cinta-cantidad" min="0" step="1" value="${cantidad}">
  </div>

  <div class="form-group">
    <label>Costo total</label>
    <input type="text" class="input-user cinta-costo" readonly value="${costoTotal}">
  </div>

  ${mostrarEliminar
        ? `
        <div style="width: 100%; display: flex; justify-content: center; margin-top: 1.8rem;">
          <button type="button" class="btn btn-download btn-sm eliminar-cinta">
            Eliminar
          </button>
        </div>
      `
        : ''
      }
`;


    container.appendChild(div);


    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.cinta-fila');

    filas.forEach(fila => {
      const select = fila.querySelector('.cinta-select');
      const precioInput = fila.querySelector('.cinta-precio');
      const cantidadInput = fila.querySelector('.cinta-cantidad');
      const costoOutput = fila.querySelector('.cinta-costo');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      select.addEventListener('change', () => {
        const cintaSeleccionada = cintasDisponibles.find(c => c.ID == select.value);
        precioInput.value = cintaSeleccionada ? cintaSeleccionada.precio : '';
        calcular();
      });

      cantidadInput.addEventListener('input', calcular);

      fila.querySelector('.eliminar-cinta')?.addEventListener('click', () => {
        fila.remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      });
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.cinta-fila').forEach(fila => {
      const tipo = parseInt(fila.querySelector('.cinta-select')?.value || 0);
      const cinta = cintasDisponibles.find(c => c.ID == tipo);
      const precio = parseFloat(fila.querySelector('.cinta-precio')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.cinta-cantidad')?.value || 0);
      const total = precio * cantidad;

      if (cinta && precio > 0 && cantidad > 0) {
        datos.push({
          id: tipo,
          descripcion: cinta.descripcion,
          precio_unitario: precio,
          cantidad: cantidad,
          costo_total: total
        });
      }
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Cintas guardadas:', inputHidden.value);
  }

  // Cargar datos iniciales si existen
  const datosIniciales = JSON.parse(inputHidden.value || '[]');
  console.log('📦 Datos iniciales:', datosIniciales);
  if (datosIniciales.length > 0) {
    console.log('📥 Cargando filas desde datos iniciales...');
    datosIniciales.forEach(cinta => {
      crearFilaCinta(cinta.id, cinta.cantidad, true);
    });
  } else {
    console.log('🆕 Cargando primera fila vacía');
    crearFilaCinta('', '', false);
  }

  btnAgregar.addEventListener('click', () => {
    crearFilaCinta('', '', true);
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('pegados-container');
  const btnAgregar = document.getElementById('agregar-pegado');
  const inputHidden = document.getElementById('id_Pegado');

  function crearFilaPegado(precio = '', cantidad = '', mostrarEliminar = true) {
    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 pegado-fila';

    div.innerHTML = `
      <div class="form-group half-width">
        <label>Precio de pegado</label>
        <input type="number" class="input-user precio-pegado" min="0" step="1" value="${precio}">
      </div>

      <div class="form-group half-width">
        <label>Cantidad de pegado</label>
        <input type="number" class="input-user cantidad-pegado" min="0" step="1" value="${cantidad}">
      </div>

      <div class="form-group half-width">
        <label>Costo total de pegado</label>
        <input type="text" class="input-user costo-pegado" readonly value="No definido">
      </div>

      ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-pegado" style="margin-top: 1.8rem;">Eliminar</button>' : ''}
      `;

    container.appendChild(div);
    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.pegado-fila');

    filas.forEach(fila => {
      const precioInput = fila.querySelector('.precio-pegado');
      const cantidadInput = fila.querySelector('.cantidad-pegado');
      const costoOutput = fila.querySelector('.costo-pegado');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      precioInput.addEventListener('input', calcular);
      cantidadInput.addEventListener('input', calcular);
    });

    container.querySelectorAll('.eliminar-pegado').forEach(btn => {
      btn.onclick = () => {
        btn.closest('.pegado-fila').remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      };
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.pegado-fila').forEach(fila => {
      const precio = parseFloat(fila.querySelector('.precio-pegado')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.cantidad-pegado')?.value || 0);
      const total = precio * cantidad;

      datos.push({
        precio_unitario: precio,
        cantidad: cantidad,
        costo_total: total
      });
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Pegados guardados:', inputHidden.value);
  }

  // Crear primera fila sin botón de eliminar
  crearFilaPegado('', '', false);

  btnAgregar.addEventListener('click', () => {
    crearFilaPegado('', '', true); // Nuevas filas con botón de eliminar
  });
});




document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script de cierres cargado');

  const cierreDataElement = document.getElementById('cierres-data');
  if (!cierreDataElement) {
    console.error('❌ No se encontró el script con id="cierres-data"');
    return;
  }

  const cierresDisponibles = JSON.parse(cierreDataElement.textContent || '[]');
  console.log('🎀 Cierres cargadas:', cierresDisponibles);

  const container = document.getElementById('cierre-container');
  const btnAgregar = document.getElementById('agregar-cierre');
  const inputHidden = document.getElementById('id_Cierre');

  function crearFilaCierre(cierreId = '', cantidad = '', mostrarEliminar = true) {
    const cierre = cierresDisponibles.find(c => c.ID == cierreId);
    const precio = cierre ? cierre.precio : '';

    const opciones = (cierreId === '' ? '<option disabled selected>Seleccione una cierre</option>' : '') +
      cierresDisponibles.map(c =>
        `<option value="${c.ID}" ${c.ID == cierreId ? 'selected' : ''}>${c.descripcion}</option>`
      ).join('');

    const costoTotal = (precio > 0 && cantidad > 0) ? `$${precio * cantidad}` : 'No definido';

    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 cierre-fila';

    div.innerHTML = `
  <div class="form-group">
    <label>Tipo de cierre</label>
    <select class="form-select cierre-select">
      ${opciones}
    </select>
  </div>

  <div class="form-group">
    <label>Precio de cierre</label>
    <input type="number" class="input-user cierre-precio" readonly value="${precio}">
  </div>

  <div class="form-group">
    <label>Cantidad</label>
    <input type="number" class="input-user cierre-cantidad" min="0" step="1" value="${cantidad}">
  </div>

  <div class="form-group">
    <label>Costo total</label>
    <input type="text" class="input-user cierre-costo" readonly value="${costoTotal}">
  </div>

  ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-cierre" style="margin-top: 1.8rem;">Eliminar</button>' : ''}
`;

    container.appendChild(div);


    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.cierre-fila');

    filas.forEach(fila => {
      const select = fila.querySelector('.cierre-select');
      const precioInput = fila.querySelector('.cierre-precio');
      const cantidadInput = fila.querySelector('.cierre-cantidad');
      const costoOutput = fila.querySelector('.cierre-costo');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      select.addEventListener('change', () => {
        const cierreSeleccionada = cierresDisponibles.find(c => c.ID == select.value);
        precioInput.value = cierreSeleccionada ? cierreSeleccionada.precio : '';
        calcular();
      });

      cantidadInput.addEventListener('input', calcular);

      fila.querySelector('.eliminar-cierre')?.addEventListener('click', () => {
        fila.remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      });
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.cierre-fila').forEach(fila => {
      const tipo = parseInt(fila.querySelector('.cierre-select')?.value || 0);
      const cierre = cierresDisponibles.find(c => c.ID == tipo);
      const precio = parseFloat(fila.querySelector('.cierre-precio')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.cierre-cantidad')?.value || 0);
      const total = precio * cantidad;

      if (cierre && precio > 0 && cantidad > 0) {
        datos.push({
          id: tipo,
          descripcion: cierre.descripcion,
          precio_unitario: precio,
          cantidad: cantidad,
          costo_total: total
        });
      }
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Cierres guardadas:', inputHidden.value);
  }

  // Cargar datos iniciales si existen
  const datosIniciales = JSON.parse(inputHidden.value || '[]');
  console.log('📦 Datos iniciales:', datosIniciales);
  if (datosIniciales.length > 0) {
    console.log('📥 Cargando filas desde datos iniciales...');
    datosIniciales.forEach(cierre => {
      crearFilaCierre(cierre.id, cierre.cantidad, true);
    });
  } else {
    console.log('🆕 Cargando primera fila vacía');
    crearFilaCierre('', '', false);
  }

  btnAgregar.addEventListener('click', () => {
    crearFilaCierre('', '', true);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('broches-container');
  const btnAgregar = document.getElementById('agregar-broche');
  const inputHidden = document.getElementById('id_Broche');

  function crearFilaBroche(precio = '', cantidad = '', mostrarEliminar = true) {
    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 broche-fila';

    div.innerHTML = `
      <div class="form-group half-width">
        <label>Precio del broche</label>
        <input type="number" class="input-user precio-broche" min="0" step="1" value="${precio}">
      </div>

      <div class="form-group half-width">
        <label>Cantidad de broche</label>
        <input type="number" class="input-user cantidad-broche" min="0" step="1" value="${cantidad}">
      </div>

      <div class="form-group half-width">
        <label>Costo total del broche</label>
        <input type="text" class="input-user costo-broche" readonly value="No definido">
      </div>

      ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-broche" style="margin-top: 1.8rem;">Eliminar</button>' : ''}
      `;

    container.appendChild(div);
    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.broche-fila');

    filas.forEach(fila => {
      const precioInput = fila.querySelector('.precio-broche');
      const cantidadInput = fila.querySelector('.cantidad-broche');
      const costoOutput = fila.querySelector('.costo-broche');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      precioInput.addEventListener('input', calcular);
      cantidadInput.addEventListener('input', calcular);
    });

    container.querySelectorAll('.eliminar-broche').forEach(btn => {
      btn.onclick = () => {
        btn.closest('.broche-fila').remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      };
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.broche-fila').forEach(fila => {
      const precio = parseFloat(fila.querySelector('.precio-broche')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.cantidad-broche')?.value || 0);
      const total = precio * cantidad;

      datos.push({
        precio_unitario: precio,
        cantidad: cantidad,
        costo_total: total
      });
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Broches guardados:', inputHidden.value);
  }

  // Crear primera fila sin botón de eliminar
  crearFilaBroche('', '', false);

  btnAgregar.addEventListener('click', () => {
    crearFilaBroche('', '', true); // Nuevas filas con botón de eliminar
  });
});




document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script de elasticos cargado');

  const elasticoDataElement = document.getElementById('elasticos-data');
  if (!elasticoDataElement) {
    console.error('❌ No se encontró el script con id="elasticos-data"');
    return;
  }

  const elasticosDisponibles = JSON.parse(elasticoDataElement.textContent || '[]');
  console.log('🎀 Elasticos cargadas:', elasticosDisponibles);

  const container = document.getElementById('elastico-container');
  const btnAgregar = document.getElementById('agregar-elastico');
  const inputHidden = document.getElementById('id_Elastico');

  function crearFilaElastico(elasticoId = '', cantidad = '', mostrarEliminar = true) {
    const elastico = elasticosDisponibles.find(c => c.ID == elasticoId);
    const precio = elastico ? elastico.precio : '';

    const opciones = (elasticoId === '' ? '<option disabled selected>Seleccione una elastico</option>' : '') +
      elasticosDisponibles.map(c =>
        `<option value="${c.ID}" ${c.ID == elasticoId ? 'selected' : ''}>${c.descripcion}</option>`
      ).join('');

    const costoTotal = (precio > 0 && cantidad > 0) ? `$${precio * cantidad}` : 'No definido';

    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 elastico-fila';

    div.innerHTML = `
  <div class="form-group">
    <label>Tipo de elastico</label>
    <select class="form-select elastico-select">
      ${opciones}
    </select>
  </div>

  <div class="form-group">
    <label>Precio de elastico</label>
    <input type="number" class="input-user elastico-precio" readonly value="${precio}">
  </div>

  <div class="form-group">
    <label>Cantidad</label>
    <input type="number" class="input-user elastico-cantidad" min="0" step="1" value="${cantidad}">
  </div>

  <div class="form-group">
    <label>Costo total</label>
    <input type="text" class="input-user elastico-costo" readonly value="${costoTotal}">
  </div>

  ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-elastico" style="margin-top: 1.8rem;">Eliminar</button>' : ''}
`;

    container.appendChild(div);


    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.elastico-fila');

    filas.forEach(fila => {
      const select = fila.querySelector('.elastico-select');
      const precioInput = fila.querySelector('.elastico-precio');
      const cantidadInput = fila.querySelector('.elastico-cantidad');
      const costoOutput = fila.querySelector('.elastico-costo');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      select.addEventListener('change', () => {
        const elasticoSeleccionada = elasticosDisponibles.find(c => c.ID == select.value);
        precioInput.value = elasticoSeleccionada ? elasticoSeleccionada.precio : '';
        calcular();
      });

      cantidadInput.addEventListener('input', calcular);

      fila.querySelector('.eliminar-elastico')?.addEventListener('click', () => {
        fila.remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      });
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.elastico-fila').forEach(fila => {
      const tipo = parseInt(fila.querySelector('.elastico-select')?.value || 0);
      const elastico = elasticosDisponibles.find(c => c.ID == tipo);
      const precio = parseFloat(fila.querySelector('.elastico-precio')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.elastico-cantidad')?.value || 0);
      const total = precio * cantidad;

      if (elastico && precio > 0 && cantidad > 0) {
        datos.push({
          id: tipo,
          descripcion: elastico.descripcion,
          precio_unitario: precio,
          cantidad: cantidad,
          costo_total: total
        });
      }
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Elasticos guardadas:', inputHidden.value);
  }

  // Cargar datos iniciales si existen
  const datosIniciales = JSON.parse(inputHidden.value || '[]');
  console.log('📦 Datos iniciales:', datosIniciales);
  if (datosIniciales.length > 0) {
    console.log('📥 Cargando filas desde datos iniciales...');
    datosIniciales.forEach(elastico => {
      crearFilaElastico(elastico.id, elastico.cantidad, true);
    });
  } else {
    console.log('🆕 Cargando primera fila vacía');
    crearFilaElastico('', '', false);
  }

  btnAgregar.addEventListener('click', () => {
    crearFilaElastico('', '', true);
  });
});



document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script de botones cargado');

  const botonDataElement = document.getElementById('botones-data');
  if (!botonDataElement) {
    console.error('❌ No se encontró el script con id="botones-data"');
    return;
  }

  const botonesDisponibles = JSON.parse(botonDataElement.textContent || '[]');
  console.log('🎀 Botones cargadas:', botonesDisponibles);

  const container = document.getElementById('boton-container');
  const btnAgregar = document.getElementById('agregar-boton');
  const inputHidden = document.getElementById('id_Boton');

  function crearFilaBoton(botonId = '', cantidad = '', mostrarEliminar = true) {
    const boton = botonesDisponibles.find(c => c.ID == botonId);
    const precio = boton ? boton.precio : '';

    const opciones = (botonId === '' ? '<option disabled selected>Seleccione una boton</option>' : '') +
      botonesDisponibles.map(c =>
        `<option value="${c.ID}" ${c.ID == botonId ? 'selected' : ''}>${c.descripcion}</option>`
      ).join('');

    const costoTotal = (precio > 0 && cantidad > 0) ? `$${precio * cantidad}` : 'No definido';

    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 boton-fila';

    div.innerHTML = `
  <div class="form-group">
    <label>Tipo de boton</label>
    <select class="form-select boton-select">
      ${opciones}
    </select>
  </div>

  <div class="form-group">
    <label>Precio de boton</label>
    <input type="number" class="input-user boton-precio" readonly value="${precio}">
  </div>

  <div class="form-group">
    <label>Cantidad</label>
    <input type="number" class="input-user boton-cantidad" min="0" step="1" value="${cantidad}">
  </div>

  <div class="form-group">
    <label>Costo total</label>
    <input type="text" class="input-user boton-costo" readonly value="${costoTotal}">
  </div>

  ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-boton" style="margin-top: 1.8rem;">Eliminar</button>' : ''}
`;

    container.appendChild(div);


    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.boton-fila');

    filas.forEach(fila => {
      const select = fila.querySelector('.boton-select');
      const precioInput = fila.querySelector('.boton-precio');
      const cantidadInput = fila.querySelector('.boton-cantidad');
      const costoOutput = fila.querySelector('.boton-costo');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      select.addEventListener('change', () => {
        const botonSeleccionada = botonesDisponibles.find(c => c.ID == select.value);
        precioInput.value = botonSeleccionada ? botonSeleccionada.precio : '';
        calcular();
      });

      cantidadInput.addEventListener('input', calcular);

      fila.querySelector('.eliminar-boton')?.addEventListener('click', () => {
        fila.remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      });
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.boton-fila').forEach(fila => {
      const tipo = parseInt(fila.querySelector('.boton-select')?.value || 0);
      const boton = botonesDisponibles.find(c => c.ID == tipo);
      const precio = parseFloat(fila.querySelector('.boton-precio')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.boton-cantidad')?.value || 0);
      const total = precio * cantidad;

      if (boton && precio > 0 && cantidad > 0) {
        datos.push({
          id: tipo,
          descripcion: boton.descripcion,
          precio_unitario: precio,
          cantidad: cantidad,
          costo_total: total
        });
      }
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Botones guardadas:', inputHidden.value);
  }

  // Cargar datos iniciales si existen
  const datosIniciales = JSON.parse(inputHidden.value || '[]');
  console.log('📦 Datos iniciales:', datosIniciales);
  if (datosIniciales.length > 0) {
    console.log('📥 Cargando filas desde datos iniciales...');
    datosIniciales.forEach(boton => {
      crearFilaBoton(boton.id, boton.cantidad, true);
    });
  } else {
    console.log('🆕 Cargando primera fila vacía');
    crearFilaBoton('', '', false);
  }

  btnAgregar.addEventListener('click', () => {
    crearFilaBoton('', '', true);
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('plantreles-container');
  const btnAgregar = document.getElementById('agregar-plantrel');
  const inputHidden = document.getElementById('id_plantrel');

  function crearFilaPlantrel(precio = '', cantidad = '', mostrarEliminar = true) {
    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 plantrel-fila';

    div.innerHTML = `
      <div class="form-group half-width">
        <label>Precio del plantrel</label>
        <input type="number" class="input-user precio-plantrel" min="0" step="1" value="${precio}">
      </div>

      <div class="form-group half-width">
        <label>Cantidad de plantrel</label>
        <input type="number" class="input-user cantidad-plantrel" min="0" step="1" value="${cantidad}">
      </div>

      <div class="form-group half-width">
        <label>Costo total del plantrel</label>
        <input type="text" class="input-user costo-plantrel" readonly value="No definido">
      </div>

      ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-plantrel" style="margin-top: 1.8rem;">Eliminar</button>' : ''}
    `;

    container.appendChild(div);
    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.plantrel-fila');

    filas.forEach(fila => {
      const precioInput = fila.querySelector('.precio-plantrel');
      const cantidadInput = fila.querySelector('.cantidad-plantrel');
      const costoOutput = fila.querySelector('.costo-plantrel');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      precioInput.addEventListener('input', calcular);
      cantidadInput.addEventListener('input', calcular);
    });

    container.querySelectorAll('.eliminar-plantrel').forEach(btn => {
      btn.onclick = () => {
        btn.closest('.plantrel-fila').remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      };
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.plantrel-fila').forEach(fila => {
      const precio = parseFloat(fila.querySelector('.precio-plantrel')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.cantidad-plantrel')?.value || 0);
      const total = precio * cantidad;

      datos.push({
        precio_unitario: precio,
        cantidad: cantidad,
        costo_total: total
      });
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Plantrel guardado:', inputHidden.value);
  }

  // Crear primera fila sin botón de eliminar
  crearFilaPlantrel('', '', false);

  btnAgregar.addEventListener('click', () => {
    crearFilaPlantrel('', '', true); // Nuevas filas con botón de eliminar
  });
});







document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script de velcros cargado');

  const velcroDataElement = document.getElementById('velcros-data');
  if (!velcroDataElement) {
    console.error('❌ No se encontró el script con id="velcros-data"');
    return;
  }

  const velcrosDisponibles = JSON.parse(velcroDataElement.textContent || '[]');
  console.log('🎀 Velcros cargadas:', velcrosDisponibles);

  const container = document.getElementById('velcro-container');
  const btnAgregar = document.getElementById('agregar-velcro');
  const inputHidden = document.getElementById('id_Velcro');

  function crearFilaVelcro(velcroId = '', cantidad = '', mostrarEliminar = true) {
    const velcro = velcrosDisponibles.find(c => c.ID == velcroId);
    const precio = velcro ? velcro.precio : '';

    const opciones = (velcroId === '' ? '<option disabled selected>Seleccione una velcro</option>' : '') +
      velcrosDisponibles.map(c =>
        `<option value="${c.ID}" ${c.ID == velcroId ? 'selected' : ''}>${c.descripcion}</option>`
      ).join('');

    const costoTotal = (precio > 0 && cantidad > 0) ? `$${precio * cantidad}` : 'No definido';

    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 velcro-fila';

    div.innerHTML = `
  <div class="form-group">
    <label>Tipo de velcro</label>
    <select class="form-select velcro-select">
      ${opciones}
    </select>
  </div>

  <div class="form-group">
    <label>Precio de velcro</label>
    <input type="number" class="input-user velcro-precio" readonly value="${precio}">
  </div>

  <div class="form-group">
    <label>Cantidad</label>
    <input type="number" class="input-user velcro-cantidad" min="0" step="1" value="${cantidad}">
  </div>

  <div class="form-group">
    <label>Costo total</label>
    <input type="text" class="input-user velcro-costo" readonly value="${costoTotal}">
  </div>

  ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-velcro" style="margin-top: 1.8rem;">Eliminar</button>' : ''}
`;

    container.appendChild(div);


    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.velcro-fila');

    filas.forEach(fila => {
      const select = fila.querySelector('.velcro-select');
      const precioInput = fila.querySelector('.velcro-precio');
      const cantidadInput = fila.querySelector('.velcro-cantidad');
      const costoOutput = fila.querySelector('.velcro-costo');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      select.addEventListener('change', () => {
        const velcroSeleccionada = velcrosDisponibles.find(c => c.ID == select.value);
        precioInput.value = velcroSeleccionada ? velcroSeleccionada.precio : '';
        calcular();
      });

      cantidadInput.addEventListener('input', calcular);

      fila.querySelector('.eliminar-velcro')?.addEventListener('click', () => {
        fila.remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      });
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.velcro-fila').forEach(fila => {
      const tipo = parseInt(fila.querySelector('.velcro-select')?.value || 0);
      const velcro = velcrosDisponibles.find(c => c.ID == tipo);
      const precio = parseFloat(fila.querySelector('.velcro-precio')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.velcro-cantidad')?.value || 0);
      const total = precio * cantidad;

      if (velcro && precio > 0 && cantidad > 0) {
        datos.push({
          id: tipo,
          descripcion: velcro.descripcion,
          precio_unitario: precio,
          cantidad: cantidad,
          costo_total: total
        });
      }
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Velcros guardadas:', inputHidden.value);
  }

  // Cargar datos iniciales si existen
  const datosIniciales = JSON.parse(inputHidden.value || '[]');
  console.log('📦 Datos iniciales:', datosIniciales);
  if (datosIniciales.length > 0) {
    console.log('📥 Cargando filas desde datos iniciales...');
    datosIniciales.forEach(velcro => {
      crearFilaVelcro(velcro.id, velcro.cantidad, true);
    });
  } else {
    console.log('🆕 Cargando primera fila vacía');
    crearFilaVelcro('', '', false);
  }

  btnAgregar.addEventListener('click', () => {
    crearFilaVelcro('', '', true);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script de sesgos cargado');

  const sesgoDataElement = document.getElementById('sesgos-data');
  if (!sesgoDataElement) {
    console.error('❌ No se encontró el script con id="sesgos-data"');
    return;
  }

  const sesgosDisponibles = JSON.parse(sesgoDataElement.textContent || '[]');
  console.log('🎀 Sesgos cargados:', sesgosDisponibles);

  const container = document.getElementById('sesgo-container');
  const btnAgregar = document.getElementById('agregar-sesgo');
  const inputHidden = document.getElementById('id_Sesgo');

  function crearFilaSesgo(sesgoId = '', cantidad = '', mostrarEliminar = true) {
    const sesgo = sesgosDisponibles.find(c => c.ID == sesgoId);
    const precio = sesgo ? sesgo.precio : '';

    const opciones = (sesgoId === '' ? '<option disabled selected>Seleccione un sesgo</option>' : '') +
      sesgosDisponibles.map(c =>
        `<option value="${c.ID}" ${c.ID == sesgoId ? 'selected' : ''}>${c.descripcion}</option>`
      ).join('');

    const costoTotal = (precio > 0 && cantidad > 0) ? `$${precio * cantidad}` : 'No definido';

    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 sesgo-fila';

    div.innerHTML = `
      <div class="form-group">
        <label>Tipo de sesgo</label>
        <select class="form-select sesgo-select">
          ${opciones}
        </select>
      </div>

      <div class="form-group">
        <label>Precio del sesgo</label>
        <input type="number" class="input-user sesgo-precio" readonly value="${precio}">
      </div>

      <div class="form-group">
        <label>Cantidad</label>
        <input type="number" class="input-user sesgo-cantidad" min="0" step="1" value="${cantidad}">
      </div>

      <div class="form-group">
        <label>Costo total</label>
        <input type="text" class="input-user sesgo-costo" readonly value="${costoTotal}">
      </div>

      ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-sesgo" style="margin-top: 1.8rem;">Eliminar</button>' : ''}
    `;

    container.appendChild(div);
    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.sesgo-fila');

    filas.forEach(fila => {
      const select = fila.querySelector('.sesgo-select');
      const precioInput = fila.querySelector('.sesgo-precio');
      const cantidadInput = fila.querySelector('.sesgo-cantidad');
      const costoOutput = fila.querySelector('.sesgo-costo');

      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        costoOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      select.addEventListener('change', () => {
        const sesgoSeleccionado = sesgosDisponibles.find(c => c.ID == select.value);
        precioInput.value = sesgoSeleccionado ? sesgoSeleccionado.precio : '';
        calcular();
      });

      cantidadInput.addEventListener('input', calcular);

      fila.querySelector('.eliminar-sesgo')?.addEventListener('click', () => {
        fila.remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      });
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.sesgo-fila').forEach(fila => {
      const tipo = parseInt(fila.querySelector('.sesgo-select')?.value || 0);
      const sesgo = sesgosDisponibles.find(c => c.ID == tipo);
      const precio = parseFloat(fila.querySelector('.sesgo-precio')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.sesgo-cantidad')?.value || 0);
      const total = precio * cantidad;

      if (sesgo && precio > 0 && cantidad > 0) {
        datos.push({
          id: tipo,
          descripcion: sesgo.descripcion,
          precio_unitario: precio,
          cantidad: cantidad,
          costo_total: total
        });
      }
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Sesgos guardados:', inputHidden.value);
  }

  // Cargar datos iniciales si existen
  const datosIniciales = JSON.parse(inputHidden.value || '[]');
  console.log('📦 Datos iniciales:', datosIniciales);
  if (datosIniciales.length > 0) {
    console.log('📥 Cargando filas desde datos iniciales...');
    datosIniciales.forEach(sesgo => {
      crearFilaSesgo(sesgo.id, sesgo.cantidad, true);
    });
  } else {
    console.log('🆕 Cargando primera fila vacía');
    crearFilaSesgo('', '', false);
  }

  btnAgregar.addEventListener('click', () => {
    crearFilaSesgo('', '', true);
  });
});



document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script de Extras cargado');

  const container = document.getElementById('extra-container');
  const btnAgregar = document.getElementById('agregar-extra');
  const inputHidden = document.getElementById('id_Extra');

  function crearFilaExtra(descripcion = '', precio = '', cantidad = '', mostrarEliminar = true) {
    const total = (precio > 0 && cantidad > 0) ? `$${precio * cantidad}` : 'No definido';

    const div = document.createElement('div');
    div.className = 'form-row-50 mb-2 extra-fila';

    div.innerHTML = `
      <div class="form-group">
        <label>Descripción de costo extra</label>
        <input type="text" class="input-user extra-descripcion" value="${descripcion}">
      </div>

      <div class="form-group">
        <label>Precio unitario de costo extra</label>
        <input type="number" class="input-user extra-precio" min="0" step="0.01" value="${precio}">
      </div>

      <div class="form-group">
        <label>Cantidad de costo extra</label>
        <input type="number" class="input-user extra-cantidad" min="0" step="1" value="${cantidad}">
      </div>

      <div class="form-group">
        <label>Costo total de costo extra</label>
        <input type="text" class="input-user extra-total" readonly value="${total}">
      </div>

      ${mostrarEliminar ? '<button type="button" class="btn btn-download btn-sm eliminar-extra" style="margin-top: 1.8rem;">Eliminar</button>' : ''}
    `;

    container.appendChild(div);
    actualizarEventos();
  }

  function actualizarEventos() {
    const filas = container.querySelectorAll('.extra-fila');

    filas.forEach(fila => {
      const descripcionInput = fila.querySelector('.extra-descripcion');
      const precioInput = fila.querySelector('.extra-precio');
      const cantidadInput = fila.querySelector('.extra-cantidad');
      const totalOutput = fila.querySelector('.extra-total');


      const calcular = () => {
        const precio = parseFloat(precioInput.value) || 0;
        const cantidad = parseInt(cantidadInput.value) || 0;
        const total = precio * cantidad;
        totalOutput.value = (precio > 0 && cantidad > 0) ? `$${total}` : 'No definido';
        guardarJSON();
        window.actualizarTotalCostos?.();
      };

      precioInput.addEventListener('input', calcular);
      cantidadInput.addEventListener('input', calcular);
      descripcionInput.addEventListener('input', guardarJSON);

      fila.querySelector('.eliminar-extra')?.addEventListener('click', () => {
        fila.remove();
        guardarJSON();
        window.actualizarTotalCostos?.();
      });
    });
  }

  function guardarJSON() {
    const datos = [];

    container.querySelectorAll('.extra-fila').forEach(fila => {
      const descripcion = fila.querySelector('.extra-descripcion')?.value || '';
      const precio = parseFloat(fila.querySelector('.extra-precio')?.value || 0);
      const cantidad = parseInt(fila.querySelector('.extra-cantidad')?.value || 0);
      const total = precio * cantidad;

      if (descripcion && precio > 0 && cantidad > 0) {
        datos.push({
          descripcion: descripcion,
          precio_unitario: precio,
          cantidad: cantidad,
          costo_total: total
        });
      }
    });

    inputHidden.value = JSON.stringify(datos);
    console.log('📤 Extras guardados:', inputHidden.value);
  }

  // Cargar datos iniciales si existen
  const datosIniciales = JSON.parse(inputHidden.value || '[]');
  console.log('📦 Datos iniciales (Extra):', datosIniciales);
  if (datosIniciales.length > 0) {
    console.log('📥 Cargando filas desde datos iniciales...');
    datosIniciales.forEach(extra => {
      crearFilaExtra(extra.descripcion, extra.precio_unitario, extra.cantidad, true);
    });
  } else {
    console.log('🆕 Cargando primera fila vacía');
    crearFilaExtra('', '', '', false);
  }

  btnAgregar.addEventListener('click', () => {
    crearFilaExtra('', '', '', true);
  });
});


window.actualizarTotalCostos = function () {
  // Asignar evento al campo de confección si no está asignado ya
  const inputConfeccion = document.getElementById('id_Confeccion');
  if (inputConfeccion && !inputConfeccion.dataset.listenerAdded) {
    inputConfeccion.addEventListener('input', window.actualizarTotalCostos);
    inputConfeccion.dataset.listenerAdded = "true";
  }

  const limpiar = (valor) => parseFloat((valor || '').replace('$', '').trim()) || 0;

  const precioPrenda = limpiar(document.getElementById('precio-prenda')?.value);
  const precioForro = limpiar(document.getElementById('precio-forro')?.value);
  const precioLavado = limpiar(document.getElementById('precio-lavado')?.value);
  const precioEstampado = limpiar(document.getElementById('precio-estampado')?.value);
  const precioFusionado = limpiar(document.getElementById('precio-fusionado')?.value);
  const precioConfeccion = limpiar(document.getElementById('id_Confeccion')?.value);

  const cantidadInput = document.querySelector('input[name="Cantidad"]');
  const cantidad = cantidadInput ? parseFloat(cantidadInput.value) || 1 : 1;

  const sumarCostosPorClase = (clase) => {
    let total = 0;
    document.querySelectorAll(`.${clase}`).forEach(input => {
      total += limpiar(input.value);
    });
    return total;
  };

  const totalBordado = sumarCostosPorClase('costo-bordado');
  const totalPegado = sumarCostosPorClase('costo-pegado');
  const totalPlantrel = sumarCostosPorClase('costo-plantrel');
  const totalBotones = sumarCostosPorClase('boton-costo');
  const totalVelcro = sumarCostosPorClase('velcro-costo');
  const totalSesgos = sumarCostosPorClase('sesgo-costo');
  const totalElasticos = sumarCostosPorClase('elastico-costo');
  const totalCierres = sumarCostosPorClase('cierre-costo');
  const totalCintas = sumarCostosPorClase('cinta-costo');
  const totalExtras = sumarCostosPorClase('extra-total');

  let totalBroches = 0;
  document.querySelectorAll('.broche-fila').forEach(fila => {
    const precio = limpiar(fila.querySelector('.precio-broche')?.value);
    const cantidad = parseFloat(fila.querySelector('.cantidad-broche')?.value) || 0;
    totalBroches += precio * cantidad;
  });

  const totalUnitario =
    precioPrenda +
    precioForro +
    precioLavado +
    precioEstampado +
    precioFusionado +
    totalBordado +
    totalPegado +
    totalPlantrel +
    totalBotones +
    totalVelcro +
    totalSesgos +
    totalElasticos +
    totalCierres +
    totalCintas +
    totalExtras +
    totalBroches +
    precioConfeccion;

  const totalFinal = totalUnitario * cantidad;

  const totalCostosInput = document.getElementById('total-costos');
  if (totalCostosInput) {
    totalCostosInput.value = `$${totalFinal}`;
  }
};



// 👇 Ejecutar al cambiar la cantidad (aparte del cálculo automático)
document.addEventListener('DOMContentLoaded', () => {
  const cantidadInput = document.querySelector('input[name="Cantidad"]');
  if (cantidadInput) {
    cantidadInput.addEventListener('input', () => {
      window.actualizarTotalCostos();
    });
  }
});




// Obtener el input
const totalCostosInput = document.getElementById("total-costos");

// Guardar la referencia original de value
let valorInterno = totalCostosInput.value;

Object.defineProperty(totalCostosInput, "value", {
  get() {
    return valorInterno;
  },
  set(nuevoValor) {
    valorInterno = nuevoValor;
    totalCostosInput.setAttribute("value", nuevoValor); // útil si necesitas visibilidad en el DOM
    aplicarAjuste(); // actualiza el total ajustado
  }
});

// También por si cambia el checkbox
document.getElementById("aplicar-ajuste").addEventListener("change", aplicarAjuste);

// Función de ajuste
function aplicarAjuste() {
  const aplicar = document.getElementById("aplicar-ajuste").checked;
  let raw = totalCostosInput.value.replace(/\$/g, "").replace(/,/g, "");
  let numero = parseFloat(raw);
  if (isNaN(numero)) numero = 0;

  const ajustado = aplicar ? numero * 1.1 : numero;
  document.getElementById("total-ajustado").value = `$${ajustado.toFixed(0)}`;
}

// Llamar al cargar por primera vez
window.addEventListener("DOMContentLoaded", aplicarAjuste);







function parseMoney(value) {
  return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
}

function formatMoney(value) {
  return `$${value.toLocaleString('es-CO', { minimumFractionDigits: 2,maximumFractionDigits: 2})}`;
}

function updateMCBResults() {
  const totalAjustado = parseMoney(document.getElementById('total-ajustado').value);

  const mcb1 = parseFloat(document.getElementById('mcb-select-1').value);
  const mcb2 = parseFloat(document.getElementById('mcb-select-2').value);

  document.getElementById('resultado-mcb-1').value = mcb1 ? formatMoney(totalAjustado / mcb1) : "$0";
  document.getElementById('resultado-mcb-2').value = mcb2 ? formatMoney(totalAjustado / mcb2) : "$0";
}

// Disparar cuando cambia el MCB
document.getElementById('mcb-select-1').addEventListener('change', updateMCBResults);
document.getElementById('mcb-select-2').addEventListener('change', updateMCBResults);

// Detectar cambios programáticos en total-ajustado
const observer = new MutationObserver(updateMCBResults);

observer.observe(document.getElementById('total-ajustado'), {
  attributes: true,
  childList: true,
  subtree: false,
});

// También puedes usar un polling si el valor se actualiza sin modificar el DOM
let lastAjuste = "";
setInterval(() => {
  const current = document.getElementById('total-ajustado').value;
  if (current !== lastAjuste) {
    lastAjuste = current;
    updateMCBResults();
  }
}, 200);


  document.addEventListener('DOMContentLoaded', function () {
    const clienteSelect = document.getElementById('cliente-select');
    const clienteNombreSpan = document.getElementById('cliente-seleccionado');

    clienteSelect.addEventListener('change', function () {
      // Obtener el texto del cliente seleccionado
      const selectedOption = this.options[this.selectedIndex];
      const nombreCliente = selectedOption.textContent;

      // Cambiar el h4 con el nuevo nombre
      clienteNombreSpan.textContent = nombreCliente;
    });
  });


  function toggleCampo(idCampo, boton, nombreCampo) {
    const campo = document.getElementById(idCampo);
    const estaOculto = campo.classList.contains('hidden');

    campo.classList.toggle('hidden');

    // Cambia el texto del botón dinámicamente
    if (estaOculto) {
      boton.textContent = `Eliminar ${nombreCampo}`;
    } else {
      boton.textContent = `Agregar ${nombreCampo}`;
    }
  }