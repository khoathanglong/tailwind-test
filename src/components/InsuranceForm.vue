<template>
  <div class="h-screen w-fit flex flex-col justify-center">
    <h1 class="text-3xl font-bold self-center">Tell us about your self</h1>
    <div class="mt-10 self-center">
      <label for="Name" class="block">Name</label>
      <input
        class="rounded w-60 py-2 h-10 border-2 border-grey-200"
        type="text"
        name="Name"
        placeholder="Add text"
        v-model="name"
        required
      />
      <div class="text-rose-500" data-test="nameError">
        {{ error.name }}
      </div>
    </div>
    <div class="self-center mt-5">
      <label for="Age" class="block">Age</label>
      <input
        type="number"
        class="rounded w-60 py-2 h-10 border-2 border-grey-200"
        name="Age"
        placeholder="Age"
        v-model.number="age"
        required
      />
      <div class="text-rose-500" data-test="ageError">
        {{ error.age }}
      </div>
    </div>

    <div class="self-center mt-5">
      <label for="location" class="block">Where do you live</label>
      <select
        class="rounded w-60 h-10 border-2 border-grey-200 bg-white"
        name="location"
        id="location"
        v-model="selectedLocation"
      >
        <option
          v-for="location in locations"
          :value="location.value"
          :key="location.value"
        >
          {{ location.name }}
        </option>
      </select>
    </div>
    <div class="self-center">
      <div
        v-for="(pack, index) in packages"
        :key="pack.value"
        class="self-start mt-5 w-60"
      >
        <input
          :id="pack.value"
          type="radio"
          :value="pack.value"
          v-model="selectedPackage"
        />
        <label :for="pack.value">
          {{ pack.name }} {{ packageAdditionalInfo[index] }}</label
        >
      </div>
    </div>

    <h1 data-test="premium" class="text-2xl font-bold self-center my-10">
      Your premium is {{ premium }}{{ this.currentLocation.currency }}
    </h1>

    <div class="self-center">
      <button
        @click="handleBack"
        data-test="backButton"
        class="rounded w-24 h-10 border-2 border-grey-900 text-black mx-2"
      >
        Back
      </button>
      <button
        @click="handleNext"
        data-test="nextButton"
        class="rounded w-24 h-10 bg-black text-white"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InsuranceForm",
  data() {
    return {
      name: "Long",
      age: 20,
      selectedLocation: "hongkong",
      selectedPackage: "standard",
      error: {
        name: "",
        age: "",
      },
      locations: [
        { name: "Hong Kong", currency: "HKD", value: "hongkong", rate: 1 },
        { name: "USA", currency: "USD", value: "usa", rate: 2 },
        { name: "Australia", currency: "AUD", value: "australia", rate: 3 },
      ],
      packages: [
        { value: "standard", name: "Standard", rate: 0 },
        { value: "safe", name: "Safe", rate: 0.5 },
        { value: "extra", name: "Extra", rate: 0.75 },
      ],
    }
  },

  methods: {
    checkFormError() {
      let error = false
      if (!this.name) {
        error = true
        this.error.name = "Name is required"
      }
      if (!this.age) {
        error = true
        this.error.age = "Age is required"
      }
      return error
    },
    handleNext() {
      const hasError = this.checkFormError()
      if (hasError) {
        return
      }

      if (this.age > 100) {
        this.$router.push("/age-error")
      }

      this.$emit("submit", {
        name: this.name,
        age: this.age,
        premium: this.premium,
        currency: this.currentLocation.currency,
        location: this.currentLocation.name,
        pack: this.selectedPackage,
      })
    },
    handleBack() {
      this.$router.push("/")
    },
  },
  computed: {
    currentLocation() {
      return this.locations.find(
        (location) => location.value === this.selectedLocation
      )
    },
    currentPackage() {
      return this.packages.find((pack) => pack.value === this.selectedPackage)
    },
    basePrice() {
      // based on age and location
      return 10 * (this.age || 0) * this.currentLocation.rate
    },
    premium() {
      return this.basePrice * (1 + this.currentPackage.rate)
    },
    packageAdditionalInfo() {
      return this.packages.map((pack) => {
        if (pack.value === "standard") return ""
        return `+(${this.basePrice * pack.rate}${
          this.currentLocation.currency
        }, ${pack.rate * 100}%)`
      })
    },
  },
}
</script>
