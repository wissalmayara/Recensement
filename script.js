//Hide loder function
let loader = document.getElementById("loader");
function hideLoader() {
  loader.style.display = "none";
}
      const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

// searchBtn.addEventListener("click" , () =>{
//     sidebar.classList.remove("close");
// })

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});
//myDiv
function hideDiv(e1) {
    var x = document.getElementById(e1);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function redirectToDashb() {
    window.location.href = "dashb.html";
  }

  function redirectToMap() {
    window.location.href = "index.html";
  }

  function downloadFile(fileUrl) {
    var link = document.createElement("a");
    link.href = fileUrl;
    link.download = true;
    link.click();
  }
  
  //remove layer 
  const elements = document.getElementsByClassName("info");
  const divs = document.getElementsByClassName("DIV");
  function hide_other_divs(currDiv) {
    // panel.style.display = "none";
    map.eachLayer(function (layer) {
      if (layer._url != 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png') {
        map.removeLayer(layer);
      }
    });
  
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].id != currDiv) {
        divs[i].style.display = "none";
      }
    }
  
    while (elements.length > 0) elements[0].remove();
  }
  //ACTUALISER LA MAP
  // reset function #to
function reset_all() {
    map.eachLayer(function (layer) {
      if (layer._url != 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png') {
        map.removeLayer(layer);
      }
    });
  
    while (elements.length > 0) elements[0].remove();
  
    for (var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }
  }
  //RECHARGER LA PAGE
  function refresh() { window.location.reload(false); }
  ////////////////////////////////////afficher fournisseurs
  ////ICON ANGRAIS////
