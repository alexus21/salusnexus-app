<template>
    <div class="container-fluid py-4">
        <div class="card shadow">
            <div class="card-header bg-white d-flex align-items-center py-3">
                <router-link to="/dashboard" class="me-3">
                    <i class="fas fa-arrow-left text-primary"></i>
                </router-link>
                <h5 class="mb-0">Editar Mi Clínica</h5>
                <div class="ms-auto">
                    <button class="btn btn-primary d-flex align-items-center" @click="saveChanges">
                        <i class="far fa-save me-2"></i>
                        Guardar Cambios
                    </button>
                </div>
            </div>

            <div class="card-body">
                <!-- Pestañas -->
                <ul class="nav nav-tabs border-0">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: activeTab === 'informacion' }"
                           @click.prevent="activeTab = 'informacion'" href="#">Información</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: activeTab === 'horarios' }"
                           @click.prevent="activeTab = 'horarios'" href="#">Horarios</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: activeTab === 'servicios' }"
                           @click.prevent="activeTab = 'servicios'" href="#">Servicios</a>
                    </li>
                </ul>

                <div class="row mt-4">
                    <!-- Panel izquierdo (fijo para todas las pestañas) -->
                    <div class="col-lg-4">
                        <div class="card p-4 mb-4">
                            <div class="d-flex align-items-center justify-content-center mb-3">
                                <div class="position-relative">
                                    <div
                                        class="rounded-circle bg-light d-flex align-items-center justify-content-center"
                                        style="width: 100px; height: 100px; overflow: hidden;">
                                        <img v-if="profileImage" :src="profileImage" class="img-fluid" alt="Perfil"/>
                                        <i v-else class="fas fa-user-md text-muted" style="font-size: 40px;"></i>
                                    </div>
                                    <button @click="triggerImageUpload" class="btn btn-primary btn-sm position-absolute"
                                            style="bottom: 0; right: 0; border-radius: 50%; width: 32px; height: 32px;">
                                        <i class="fas fa-pen" style="font-size: 12px;"></i>
                                    </button>
                                    <input type="file" ref="imageInput" @change="handleImageUpload" class="d-none"
                                           accept="image/*">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-6">
                                    <label class="form-label">Nombre</label>
                                    <input type="text" class="form-control" v-model="clinicData.nombre">
                                </div>
                                <div class="col-6">
                                    <label class="form-label">Apellido</label>
                                    <input type="text" class="form-control" v-model="clinicData.apellido">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Especialidad</label>
                                <div class="dropdown">
                                    <input
                                        type="text"
                                        class="form-control"
                                        readonly
                                        :value="clinicData.especialidad"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                    <i class="fas fa-angle-down position-absolute"
                                       style="right: 15px; top: 50%; transform: translateY(-50%);"></i>
                                    <ul class="dropdown-menu w-100">
                                        <li><a class="dropdown-item" @click="selectEspecialidad('Cardiólogo')">Cardiólogo</a>
                                        </li>
                                        <li><a class="dropdown-item" @click="selectEspecialidad('Dermatólogo')">Dermatólogo</a>
                                        </li>
                                        <li><a class="dropdown-item"
                                               @click="selectEspecialidad('Pediatra')">Pediatra</a></li>
                                        <li><a class="dropdown-item"
                                               @click="selectEspecialidad('Neurólogo')">Neurólogo</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Años de experiencia</label>
                                <input type="number" class="form-control" v-model="clinicData.experiencia">
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Nombre de la clínica</label>
                                <input type="text" class="form-control" v-model="clinicData.nombreClinica">
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Ubicación</label>
                                <input type="text" class="form-control" v-model="clinicData.ubicacion">
                            </div>
                        </div>

                        <!-- Opciones de visualización -->
                        <div class="card p-4">
                            <div class="d-flex align-items-center mb-3">
                                <i class="fas fa-eye text-primary me-2"></i>
                                <h6 class="mb-0 fw-bold text-primary">Opciones de visualización</h6>
                            </div>

                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p class="mb-0 fw-medium">Mostrar calificación</p>
                                        <p class="text-muted small mb-0">Muestra tu puntuación y número de opiniones</p>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" v-model="clinicData.showRating">
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p class="mb-0 fw-medium">Mostrar años de experiencia</p>
                                        <p class="text-muted small mb-0">Muestra tus años de experiencia profesional</p>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox"
                                               v-model="clinicData.showExperience">
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p class="mb-0 fw-medium">Mostrar visitas a domicilio</p>
                                        <p class="text-muted small mb-0">Indica si ofreces consultas a domicilio</p>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox"
                                               v-model="clinicData.showHomeCare">
                                    </div>
                                </div>
                            </div>

                            <div v-if="activeTab === 'servicios'" class="mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p class="mb-0 fw-medium">Mostrar ubicación de la clínica</p>
                                        <p class="text-muted small mb-0">Muestra el nombre y ubicación de tu clínica</p>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox"
                                               v-model="clinicData.showLocation">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Panel derecho (cambia según la pestaña activa) -->
                    <div class="col-lg-8">
                        <!-- Información -->
                        <div v-if="activeTab === 'informacion'" class="card p-4">
                            <InformacionTab :clinicData="clinicData" @update="updateClinicData"/>
                        </div>

                        <!-- Horarios -->
                        <div v-if="activeTab === 'horarios'" class="card p-4">
                            <HorariosTab :horarios="clinicData.horarios" @update="updateHorarios"/>
                        </div>

                        <!-- Servicios -->
                        <div v-if="activeTab === 'servicios'" class="card p-4">
                            <ServiciosTab :servicios="clinicData.servicios"
                                          :visitasDomicilio="clinicData.visitasDomicilio"
                                          @update="updateServicios" @update-visitas="updateVisitasDomicilio"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InformacionTab from './tabs/InformacionTab.vue';
