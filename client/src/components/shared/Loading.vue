<template>
  <section class="loading section-background">
    <div class="loading-content" data-title="dot-pulse">
      <div>Loading, please wait</div>
      <div class="dot-pulse" />
    </div>
  </section>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loading-content {
  font-size: 70px;
  font-weight: 700;
  color: var(--clr-gold);
  text-shadow: -2px 0px 41px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.dot-pulse {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--clr-gold);;
  color: var(--clr-gold);;
  box-shadow: 9999px 0 0 -5px;
  animation: dot-pulse 1.5s infinite linear;
  animation-delay: 0.25s;
}
.dot-pulse::before,

.dot-pulse::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--clr-gold);;
  color: var(--clr-gold);;
}
.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px;
  animation: dot-pulse-before 1.5s infinite linear;
  animation-delay: 0s;
}
.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px;
  animation: dot-pulse-after 1.5s infinite linear;
  animation-delay: 0.5s;
}

@keyframes dot-pulse-before {
  0% {
    box-shadow: 9975px 0 0 -5px;
  }
  30% {
    box-shadow: 9975px 0 0 2px;
  }
  60%,
  100% {
    box-shadow: 9975px 0 0 -5px;
  }
}
@keyframes dot-pulse {
  0% {
    box-shadow: 9999px 0 0 -5px;
  }
  30% {
    box-shadow: 9999px 0 0 2px;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px;
  }
}
@keyframes dot-pulse-after {
  0% {
    box-shadow: 10020px 0 0 -5px;
  }
  30% {
    box-shadow: 10020px 0 0 2px;
  }
  60%,
  100% {
    box-shadow: 10020px 0 0 -5px;
  }
}
</style>
