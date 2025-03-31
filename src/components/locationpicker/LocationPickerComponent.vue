<template>
    <div class="location-picker-modal">
        <div class="modal-content">
            <h4>Seleccionar Ubicación</h4>

            <div class="d-flex gap-2 mb-3">
                <input type="text"
                       class="form-control"
                       ref="searchInputRef"
                       name="searchQuery"
                       placeholder="Buscar ubicación...">
                <button type="button"
                        class="btn btn-primary"
                        @click="searchLocation"
                        title="Usar mi ubicación actual"
                        :disabled="isLoading">
                    <span v-if="!isLoading" class="material-icons">search</span>
                    <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                <button type="button"
                        class="btn btn-primary"
                        @click="getCurrentLocation"
                        title="Usar mi ubicación actual"
                        :disabled="isLoading">
                    <span v-if="!isLoading" class="material-icons">my_location</span>
                    <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
            </div>

            <div v-if="!mapLoaded" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2">Cargando el mapa...</p>
            </div>

            <div id="map" ref="mapContainer" v-show="mapLoaded"></div>

            <div class="selected-location mt-2" v-if="selectedLocation">
                <p class="mb-2">Ubicación seleccionada:</p>
                <p class="text-muted mb-1">{{ selectedLocation.address }}</p>
                <small>Lat: {{ selectedLocation.lat }}, Lng: {{ selectedLocation.lng }}</small>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-3">
                <button type="button" class="btn btn-secondary" @click="$emit('close')">
                    Cancelar
                </button>
                <button type="button"
                        class="btn btn-primary"
                        @click="confirmLocation"
                        :disabled="!selectedLocation">
                    Confirmar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// /* global google */
import swal from "sweetalert2";

