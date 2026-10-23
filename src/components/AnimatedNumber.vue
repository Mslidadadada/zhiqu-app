<template>
  <span class="animated-number">
    <span aria-hidden="true">{{ Math.round(tweenValue) }}</span>
    <span class="sr-only">{{ value }}</span>
  </span>
</template>
<script>
import animatedValue from '../mixins/animatedValue'
export default { name: 'AnimatedNumber', mixins: [animatedValue] }
</script>

<style lang="less" scoped>
@import '../styles/tokens.less';

/* 本组件的布局、状态、动效与响应式样式。 */

.animated-number {
  font-variant-numeric: tabular-nums;
}
</style>
