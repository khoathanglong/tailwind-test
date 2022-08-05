<template>
  <div>
    <h1 class="">Ooops</h1>
    <p>Your age is over our accepted limit.</p>
    <p>We are sorry but we cannot insure you now.</p>
    <button @click="handleClick">OK :(</button>
  </div>
</template>

<script>
export default {
  name: "AgeError",
  methods: {
    handleClick() {
      this.$router.push("/")
    },
  },
}
</script>
