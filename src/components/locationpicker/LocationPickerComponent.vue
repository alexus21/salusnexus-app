<template>
    <div class="location-picker-modal">
        <div class="modal-content">
            <h4>Seleccionar Ubicación</h4>

            <div class="d-flex gap-2 mb-3">
                <input type="text"
                       class="form-control"
                       v-model="searchQuery"
                       placeholder="Buscar ubicación..."
                       @keyup.enter="searchLocation">
                <button type="button"
                        class="btn btn-primary"
                        @click="searchLocation"
                        title="Buscar ubicación">
                    <span class="material-icons">search</span>
                </button>
                <button type="button"
                        class="btn btn-primary"
                        @click="getCurrentLocation"
                        title="Usar mi ubicación actual">
                    <span class="material-icons">my_location</span>
                </button>
            </div>

            <div id="map" ref="mapContainer"></div>

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
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default {
    name: 'LocationPickerComponent',
    data() {
        return {
            map: null,
            marker: null,
            searchQuery: '',
            selectedLocation: null,
            isLoading: false
        };
    },
    mounted() {
        this.initMap();
        this.getCurrentLocation(); // Detectar ubicación actual al inicio
    },
    methods: {
        initMap() {
            // Create map
            this.map = L.map(this.$refs.mapContainer).setView([13.6929, -89.2182], 13);

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);

            // Handle map clicks
            this.map.on('click', (e) => {
                this.handleMapClick(e.latlng);
            });
        },

        async handleMapClick(latlng) {
            // Remove existing marker
            if (this.marker) {
                this.map.removeLayer(this.marker);
            }

            // Add new marker
            this.marker = L.marker(latlng).addTo(this.map);

            // Get address using reverse geocoding
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
                );
                const data = await response.json();

                this.selectedLocation = {
                    lat: latlng.lat,
                    lng: latlng.lng,
                    address: data.display_name
                };
            } catch (error) {
                console.error('Error getting address:', error);
                this.selectedLocation = {
                    lat: latlng.lat,
                    lng: latlng.lng,
                    address: 'Dirección no encontrada'
                };
            }
        },

        async searchLocation() {
            if (!this.searchQuery) return;

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchQuery)}&format=json`
                );
                const data = await response.json();

                if (data.length > 0) {
                    const location = data[0];
                    const latlng = {lat: parseFloat(location.lat), lng: parseFloat(location.lon)};

                    this.map.setView(latlng, 16);
                    this.handleMapClick(latlng);
                }
            } catch (error) {
                console.error('Error searching location:', error);
            }
        },

        confirmLocation() {
            if (this.selectedLocation) {
                this.$emit('location-selected', this.selectedLocation);
            }
        },
        getCurrentLocation() {
            if (!navigator.geolocation) {
                alert('Geolocalización no está soportada por su navegador');
                return;
            }

            // Show loading state
            this.isLoading = true;

            const options = {
                enableHighAccuracy: true,
                timeout: 10000, // Increased timeout to 10 seconds
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.isLoading = false;
                    const latlng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    this.map.setView(latlng, 16);
                    this.handleMapClick(latlng);
                },
                (error) => {
                    this.isLoading = false;
                    console.error('Geolocation error:', {
                        code: error.code,
                        message: error.message,
                        error: error
                    });

                    let message;
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            message = 'Por favor habilite los permisos de ubicación en su navegador';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            message = 'No se pudo detectar su ubicación. Intente nuevamente o seleccione manualmente';
                            break;
                        case error.TIMEOUT:
                            message = 'Tiempo de espera agotado. Por favor intente nuevamente';
                            break;
                        default:
                            message = 'Error al obtener la ubicación. Por favor intente nuevamente';
                    }
                    alert(message);
                },
                options
            );
        },
    },
    beforeUnmount() {
        if (this.map) {
            this.map.remove();
        }
    },
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

/* Fix Leaflet marker icon */
.leaflet-default-icon-path {
    background-image: url("https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png");
}

.material-icons {
    font-size: 20px;
    line-height: 1;
}
</style>
