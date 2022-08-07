<template>
  <div class="h-screen w-fit flex flex-col justify-center">
    <h1 class="text-3xl font-bold self-center">Summary</h1>
    <h2 class="text-2xl font-bold self-center mt-10">{{ name }}</h2>
    <p class="mt-10 self-center">Name: {{ name }}</p>
    <p class="mt-10 self-center">Where do you live: {{ location }}</p>
    <p class="mt-10 self-center">Package: {{ pack }}</p>
    <p class="mt-10 self-center">Premium: {{ premium }}{{ currency }}</p>
    <div class="self-center mt-10">
      <button
        class="rounded w-24 h-10 border-2 border-grey-900 text-black mx-2"
        @click="handleBack"
        data-test="backButton"
      >
        Back
      </button>
      <button
        class="rounded w-24 h-10 bg-black text-white"
        @click="handleBuy"
        data-test="buyButton"
      >
        Buy
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InsuranceSummary",
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    premium: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pack: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleBuy() {
      this.$router.push("/")
    },
    handleBack() {
      this.$emit("back")
    },
  },
}
</script>
