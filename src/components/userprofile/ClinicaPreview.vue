<template>
    <div class="bg-gray-100 min-h-screen">
        <!-- Preview Banner -->
        <div class="bg-blue-600 p-4 flex justify-between items-center">
            <div class="flex items-center">
                <router-link to="/home" class="text-white flex items-center mr-4">
                    <svg class="h-7 w-7 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    <span class="font-bold text-lg">Salus Nexus</span>
                </router-link>
                <div class="flex items-center">
                    <div class="text-white mr-2">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2"/>
                            <path
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"/>
                        </svg>
                    </div>
                    <div class="text-white">
                        <div class="font-semibold">Vista previa de tu consultorio</div>
                        <div class="text-sm">Esto es una vista previa de cómo los pacientes verán la información de tu
                            consultorio en la plataforma
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center">
                <button class="bg-blue-600 text-white rounded-md px-4 py-1 mr-2 flex items-center">
                    <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                        <path
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"/>
                    </svg>
                    Vista de paciente
                </button>
                <button class="bg-white text-blue-600 rounded-md px-4 py-1" @click.prevent="goToEditClinicPreview">
                    Personalizar vista
                </button>
            </div>
        </div>

        <div class="container mx-auto p-4">
            <!-- Clinic Header -->
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-2xl font-bold text-gray-800">Mi Clínica</h1>
                <!-- <button class="bg-blue-600 text-white rounded-md px-4 py-2 flex items-center">
                    <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"/>
                    </svg>
                    Editar Perfil
                </button> -->
            </div>

            <div class="flex flex-col md:flex-row gap-6">
                <!-- Doctor Profile Card -->
                <div class="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="bg-blue-600 h-24"></div>
                    <div class="flex justify-center -mt-12">
                        <router-link to="/home">
                            <img :src="profile_photo" alt="Doctor"
                                 class="rounded-full h-24 w-24 border-4 border-white object-cover">
                        </router-link>
                    </div>
                    <div class="text-center p-4">
                        <h2 class="text-xl font-bold">Dr. {{ myClinic.first_name + " " + myClinic.last_name }}</h2>
                        <div class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full my-2">
                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"/>
                            </svg>
                            {{ myClinic.speciality }}
                        </div>
                        <div class="flex justify-center items-center text-sm text-blue-600 my-2">
                            <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"/>
                            </svg>
                            {{ myClinic.years_of_experience }} años de experiencia
                        </div>
<!--                        <div class="flex justify-center items-center my-2">
                            <div class="flex">
                                <svg v-for="i in 5" :key="i" class="h-5 w-5 text-yellow-400"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                            <span class="ml-1 font-semibold">4.8</span>
                            <span class="ml-1 text-gray-500 text-sm">(125 opiniones)</span>
                        </div>-->
                        <div class="flex justify-center items-center text-sm text-gray-600 my-2">
                            <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"/>
                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"/>
                            </svg>
                            <div>
                                <div class="font-semibold">{{ myClinic.clinic_name }}</div>
                                <div>{{ myClinic.city_name + ", " + myClinic.department_name }}</div>
                            </div>
                        </div>
                        <div v-if="myClinic.home_visits" class="flex justify-center my-3">
                            <div class="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"/>
                                </svg>
                                Visitas a domicilio
                            </div>
                        </div>
                        <div class="flex justify-between mt-4">
                            <button
                                class="w-1/2 py-2 px-4 text-gray-800 font-medium rounded-md border border-gray-300 flex justify-center items-center mr-2">
                                <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"/>
                                </svg>
                                Contactar
                            </button>
                            <button
                                class="w-1/2 py-2 px-4 text-white font-medium rounded-md bg-blue-600 flex justify-center items-center">
                                <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"/>
                                </svg>
                                Agendar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="w-full md:w-2/3 lg:w-3/4">
                    <!-- Tabs -->
                    <div class="bg-white rounded-lg shadow-md mb-6">
                        <div class="flex border-b">
                            <button
                                :class="['flex-1 py-3 px-4 text-center font-medium', activeTab === 'informacion' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600']"
                                @click="activeTab = 'informacion'">
                                Información
                            </button>
                            <button
                                :class="['flex-1 py-3 px-4 text-center font-medium', activeTab === 'horarios' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600']"
                                @click="activeTab = 'horarios'">
                                Horarios
                            </button>
