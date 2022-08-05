<template>
  <div>
    <h1 class="bg-pink-500">Hello There!</h1>
    <p>Let's buy some insurance. It is going to take only a few steps</p>
    <button @click="start" class="outline outline-offset-2">Start</button>
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
