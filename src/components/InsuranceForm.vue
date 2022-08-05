<template>
  <div>
    <h1>Tell us about your self</h1>
    <div>
      <label for="Name">Name</label>
      <input
        type="text"
        name="Name"
        placeholder="Add text"
        v-model="name"
        required
      />
      <div v-if="error.name" data-test="nameError">{{ error.name }}</div>
    </div>
    <div>
      <label for="Age">Age</label>
      <input
        type="number"
        name="Age"
        placeholder="Age"
        v-model.number="age"
        required
      />
      <div v-if="error.age" data-test="ageError">{{ error.age }}</div>
    </div>

    <label for="location">Where do you live</label>
    <select name="location" id="location" v-model="selectedLocation">
      <option
        v-for="location in locations"
        :value="location.value"
        :key="location.value"
      >
        {{ location.name }}
      </option>
    </select>
    <div v-for="(pack, index) in packages" :key="pack.value">
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

    <h1 data-test="premium">
      Your premium is {{ premium }}{{ this.currentLocation.currency }}
    </h1>

    <button @click="handleBack" data-test="backButton">Back</button>
    <button @click="handleNext" data-test="nextButton">Next</button>
  </div>
</template>

<script>
export default {
  name: "InsuranceForm",
  data() {
    return {
      name: "",
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
