<template>
    <transition name="fade">
        <div class="register-form">
            <div class="form-container">
                <h2 class="form-title">Registro</h2>

                <form @submit.prevent="register">
                    <div class="row">
                        <!-- Primera columna -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="first_name" class="form-label">Nombre</label>
                                <input type="text" id="first_name" v-model="form.first_name" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Teléfono</label>
                                <input type="tel" id="phone" v-model="form.phone" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" id="password" v-model="form.password" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="date_of_birth" class="form-label">Fecha de Nacimiento</label>
                                <input type="date" id="date_of_birth" v-model="form.date_of_birth" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Género</label>
                                <div class="d-flex gap-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" id="male" value="Masculino" v-model="form.gender" required>
                                        <label class="form-check-label" for="male">Masculino</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" id="female" value="Femenino" v-model="form.gender" required>
                                        <label class="form-check-label" for="female">Femenino</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Segunda columna -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="last_name" class="form-label">Apellido</label>
                                <input type="text" id="last_name" v-model="form.last_name" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Correo Electrónico</label>
                                <input type="email" id="email" v-model="form.email" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="confirm_password" class="form-label">Confirmar Contraseña</label>
                                <input type="password" id="confirm_password" v-model="form.confirm_password" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="age" class="form-label">Edad</label>
                                <input type="number" id="age" v-model="form.age" class="form-control" required>
                            </div>

                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox" id="terms" v-model="form.accept_terms" required>
                                <label class="form-check-label" for="terms">
                                    Acepto los términos y condiciones
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="form-buttons">
                        <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
                        <button type="submit" class="btn btn-primary" :disabled="!form.accept_terms">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'RegisterComponent',
    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                date_of_birth: '',
                age: '',
                phone: '',
                email: '',
                password: '',
                confirm_password: '',
                gender: '',
                accept_terms: false
            }
        };
    },
    methods: {
        register() {
            console.log("Datos enviados:", this.form);
            alert("Registro enviado");
        }
    }
};
</script>

<style scoped>
.register-form {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.form-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
}

.form-title {
    text-align: center;
    margin-bottom: 20px;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>
