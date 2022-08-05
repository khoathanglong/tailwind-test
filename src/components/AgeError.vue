<template>
  <div class="h-screen w-fit flex flex-col justify-start mt-32">
    <h1 class="text-3xl font-bold self-center">Ooops</h1>
    <p class="mt-10 self-center">Your age is over our accepted limit.</p>
    <p class="mt-10 self-center">We are sorry but we cannot insure you now.</p>
    <div class="self-center mt-10">
      <button
        @click="handleClick"
        class="rounded w-24 h-10 bg-black text-white"
      >
        OK :(
      </button>
    </div>
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
