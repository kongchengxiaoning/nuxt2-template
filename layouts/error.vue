<template>
  <div class="error-container">
    <h2 class="error-code align-center">
      {{ error.statusCode }}
    </h2>
    <p class="error-text align-center">
      {{ error.message }}
    </p>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: { // 你可以为错误页面指定自定义的布局
    error: {
      type: [String, Object],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 200px;

  .error-code {
    font-size: 30px;
  }
}
</style>
