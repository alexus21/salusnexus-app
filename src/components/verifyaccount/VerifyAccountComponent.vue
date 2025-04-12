<script>
import swal from "sweetalert2";

export default {
    name: 'VerifyAccountComponent',
    data() {
        return {
            loading: true,
            isVerified: null,
            profile_photo: null,
        }
    },
    methods: {
        checkIfAccountIsVerified() {
            const user = JSON.parse(localStorage.getItem('token'));
            if (!user || !user.verified) {
                this.isVerified = false;
                this.showAlertIsNotVerified();
            } else {
                this.showAlertIsVerified();
            }
        },
        showAlertIsNotVerified() {
            swal.fire({
                icon: 'warning',
                iconColor: '#D69656',
                title: 'Account Verification Required',
                text: 'Please verify your account to access all features.',
                showCancelButton: true,
                confirmButtonText: 'Verify Now',
                cancelButtonText: 'Later',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push({ name: 'verify-account' });
                }
            });
        },
        showAlertIsVerified() {
            swal.fire({
                icon: 'success',
                iconColor: '#4CAF50',
                title: 'Account Verified',
                text: 'Your account has been successfully verified.',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push({ name: 'home' });
                }
            });
        }
    }
}
</script>

<style scoped>

</style>