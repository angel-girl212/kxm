// Base tile layers
var map = L.map('map').setView([45.524515, -73.582871], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// add mtl admin boundaries

// Geocoder control
L.Control.geocoder({ defaultMarkGeocode: false, position: 'topleft' })
  .on('markgeocode', e => map.setView(e.geocode.center, 16))
  .addTo(map);

// Load and parse marker CSV
Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTrYopwENfaG6flpsO9kaeUmBnutaETaCQgasAR-S6udJ-zlt2KazlgM5lL-kt5g4vE8X9_Jl3yb5hk/pub?output=csv', {
  download: true,
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: results => {
    const morning = L.layerGroup();
    const afternoon = L.layerGroup();
    const evening = L.layerGroup();
    const night = L.layerGroup();

    // Place markers into time-of-day groups
    results.data
      .filter(r => Number.isFinite(r.latitude) && Number.isFinite(r.longitude))
      .forEach(r => {
        const marker = L.marker([r.latitude, r.longitude], { icon: goldIcon });
        const defaultPopup = `<b>${r.name||'Unnamed'}</b><br>${r.latitude.toFixed(6)}, ${r.longitude.toFixed(5)}`;
        
        const detailedPopup = `
          <div style="width: 300px;">
            <b>${r.name || 'Unnamed'}</b><br>${r.latitude.toFixed(6)}, ${r.longitude.toFixed(5)}
            <p>${r.description || ''}</p>
            <p>A user identified this as a shady spot on ${r.timestamp || 'an unknown date'}.</p>
            <p>The best time to visit this spot is in the ${r.timeday || 'unknown'}.</p>
        `;
        
        marker.bindPopup(defaultPopup);
        marker.on('dblclick', () => marker.getPopup().setContent(detailedPopup).openOn(map));
        marker.on('popupclose', () => marker.getPopup().setContent(defaultPopup));

        const time = (r.timeday||'').toLowerCase().trim();
        if (time === 'morning') marker.addTo(morning);
        else if (time === 'afternoon') marker.addTo(afternoon);
        else if (time === 'evening') marker.addTo(evening);
        else if (time === 'night') marker.addTo(night);
        else marker.addTo(night);
      });

      // Add marker groups to map
      morning.addTo(map);
      afternoon.addTo(map);
      evening.addTo(map);
      night.addTo(map);
      bentway.addTo(map);
      artwork.addTo(map);
      
      err => { console.error(err); alert('Failed to load markers.'); }
  }
});
  