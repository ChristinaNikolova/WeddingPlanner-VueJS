<script setup>
import { useAuthStore } from '../../store/auth';
import { styleNames } from '../../utils/constants/global';

const emit = defineEmits(['setInitialCssStyles']);
const store = useAuthStore();
</script>

<template>
  <ul class="header-nav-ul-hamburger" :style="{ display: `${styleNames.NONE}` }">
    <li class="header-nav-li-hamburger">
      <router-link to="/plan" @click="emit('setInitialCssStyles')">
        Plan your wedding
      </router-link>
    </li>
    <li class="header-nav-li-hamburger">
      <router-link to="/blog?page=1&category=all" @click="emit('setInitialCssStyles')">
        Wedding's blog
      </router-link>
    </li>
    <template v-if="store.isAuthenticated">
      <li class="header-nav-li-hamburger">
        <router-link to="/user/favourite-article" @click="emit('setInitialCssStyles')">
          Favourite
        </router-link>
      </li>
      <li v-if="store.isAdmin" class="header-nav-li-hamburger">
        <router-link to="/administration" @click="emit('setInitialCssStyles')">
          Administration
        </router-link>
      </li>
      <li class="header-nav-li-hamburger">
        <router-link to="/logout" @click="emit('setInitialCssStyles')">
          Logout
        </router-link>
      </li>
    </template>
    <template v-else>
      <li class="header-nav-li-hamburger">
        <router-link to="/login" @click="emit('setInitialCssStyles')">
          Login
        </router-link>
      </li>
      <li class="header-nav-li-hamburger">
        <router-link to="/register" @click="emit('setInitialCssStyles')">
          Register
        </router-link>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.header-nav-ul-hamburger {
  display: none;
  margin-top: 20px;
}

.header-nav-li-hamburger {
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 5px;
}

.header-nav-li-hamburger a {
  font-size: 20px;
  letter-spacing: 0.2px;
}

.header-nav-li-hamburger a.router-link-active.router-link-exact-active {
  color: var(--clr-gold);
  border-bottom: 0.2px solid var(--clr-gold);
}

@media screen and (max-width: 550px) {
  .header-nav-li-hamburger a {
    font-size: 18px;
  }
}

@media screen and (max-width: 450px) {
  .header-nav-li-hamburger a {
    font-size: 18px;
  }
}

@media screen and (max-width: 350px) {
  .header-nav-li-hamburger a {
    font-size: 16px;
  }
}
</style>
