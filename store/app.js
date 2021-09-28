export const state = () => ({
  // 屏幕模式
  isMobileBoo: false
})

export const mutations = {
  // 设置屏幕模式
  STE_IS_MOBILE_BOO: (state, data) => {
    state.isMobileBoo = data
  }
}

export const actions = {
}
