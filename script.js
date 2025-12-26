// set up a little tracking site to record pathway
// geojson for a) pathway c) POIs
// markers for POIs with photos, explanation etc
// neighbourhood geojson - once clicked, remove layer and show POIs

      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h2>${feature.properties.name}</h2><h3>${feature.properties.address}</h3>`
                `<p>${feature.properties.description}</p>
                add photos 
              )
          )
          .addTo(map);
      }