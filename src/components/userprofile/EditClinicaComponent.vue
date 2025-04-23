<template>
    <div class="container-fluid mt-4 mb-5 edit-clinic-page">
        <div class="row">
            <!-- Columna Izquierda: Información Principal y Opciones de Visualización -->
            <div class="col-lg-4 mb-4">
                <div class="card shadow-sm left-column-card">
                    <div class="card-body">
                        <!-- Sección Información Principal -->
                        <h5 class="card-title section-header mb-4">
                            <i class="fas fa-user-circle icon-primary me-2"></i>Información Principal
                        </h5>

                        <!-- Foto de perfil -->
                        <div class="text-center mb-4 profile-picture-section">
                            <div class="profile-picture-wrapper">
                                <img
                                    :src="formData.profileImage || '/default-profile.png'"
                                    alt="Foto de perfil"
                                    class="profile-picture img-thumbnail"
                                    @error="setDefaultImage"
                                />
                                <button class="btn btn-icon btn-edit-picture" @click="triggerFileUpload">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*"
                                       style="display: none;">
                            </div>
                        </div>

                        <!-- Formulario Información Principal -->
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="firstName" class="form-label">Nombre</label>
                                <input type="text" id="firstName" class="form-control" v-model="formData.firstName"
                                       placeholder="Juan">
                            </div>
                            <div class="col-md-6">
                                <label for="lastName" class="form-label">Apellido</label>
                                <input type="text" id="lastName" class="form-control" v-model="formData.lastName"
                                       placeholder="Pérez">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="specialty" class="form-label">Especialidad</label>
                            <select id="specialty" class="form-select" v-model="formData.specialty">
                                <option disabled value="">Selecciona una especialidad</option>
                                <option v-for="spec in specialtyOptions" :key="spec" :value="spec">{{ spec }}</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="experience" class="form-label">Años de experiencia</label>
                            <input type="number" id="experience" class="form-control"
                                   v-model.number="formData.experienceYears" placeholder="15">
                        </div>

                        <div class="mb-3">
                            <label for="clinicName" class="form-label">Nombre de la clínica</label>
                            <input type="text" id="clinicName" class="form-control" v-model="formData.clinicName"
                                   placeholder="Clínica Corazón Sano">
                        </div>

                        <div class="mb-3">
                            <label for="location" class="form-label">Ubicación</label>
                            <input type="text" id="location" class="form-control" v-model="formData.location"
                                   placeholder="San Salvador">
                        </div>
                    </div>
                </div>

                <!-- Sección Opciones de Visualización -->
                <div class="card shadow-sm mt-4 left-column-card">
                    <div class="card-body">
                        <h5 class="card-title section-header mb-4">
                            <i class="fas fa-eye icon-primary me-2"></i>Opciones de visualización
                        </h5>

                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" role="switch" id="showRating"
                                   v-model="viewOptions.showRating">
                            <label class="form-check-label" for="showRating">
                                Mostrar calificación
                                <small class="d-block text-muted">Muestra tu puntuación y número de opiniones</small>
                            </label>
                        </div>

                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" role="switch" id="showExperience"
                                   v-model="viewOptions.showExperience">
                            <label class="form-check-label" for="showExperience">
                                Mostrar años de experiencia
                                <small class="d-block text-muted">Muestra tus años de experiencia profesional</small>
                            </label>
                        </div>

                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" role="switch" id="showHomeVisits"
                                   v-model="viewOptions.showHomeVisits">
                            <label class="form-check-label" for="showHomeVisits">
                                Mostrar visitas a domicilio
                                <small class="d-block text-muted">Indica si ofreces consultas a domicilio</small>
                            </label>
                        </div>

                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" role="switch" id="showClinicLocation"
                                   v-model="viewOptions.showClinicLocation">
                            <label class="form-check-label" for="showClinicLocation">
                                Mostrar ubicación de la clínica
                                <small class="d-block text-muted">Muestra el nombre y ubicación de tu clínica</small>
                            </label>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Columna Derecha: Pestañas -->
            <div class="col-lg-8">
                <div class="card shadow-sm right-column-card">
                    <div class="card-header tab-header p-0">
                        <!-- Pestañas de navegación -->
                        <ul class="nav nav-tabs nav-fill" id="clinicTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button
                                    class="nav-link"
                                    :class="{ active: activeTab === 'info' }"
                                    id="info-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#info-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="info-tab-pane"
                                    :aria-selected="activeTab === 'info'"
                                    @click="activeTab = 'info'"
                                >
                                    Información
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button
                                    class="nav-link"
                                    :class="{ active: activeTab === 'schedule' }"
                                    id="schedule-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#schedule-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="schedule-tab-pane"
                                    :aria-selected="activeTab === 'schedule'"
                                    @click="activeTab = 'schedule'"
                                >
                                    Horarios
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button
                                    class="nav-link"
                                    :class="{ active: activeTab === 'services' }"
                                    id="services-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#services-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="services-tab-pane"
                                    :aria-selected="activeTab === 'services'"
                                    @click="activeTab = 'services'"
                                >
                                    Servicios
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <!-- Contenido de las pestañas -->
                        <div class="tab-content" id="clinicTabContent">

                            <!-- Pestaña Información -->
                            <div class="tab-pane fade" :class="{ 'show active': activeTab === 'info' }"
                                 id="info-tab-pane" role="tabpanel" aria-labelledby="info-tab" tabindex="0">
                                <div class="section-container p-3 rounded mb-4">
                                    <h6 class="section-subtitle mb-3">
                                        <i class="fas fa-user-md icon-secondary me-2"></i>Sobre el profesional
                                    </h6>
                                    <label for="professionalBio" class="form-label visually-hidden">Biografía
                                        profesional</label>
                                    <textarea
                                        id="professionalBio"
                                        class="form-control"
                                        rows="5"
                                        v-model="formData.professionalDescription"
                                        placeholder="Escribe aquí sobre tu experiencia, enfoque médico, etc."
                                    ></textarea>
                                </div>

                                <div class="section-container p-3 rounded mb-4">
                                    <h6 class="section-subtitle mb-3">
                                        <i class="fas fa-graduation-cap icon-secondary me-2"></i>Formación académica
                                    </h6>
                                    <div v-for="(edu, index) in formData.education" :key="index"
                                         class="d-flex align-items-center mb-2 dynamic-item-row">
                                        <input
                                            type="text"
                                            class="form-control me-2"
                                            v-model="edu.title"
                                            placeholder="Ej: Doctor en Medicina, Universidad..."
                                            :aria-label="`Formación académica ${index + 1}`"
                                        >
                                        <button
                                            class="btn btn-sm btn-outline-danger flex-shrink-0"
                                            @click="removeEducation(index)"
                                            :aria-label="`Eliminar formación ${index + 1}`"
                                        >
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                    <button class="btn btn-sm btn-outline-primary mt-2" @click="addEducation">
                                        <i class="fas fa-plus me-1"></i> Agregar formación
                                    </button>
                                </div>

                                <div class="section-container p-3 rounded mb-4">
                                    <h6 class="section-subtitle mb-3">
                                        <i class="fas fa-tags icon-secondary me-2"></i>Especialidades
                                    </h6>
                                    <div class="d-flex flex-wrap gap-2 mb-3">
                      <span v-for="(spec, index) in formData.specialities" :key="index"
                            class="badge bg-primary-soft text-primary specialty-tag">
                        {{ spec }}
                        <button class="btn-close btn-close-sm ms-1" @click="removeSpeciality(index)"
                                :aria-label="`Eliminar especialidad ${spec}`"></button>
                      </span>
                                    </div>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="newSpeciality"
                                            placeholder="Nueva especialidad"
                                            @keyup.enter="addSpeciality"
                                            aria-label="Nueva especialidad"
                                        >
                                        <button class="btn btn-outline-primary" type="button" @click="addSpeciality">
                                            <i class="fas fa-plus me-1"></i> Agregar
                                        </button>
                                    </div>
                                </div>

                                <div class="section-container p-3 rounded">
                                    <h6 class="section-subtitle mb-3">
                                        <i class="fas fa-address-book icon-secondary me-2"></i>Información de contacto
                                    </h6>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="phone" class="form-label">Teléfono</label>
                                            <input type="tel" id="phone" class="form-control" v-model="formData.phone"
                                                   placeholder="+503 7123-4567">
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="email" class="form-label">Correo electrónico</label>
                                            <input type="email" id="email" class="form-control" v-model="formData.email"
                                                   placeholder="dr.juanperez@salusnexus.com">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pestaña Horarios -->
                            <div class="tab-pane fade" :class="{ 'show active': activeTab === 'schedule' }"
                                 id="schedule-tab-pane" role="tabpanel" aria-labelledby="schedule-tab" tabindex="0">
                                <div class="section-container p-3 rounded">
                                    <h6 class="section-subtitle mb-3">
                                        <i class="fas fa-clock icon-secondary me-2"></i>Horarios de atención
                                    </h6>
                                    <div
                                        v-for="(day, index) in formData.schedule"
                                        :key="index"
                                        class="row gx-2 gy-2 align-items-center mb-3 pb-3 border-bottom schedule-row"
                                    >
                                        <div class="col-12 col-sm-2 fw-bold day-label">{{ day.name }}</div>
                                        <div class="col-6 col-sm-3">
                                            <label :for="`startTime-${index}`" class="visually-hidden">Hora inicio
                                                {{ day.name }}</label>
                                            <input type="time" :id="`startTime-${index}`"
                                                   class="form-control form-control-sm time-input"
                                                   v-model="day.startTime" :disabled="!day.isOpen">
                                        </div>
                                        <div class="col-auto time-separator">a</div>
                                        <div class="col-6 col-sm-3">
                                            <label :for="`endTime-${index}`" class="visually-hidden">Hora fin
                                                {{ day.name }}</label>
                                            <input type="time" :id="`endTime-${index}`"
                                                   class="form-control form-control-sm time-input" v-model="day.endTime"
                                                   :disabled="!day.isOpen">
                                        </div>
                                        <div class="col-12 col-sm-auto ms-sm-auto mt-2 mt-sm-0">
                                            <div class="form-check form-switch d-flex justify-content-end">
                                                <input class="form-check-input" type="checkbox" role="switch"
                                                       :id="`isOpen-${index}`" v-model="day.isOpen">
                                                <label class="form-check-label ms-2" :for="`isOpen-${index}`">{{
                                                        day.isOpen ? 'Abierto' : 'Cerrado'
                                                    }}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pestaña Servicios -->
                            <div class="tab-pane fade" :class="{ 'show active': activeTab === 'services' }"
                                 id="services-tab-pane" role="tabpanel" aria-labelledby="services-tab" tabindex="0">
                                <h6 class="section-subtitle mb-3">
                                    <i class="fas fa-heartbeat icon-secondary me-2"></i>Servicios ofrecidos
                                </h6>

                                <!-- Lista de servicios -->
                                <div v-for="(service, index) in formData.services" :key="service.id || index"
                                     class="card mb-3 service-card-item">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label :for="`serviceName-${index}`" class="form-label">Nombre del
                                                    servicio</label>
                                                <input type="text" :id="`serviceName-${index}`" class="form-control"
                                                       v-model="service.name" placeholder="Ej: Consulta cardiológica">
                                            </div>
                                            <div class="col-md-4 mb-3">
                                                <label :for="`servicePrice-${index}`" class="form-label">Precio
                                                    ($)</label>
                                                <input type="number" :id="`servicePrice-${index}`" class="form-control"
                                                       v-model.number="service.price" placeholder="60">
                                            </div>
                                            <div class="col-md-2 d-flex align-items-end justify-content-end mb-3">
                                                <button class="btn btn-sm btn-outline-danger"
                                                        @click="removeService(index)"
                                                        :aria-label="`Eliminar servicio ${service.name}`">
                                                    <i class="fas fa-trash-alt me-1 d-none d-md-inline"></i> Eliminar
                                                </button>
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <label :for="`serviceDesc-${index}`" class="form-label">Descripción</label>
                                            <textarea :id="`serviceDesc-${index}`" class="form-control" rows="2"
                                                      v-model="service.description"
                                                      placeholder="Descripción breve del servicio..."></textarea>
                                        </div>
                                    </div>
                                </div>

                                <button class="btn btn-outline-primary mt-2 mb-4" @click="addService">
                                    <i class="fas fa-plus me-1"></i> Agregar servicio
                                </button>

                                <!-- Sección Visitas a domicilio -->
                                <div class="section-container p-3 rounded home-visits-section"
                                     :class="{ 'disabled': !formData.homeVisitsEnabled }">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h6 class="section-subtitle mb-0">
                                            <i class="fas fa-home icon-success me-2"></i>Visitas a domicilio
                                        </h6>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch"
                                                   id="enableHomeVisits" v-model="formData.homeVisitsEnabled">
                                            <label class="form-check-label" for="enableHomeVisits">{{
                                                    formData.homeVisitsEnabled ? 'Activado' : 'Desactivado'
                                                }}</label>
                                        </div>
                                    </div>
                                    <p class="text-muted small mb-3">Configura si ofreces consultas a domicilio y su
                                        precio.</p>

                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="homeVisitPrice" class="form-label">Precio de visita a domicilio
                                                ($)</label>
                                            <input type="number" id="homeVisitPrice" class="form-control"
                                                   v-model.number="formData.homeVisitPrice" placeholder="100"
                                                   :disabled="!formData.homeVisitsEnabled">
                                        </div>
                                        <div class="col-md-12">
                                            <label for="homeVisitInfo" class="form-label">Información adicional
                                                (Opcional)</label>
                                            <input type="text" id="homeVisitInfo" class="form-control"
                                                   v-model="formData.homeVisitInfo"
                                                   placeholder="Ej: Este precio debe incluir el costo de transporte y la consulta"
                                                   :disabled="!formData.homeVisitsEnabled">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Botón Guardar Cambios Fijo -->
                <div class="save-button-container text-end mt-4">
                    <button class="btn btn-primary btn-lg save-button" @click="saveChanges">
                        <i class="fas fa-save me-2"></i>Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditClinicaComponent',
    data() {
        return {
            activeTab: 'info',
            specialtyOptions: [
                'Cardiología', 'Dermatología', 'Pediatría', 'Ginecología',
                'Medicina General', 'Oftalmología', 'Psicología', 'Nutrición'
                // Agrega más especialidades según sea necesario
            ],
            newSpeciality: '',
            // Opciones de visualización (izquierda)
            viewOptions: {
                showRating: true,
                showExperience: false,
                showHomeVisits: true,
                showClinicLocation: true,
            },
            // Datos del formulario principal
            formData: {
                profileImage: null, // Cambiado a null, usar '/default-profile.png' en template si es null
                firstName: 'Juan',
                lastName: 'Pérez',
                specialty: 'Cardiología',
                experienceYears: 15,
                clinicName: 'Clínica Corazón Sano',
                location: 'San Salvador',
                // Pestaña Información
                professionalDescription: 'El Dr. Juan Pérez es un cardiólogo con más de 15 años de experiencia en el diagnóstico y tratamiento de enfermedades cardiovasculares. Se especializa en cardiología intervencionista y prevención de enfermedades cardíacas.',
                education: [
                    {title: 'Doctor en Medicina, Universidad de San Salvador'},
                    {title: 'Especialidad en Cardiología, Hospital Nacional'},
                    {title: 'Fellowship en Cardiología Intervencionista'}
                ],
                specialities: [
                    'Cardiología', 'Ecocardiografía', 'Cardiología preventiva'
                ],
                phone: '+503 7123-4567',
                email: 'dr.juanperez@salusnexus.com',
                // Pestaña Horarios
                schedule: [
                    {name: 'Lunes', isOpen: true, startTime: '08:00', endTime: '17:00'},
                    {name: 'Martes', isOpen: true, startTime: '08:00', endTime: '17:00'},
                    {name: 'Miércoles', isOpen: true, startTime: '08:00', endTime: '17:00'},
                    {name: 'Jueves', isOpen: true, startTime: '08:00', endTime: '17:00'},
                    {name: 'Viernes', isOpen: true, startTime: '08:00', endTime: '15:00'},
                    {name: 'Sábado', isOpen: true, startTime: '09:00', endTime: '12:00'},
                    {name: 'Domingo', isOpen: false, startTime: '09:00', endTime: '12:00'} // Se mantiene hora aunque esté cerrado
                ],
                // Pestaña Servicios
                services: [
                    {
                        id: 1, // Podrías usar IDs si vienen del backend
                        name: 'Consulta cardiológica',
                        description: 'Evaluación completa del sistema cardiovascular y diagnóstico de enfermedades cardíacas.',
                        price: 60
                    },
                    {
                        id: 2,
                        name: 'Electrocardiograma',
                        description: 'Registro de la actividad eléctrica del corazón para detectar arritmias y otras anomalías.',
                        price: 40
                    },
                    {
                        id: 3,
                        name: 'Ecocardiograma',
                        description: 'Estudio por ultrasonido que permite visualizar la estructura y función del corazón.',
                        price: 120
                    }
                ],
                homeVisitsEnabled: true, // Toggle principal de visitas a domicilio
                homeVisitPrice: 100,
                homeVisitInfo: 'Este precio debe incluir el costo de transporte y la consulta.'
            }
        }
    },
    methods: {
        // --- Foto de Perfil ---
        triggerFileUpload() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.formData.profileImage = e.target.result;
                }
                reader.readAsDataURL(file);
                // Aquí podrías también iniciar la subida al servidor si es necesario
            }
        },
        setDefaultImage(event) {
            event.target.src = '/default-profile.png'; // Asegúrate que esta ruta sea correcta
        },
        // --- Información ---
        addEducation() {
            this.formData.education.push({title: ''});
        },
        removeEducation(index) {
            this.formData.education.splice(index, 1);
        },
        addSpeciality() {
            const newSpec = this.newSpeciality.trim();
            if (newSpec && !this.formData.specialities.includes(newSpec)) {
                this.formData.specialities.push(newSpec);
                this.newSpeciality = '';
            }
        },
        removeSpeciality(index) {
            this.formData.specialities.splice(index, 1);
        },
        // --- Servicios ---
        addService() {
            this.formData.services.push({
                id: Date.now(), // ID temporal para el key
                name: '',
                description: '',
                price: null
            });
        },
        removeService(index) {
            this.formData.services.splice(index, 1);
        },
        // --- Acciones ---
        saveChanges() {
            console.log('Guardando Cambios:', JSON.parse(JSON.stringify(this.formData)));
            console.log('Opciones Visualización:', JSON.parse(JSON.stringify(this.viewOptions)));
            // Aquí iría la lógica para enviar los datos al backend (API call)
            // Por ahora, solo mostramos en consola y podríamos navegar
            alert('Cambios guardados (simulado)');
            // Opcional: navegar a la vista previa
            // this.$router.push('/preview-clinic');
        }
        // No necesitamos previewProfile o cancelEdit si el Header tiene su propia lógica
    }
}
</script>

