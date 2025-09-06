// Inicializa o mapa centralizado no Brasil
const map = L.map('map').setView([-14.235, -51.9253], 4);

// Adiciona camada do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);


// Função para buscar o CEP
async function buscarCEP() {
  const cep = document.getElementById("cepInput").value.trim();

  if (!cep) {
    alert("Digite um CEP válido!");
    return;
  }

  try {
    // 1 - Consulta o ViaCEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado!");
      return;
    }

    const endereco = `${data.logradouro}, ${data.localidade}, ${data.uf}`;

    // 2 - Consulta no Nominatim (geocodificação)
    const geoResp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`);
    const geoData = await geoResp.json();

    if (geoData.length === 0) {
      alert("Não foi possível localizar no mapa.");
      return;
    }

    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);

    // 3 - Atualiza o mapa e adiciona marcador
    map.setView([lat, lon], 15);
    L.marker([lat, lon]).addTo(map).bindPopup(`Você está aqui:<br>${endereco}`).openPopup();

  } catch (error) {
    alert("Erro ao buscar o CEP. Tente novamente.");
    console.error(error);
  }
}
