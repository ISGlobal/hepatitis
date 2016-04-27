var lang = getParameterByName('lang');
if (lang != null && lang != "") {
    //set the locale in which the messages will be translated
    iJS.i18n.setlocale(lang);
    //add domain where to find messages data
    iJS.i18n.bindtextdomain(lang, "../locale", "po");
    //Always do this after a `setlocale` or a `bindtextdomain` call.
    iJS.i18n.try_load_lang(); //will load and parse messages data from the setting catalog.
}

d3.select('.title').text(iJS._("Precio del tratamiento con Sofosbuvir y tipo de acuerdo negociado"));
d3.select('.subtitle').text(iJS._("Precios con Sofosbuvir durante 12 semanas (en dólares)"));
d3.select('#dif').text(iJS._("Precio diferenciado"));
d3.select('#vol').text(iJS._("Licencia voluntaria"));
d3.select('#gen').text(iJS._("Competencia genérica"));
d3.select('#fuente').html(iJS._("Fuente: ISGlobal. 2016. Hepatitis C: el nuevo campo de batalla por el acceso a medicamentos esenciales. Informe 25, serie \"Innovación y acceso\"."));
d3.select('#dataTable tbody').html(iJS._('<tr> \
  <td>Estados Unidos</td> \
  <td>84.000$</td> \
  <td>Países Menos Adelantados</td> \
  <td>2.000$</td> \
  <td>Bangladesh</td> \
  <td>840$</td> \
</tr> \
<tr> \
  <td>Francia</td> \
  <td>61.000$</td> \
</tr> \
<tr> \
  <td>Reino Unido</td> \
  <td>54.000$</td> \
</tr> \
<tr> \
  <td>España</td> \
  <td>25.000$</td> \
</tr> \
<tr> \
  <td>Egipto</td> \
  <td>900$</td> \
</tr> \
<tr> \
  <td>India</td> \
  <td>900$</td> \
</tr>'));



var map = new Datamap({
    element: document.getElementById('container1'),
    responsive: true,
    geographyConfig: {
      borderWidth: 0.5,
      highlightOnHover: false,
      popupOnHover: true,
      popupTemplate: function(geography, data) { //this function should just return a string
        if (data!=null){
          if(data.fillKey=='diferenciado'){
            if(geography.properties.name=='United States of America'){
              return '<div class="hoverinfo"><strong>Precio diferenciado:</strong> 84.000$</div>';
            }else if(geography.properties.name=='Spain'){
              return '<div class="hoverinfo"><strong>Precio diferenciado:</strong>: 25.000$</div>';
            }else if(geography.properties.name=='France'){
              return '<div class="hoverinfo"><strong>Precio diferenciado:</strong>: 61.00$</div>';
            }else if(geography.properties.name=='United Kingdom'){
              return '<div class="hoverinfo"><strong>Precio diferenciado:</strong>: 54.000$</div>';
            }else if(geography.properties.name=='Egypt'){
              return '<div class="hoverinfo"><strong>Precio diferenciado:</strong>: 900$</div>';
            }else if(geography.properties.name=='India'){
              return '<div class="hoverinfo"><strong>Precio diferenciado:</strong>: 900$</div>';
            }else{
              console.log(geography.properties.name)
              return '<div class="hoverinfo"><strong>Precio diferenciado:</strong></div>';
            }
          }else if(data.fillKey=='generica'){
            return '<div class="hoverinfo"><strong>Competencia genérica:</strong> 840$</div>';
          }else if(data.fillKey=='voluntaria'){
            return '<div class="hoverinfo"><strong>Licencia voluntaria:</strong> 2.000$</div>';
          }
        }
      },
    },
    fills: {
      defaultFill: "#CCC",
      diferenciado: "#f59c00",
      generica: "#d7ae1c",
      voluntaria: "#af9959"
    },
    data: {
      USA: { fillKey: "diferenciado" },
      ESP: { fillKey: "diferenciado" },
      FRA: { fillKey: "diferenciado" },
      GBR: { fillKey: "diferenciado" },
      EGY: { fillKey: "diferenciado" },
      IND: { fillKey: "diferenciado" },
      BGD: { fillKey: "generica" },
      AFG: { fillKey: "voluntaria" },
      NPL: { fillKey: "voluntaria" },
      MMR: { fillKey: "voluntaria" },
      VNM: { fillKey: "voluntaria" },
      MDG: { fillKey: "voluntaria" },
      LSO: { fillKey: "voluntaria" },
      MOZ: { fillKey: "voluntaria" },
      AGO: { fillKey: "voluntaria" },
      ZMB: { fillKey: "voluntaria" },
      MWI: { fillKey: "voluntaria" },
      TZA: { fillKey: "voluntaria" },
      UGA: { fillKey: "voluntaria" },
      COD: { fillKey: "voluntaria" },
      SSD: { fillKey: "voluntaria" },
      SDN: { fillKey: "voluntaria" },
      TCD: { fillKey: "voluntaria" },
      CAF: { fillKey: "voluntaria" },
      NER: { fillKey: "voluntaria" },
      BEN: { fillKey: "voluntaria" },
      LBR: { fillKey: "voluntaria" },
      SLE: { fillKey: "voluntaria" },
      TGO: { fillKey: "voluntaria" },
      BFA: { fillKey: "voluntaria" },
      MLI: { fillKey: "voluntaria" },
      MRT: { fillKey: "voluntaria" },
      SEN: { fillKey: "voluntaria" },
      GNB: { fillKey: "voluntaria" },
      GIN: { fillKey: "voluntaria" },
      GMB: { fillKey: "voluntaria" },
      YEM: { fillKey: "voluntaria" },
      BTN: { fillKey: "voluntaria" },
      LAO: { fillKey: "voluntaria" },
      KHM: { fillKey: "voluntaria" },
      TLS: { fillKey: "voluntaria" },
      GNQ: { fillKey: "voluntaria" }
    }
});
map.bubbles([
  {
    name: 'Vanuatu',
    radius: 5,
    centered: 'VUT',
    country: 'USA',
    yeild: 0,
    fillKey: 'voluntaria',
    date: '1954-03-01'
  },
  {
    name: 'Tuvalu',
    radius: 5,
    fillKey: 'voluntaria',
    latitude: -7.1095,
    longitude: 177.6493
  },
  {
    radius: 5,
    name: 'Kiribati',
    fillKey: 'voluntaria',
    latitude: -3.3704,
    longitude: 168.7340
  },{
    radius: 5,
    name: 'Solomon Islands',
    fillKey: 'voluntaria',
    latitude: -9.6457,
    longitude: 160.1562
  },{
    radius: 5,
    name: 'Haiti',
    fillKey: 'voluntaria',
    latitude: 18.9712,
    longitude: -72.2853
  }
]);
window.addEventListener('resize', function(event){
    map.resize();
});