<style scoped>
/* Variables de color y estilo basadas en las imágenes */
:root {
    --bs-primary: #0d6efd; /* Azul primario de Bootstrap */
    --bs-secondary: #6c757d; /* Gris secundario */
    --bs-success: #198754; /* Verde */
    --bs-danger: #dc3545; /* Rojo */
    --bs-light: #f8f9fa; /* Gris claro */
    --bs-white: #fff;
    --bs-blue-100: #cfe2ff; /* Azul muy claro para fondos */
    --bs-gray-100: #f8f9fa;
    --bs-gray-200: #e9ecef;
    --bs-gray-300: #dee2e6;
    --bs-gray-600: #6c757d;
    --bs-gray-700: #495057;
    --card-border-color: #dee2e6;
    --card-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    --input-border-color: #ced4da;
    --input-focus-border-color: #86b7fe;
    --input-focus-box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.edit-clinic-page {
    background-color: var(--bs-light);
    padding-top: 1rem;
    padding-bottom: 5rem; /* Espacio para botón fijo */
}

/* Estilo General de Tarjetas */
.card {
    border: 1px solid var(--card-border-color);
    box-shadow: var(--card-box-shadow);
    border-radius: 0.5rem;
    height: 100%; /* Asegurar que las tarjetas en columnas tengan altura */
}

.left-column-card, .right-column-card {
    min-height: 300px; /* Altura mínima para evitar colapso */
}

/* Encabezado de secciones */
.section-header {
    color: var(--bs-primary);
    font-weight: 500;
    display: flex;
    align-items: center;
}

.icon-primary {
    color: var(--bs-primary);
}

.icon-secondary {
    color: var(--bs-secondary);
}

.icon-success {
    color: var(--bs-success);
}

/* Foto de perfil */
.profile-picture-section {
    position: relative;
}

.profile-picture-wrapper {
    position: relative;
    display: inline-block;
    width: 120px; /* Ajusta el tamaño */
    height: 120px;
}

.profile-picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%; /* Círculo */
    border: 3px solid var(--bs-white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-edit-picture {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--bs-primary);
    color: var(--bs-white);
    border: 2px solid var(--bs-white);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 0.8rem;
    line-height: 1;
}

.btn-edit-picture:hover {
    background-color: #0b5ed7; /* Azul más oscuro */
}

/* Inputs y Labels */
.form-label {
    font-size: 0.875rem;
    color: var(--bs-gray-700);
    margin-bottom: 0.3rem;
}

.form-control,
.form-select {
    font-size: 0.95rem;
    border-color: var(--bs-gray-300);
}

.form-control:focus,
.form-select:focus {
    border-color: var(--input-focus-border-color);
    box-shadow: var(--input-focus-box-shadow);
}

/* Switches */
.form-switch .form-check-label {
    font-size: 0.95rem;
    padding-left: 0.5rem;
}

.form-switch .form-check-input {
    width: 3em;
    height: 1.5em;
    cursor: pointer;
}

/* Contenedor de secciones en tabs */
.section-container {
    background-color: var(--bs-gray-100);
    border: 1px solid var(--bs-gray-200);
    margin-bottom: 1.5rem;
}

.section-subtitle {
    font-weight: 500;
    color: var(--bs-gray-700);
    display: flex;
    align-items: center;
}

/* Items dinámicos (Educación, Servicios) */
.dynamic-item-row {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px dashed var(--bs-gray-300);
}

.dynamic-item-row:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

/* Etiquetas de especialidades */
.specialty-tag {
    padding: 0.4em 0.8em;
    font-size: 0.85rem;
    display: inline-flex;
    align-items: center;
    background-color: var(--bs-blue-100);
}

.specialty-tag .btn-close {
    margin-left: 0.5rem;
    filter: invert(1) grayscale(100%) brightness(200%); /* Hacer X blanca */
    opacity: 0.7;
}

.specialty-tag .btn-close:hover {
    opacity: 1;
}

/* Pestañas */
.tab-header {
    background-color: var(--bs-white);
    border-bottom: 1px solid var(--card-border-color);
}

.nav-tabs {
    border-bottom: none; /* Quitar doble borde */
}

.nav-tabs .nav-link {
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--bs-secondary);
    padding: 0.8rem 1rem;
    margin-bottom: 0; /* Ajuste para que el borde esté pegado */
    font-weight: 500;
    transition: border-color 0.3s ease, color 0.3s ease;
}

