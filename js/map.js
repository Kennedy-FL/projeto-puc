// Inicializa o mapa centralizado em São Paulo
var map = L.map('map').setView([-23.5505, -46.6333], 12);

// Adiciona a camada do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Pontos fictícios de coleta
var pontos = [
  {nome: "Ponto de Coleta - Shopping", coords: [-23.5629, -46.6544]},
  {nome: "Ponto de Coleta - Supermercado", coords: [-23.5596, -46.6588]},
  {nome: "Ponto de Coleta - Escola Municipal", coords: [-23.5525, -46.6396]}
];

// Adiciona os marcadores no mapa
pontos.forEach(p => {
  L.marker(p.coords).addTo(map)
    .bindPopup(`<b>${p.nome}</b><br>Descarte de óleo, pilhas e baterias.`);
});