var blackAngrais = L.icon({
    iconUrl:'images/angrais.svg' ,
    iconSize:     [32, 37], // size of the icon
    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

var redAngrais = L.icon({
    iconUrl:'images/angrais_red.svg' ,
    iconSize:     [32, 37], // size of the icon
    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

////ICON MATERIEL////
var materielicon = L.icon({
    iconUrl:'images/semance.svg' ,
    iconSize:     [25, 30], // size of the icon
    iconAnchor:   [13, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

var redmaterielicon = L.icon({
    iconUrl:'images/semancegreen.svg' ,
    iconSize:     [25, 30], // size of the icon
    iconAnchor:   [13, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//données relatif aux différents fournisseurs agricoles
function showFour() {
    geojsonmateriel = L.geoJson(materiel, {
        pointToLayer: function(feature, latlng){
            return L.marker(latlng,{icon: materielicon})
                           .on('mousemove',function(e){
                                   e.target.setIcon(redmaterielicon)
                                })
                           .on('mouseout',function(e){
                                   e.target.setIcon(materielicon)
                                })
         },
         onEachFeature: function (feature, layer) {
            	            layer.bindPopup("<b><h2><u>Société :</h2> </u></font></b>" +
            	            feature.properties.société + "</br>" +"<b>ouvre à : </b>"+ feature.properties.ouverture + "</br>" +"<b>ferme à : </b>" +feature.properties.Fermeture+"</br>"+"<b>site web : </b>"+feature.properties.siteweb+"</br>"+"<b>Gsm : </b>"+ feature.properties.Contact +"</br>"+"<b>Adresse : </b>"+feature.properties.Adresse);
            	        }
            
    }).addTo(map);
  }
  function showFourA() {
    geojsonangrais = L.geoJson(angrais, {
        pointToLayer: function(feature,latlng){
            return L.marker(latlng,{icon: blackAngrais})
                            .on('mousemove',function(e){
                                   e.target.setIcon(redAngrais)
                                })
                            .on('mouseout',function(e){
                                   e.target.setIcon(blackAngrais)
                                })
        }, 
         onEachFeature: function (feature, layer) {
            	            layer.bindPopup("<b><h2><u>Société :</h2> </u></font></b>" +
            	            feature.properties.société + "</br>" +"<b>ouvre à : </b>"+ feature.properties.ouverture + "</br>" +"<b>ferme à : </b>" +feature.properties.Fermeture+"</br>"+"<b>site web : </b>"+feature.properties.siteweb+"</br>"+"<b>Gsm : </b>"+ feature.properties.Contact +"</br>"+"<b>Adresse : </b>"+feature.properties.Adresse);
            	        }
            
    }).addTo(map);
}
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////Definition des styles des diff cartes choropletes 
  /////////////////////////////////////////////////////////DU pH
  function showpH() {
    function getColor_ph(d) {

        return d == "6,5-7,5" ? '#c994c7' : 
               d == "7,5-8,5" ? '#fa9fb5' : 
               d == ">8,5" ? '#c51b8a' : 
                             '#FFEDA0';
      }
      
      function style_PH(feature) {
          return {
              fillColor: getColor_ph(feature.properties.PH),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
          };
      }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_ph.update(layer.feature);
} 
function resetHighlight_ph(e) {
    ph1.resetStyle(e.target);
    info_ph.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////PH
    function onEachFeature_ph(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_ph,
            click: zoomToFeature
        })
    }
var info_ph = L.control();

info_ph.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info ph'); // create a div with a class "info"
    this.update();
    return this.div;
};

// method that we will use to update the control based on feature properties passed
info_ph.update = function (feat) {
    this.div.innerHTML = '<h4>Le pourcentage du pH</h4>' +  (feat ?
        '<b><h3>Intervalle du pH :</h3>' +feat.properties.PH  + '</b><br/>' +'<h4>superficie:</h4>' + '<b>' + (turf.area(feat.geometry)/10000).toFixed(2) + ' ha </b>'//+ ' people / mi<sup>2</sup>'
        : 'Survoler une zone!');
};
ph1 = L.geoJson(ph,{
    style: style_PH , 
    onEachFeature: onEachFeature_ph
    
 }).addTo(map);
 info_ph.addTo(map);
  }
  /////////////////////////////////////////////DU PHOSPHORE ASSIMILABLE
  function showphos() {
    function getColor_phos(d) {

        return d == "<10" ? '#edf8fb' :
               d == "10-20" ? '#b2e2e2' :
               d == "20-40" ? '#66c2a4' :
               d == ">40" ? '#238b45' :
                            '#FFEDA0';
      }
      
      function style_phos(feature) {
        return {
            fillColor: getColor_phos(feature.properties.Phosphore),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_p.update(layer.feature);
} 
function resetHighlight_phos(e) {
    phosphore1.resetStyle(e.target);
    info_p.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////PH
    function onEachFeature_phos(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_phos,
            click: zoomToFeature
        })
    }
    var info_p = L.control();

    info_p.onAdd = function (map) {
        this.div = L.DomUtil.create('div', 'info p'); // create a div with a class "info"
        this.update();
        return this.div;
    };

// method that we will use to update the control based on feature properties passed
info_p.update = function (feat) {
    this.div.innerHTML = '<h4>Le pourcentage du Phosphore Assimilable</h4>' +  (feat ?
        '<b><h4>Intervalle du Phosphore Assimilable:</h4>' + feat.properties.Phosphore+ '</b>'  + ' ppm P2O5' +'<h4>superficie:</h4>' + '<b>' + (turf.area(feat.geometry)/10000).toFixed(2) + ' ha </b>'
        : 'Survoler une zone!');
};
phosphore1 = L.geoJson(phosphore,{
    style: style_phos , 
    onEachFeature: onEachFeature_phos
    
 }).addTo(map);
 info_p.addTo(map);
  }
  ///////////////////////////////////////////////////DU POTASSIUM ECHANGEABLE
  function showpot() {
    function getColor_k(d) {

        return d == "<150" ? '#f1eef6' :
               d == "150-250" ? '#bdc9e1' :
               d == "250-350" ? '#74a9cf' :
               d == ">350" ? '#0570b0' :
                             '#FFEDA0';}
      function style_K(feature) {
        return {
            fillColor: getColor_k(feature.properties.K),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_k.update(layer.feature);
} 
function resetHighlight_k(e) {
    potassium1.resetStyle(e.target);
    info_k.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////PH
    function onEachFeature_k(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_k,
            click: zoomToFeature
        })
    }
    var info_k = L.control();

    info_k.onAdd = function (map) {
        this.div = L.DomUtil.create('div', 'info k'); // create a div with a class "info"
        this.update();
        return this.div;
    };

// method that we will use to update the control based on feature properties passed
info_k.update = function (feat) {
    this.div.innerHTML = '<h4>Le pourcentage du Potassium Echangeable</h4>' +  (feat ?
        '<b><h4>Intervalle du Potassium Echangeable:</h4>' + feat.properties.K+ '</b>'  + ' ppm K2O' +'<h4>superficie:</h4>' + '<b>' + (turf.area(feat.geometry)/10000).toFixed(2) + ' ha </b>'
        : 'Survoler une zone!');
};
potassium1 = L.geoJson(potassium,{
    style: style_K , 
    onEachFeature: onEachFeature_k
    
 }).addTo(map);
 info_k.addTo(map);
  }
  ///////////////////////////////////////DE LA MATIERE ORGANIQUE
  function showMO() {
    function getColor_mo(d) {

        return d == "<1,5" ? '#fef0d9' :
               d == "1,5-2,5" ? '#fdcc8a' :
               d == "2,5-3,5" ? '#fc8d59' :
               d == ">3,5" ? '#d7301f' :
                             '#FFEDA0';
      }
      
      function style_mo(feature) {
        return {
            fillColor: getColor_mo(feature.properties.descript),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_mo.update(layer.feature);
} 
function resetHighlight_mo(e) {
    morg1.resetStyle(e.target);
    info_mo.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////PH
    function onEachFeature_mo(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_mo,
            click: zoomToFeature
        })
    }
    var info_mo = L.control();

    info_mo.onAdd = function (map) {
        this.div = L.DomUtil.create('div', 'info mo'); // create a div with a class "info"
        this.update();
        return this.div;
    };

// method that we will use to update the control based on feature properties passed
info_mo.update = function (feat) {
    this.div.innerHTML = '<h4>Le pourcentage de la matière Organique</h4>' +  (feat ?
        '<b><h4>Intervalle de la matière Organique:</h4>' + feat.properties.descript+ '</b>'  + ' %' +'<h4>superficie:</h4>' + '<b>' + (turf.area(feat.geometry)/10000).toFixed(2) + ' ha </b>'
        : 'Survoler une zone!');
};
morg1 = L.geoJson(MORG,{
    style: style_mo, 
    onEachFeature: onEachFeature_mo
    
 }).addTo(map);
 info_mo.addTo(map);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
/////Itinéraire
function showitineraire() {
    map.on('click', function(e){
        var gotolat = e.latlng.lat
        var gotolng = e.latlng.lng
        map.locate().on("locationfound", (i)=>{
            console.log(i.latlng)
            L.Routing.control({
      waypoints: [
        L.latLng(i.latlng.lat,i.latlng.lng),
        L.latLng(gotolat,gotolng)
      ]
      }).addTo(map)
        }) 
    });
  }
  /////////////////////////////////////////////////////////////////////////RASTER//////////////////////////
  function showRaster() {
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Rendement du Blé</h4>";
  div.innerHTML += '<i style="background: #4169E1"></i><span>8,22-16,85</span><br>';
  div.innerHTML += '<i style="background: #7FFFD4"></i><span>16,85-21,98</span><br>';
  div.innerHTML += '<i style="background: #FFFF00"></i><span>21,98-27,60</span><br>';
  div.innerHTML += '<i style="background: #FF4500"></i><span>27,60-40,12</span><br>';
  return div;
};
var imageUrl = 'r1.png';
var latLngBounds = L.latLngBounds([[38.689,-10.198], [27.122,-1.442]]);

var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
interactive: true
}).addTo(map); 
legend.addTo(map);
   }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////// CARTE SYMBOLE PROPORTIONELLE
  function showble() {
   com =L.geoJson(commune, {
        style :{
        weight: 1,
        opacity: 1,
        color: '#2b8cbe',
        fillOpacity: 0.2
        }
    }).addTo(map);
    
    regionCentroProd =L.geoJson(rdt, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,{
          radius:setSizeIcon(feature.properties.Rdt_Moyen), 
          color : '#005824',
          fillOpacity: 1,
      fillColor: '#41AE76'
         }).bindPopup("<b>Le rendement du blé au niveau de cette station : </b><br>" + feature.properties.Rdt_Moyen.toFixed(3));;
     }
    }).addTo(map);
    
    function setSizeIcon(attr){
      return rayon=(attr/3) ;
    }
  }