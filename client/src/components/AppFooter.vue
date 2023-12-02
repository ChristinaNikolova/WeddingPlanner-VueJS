<script>
import { mapState } from 'pinia';
import { useAuthStore } from '../store/auth';

export default {
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),
  },
};
</script>

<template>
  <footer class="footer">
    <nav class="footer-nav">
      <ul class="footer-nav-ul">
        <li class="footer-nav-li logo">
          <router-link to="/">
            Wedding Planner
          </router-link>
        </li>
      </ul>
      <ul class="footer-nav-ul gold-underline">
        <li class="footer-nav-li">
          <router-link to="/plan">
            Plan your wedding
          </router-link>
        </li>
        <li class="footer-nav-li">
          <router-link to="/blog?page=1&category=all">
            Wedding's blog
          </router-link>
        </li>
        <template v-if="isAuthenticated">
          <li class="footer-nav-li">
            <router-link to="/user/favourite-article">
              Favourite
            </router-link>
          </li>
          <li class="footer-nav-li">
            <router-link to="/logout">
              Logout
            </router-link>
          </li>
        </template>
        <template v-else>
          <li class="footer-nav-li">
            <router-link to="/login">
              Login
            </router-link>
          </li>
          <li class="footer-nav-li">
            <router-link to="/register">
              Register
            </router-link>
          </li>
        </template>
      </ul>
      <ul class="footer-nav-ul">
        <li class="footer-nav-li">
          <a href="https://github.com/ChristinaNikolova/WeddingPlanner-VueJS" rel="noreferrer" target="_blank">WeddingPlanner&copy;</a> - {{ new Date().getFullYear() }}
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>
.footer {
  height: 10vh;
  margin-top: 6px;
  margin-bottom: 6px;
}

.footer-nav .footer-nav-ul:nth-child(2) {
  display: flex;
  align-items: center;
  gap: 40px;
}

.footer-nav {
  height: 10vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-transform: uppercase;
  font-size: 22px;
}

.footer-nav-li a {
  font-size: 20px;
  letter-spacing: 0.2px;
  transition: all 200ms ease-in-out;
}

.footer-nav-li a:hover {
  color: var(--clr-gold);
  font-weight: 800;
}

.footer .logo a {
  font-size: 26px;
}

@media screen and (max-width: 1500px) {
  .footer-nav-li a {
    font-size: 18px;
  }

  .footer ul:first-of-type li a {
    font-size: 42px;
  }
}

@media screen and (max-width: 1300px) {
  .footer-nav-li a {
    font-size: 16px;
  }

  .footer ul:first-of-type li a {
    font-size: 40px;
  }
}

@media screen and (max-width: 1200px) {
  .footer-nav {
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }

  .footer ul:first-of-type li a {
    font-size: 44px;
  }

  .footer-nav-li a {
    font-size: 22px;
  }
}

@media screen and (max-width: 1000px) {
  .footer ul:first-of-type li a {
    font-size: 40px;
  }

  .footer-nav-li a {
    font-size: 18px;
  }
}

@media screen and (max-width: 750px) {
  .footer-nav-li a {
    font-size: 16px;
  }
}

@media screen and (max-width: 650px) {
  .footer-nav {
    gap: 10px;
  }

  .footer-nav .footer-nav-ul:nth-child(2) {
    flex-direction: column;
    gap: 5px;
    border-bottom: unset;
  }

  .footer-nav-li a {
    font-size: 16px;
  }
}

@media screen and (max-width: 450px) {
  .footer ul:first-of-type li a {
    font-size: 30px;
  }
}

@media screen and (max-width: 300px) {
  .footer ul:first-of-type li {
    text-align: center;
  }
}
</style>