<!--                            <button
                                :class="['flex-1 py-3 px-4 text-center font-medium', activeTab === 'servicios' ?
                                'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600']"
                                @click="activeTab = 'servicios'">
                                Servicios
                            </button>-->
                        </div>

                        <!-- Tab Content -->
                        <div class="p-6">
                            <!-- Information Tab -->
                            <div v-if="activeTab === 'informacion'">
                                <div class="mb-8">
                                    <div class="flex items-center text-gray-700 mb-4">
                                        <svg class="h-6 w-6 mr-2 text-blue-600" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2"/>
                                        </svg>
                                        <h3 class="text-lg font-semibold">Sobre el profesional</h3>
                                    </div>
                                    <p class="text-gray-700">
                                        {{ myClinic.biography }}
                                    </p>
                                </div>

                                <div class="mt-8">
                                    <div class="flex items-center text-gray-700 mb-4">
                                        <svg class="h-6 w-6 mr-2 text-blue-600" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2"/>
                                        </svg>
                                        <h3 class="text-lg font-semibold">Información de contacto</h3>
                                    </div>
                                    <div class="flex flex-col md:flex-row gap-4">
                                        <div class="w-full md:w-1/2 bg-gray-50 p-4 rounded-md">
                                            <div class="text-gray-500 text-sm mb-1">Teléfono</div>
                                            <div class="flex items-center">
                                                <svg class="h-5 w-5 text-blue-600 mr-2"
                                                     fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"/>
                                                </svg>
                                                <span>{{ myClinic.phone }}</span>
                                            </div>
                                        </div>
                                        <div class="w-full md:w-1/2 bg-gray-50 p-4 rounded-md">
                                            <div class="text-gray-500 text-sm mb-1">Correo electrónico</div>
                                            <div class="flex items-center">
                                                <svg class="h-5 w-5 text-blue-600 mr-2"
                                                     fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"/>
                                                </svg>
                                                <span>{{ myClinic.email }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Schedule Tab -->
                            <div v-if="activeTab === 'horarios'">
                                <div class="flex items-center text-gray-700 mb-6">
                                    <svg class="h-6 w-6 mr-2 text-blue-600" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"/>
                                    </svg>
                                    <h3 class="text-lg font-semibold">Horarios de atención</h3>
                                </div>

                                <div v-for="schedule in schedules" :key="schedule.id"
                                     class="border-b pb-4 flex justify-between">
                                    <span class="font-medium">{{ schedule.day_of_the_week }}</span>
                                    <span>{{ formatTime(schedule.start_time) }} - {{ formatTime(schedule.end_time) }}</span>
                                </div>

                            </div>

                            <!-- Services Tab -->
                            <div v-if="activeTab === 'servicios'">
                                <div class="flex items-center text-gray-700 mb-6">
                                    <svg class="h-6 w-6 mr-2 text-blue-600" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"/>
                                    </svg>
                                    <h3 class="text-lg font-semibold">Servicios ofrecidos</h3>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div class="bg-blue-50 p-4 rounded-md">
                                        <h4 class="text-blue-600 font-medium mb-2">Consulta cardiológica</h4>
                                        <p class="text-gray-700 mb-2 text-sm">Evaluación completa del sistema
                                            cardiovascular y diagnóstico de enfermedades cardíacas.</p>
                                        <p class="text-blue-600 font-bold">$60</p>
                                    </div>
                                    <div class="bg-blue-50 p-4 rounded-md">
                                        <h4 class="text-blue-600 font-medium mb-2">Electrocardiograma</h4>
                                        <p class="text-gray-700 mb-2 text-sm">Registro de la actividad eléctrica del
                                            corazón para detectar arritmias y otras anomalías.</p>
                                        <p class="text-blue-600 font-bold">$40</p>
                                    </div>
                                    <div class="bg-blue-50 p-4 rounded-md">
                                        <h4 class="text-blue-600 font-medium mb-2">Ecocardiograma</h4>
                                        <p class="text-gray-700 mb-2 text-sm">Estudio por ultrasonido que permite
                                            visualizar la estructura y función del corazón.</p>
                                        <p class="text-blue-600 font-bold">$120</p>
                                    </div>
                                    <div class="bg-blue-50 p-4 rounded-md">
                                        <h4 class="text-blue-600 font-medium mb-2">Prueba de esfuerzo</h4>
                                        <p class="text-gray-700 mb-2 text-sm">Evaluación de la respuesta cardíaca
                                            durante el ejercicio físico controlado.</p>
                                        <p class="text-blue-600 font-bold">$80</p>
                                    </div>
                                </div>

                                <div class="bg-green-50 p-4 rounded-md">
                                    <div class="flex items-center mb-2">
                                        <svg class="h-5 w-5 text-green-600 mr-2" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2"/>
                                        </svg>
                                        <h4 class="text-green-600 font-medium">Visitas a domicilio disponibles</h4>
                                    </div>
                                    <p class="text-gray-700 mb-2 text-sm">El Dr. Juan Pérez ofrece consultas a domicilio
                                        para pacientes con movilidad reducida o que prefieran atención en casa.</p>
                                    <p class="text-green-600 font-bold">$100 (incluye transporte dentro de San
                                        Salvador)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Stats Cards -->
                    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <div class="flex items-center text-blue-600 mb-4">
                                <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"/>
                                </svg>
                                <h3 class="text-sm font-semibold">Pacientes atendidos</h3>
                            </div>
                            <div class="text-4xl font-bold text-blue-600 mb-1">1,248</div>
                            <div class="text-sm text-gray-500">Últimos 12 meses</div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <div class="flex items-center text-blue-600 mb-4">
                                <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"/>
                                </svg>
                                <h3 class="text-sm font-semibold">Satisfacción de pacientes</h3>
                            </div>
                            <div class="text-4xl font-bold text-blue-600 mb-1">98%</div>
                            <div class="text-sm text-gray-500">Basado en 125 opiniones</div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <div class="flex items-center text-blue-600 mb-4">
                                <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"/>
                                </svg>
                                <h3 class="text-sm font-semibold">Próxima disponibilidad</h3>
                            </div>
                            <div class="text-lg text-blue-600 font-medium mb-2">Mañana, 10:00 AM</div>
                            <button class="text-sm text-blue-600 font-medium bg-blue-100 px-4 py-2 rounded-md">
                                Ver agenda completa
                            </button>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swal from "sweetalert2";

const API_URL = process.env.VUE_APP_API_URL;
const API_IMAGES_URL = process.env.VUE_APP_API_URL_IMAGE;

export default {
    name: 'ClinicProfile',
    data() {
        return {
            activeTab: 'informacion',
            myClinic: [],
            schedules: [],

            profile_photo: null,
            API_IMAGES_URL: API_IMAGES_URL,
        }
    },
    mounted() {
        this.fetchMyClinic().then(() => {
            this.fetchSchedules();
        })
    },
    methods: {
        formatTime(time) {
            const [hours, minutes] = time.split(':');
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM
            return `${formattedHours}:${minutes} ${period}`;
        },
        async fetchMyClinic() {
            try {
                const response = await fetch(`${API_URL}/medical-clinics/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching clinic data');
                }

                const data = await response.json();

                if (!data.status) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }

                this.myClinic = data.data;
                this.profile_photo = API_IMAGES_URL + "/" + this.myClinic.profile_photo_path;
                // console.log(this.myClinic);
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async fetchSchedules() {
            try {
                const response = await fetch(`${API_URL}/schedules/get/clinic/` + this.myClinic.clinic_id, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching schedules data');
                }

                const data = await response.json();

                if (!data.status) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }

                this.schedules = data.data;
                // console.log(this.schedules);

            } catch (error) {
                console.error('Error:', error);
            }
        },
        editProfile() {
            this.$router.push('/edit-clinic');
        },
        goToEditClinicPreview() {
            // this.$router.push({name: 'EditClinic'});
            swal.fire({
                icon: 'info',
                title: 'Próximamente',
                text: 'Esta funcionalidad estará disponible en futuras actualizaciones. Estamos trabajando para mejorar su experiencia.',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#3b82f6' // Color azul que coincide con el estilo de la aplicación
            });
        }
    }
}
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css';

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
</style>