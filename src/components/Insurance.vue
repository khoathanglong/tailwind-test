<template>
  <div>
    <InsuranceForm @submit="handleSubmitForm" v-if="!showSummary" />
    <InsuranceSummary
      v-if="showSummary"
      :name="name"
      :age="age"
      :premium="premium"
      :currency="currency"
      :location="location"
      :pack="pack"
      @back="handleBack"
    />
  </div>
</template>

<script>
import InsuranceForm from "./InsuranceForm.vue"
import InsuranceSummary from "./InsuranceSummary.vue"
export default {
  name: "InsuranceComponent",
  components: {
    InsuranceSummary,
    InsuranceForm,
  },
  data() {
    return {
      showSummary: false,
      name: "",
      age: 0,
      premium: 0,
      currency: "",
      location: "",
      pack: "",
    }
  },
  methods: {
    handleSubmitForm({ name, age, premium, currency, location, pack }) {
      this.name = name
      this.age = age
      this.premium = premium
      this.currency = currency
      this.location = location
      this.pack = pack
      this.showSummary = true
    },
    handleBack() {
      this.showSummary = false
    },
  },
}
</script>
