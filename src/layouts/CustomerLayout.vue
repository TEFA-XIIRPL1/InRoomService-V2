<!-- <script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { routes } from '../router'
  import { useHead } from '@vueuse/head'
  import Minimarket from 'src/pages/default/minimarket.vue'
  import FoodBeverage from 'src/pages/default/foodbeverage.vue'
  import api from 'src/AxiosInterceptors'

  const leftDrawerOpen = ref(false)
  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const route = useRoute()
  const router = useRouter()
  const search = ref('')
  useHead({
    title: 'Your Page Title',
    // other meta tags or properties
  })

  const item = ref([])
  const length = ref(0)
  onMounted(() => {
    const cartItem = localStorage.getItem('cart')
    item.value = cartItem ? JSON.parse(cartItem) : []

    length.value = item.value.length
  })

  watch(item, (newItems) => {
    length.value = newItems.length
  })

  function estimated() {
    if (route.path === '/minimarket') {
      router.push('/estimated/minimarket')
    } else if (route.path === '/foodbeverage') {
      router.push('/estimated/foodbeverage')
    } else if (route.path === '/laundry') {
      router.push('/estimated/laundry')
    }
  }

  function checkout() {
    if (route.path === '/minimarket') {
      router.push('/checkout/minimarket')
    } else if (route.path === '/foodbeverage') {
      router.push('/checkout/foodbeverage')
    } else if (route.path === '/laundry') {
      router.push('/checkout/laundry')
    }
  }

  function cancel() {
    if (route.path === '/minimarket') {
      localStorage.removeItem('cart')
    } else if (route.path === '/foodbeverage') {
      localStorage.removeItem('cartFood')
    } else if (route.path === '/laundry') {
      router.push('/estimated/laundry')
    }
  }
  console.log()

  async function logout() {
    try {
      await api.get('/auth/logout', { withCredentials: true })

      localStorage.removeItem('token')

      router.push('/login')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }
</script> -->

<script lang="ts">
import { useRoute, useRouter } from 'vue-router';
import api from 'src/AxiosInterceptors';
import { Cookies, useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();

    return {
      showNotif() {
        $q.notify({
          message: 'Logout successful!',
          color: 'green',
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
      leftDrawerOpen: false,
      router: useRouter(),
      route: useRoute(),
      search: '',
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    async logout() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const refreshToken = Cookies.get('refreshToken');

      try {
        await api.get(
          '/auth/logout',
          // { req: Cookies.get('refreshToken') },
          { withCredentials: true }
        );
        localStorage.removeItem('token');

        this.showNotif();
        this.$nextTick(() => {
          this.router.push('/login');
        });
      } catch (error) {
        this.errorNotif();
        console.error('Logout failed', error);
      }
    },
    cancel() {
      if (this.$route.path === '/minimarket') {
        localStorage.removeItem('cart');
      } else if (this.$route.path === '/foodbeverage') {
        localStorage.removeItem('cartFood');
      } else if (this.$route.path === '/laundry') {
        this.$router.push('/estimated/laundry');
      }
    },
    checkout() {
      if (this.$route.path === '/minimarket') {
        this.$router.push('/checkout/minimarket');
      } else if (this.$route.path === '/foodbeverage') {
        this.$router.push('/checkout/foodbeverage');
      } else if (this.$route.path === '/laundry') {
        this.$router.push('/checkout/laundry');
      }
    },
    estimated() {
      if (this.$route.path === '/minimarket') {
        this.$router.push('/estimated/minimarket');
      } else if (this.$route.path === '/foodbeverage') {
        this.$router.push('/estimated/foodbeverage');
      } else if (this.$route.path === '/laundry') {
        this.$router.push('/estimated/laundry');
      }
    },
  },
};
</script>

<template>
  <div class="my-bg bg1">
    <q-layout view="lHh lpR fFf" class="text-white max-h-screen min-h-screen">
      <q-header class="bg-transparent border-0 border-transparent">
        <q-toolbar class="flex items-center justify-between">
          <q-btn
            dense
            flat
            round
            icon="menu"
            @click="toggleLeftDrawer"
            class="text-white"
          />

          <q-toolbar-title class="text-capitalize font-bold">
            {{ route.meta.label }}
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-footer
        reveal
        class="mb-1 rounded-lg bg-[#9F9F9F] w-full sm:w-[600px] xl:w-[700px] justify-center mx-auto"
      >
        <q-toolbar class="flex items-center">
          <div class="flex items-center gap-1 flex-nowrap">
            <q-icon name="o_shopping_cart" size="32px"></q-icon>
          </div>
          <div class="flex justify-end gap-5 p-2 w-full">
            <q-btn
              class="bg-green w-28 rounded-full text-sm text-black font-bold"
              label="cancel"
              name="cancel"
              @click="cancel()"
            />
            <q-btn
              class="bg-green w-28 rounded-full text-sm text-black font-bold"
              label="continue"
              name="continue"
              @click="checkout()"
            />
          </div>
        </q-toolbar>
      </q-footer>
      <q-drawer
        v-model="leftDrawerOpen"
        side="left"
        overlay
        elevated
        :width="240"
        class="text-white bg-[#9F9F9F]"
      >
        <q-scroll-area class="fit">
          <div class="flex flex-col items-center p-2 mb-4">
            <q-btn
              flat
              round
              color="white"
              icon="close"
              size="60"
              @click="toggleLeftDrawer"
              class="ms-auto z-10"
            />
            <q-img src="../assets/img/logoLingian.png" class="w-40" />
          </div>
          <q-list>
            <q-item clickable v-ripple @click="router.push('/home')">
              <q-item-section avatar>
                <q-icon name="o_store" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Home</p>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="router.push('/minimarket')">
              <q-item-section avatar>
                <q-icon name="o_store" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Minimarket</p>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="router.push('/foodbev')">
              <q-item-section avatar>
                <q-icon name="o_fastfood" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Food & Beverage</p>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="router.push('/promo')">
              <q-item-section avatar>
                <q-icon name="o_percent" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Promo Today</p>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="router.push('/laundry')">
              <q-item-section avatar>
                <q-icon name="o_local_laundry_service" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Laundry</p>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_support_agent" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Whatsapp</p>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon name="o_logout" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Logout</p>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container
        class="flex items-center justify-center h-screen overflow-hidden"
      >
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: rgba(153, 153, 153, 0.92);
}
.my-bg {
  position: absolute;
  top: 0;
  left: 0;
  background-position-y: 30%;
  width: 100%;

  background-size: cover;
  z-index: -1; /* Move the background behind other content */
}

.my-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position-y: 50%;
  filter: brightness(50%); /* Apply the brightness filter */
  z-index: -2; /* Move the filtered background even further behind */
}

.bg1 {
  background-image: url('src/assets/img/minimarket.png');
}

// .my-bg::before {
//   content: '';
//   display: block;
//   width: 100%;
//   height: 60%;
//   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
//   position: absolute;
//   top: 0;
// }

// .my-bg::after {
//   content: '';
//   display: block;
//   width: 100%;
//   height: 40%;
//   background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
//   position: absolute;
//   bottom: 0;
// }
</style>
