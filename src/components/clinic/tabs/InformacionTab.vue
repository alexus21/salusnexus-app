<template>
    <div>
      <div class="d-flex align-items-center mb-4">
        <i class="fas fa-user-md text-primary me-2"></i>
        <h6 class="mb-0 fw-bold text-primary">Sobre el profesional</h6>
      </div>
      
      <div class="mb-4">
        <label class="form-label">Biografía profesional</label>
        <textarea class="form-control" rows="4" v-model="localData.biografia"></textarea>
      </div>
      
      <div class="mb-4">
        <label class="form-label">Formación académica</label>
        
        <div v-for="(item, index) in localData.formacion" :key="item.id" class="mb-2">
          <div class="input-group">
            <input type="text" class="form-control" v-model="item.titulo">
            <button class="btn btn-outline-danger" type="button" @click="removeFormacion(index)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        
        <button class="btn btn-outline-primary btn-sm d-flex align-items-center mt-2" @click="addFormacion">
          <i class="fas fa-plus me-2"></i>
          Agregar formación
        </button>
      </div>
      
      <div class="mb-4">
        <label class="form-label">Especialidades</label>
        
        <div class="d-flex flex-wrap gap-2 mb-3">
          <div v-for="esp in localData.especialidades" :key="esp.id" 
               class="badge bg-light text-dark py-2 px-3 d-flex align-items-center">
            <span>{{ esp.nombre }}</span>
            <button class="btn btn-sm text-danger ms-2 p-0" @click="removeEspecialidad(esp.id)">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Nueva especialidad" v-model="newEspecialidad">
          <button class="btn btn-primary" type="button" @click="addEspecialidad">
            Agregar
          </button>
        </div>
      </div>
      
      <div>
        <div class="d-flex align-items-center mb-4">
          <i class="fas fa-address-card text-primary me-2"></i>
          <h6 class="mb-0 fw-bold text-primary">Información de contacto</h6>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input type="text" class="form-control" v-model="localData.contacto.telefono">
        </div>
        
        <div class="mb-3">
          <label class="form-label">Correo electrónico</label>
          <input type="email" class="form-control" v-model="localData.contacto.email">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InformacionTab',
    props: {
      clinicData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localData: {
          biografia: this.clinicData.biografia,
          formacion: [...this.clinicData.formacion],
          especialidades: [...this.clinicData.especialidades],
          contacto: {
            telefono: this.clinicData.contacto.telefono,
            email: this.clinicData.contacto.email
          }
        },
        newEspecialidad: ''
      };
    },
    watch: {
      localData: {
        deep: true,
        handler(newVal) {
          this.$emit('update', {
            biografia: newVal.biografia,
            formacion: newVal.formacion,
            especialidades: newVal.especialidades,
            contacto: newVal.contacto
          });
        }
      }
    },
    methods: {
      addFormacion() {
        const newId = this.localData.formacion.length > 0 
          ? Math.max(...this.localData.formacion.map(f => f.id)) + 1 
          : 1;
        
        this.localData.formacion.push({
          id: newId,
          titulo: ''
        });
      },
      removeFormacion(index) {
        this.localData.formacion.splice(index, 1);
      },
      addEspecialidad() {
        if (!this.newEspecialidad) return;
        
        const newId = this.localData.especialidades.length > 0 
          ? Math.max(...this.localData.especialidades.map(e => e.id)) + 1 
          : 1;
        
        this.localData.especialidades.push({
          id: newId,
          nombre: this.newEspecialidad
        });
        
        this.newEspecialidad = '';
      },
      removeEspecialidad(id) {
        const index = this.localData.especialidades.findIndex(e => e.id === id);
        if (index !== -1) {
          this.localData.especialidades.splice(index, 1);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .badge {
    border-radius: 50px;
    font-weight: 400;
    font-size: 0.85rem;
  }
  </style>