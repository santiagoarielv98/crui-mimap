// script.js
function initMap() {
    var ituzaingo = {lat: -34.6570897, lng: -58.7120565}; // Coordenadas actualizadas de Ituzaingó
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: ituzaingo
    });

    // Búsqueda predictiva
    $('#search-bar').on('input', function() {
        var query = $(this).val();
        if (query.length >= 3) {
            $.get('search.php?q=' + query, function(data) {
                var entities = JSON.parse(data);
                displayResults(entities, map);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Error en la petición: " + textStatus, errorThrown);
            });
        }
    });

    // Botón de búsqueda
    $('#search-button').click(function() {
        var query = $('#search-bar').val();
        $.get('search.php?q=' + query, function(data) {
            var entities = JSON.parse(data);
            displayResults(entities, map);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Error en la petición: " + textStatus, errorThrown);
        });
    });
}

function displayResults(entities, map) {
    // Limpiar marcadores anteriores
    var markers = [];
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var marker = new google.maps.Marker({
            position: {lat: parseFloat(entity.latitud), lng: parseFloat(entity.longitud)},
            map: map,
            title: entity.nombre_fantasia
        });
        markers.push(marker);
    }

    // Mostrar resultados en el menú lateral
    $('#sidebar').empty().removeClass('hidden').show();
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        $('#sidebar').append('<div class="entity-card">' +
            '<h3>' + entity.nombre_fantasia + '</h3>' +
            '<p>' + entity.direccion + '</p>' +
            '<p>' + entity.rubro + '</p>' +
            '</div>');
    }
}

// Inicializar el mapa al cargar la página
$(document).ready(function() {
    initMap();
});
