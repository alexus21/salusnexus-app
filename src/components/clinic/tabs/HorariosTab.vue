<template>
    <div>
      <div class="d-flex align-items-center mb-4">
        <i class="far fa-clock text-primary me-2"></i>
        <h6 class="mb-0 fw-bold text-primary">Horarios de atención</h6>
      </div>
      
      <!-- Lunes -->
      <div class="mb-4">
        <div class="row align-items-center">
          <div class="col-md-2 mb-2 mb-md-0">
            <span class="fw-medium">Lunes</span>
          </div>
          <div class="col-md-8 mb-2 mb-md-0">
            <div class="d-flex align-items-center">
              <div class="input-group me-2">
                <input type="time" class="form-control" v-model="localHorarios.lunes.inicio">
                <span class="input-group-text bg-light border-0">a</span>
                <input type="time" class="form-control" v-model="localHorarios.lunes.fin">
              </div>
            </div>
          </div>
          <div class="col-md-2 text-md-end">
            <div class="form-check form-switch d-flex justify-content-end">
              <span class="me-2">Abierto</span>
              <input class="form-check-input" type="checkbox" v-model="localHorarios.lunes.abierto">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Martes -->
      <div class="mb-4">
        <div class="row align-items-center">
          <div class="col-md-2 mb-2 mb-md-0">
            <span class="fw-medium">Martes</span>
          </div>
          <div class="col-md-8 mb-2 mb-md-0">
            <div class="d-flex align-items-center">
              <div class="input-group me-2">
                <input type="time" class="form-control" v-model="localHorarios.martes.inicio">
                <span class="input-group-text bg-light border-0">a</span>
                <input type="time" class="form-control" v-model="localHorarios.martes.fin">
              </div>
            </div>
          </div>
          <div class="col-md-2 text-md-end">
            <div class="form-check form-switch d-flex justify-content-end">
              <span class="me-2">Abierto</span>
              <input class="form-check-input" type="checkbox" v-model="localHorarios.martes.abierto">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Miércoles -->
      <div class="mb-4">
        <div class="row align-items-center">
          <div class="col-md-2 mb-2 mb-md-0">
            <span class="fw-medium">Miércoles</span>
          </div>
          <div class="col-md-8 mb-2 mb-md-0">
            <div class="d-flex align-items-center">
              <div class="input-group me-2">
                <input type="time" class="form-control" v-model="localHorarios.miercoles.inicio">
                <span class="input-group-text bg-light border-0">a</span>
                <input type="time" class="form-control" v-model="localHorarios.miercoles.fin">
              </div>
            </div>
          </div>
          <div class="col-md-2 text-md-end">
            <div class="form-check form-switch d-flex justify-content-end">
              <span class="me-2">Abierto</span>
              <input class="form-check-input" type="checkbox" v-model="localHorarios.miercoles.abierto">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Jueves -->
      <div class="mb-4">
        <div class="row align-items-center">
          <div class="col-md-2 mb-2 mb-md-0">
            <span class="fw-medium">Jueves</span>
          </div>
          <div class="col-md-8 mb-2 mb-md-0">
            <div class="d-flex align-items-center">
              <div class="input-group me-2">
                <input type="time" class="form-control" v-model="localHorarios.jueves.inicio">
                <span class="input-group-text bg-light border-0">a</span>
                <input type="time" class="form-control" v-model="localHorarios.jueves.fin">
              </div>
            </div>
          </div>
          <div class="col-md-2 text-md-end">
            <div class="form-check form-switch d-flex justify-content-end">
              <span class="me-2">Abierto</span>
              <input class="form-check-input" type="checkbox" v-model="localHorarios.jueves.abierto">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Viernes -->
      <div class="mb-4">
        <div class="row align-items-center">
          <div class="col-md-2 mb-2 mb-md-0">
            <span class="fw-medium">Viernes</span>
          </div>
          <div class="col-md-8 mb-2 mb-md-0">
            <div class="d-flex align-items-center">
              <div class="input-group me-2">
                <input type="time" class="form-control" v-model="localHorarios.viernes.inicio">
                <span class="input-group-text bg-light border-0">a</span>
                <input type="time" class="form-control" v-model="localHorarios.viernes.fin">
              </div>
            </div>
          </div>
          <div class="col-md-2 text-md-end">
            <div class="form-check form-switch d-flex justify-content-end">
              <span class="me-2">Abierto</span>
              <input class="form-check-input" type="checkbox" v-model="localHorarios.viernes.abierto">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sábado -->
      <div class="mb-4">
        <div class="row align-items-center">
          <div class="col-md-2 mb-2 mb-md-0">
            <span class="fw-medium">Sábado</span>
          </div>
          <div class="col-md-8 mb-2 mb-md-0">
            <div class="d-flex align-items-center">
              <div class="input-group me-2">
                <input type="time" class="form-control" v-model="localHorarios.sabado.inicio">
                <span class="input-group-text bg-light border-0">a</span>
                <input type="time" class="form-control" v-model="localHorarios.sabado.fin">
              </div>
            </div>
          </div>
          <div class="col-md-2 text-md-end">
            <div class="form-check form-switch d-flex justify-content-end">
              <span class="me-2">Abierto</span>
              <input class="form-check-input" type="checkbox" v-model="localHorarios.sabado.abierto">
            </div>
          </div>
        </div>
      </div>
      
      <!-- Domingo -->
      <div class="mb-4">
        <div class="row align-items-center">
          <div class="col-md-2 mb-2 mb-md-0">
            <span class="fw-medium">Domingo</span>
          </div>
          <div class="col-md-8 mb-2 mb-md-0">
            <div class="d-flex align-items-center">
              <div class="input-group me-2">
                <input type="time" class="form-control" v-model="localHorarios.domingo.inicio">
                <span class="input-group-text bg-light border-0">a</span>
                <input type="time" class="form-control" v-model="localHorarios.domingo.fin">
              </div>
            </div>
          </div>
          <div class="col-md-2 text-md-end">
            <div class="form-check form-switch d-flex justify-content-end">
              <span class="me-2">Abierto</span>
              <input class="form-check-input" type="checkbox" v-model="localHorarios.domingo.abierto">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HorariosTab',
    props: {
      horarios: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localHorarios: {
          lunes: { ...this.horarios.lunes },
          martes: { ...this.horarios.martes },
          miercoles: { ...this.horarios.miercoles },
          jueves: { ...this.horarios.jueves },
          viernes: { ...this.horarios.viernes },
          sabado: { ...this.horarios.sabado },
          domingo: { ...this.horarios.domingo }
        }
      };
    },
    watch: {
      localHorarios: {
        deep: true,
        handler(newVal) {
          this.$emit('update', newVal);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .input-group-text {
    color: #6c757d;
  }
  
  .form-check-input:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
  }
  </style>