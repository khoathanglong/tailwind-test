import Greeting from "../Greeting"
import { mount } from "@vue/test-utils"

test("Greeting redirect correctly", async () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const wrapper = mount(Greeting, {
    mocks: {
      $router: mockRouter,
    },
  })
  await wrapper.find("button").trigger("click")

  expect(mockRouter.push).toBeCalledWith("/insurance")
})
