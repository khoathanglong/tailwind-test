<template>
  <div class="h-1/2 w-fit flex flex-col justify-center bg-slate-50 self-center">
    <h1 class="text-3xl font-bold self-center">Hello There!</h1>
    <p class="my-10 self-center">
      Let's buy some insurance. It is going to take only a few steps
    </p>
    <button
      @click="start"
      class="self-center rounded w-32 h-10 bg-black text-white"
    >
      Start
    </button>
  </div>
</template>

<script>
export default {
  name: "GreetingComponent",
  methods: {
    start() {
      this.$router.push("/insurance")
    },
  },
}
</script>
