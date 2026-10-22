import Vue from 'vue'
import { state } from '/src/store'

// 这个设置来控制组件键入动画

const media = window.matchMedia('(prefers-reduced-motion: reduce)')
export const motion = Vue.observable({ systemReduced: media.matches })
const pending = new Map()
let observer

export const motionAllowed = () => !state.settings.reducedMotion && !motion.systemReduced

function reveal(element) {
  element.classList.remove('reveal-pending')
  element.classList.add('reveal-visible')
  if (observer) observer.unobserve(element)
  pending.delete(element)
}

export function finishReveals() {
  Array.from(pending.keys()).forEach(reveal)
}

const changed = (event) => {
  motion.systemReduced = event.matches
  if (event.matches) finishReveals()
}
if (media.addEventListener) media.addEventListener('change', changed)
else media.addListener(changed)

function prepare(element) {
  if (!motionAllowed() || !('IntersectionObserver' in window)) return
  if (!observer)
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target)
        })
      },
      { threshold: 0.06 }
    )
  const selector =
    '.page-heading, .filter-bar, .course-card, .right-rail > .panel, .settings-grid > .panel, .content-with-aside > section > .panel, .plan-task, .mistake-detail, .document-panel, .chat-panel'
  const elements = Array.from(element.querySelectorAll(selector))
  // 被选中的祖先已有动画时，不再对内部卡片叠加一次。
  const topLevel = elements.filter(
    (candidate) => !elements.some((parent) => parent !== candidate && parent.contains(candidate))
  )
  topLevel.forEach((target, index) => {
    if (target.classList.contains('reveal-visible')) return
    target.style.setProperty('--reveal-delay', Math.min(index * 45, 225) + 'ms')
    target.classList.add('motion-reveal', 'reveal-pending')
    pending.set(target, element)
    observer.observe(target)
  })
}

export const pageReveal = {
  inserted: prepare,
  unbind(element) {
    for (const [target, owner] of pending) {
      if (owner === element) {
        if (observer) observer.unobserve(target)
        pending.delete(target)
      }
    }
  }
}
