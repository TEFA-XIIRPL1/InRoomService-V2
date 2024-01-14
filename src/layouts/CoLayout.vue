<template>
  <div class="justify-center mx-auto">
    <q-layout view="lHh lpR fFf">
      <q-header class="bg-[#069550] text-white pt-1">
        <q-toolbar>
          <q-toolbar-title class="text-capitalize font-semibold">
            <!-- {{ route.meta.label }} -->
            <q-avatar>
              <img
                src="../assets/img/lingian-logo-colored.png"
                alt=""
                class="opacity-100"
              />
            </q-avatar>
          </q-toolbar-title>

          <router-link to="/" v-if="$route.path !== '/about'">
            <q-btn
              flat
              round
              icon="o_notifications"
              class="opacity-80 hover:opacity-100"
            />
          </router-link>

          <router-link to="/">
            <q-btn
              flat
              round
              icon="o_mail"
              class="opacity-80 hover:opacity-100"
            />
          </router-link>

          <router-link to="/profile">
            <q-btn
              flat
              round
              icon="o_account_circle"
              class="opacity-80 hover:opacity-100"
            />
          </router-link>
        </q-toolbar>
        <div class="bg-gray-500">
          <q-toolbar class="flex items-center justify-between">
            <q-btn
              dense
              flat
              round
              icon="menu"
              @click="toggleLeftDrawer"
              class="text-white"
            />
            <q-btn
              dense
              flat
              icon="fastfood"
              href="/checkout/foodbev"
              :class="{
                'text-white': $route.path !== '/checkout/foodbeverage',
                ' border-b-4 border-b-green-500':
                  $route.path === '/checkout/foodbeverage',
              }"
            />
            <q-btn
              dense
              flat
              icon="store"
              href="/checkout/minimarket"
              :class="{
                'text-white': $route.path !== '/checkout/minimarket',
                ' border-b-4 border-b-green-500':
                  $route.path === '/checkout/minimarket',
              }"
            />
            <q-btn
              dense
              flat
              icon="local_laundry_service"
              href="/checkout/laundry"
              :class="{
                'text-white': $route.path !== '/checkout/laundry',
                ' border-b-4 border-b-green-500':
                  $route.path === '/checkout/laundry',
              }"
            />
            <q-btn
              dense
              flat
              icon="history"
              href="/checkout/history"
              :class="{
                'text-white': $route.path !== '/checkout/history',
                ' border-b-4 border-b-green-500':
                  $route.path === '/checkout/history',
              }"
            />
          </q-toolbar>

          <q-toolbar class="flex flex-col w-screen">
            <div
              active-color="white"
              style="font-size: 16px"
              class="flex flex-row items-center mt-6 flex-nowrap"
            >
              <div class="flex items-start gap-2 flex-nowrap">
                <q-btn
                  class="text-gray-400"
                  label="1"
                  @click="back()"
                  color="dark"
                  text-color="grey-13"
                  rounded
                ></q-btn>
                <div class="flex flex-col items-start">
                  <p class="text-gray-400">Add to Cart</p>
                  <p class="text-gray-400">Choose Your Item</p>
                </div>
              </div>

              <div
                class="h-[2px] w-12 bg-[#20A95A] rounded-2xl border-2 border-[#20A95A] z-10 shadow-md"
              ></div>
              <div class="flex items-start gap-2 flex-nowrap">
                <q-btn
                  class="text-white"
                  label="2"
                  color="green"
                  rounded
                ></q-btn>
                <div class="flex flex-col items-start">
                  <p>Checkout</p>
                  <p class="text-gray-400">To Make Payment</p>
                </div>
              </div>
            </div>
          </q-toolbar>
        </div>
      </q-header>
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
            <q-item clickable v-ripple @click="whatsapp">
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
      <q-page-container class="h-screen">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

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
    whatsapp() {
      window.location.replace('https://api.whatsapp.com/send?phone=&text=Halo');
    },
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

    back() {
      if (this.$route.path === '/checkout/minimarket') {
        this.$router.push('/minimarket');
      } else if (this.$route.path === '/checkout/foodbeverage') {
        this.$router.push('/foodbeverage');
      } else if (this.$route.path === '/checkout/laundry') {
        this.$router.push('/laundry');
      }
    },
  },
};
</script>