export default {
    name: 'LocationPickerComponent',
    data() {
        return {
            map: null,
            marker: null,
            geocoder: null,
            autocomplete: null,
            searchQuery: '',
            selectedLocation: null,
            isLoading: false,
            mapLoaded: false,
            googleMapApiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY || ''
        };
    },
    mounted() {
        // Cargar el script de Google Maps de manera síncrona
        this.loadGoogleMapsScript();
    },
    methods: {
        loadGoogleMapsScript() {
            // Primero, verificamos si Google Maps ya está cargado
            if (typeof google !== 'undefined' && google.maps) {
                this.initializeMap();
                return;
            }

            // URL de la API de Google Maps
            const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapApiKey}&libraries=places`;
            
            // Verificar si el script ya existe en la página
            const existingScript = document.getElementById('google-maps-api');
            if (existingScript) {
                // Si ya existe el script, esperamos a que se cargue
                this.waitForGoogleMaps();
                return;
            }

            // Crear el script y agregarlo al documento
            const script = document.createElement('script');
            script.id = 'google-maps-api';
            script.src = googleMapsUrl;
            script.async = true;
            script.defer = true;
            
            // Cuando el script se carga, verificamos periódicamente si Google Maps está disponible
            script.onload = () => {
                this.waitForGoogleMaps();
            };
            
            // En caso de error
            script.onerror = () => {
                console.error('Error al cargar la API de Google Maps');
            };
            
            // Insertar el script en el documento
            document.head.appendChild(script);
        },

        // Método para esperar a que Google Maps esté disponible
        waitForGoogleMaps() {
            const checkGoogleMaps = () => {
                // Verificar si Google Maps está disponible
                if (typeof google !== 'undefined' && google.maps) {
                    // Google Maps está disponible, inicializar el mapa
                    clearInterval(interval);
                    this.initializeMap();
                }
            };
            
            // Verificar cada 100ms
            const interval = setInterval(checkGoogleMaps, 100);
            
            // Establecer un tiempo límite de 10 segundos
            setTimeout(() => {
                clearInterval(interval);
                if (!this.mapLoaded) {
                    console.error('No se pudo cargar Google Maps después de 10 segundos');
                }
            }, 10000);
        },

        // Inicializar el mapa una vez que Google Maps está disponible
        initializeMap() {
            // Posición predeterminada (San Salvador, El Salvador)
            const defaultPosition = { lat: 13.6929, lng: -89.2182 };
            
            try {
                // Crear el mapa
                this.map = new google.maps.Map(this.$refs.mapContainer, {
                    center: defaultPosition,
                    zoom: 13,
                    mapTypeControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    streetViewControl: false,
                    fullscreenControl: true,
                    zoomControl: true
                });
                
                // Inicializar el geocoder
                this.geocoder = new google.maps.Geocoder();
                
                // Crear el marcador
                this.marker = new google.maps.Marker({
                    map: this.map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    visible: false
                });
                
                // Configurar eventos
                this.setupMapEvents();
                
                // Configurar el autocompletado de búsqueda
                this.setupAutocomplete();
                
                // Marcar el mapa como cargado
                this.mapLoaded = true;
            } catch (error) {
                console.error('Error al inicializar el mapa:', error);
            }
        },

        // Configurar el autocompletado de Places
        setupAutocomplete() {
            if (!this.$refs.searchInputRef) return;
            
            // Crear el autocompletado
            this.autocomplete = new google.maps.places.Autocomplete(this.$refs.searchInputRef, {
                types: ['geocode']
            });
            
            // Asociar el autocompletado al mapa actual
            this.autocomplete.bindTo('bounds', this.map);
            
            // Manejar cambios en la selección
            this.autocomplete.addListener('place_changed', () => {
                const place = this.autocomplete.getPlace();
                
                if (!place.geometry) {
                    alert('No se encontró información para esta ubicación');
                    return;
                }
                
                // Si el lugar tiene una geometría, mostrarla en el mapa
                if (place.geometry.viewport) {
                    this.map.fitBounds(place.geometry.viewport);
                } else {
                    this.map.setCenter(place.geometry.location);
                    this.map.setZoom(16);
                }
                
                // Actualizar el marcador
                const latlng = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                
                this.handleMapClick(latlng);
                
                // Actualizar la ubicación seleccionada directamente
                this.selectedLocation = {
                    lat: latlng.lat,
                    lng: latlng.lng,
                    address: place.formatted_address || 'Dirección desconocida'
                };
            });
        },

        // Configurar los eventos del mapa
        setupMapEvents() {
            if (!this.map || !this.marker) return;
            
            // Manejar clics en el mapa
            this.map.addListener('click', (e) => {
                const latlng = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                };
                this.handleMapClick(latlng);
            });
            
            // Manejar arrastre del marcador
            this.marker.addListener('dragend', () => {
                const latlng = {
                    lat: this.marker.getPosition().lat(),
                    lng: this.marker.getPosition().lng()
                };
                this.reverseGeocode(latlng);
            });
        },

        // Manejar clic en el mapa
        handleMapClick(latlng) {
            if (!this.map || !this.marker) return;
            
            // Actualizar la posición del marcador
            this.marker.setPosition(new google.maps.LatLng(latlng.lat, latlng.lng));
            this.marker.setVisible(true);
            
            // Obtener la dirección
            this.reverseGeocode(latlng);
        },

        // Geocodificación inversa (coordenadas a dirección)
        reverseGeocode(latlng) {
            if (!this.geocoder) return;
            
            this.geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    this.selectedLocation = {
                        lat: latlng.lat,
                        lng: latlng.lng,
                        address: results[0].formatted_address
                    };
                } else {
                    this.selectedLocation = {
                        lat: latlng.lat,
                        lng: latlng.lng,
                        address: 'Dirección no encontrada'
                    };
                }
            });
        },

        // Confirmar la ubicación seleccionada
        confirmLocation() {
            if (this.selectedLocation) {
                this.$emit('location-selected', this.selectedLocation);
                this.$emit('close');
            }
        },

        // Obtener la ubicación actual del usuario
        getCurrentLocation() {
            if (!navigator.geolocation) {
                alert('La geolocalización no está soportada por su navegador');
                return;
            }
            
            // Marcar como cargando
            this.isLoading = true;
            
            try {
                // Intentar obtener la posición
                navigator.geolocation.getCurrentPosition(
                    // Éxito
                    (position) => {
                        // Ya no está cargando
                        this.isLoading = false;
                        
                        // Verificar que el mapa esté inicializado
                        if (!this.map) {
                            console.error('El mapa no está inicializado');
                            return;
                        }
                        
                        const latlng = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        
                        // Centrar el mapa y mostrar el marcador
                        this.map.setCenter(latlng);
                        this.map.setZoom(16);
                        
                        // Actualizar el marcador y buscar la dirección
                        this.handleMapClick(latlng);
                    },
                    // Error
                    (error) => {
                        // Ya no está cargando
                        this.isLoading = false;
                        
                        let message;
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                message = 'Permiso denegado. Por favor, habilite los permisos de ubicación en su navegador y vuelva a intentarlo.';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                message = 'La información de ubicación no está disponible. Intente seleccionar manualmente una ubicación en el mapa.';
                                break;
                            case error.TIMEOUT:
                                message = 'Se agotó el tiempo de espera para obtener su ubicación. Verifique su conexión y permisos, luego intente nuevamente.';
                                break;
                            default:
                                message = `Error desconocido al obtener la ubicación. Código: ${error.code}. Mensaje: ${error.message}`;
                        }
                        
                        console.error('Error de geolocalización:', error);
                        alert(message);
                    },
                    // Opciones
                    {
                        enableHighAccuracy: false, // Cambiar a false para mayor compatibilidad
                        timeout: 20000, // Aumentar a 20 segundos
                        maximumAge: 30000 // Permitir ubicaciones de hasta 30 segundos de antigüedad
                    }
                );
            } catch (e) {
                this.isLoading = false;
                console.error('Error al intentar obtener la ubicación:', e);
                alert('Ocurrió un error al intentar obtener su ubicación. Por favor, inténtelo de nuevo o seleccione manualmente una ubicación.');
            }
        },
        searchLocation() {
            this.searchQuery = this.$refs.searchInputRef.value;

            if (!this.searchQuery) {
                swal.fire({
                    icon: 'warning',
                    title: '¡Advertencia!',
                    text: 'Por favor, ingrese una ubicación para buscar.',
                });
                return;
            }
            this.isLoading = true;
            this.geocoder.geocode({ address: this.searchQuery }, (results, status) => {
                this.isLoading = false;
                if (status === 'OK' && results[0]) {
                    const latlng = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    };
                    this.map.setCenter(latlng);
                    this.map.setZoom(16);
                    this.handleMapClick(latlng);
                    this.selectedLocation = {
                        lat: latlng.lat,
                        lng: latlng.lng,
                        address: results[0].formatted_address
                    };
                } else {
                    alert('No se encontró información para esta ubicación.');
                }
            });
        }
    },
    beforeUnmount() {
        // Limpiar los listeners para evitar memory leaks
        if (this.map && typeof google !== 'undefined' && google.maps) {
            google.maps.event.clearInstanceListeners(this.map);
        }
        
        if (this.marker && typeof google !== 'undefined' && google.maps) {
            google.maps.event.clearInstanceListeners(this.marker);
        }
        
        if (this.autocomplete && typeof google !== 'undefined' && google.maps) {
            google.maps.event.clearInstanceListeners(this.autocomplete);
        }
    }
};
</script>

<style scoped>
.location-picker-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
}

#map {
    width: 100%;
    height: 400px;
    border-radius: 4px;
}

.selected-location {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 4px;
}

.material-icons {
    font-size: 20px;
    line-height: 1;
}

/* Estilos para mejorar el autocompletado */
.pac-container {
    z-index: 1200 !important;
}
</style>
