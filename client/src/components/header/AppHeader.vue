<script>
import { mapState } from 'pinia';
import { useAuthStore } from '../../store/auth';
import { styleNames } from '../../utils/constants/global';
import HamburgerHeader from './HamburgerHeader.vue';

export default {
  components: { HamburgerHeader },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),
  },
  methods: {
    showMenu() {
      const ulHamburgerElement = document.getElementsByClassName('header-nav-ul-hamburger')[0];
      const ulElement = document.getElementsByTagName('ul')[0];
      if (ulHamburgerElement.style.display === styleNames.NONE) {
        ulHamburgerElement.style.display = styleNames.BLOCK;
        ulElement.style.height = 'unset';
        ulElement.style.marginBottom = '12px';
        document.getElementsByTagName('header')[0].style.height = 'unset';
      }
      else {
        this.setInitialCssStyles();
      }
    },
    setInitialCssStyles() {
      document.getElementsByClassName('header-nav-ul-hamburger')[0].style.display = styleNames.NONE;
      document.getElementsByTagName('ul')[0].style.height = '16vh';
      document.getElementsByTagName('header')[0].style.height = '16vh';
    },
  },
};
</script>

<template>
  <header class="header">
    <nav class="header-nav">
      <ul class="header-nav-ul">
        <li class="header-nav-li secondary">
          <router-link to="/plan">
            Plan your wedding
          </router-link>
        </li>
        <li class="header-nav-li secondary">
          <router-link to="/blog">
            Wedding's blog
          </router-link>
        </li>
        <li class="header-nav-li logo gold-underline">
          <router-link to="/">
            Wedding Planner
          </router-link>
        </li>
        <template v-if="isAuthenticated">
          <li class="header-nav-li secondary">
            <router-link to="/user/favourite-article">
              Favourite
            </router-link>
          </li>
          <!-- {todo isAdmin &&
                                <li class={styles["header-nav-li"]}> secondary
                                    <NavLink to="/administration">Administration</NavLink>
                                </li>
                            } -->
          <li class="header-nav-li secondary">
            <router-link to="/logout">
              Logout
            </router-link>
          </li>
        </template>
        <template v-else>
          <li class="header-nav-li secondary">
            <router-link to="/login">
              Login
            </router-link>
          </li>
          <li class="header-nav-li secondary">
            <router-link to="/register">
              Register
            </router-link>
          </li>
        </template>
        <li class="header-nav-li-hamburger" @click="showMenu">
          <i class="fa-solid fa-bars" />
        </li>
      </ul>
      <HamburgerHeader
        @set-initial-css-styles="setInitialCssStyles"
      />
    </nav>
  </header>
</template>

<style scoped>
.header {
  height: 16vh;
  margin-bottom: 10px;
  margin-top: 10px;
}

.header-nav-ul {
  height: 16vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-transform: uppercase;
}

.header-nav-li a {
  font-size: 22px;
  letter-spacing: 0.2px;
  transition: all 200ms ease-in-out;
}

.header-nav-li.secondary a.router-link-active.router-link-exact-active {
  color: var(--clr-gold);
  border-bottom: 0.2px solid var(--clr-gold);
}

.header-nav-li a:hover {
  color: var(--clr-gold);
  font-weight: 800;
}

.header-nav-li-hamburger {
  display: none;
}

@media screen and (max-width: 1400px) {
  .header-nav-li a {
    font-size: 20px;
  }

  .header-nav-ul .header-nav-li:nth-child(3) a {
    font-size: 44px;
  }
}

@media screen and (max-width: 1300px) {
  .header-nav-li a {
    font-size: 18px;
  }

  .header-nav-ul .header-nav-li:nth-child(3) a {
    font-size: 40px;
  }
}

@media screen and (max-width: 1150px) {
  .header-nav-li a {
    font-size: 14px;
  }

  .header-nav-ul .header-nav-li:nth-child(3) a {
    font-size: 30px;
  }
}

@media screen and (max-width: 992px) {
  .header-nav-ul {
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
  }

  .header-nav-ul .header-nav-li:nth-child(1),
  .header-nav-ul .header-nav-li:nth-child(2),
  .header-nav-ul .header-nav-li:nth-child(4),
  .header-nav-ul .header-nav-li:nth-child(5),
  .header-nav-ul .header-nav-li:nth-child(6) {
    display: none;
  }

  .header-nav-ul .header-nav-li:nth-child(3) {
    border-bottom: unset;
  }

  .header-nav-li-hamburger {
    display: inline-block;
    font-size: 20px;
    color: var(--clr-gold);
  }

  .header-nav-li-hamburger:hover {
    cursor: pointer;
  }
}

@media screen and (max-width: 550px) {
  .header-nav-ul .header-nav-li:nth-child(3) a {
    font-size: 30px;
  }
}

@media screen and (max-width: 450px) {
  .header-nav-ul .header-nav-li:nth-child(3) a {
    font-size: 20px;
  }
}

@media screen and (max-width: 320px) {
  .header-nav-ul {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>
