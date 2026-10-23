import { motionAllowed } from '../utils/motion'

export default {
  props: {
    value: { type: Number, default: 0 },
    duration: { type: Number, default: 800 }
  },
  data() {
    return { tweenValue: motionAllowed() ? 0 : this.value, hasAppeared: false }
  },
  computed: {
    allowMotion() {
      return motionAllowed()
    }
  },
  mounted() {
    if (!this.allowMotion || !('IntersectionObserver' in window)) {
      this.hasAppeared = true
      this.finishTween()
      return
    }
    this.valueObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.hasAppeared = true
          this.valueObserver.disconnect()
          this.animateValue()
        }
      },
      { threshold: 0.15 }
    )
    this.valueObserver.observe(this.$el)
  },
  beforeDestroy() {
    cancelAnimationFrame(this.valueFrame)
    if (this.valueObserver) this.valueObserver.disconnect()
  },
  watch: {
    value() {
      if (this.hasAppeared) this.animateValue()
      else if (!this.allowMotion) this.finishTween()
    },
    allowMotion(allowed) {
      if (!allowed) this.finishTween()
    }
  },
  methods: {
    // 完成动画
    finishTween() {
      cancelAnimationFrame(this.valueFrame)
      this.tweenValue = this.value
    },
    // 创建动画函数
    animateValue() {
      cancelAnimationFrame(this.valueFrame)
      if (!this.allowMotion || this.duration <= 0) {
        this.finishTween()
        return
      }
    //   动画设置开始时间
      const startValue = this.tweenValue,
        target = this.value
      const duration = Math.min(1800, this.duration),
        start = performance.now()
      const tick = (now) => {
        const fraction = Math.min(1, (now - start) / duration)
        this.tweenValue = startValue + (target - startValue) * (1 - Math.pow(1 - fraction, 3))
        if (fraction < 1) this.valueFrame = requestAnimationFrame(tick)
        else this.tweenValue = target
      }
      this.valueFrame = requestAnimationFrame(tick)
    }
  }
}
