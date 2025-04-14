<template>
    <div>
      <div class="d-flex align-items-center mb-4">
        <i class="fas fa-clipboard-list text-primary me-2"></i>
        <h6 class="mb-0 fw-bold text-primary">Servicios ofrecidos</h6>
      </div>
      
      <div v-for="(servicio, index) in localServicios" :key="servicio.id" class="mb-4 pb-4 border-bottom">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <label class="form-label">Nombre del servicio</label>
            <button 
              v-if="localServicios.length > 1" 
              class="btn btn-sm text-danger" 
              @click="removeServicio(index)"
            >
              <i class="fas fa-trash me-1"></i> Eliminar
            </button>
          </div>
          <input type="text" class="form-control" v-model="servicio.nombre">
        </div>
        
        <div class="mb-3">
          <label class="form-label">Descripción</label>
          <textarea class="form-control" rows="3" v-model="servicio.descripcion"></textarea>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Precio ($)</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input type="number" class="form-control" v-model.number="servicio.precio">
          </div>
        </div>
      </div>
      
      <button class="btn btn-outline-primary d-flex align-items-center mb-4" @click="addServicio">
        <i class="fas fa-plus me-2"></i>
        Agregar servicio
      </button>
      
      <div class="bg-light p-4 rounded-3 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 class="mb-0">Visitas a domicilio</h6>
            <p class="text-muted mb-0 small">Configura si ofreces consultas a domicilio y su precio</p>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" v-model="localVisitasDomicilio.disponible">
          </div>
        </div>
        
        <div v-if="localVisitasDomicilio.disponible" class="mt-3">
          <label class="form-label">Precio de visita a domicilio ($)</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input type="number" class="form-control" v-model.number="localVisitasDomicilio.precio">
          </div>
          <p class="text-muted small mt-2">Este precio debe incluir el costo de transporte y la consulta</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ServiciosTab',
    props: {
      servicios: {
        type: Array,
        required: true
      },
      visitasDomicilio: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localServicios: JSON.parse(JSON.stringify(this.servicios)),
        localVisitasDomicilio: { ...this.visitasDomicilio }
      };
    },
    watch: {
      localServicios: {
        deep: true,
        handler(newVal) {
          this.$emit('update', newVal);
        }
      },
      localVisitasDomicilio: {
        deep: true,
        handler(newVal) {
          this.$emit('update-visitas', newVal);
        }
      }
    },
    methods: {
      addServicio() {
        const newId = this.localServicios.length > 0 
          ? Math.max(...this.localServicios.map(s => s.id)) + 1 
          : 1;
        
        this.localServicios.push({
          id: newId,
          nombre: '',
          descripcion: '',
          precio: 0
        });
      },
      removeServicio(index) {
        this.localServicios.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .border-bottom {
    border-color: #e9ecef !important;
  }
  
  .form-check-input:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
  }
  </style>