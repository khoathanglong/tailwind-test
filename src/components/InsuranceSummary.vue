<template>
  <div>
    <h1>Summary</h1>
    <h2>{{ name }}</h2>
    <p>Name: {{ name }}</p>
    <p>Where do you live: {{ location }}</p>
    <p>Package: {{ pack }}</p>
    <p>Premium: {{ premium }}{{ currency }}</p>
    <button @click="handleBack" data-test="backButton">Back</button>
    <button @click="handleNext" data-test="nextButton">Next</button>
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
    handleNext() {
      this.$router.push("/")
    },
    handleBack() {
      this.$emit("back")
    },
  },
}
</script>
