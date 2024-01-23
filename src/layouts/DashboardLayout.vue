<template>
  <div class="q-mx-auto">
    <q-layout view="lHh lpR fFf">
      <q-header style="background: $primary">
        <q-toolbar>
          <q-toolbar-title class="text-capitalize font-semibold">
            <!-- {{ route.meta.label }} -->
            <q-avatar>
              <img
                src="../assets/img/lingian-logo-colored.png"
                alt=""
                style="opacity: 100%:"
              />
            </q-avatar>
          </q-toolbar-title>

          <router-link to="/" v-if="$route.path !== '/about'">
            <q-btn
              flat
              round
              color="white"
              icon="notifications"
              class="header_links"
            />
          </router-link>

          <router-link to="/">
            <q-btn
              flat
              round
              color="white"
              icon="mail"
              class="header_links"
            />
          </router-link>

          <router-link to="/profile">
            <q-btn
              flat
              round
              color="white"
              icon="account_circle"
              class="header_links"
            />
          </router-link>
        </q-toolbar>
      </q-header>

      <q-page-container style="height: 100vh;">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
