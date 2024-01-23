<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="column justify-center" style="height: 90vh; margin: auto 0;">
    <img src="../../assets/img/logoLingian.png" alt="" />
    <div v-if="$route.path !== '/admin/login'">
      <div v-if="!display" class="column justify-center items-center" style="gap: 15px;">
        <q-select
          rounded
          outlined
          v-model="model"
          :options="options"
          label="Login As"
          style="width: 100%;"
          color="black"
          bg-color="white"
        />

        <q-btn
          unelevated
          rounded
          color="green"
          label="Next"
          text-color="dark"
          @click="handleNext"
        />
      </div>
    </div>
    <q-form
      class="column"
      style="gap: 15px;"
      @submit.prevent="login"
      v-if="display || $route.path === '/admin/login'"
    >
      <!-- <q-input
          rounded
          standout
          bottom-slots
          v-model="Email"
          label="Email"
          placeholder="Enter Email Here"
          for="Email"
          bg-color="white"
          color="dark"
          :dense="dense" /> -->
      <q-input
        rounded
        outlined
        v-model="email"
        color="dark"
        bg-color="white"
        label="Email"
        for="email"
        placeholder="Enter Email Here"
        clear-icon="backspace"
      >
      </q-input>
      <q-input
        rounded
        outlined
        v-model="pw"
        color="dark"
        bg-color="white"
        label="Password"
        for="password"
        type="password"
      >
      </q-input>
      <q-btn
        text-color="dark"
        unelevated
        size="md"
        rounded
        padding="sm"
        @click="login"
        color="green"
        label="login"
        style="padding-left: 5rem; padding-right: 5rem; width: 160px font-weight: 600;"
        class="q-px-md text-bold items-center"
      >
      </q-btn>
    </q-form>

    <p class="q-mt-md" v-if="$route.path === '/mitra'">
      Don't have an account?
      <a style="color: #D1CB2A" href="/mitra/register">Create an account</a>
    </p>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import api from '../../AxiosInterceptors';
import { Cookies, useQuasar } from 'quasar';
export default {
  setup() {
    const $q = useQuasar();

    return {
      showNotif() {
        $q.notify({
          message: 'Login successful!',
          textColor: 'green',
          color: 'white',
          position: 'top',
          actions: [
            {
              icon: 'close',
              color: 'green',
              round: true,
              handler: () => {
                /* ... */
              },
            },
          ],
        });
      },
      errorNotif() {
        $q.notify({
          message: 'Login Failed!',
          color: 'red',
          position: 'top',
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
              handler: () => {
                /* ... */
              },
            },
          ],
        });
      },
    };
  },
  data() {
    return {
      email: '',
      pw: '',
      ph: '',
      dense: false,
      model: null,
      options: ['User', 'Mitra'],
      display: false,
    };
  },

  computed: {
    $route() {
      return useRoute();
    },
  },
  methods: {
    // async login() {
    //   if (this.$route.path === '/admin') {
    //     try {
    //       const response = await axios.post(
    //         'http://localhost:8080/auth/login',
    //         {
    //           email: this.email,
    //           password: this.pw,
    //         },
    //         {
    //           withCredentials: true,
    //         }
    //       )

    //       const token = response.data.data.accessToken
    //       console.log(token)

    //       localStorage.setItem('token', token)

    //       this.$router.push('/mitra/upload')
    //     } catch (error) {
    //       console.error('Login failed!', error.message)
    //     }
    //   }
    // },

    async login() {
      if (this.$route.path === '/admin/login') {
        try {
          const response = await api.post(
            '/auth/login',
            { email: this.email, password: this.pw },
            { withCredentials: true }
          );

          const token = response.data.data.accessToken;
          // console.log(token)
          console.log('berhasil login');
          console.log(response.data.message);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const refreshToken = Cookies.get('refreshToken');

          // console.log(refreshToken)
          // localStorage.setItem('auth', true)
          localStorage.setItem('token', token);

          this.showNotif;

          this.$nextTick(() => {
            this.$router.push('/admin/home');
          });
          // this.$router.push({
          //   path: '/admin/home',
          //   query: { successMessage: 'Login successful' },
          // })
        } catch (error) {
          this.errorNotif;
          console.error('Login failed', error);
        }
      } else if (this.$route.path === '/login') {
        try {
          const response = await api.post(
            '/auth/login',
            { email: this.email, password: this.pw },
            { withCredentials: true }
          );

          const token = response.data.data.accessToken;
          // console.log(token)
          console.log('berhasil login');
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const refreshToken = Cookies.get('refreshToken');

          // console.log(refreshToken)
          // localStorage.setItem('auth', true)
          localStorage.setItem('token', token);

          this.showNotif;
          this.$nextTick(() => {
            this.$router.push('/home');
          });
        } catch (error) {
          //   this.errorNotif();
          this.errorNotif;
          console.error('Login failed', error);
        }
      } else if (this.$route.path === '/mitra/login') {
        try {
          const response = await api.post(
            '/auth/login',
            { email: this.email, password: this.pw },
            { withCredentials: true }
          );

          const token = response.data.data.accessToken;
          // console.log(token)
          console.log('berhasil login');
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const refreshToken = Cookies.get('refreshToken');

          // console.log(refreshToken)
          // localStorage.setItem('auth', true)
          localStorage.setItem('token', token);

          this.showNotif;

          this.$nextTick(() => {
            this.$router.push('/mitra/home');
          });
        } catch (error) {
          this.errorNotif;
          console.error('Login failed', error);
        }
      }
    },

    handleNext() {
      if (this.model === 'User') {
        this.display = true;
        console.log('tes');
      } else if (this.model === 'Mitra') {
        this.display = true;
        this.$router.push('/mitra/login');
      }
    },
  },
};
</script>