import HorariosTab from './tabs/HorariosTab.vue';
import ServiciosTab from './tabs/ServiciosTab.vue';
import Swal from 'sweetalert2';

export default {
    name: 'EditClinicView',
    components: {
        InformacionTab,
        HorariosTab,
        ServiciosTab
    },
    data() {
        return {
            activeTab: 'informacion',
            profileImage: null,
            clinicData: {
                nombre: 'Juan',
                apellido: 'Pérez',
                especialidad: 'Cardiólogo',
                experiencia: 15,
                nombreClinica: 'Clínica Corazón Sano',
                ubicacion: 'San Salvador',
                biografia: 'El Dr. Juan Pérez es un cardiólogo con más de 15 años de experiencia en el diagnóstico y tratamiento de enfermedades cardiovasculares. Se especializa en cardiología intervencionista y prevención de enfermedades cardíacas.',
                formacion: [
                    {id: 1, titulo: 'Doctor en Medicina, Universidad de San Salvador'},
                    {id: 2, titulo: 'Especialidad en Cardiología, Hospital Nacional'},
                    {id: 3, titulo: 'Fellowship en Cardiología Intervencionista'}
                ],
                especialidades: [
                    {id: 1, nombre: 'Cardiología'},
                    {id: 2, nombre: 'Ecocardiografía'},
                    {id: 3, nombre: 'Cardiología preventiva'}
                ],
                contacto: {
                    telefono: '+503 7123-4567',
                    email: 'dr.juanperez@salusnexus.com'
                },
                horarios: {
                    lunes: {inicio: '08:00', fin: '17:00', abierto: true},
                    martes: {inicio: '08:00', fin: '17:00', abierto: true},
                    miercoles: {inicio: '08:00', fin: '17:00', abierto: true},
                    jueves: {inicio: '08:00', fin: '17:00', abierto: true},
                    viernes: {inicio: '08:00', fin: '15:00', abierto: true},
                    sabado: {inicio: '09:00', fin: '12:00', abierto: true},
                    domingo: {inicio: '09:00', fin: '12:00', abierto: false}
                },
                servicios: [
                    {
                        id: 1,
                        nombre: 'Consulta cardiológica',
                        descripcion: 'Evaluación completa del sistema cardiovascular y diagnóstico de enfermedades cardíacas.',
                        precio: 60
                    },
                    {
                        id: 2,
                        nombre: 'Electrocardiograma',
                        descripcion: 'Registro de la actividad eléctrica del corazón para detectar arritmias y otras anomalías.',
                        precio: 40
                    },
                    {
                        id: 3,
                        nombre: 'Ecocardiograma',
                        descripcion: 'Estudio por ultrasonido que permite visualizar la estructura y función del corazón.',
                        precio: 120
                    }
                ],
                visitasDomicilio: {
                    disponible: true,
                    precio: 100
                },
                showRating: true,
                showExperience: true,
                showHomeCare: true,
                showLocation: true
            }
        };
    },
    methods: {
        triggerImageUpload() {
            this.$refs.imageInput.click();
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.profileImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        selectEspecialidad(especialidad) {
            this.clinicData.especialidad = especialidad;
        },
        updateClinicData(data) {
            Object.assign(this.clinicData, data);
        },
        updateHorarios(horarios) {
            this.clinicData.horarios = horarios;
        },
        updateServicios(servicios) {
            this.clinicData.servicios = servicios;
        },
        updateVisitasDomicilio(visitasDomicilio) {
            this.clinicData.visitasDomicilio = visitasDomicilio;
        },
        saveChanges() {
            // Aquí iría la lógica para guardar los cambios
            Swal.fire({
                icon: 'success',
                title: 'Cambios guardados',
                text: 'La información de tu clínica ha sido actualizada correctamente.',
                confirmButtonColor: '#3085d6'
            });
        }
    }
};
</script>

<style scoped>
.nav-tabs .nav-link {
    color: #6c757d;
    border: none;
    padding-left: 0;
    padding-right: 2rem;
    padding-bottom: 1rem;
}

.nav-tabs .nav-link.active {
    color: #0d6efd;
    font-weight: 500;
    border-bottom: 2px solid #0d6efd;
    background-color: transparent;
}

.card {
    border-radius: 10px;
    border: none;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.btn-primary {
    background-color: #0d6efd;
    border-color: #0d6efd;
}

.text-primary {
    color: #0d6efd !important;
}

.form-control {
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
}

.dropdown .form-control {
    cursor: pointer;
    background-color: white;
}
</style>