<template>
    <div class="row m-5">
        <div class="col-md-4">
            <div class="row">
                <div class="card" style="width: 18rem;">
                    <img src="/logo.jpg" class="card-img-top" alt="profile picture">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="card" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="row">
                <div class="card" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-footer">
                        Card footer
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="card" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-footer">
                        Card footer
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// import swal from "sweetalert2";

const API_URL = process.env.VUE_APP_API_URL;

export default {
    name: 'UserProfileComponent',
    data() {
        return {
            user: null,
            loading: true,
        }
    },
    mounted() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                fetch(API_URL + '/userprofile', {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (!data.status) {
                            console.error('Error fetching user data:', data.message);
                        } else {
                            this.user = data.user;
                            console.log(data.user);
                        }
                    })
                    .catch(error => console.error(error));
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                this.loading = false;
            }
        }
    }
}

</script>

<style scoped>

</style>