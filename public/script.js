const busqueda = document.getElementById("busqueda");
const API = "http://localhost:3000/incidencias";

const form = document.getElementById("form");
const lista = document.getElementById("lista");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    cliente: document.getElementById("cliente").value,
    ubicacion: document.getElementById("ubicacion").value,
    problema: document.getElementById("problema").value,
    estado: document.getElementById("estado").value
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  form.reset();
  cargar();
});

async function cargar() {
  const res = await fetch(API);
  let data = await res.json();

  const filtro = busqueda.value.toLowerCase();
  data = data.filter(i => i.cliente.toLowerCase().includes(filtro));

  lista.innerHTML = "";

  data.forEach(i => {
    lista.innerHTML += `
      <li>
        <strong>${i.cliente}</strong>
        <span>📍 ${i.ubicacion}</span>
        <span>⚠️ ${i.problema}</span>
        <span>Estado: ${i.estado}</span>

        <div>
          <select onchange="cambiarEstado(${i.id}, this.value)">
            <option ${i.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
            <option ${i.estado === "En proceso" ? "selected" : ""}>En proceso</option>
            <option ${i.estado === "Resuelto" ? "selected" : ""}>Resuelto</option>
          </select>

          <button onclick="eliminar(${i.id})">Eliminar</button>
        </div>
      </li>
    `;
  });
}

async function cambiarEstado(id, estado) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado })
  });
  cargar();
}

busqueda.addEventListener("input", cargar);