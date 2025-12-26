// Mapbox access token for API authentication
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nbGUta3ByIiwiYSI6ImNtZjJybG10YzFkbnUycG80N3J5cDVid2QifQ.SoIeeUn_3CNLmzU2cgtv1w';

// Initialize Mapbox map
const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/angle-kpr/cmjnff242007j01sgah5yd1a5',
  center: [45.521728, -73.584887],
  zoom: 5.8,
  minZoom: 5.8,
  maxZoom: 20,
  maxBounds:[[-25, 62], [-10, 67]]
}); 