.nav-tabs .nav-link:hover {
    border-color: var(--bs-gray-300);
    color: var(--bs-gray-700);
}

.nav-tabs .nav-link.active {
    color: var(--bs-primary);
    border-color: var(--bs-primary);
    background-color: transparent;
}

/* Horarios */
.schedule-row {
    border-bottom: 1px solid var(--bs-gray-200);
}

.schedule-row:last-child {
    border-bottom: none;
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
}

.time-input {
    max-width: 120px;
}

.time-separator {
    color: var(--bs-gray-600);
    align-self: center;
    padding: 0 0.5rem;
}

/* Servicios */
.service-card-item {
    border-left: 3px solid var(--bs-primary);
    background-color: var(--bs-light);
}

/* Visitas a domicilio */
.home-visits-section {
    background-color: rgba(25, 135, 84, 0.05); /* Verde muy claro */
    border: 1px solid rgba(25, 135, 84, 0.2);
    border-left: 3px solid var(--bs-success);
}

.home-visits-section.disabled {
    opacity: 0.7;
    background-color: var(--bs-gray-200);
    border-left-color: var(--bs-secondary);
}

.home-visits-section.disabled .icon-success {
    color: var(--bs-secondary);
}

/* Botón Guardar Cambios */
/* Si se quiere fijo abajo:
.save-button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-top: 1px solid var(--card-border-color);
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
  z-index: 100;
}
.edit-clinic-page {
  padding-bottom: 80px; /* Espacio para el botón fijo */
/*}*/

.save-button {
    min-width: 180px;
}


/* --- Responsividad --- */

/* Pantallas pequeñas (móviles) */
@media (max-width: 575.98px) {
    .profile-basic-info {
        flex-direction: column;
        align-items: center;
    }

    .profile-image-container {
        margin-right: 0;
        margin-bottom: 1rem;
    }

    .day-label {
        text-align: left;
        margin-bottom: 0.5rem;
    }

    .time-separator {
        display: none; /* Ocultar 'a' */
    }

    .schedule-row .col-6 {
        width: 50%;
    }

    .save-button-container {
        text-align: center !important;
    }
}

/* Pantallas medianas (tablets) */
@media (max-width: 991.98px) {
    .left-column-card, .right-column-card {
        min-height: auto; /* Reset min-height */
    }

    .save-button-container {
        /* Podría necesitar ajustes si es fijo */
    }
}

</style>