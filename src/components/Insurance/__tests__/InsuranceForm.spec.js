import InsuranceForm from "../InsuranceForm"
import { mount } from "@vue/test-utils"

async function setValue({ wrapper, age, location, pack }) {
  await wrapper.find("input[name=Age]").setValue(age)
  const select = await wrapper.find("select").element
  select.value = location
  select.dispatchEvent(new Event("change"))
  await wrapper.find(`#${pack}`).setChecked()
}

describe("InsuranceForm", () => {
  test("returns to / when click back button", async () => {
    const mockRouter = {
      push: jest.fn(),
    }

    const wrapper = mount(InsuranceForm, {
      mocks: {
        $router: mockRouter,
      },
    })

    await wrapper.find("[data-test=backButton]").trigger("click")
    expect(mockRouter.push).toBeCalledWith("/")
  })

  test("shows name error when click Next button if name is not provided", async () => {
    const wrapper = mount(InsuranceForm)
    await wrapper.find("input[name=Name]").setValue("")
    await wrapper.find("[data-test=nextButton]").trigger("click")
    expect(wrapper.find("[data-test=nameError]").text()).toContain(
      "Name is required"
    )
  })

  test("shows age error when click Next button if age is not provided", async () => {
    const wrapper = mount(InsuranceForm)
    await wrapper.find("input[name=Age]").setValue(null)
    await wrapper.find("[data-test=nextButton]").trigger("click")
    expect(wrapper.find("[data-test=ageError]").text()).toContain(
      "Age is required"
    )
  })

  test("redirects to age-error page if age > 100", async () => {
    const mockRouter = {
      push: jest.fn(),
    }

    const wrapper = mount(InsuranceForm, {
      mocks: {
        $router: mockRouter,
      },
    })
    await wrapper.find("input[name=Age]").setValue(101)
    await wrapper.find("input[name=Name]").setValue("John Doe")
    await wrapper.find("[data-test=nextButton]").trigger("click")

    expect(mockRouter.push).toBeCalledWith("/age-error")
  })

  test("emits submit event if age and name are provided", async () => {
    const mockEmit = jest.fn()
    const wrapper = mount(InsuranceForm, {
      mocks: {
        $emit: mockEmit,
      },
    })
    await wrapper.find("input[name=Name]").setValue("John Doe")
    await setValue({ wrapper, age: 10, location: "hongkong", pack: "standard" })
    await wrapper.find("[data-test=nextButton]").trigger("click")

    expect(mockEmit).toBeCalledWith("submit", {
      age: 10,
      name: "John Doe",
      currency: "HKD",
      pack: "standard",
      location: "Hong Kong",
      premium: 100,
    })
  })

  test("shows correct package option labels based on location", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({ wrapper, age: 10, location: "hongkong", pack: "standard" })
    expect(wrapper.html()).toMatchSnapshot()
    await setValue({ wrapper, location: "usa", pack: "standard", age: 10 })
    expect(wrapper.html()).toMatchSnapshot()
    await setValue({
      wrapper,
      location: "australia",
      pack: "standard",
      age: 10,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test("shows correct premium for Standard Package in Hong Kong", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({ wrapper, age: 10, location: "hongkong", pack: "standard" })
    expect(wrapper.find("[data-test=premium]").text()).toContain("100HKD")
  })

  test("shows correct premium for Safe Package in Hong Kong", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({ wrapper, age: 10, location: "hongkong", pack: "safe" })
    expect(wrapper.find("[data-test=premium]").text()).toContain("150HKD")
  })

  test("shows correct premium for Extra Package in Hong Kong", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({ wrapper, age: 10, location: "hongkong", pack: "extra" })
    expect(wrapper.find("[data-test=premium]").text()).toContain("175HKD")
  })

  test("shows correct premium for Standard Package in USA", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({ wrapper, age: 10, location: "usa", pack: "standard" })
    expect(wrapper.find("[data-test=premium]").text()).toContain("200USD")
  })

  test("shows correct premium for Safe Package in USA", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({ wrapper, age: 10, location: "usa", pack: "safe" })
    expect(wrapper.find("[data-test=premium]").text()).toContain("300USD")
  })

  test("shows correct premium for Extra Package in USA", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({ wrapper, age: 10, location: "usa", pack: "extra" })
    expect(wrapper.find("[data-test=premium]").text()).toContain("350USD")
  })

  test("shows correct premium for Standard Package in Australia", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({
      wrapper,
      age: 10,
      location: "australia",
      pack: "standard",
    })
    expect(wrapper.find("[data-test=premium]").text()).toContain("300AUD")
  })

  test("shows correct premium for Safe Package in Australia", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({
      wrapper,
      age: 10,
      location: "australia",
      pack: "safe",
    })
    expect(wrapper.find("[data-test=premium]").text()).toContain("450AUD")
  })

  test("shows correct premium for Extra Package in Australia and renders", async () => {
    const wrapper = mount(InsuranceForm)
    await setValue({
      wrapper,
      age: 10,
      location: "australia",
      pack: "extra",
    })
    expect(wrapper.find("[data-test=premium]").text()).toContain("525AUD")
  })
})
