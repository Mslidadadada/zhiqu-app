<template>
    <!-- 开屏主屏幕 -->
  <main class="splash-page" :class="{ 'is-entering': entering }">
    <PublicHeader>
      <BrandLogo /><router-link to="/welcome" class="text-button">跳过开屏
        <AppIcon name="arrow" :size="17" />
      </router-link>
    </PublicHeader>
    <div class="splash-content">
      <span class="eyebrow">让每一份知识，找到它的位置</span>
      <h1>{{ ready ? '你的学习空间，已准备就绪' : '让知识，逐页归位' }}</h1>
      <p>{{ ready ? '从课程资料出发，连接理解与每一次进步。' : '正在准备你的学习空间' }}</p>
      <BookStage :state="entering ? 'graph' : ready ? 'ready' : 'idle'" />
      <div class="loading-meta">
        <span>{{
          failed.length ? '部分资源加载失败' : ready ? '必要资源准备完成' : '正在准备首屏必要配图'
          }}</span>
          <span>{{ done }} / {{ resources.length }}</span>
      </div>
      <div class="progress-track">
        <i :style="{ width: (done / resources.length) * 100 + '%' }" />
      </div>
      <div class="loading-steps">
        <span :class="{ done: done >= 1 }">
          <AppIcon name="book" :size="16" />书页舞台
        </span>
        <span :class="{ done: done >= 3 }">
          <AppIcon name="graph" :size="16" />知识连接
        </span>
        <span :class="{ done: ready }">
          <AppIcon name="check" :size="16" />学习空间
        </span>
      </div>
      <button v-if="failed.length" class="button secondary" @click="load">重试失败资源</button><button v-else
        class="button primary splash-enter" :disabled="!ready || entering" @click="enter">
        {{ entering ? '正在展开学习空间' : ready ? '进入知序' : '正在准备'
        }}
        <AppIcon name="arrow" />
      </button>
      <p class="muted small">准备首屏资源，课程与资料进入后按需加载</p>
    </div>
    <PublicFooter>
      <span>知序 · 从理解到掌握</span>
      <button class="text-button" @click="toggleMotion">
        <AppIcon name="spark" :size="14" />{{
          state.settings.reducedMotion ? '已减少动态效果' : '减少动态效果'
        }}
      </button>
    </PublicFooter>
  </main>
</template>
<script>
import PublicHeader from '../components/PublicHeader.vue'
import PublicFooter from '../components/PublicFooter.vue'
import BrandLogo from '../components/BrandLogo.vue'
import BookStage from '../components/BookStage.vue'
import { asset } from '../utils/assets'
import { state, persist } from '../store'
export default {
  name: 'Splash',
  components: { PublicHeader, PublicFooter, BrandLogo, BookStage },
  data: () => ({
    state,
    resources: ['book', 'cards', 'ready', 'graph', 'planet'],
    done: 0,
    failed: [],
    entering: false,
    alive: true,
    run: 0
  }),
  computed: {
    ready() {
      return this.done === this.resources.length && !this.failed.length
    }
  },
  mounted() {
    this.load()
  },
  beforeDestroy() {
    this.alive = false
    clearTimeout(this.transitionTimer)
  },
  methods: {
    load() {
      this.done = 0
      this.failed = []
      const run = ++this.run
      this.resources.forEach((name) => {
        const img = new Image()
        const complete = (ok) => {
          if (!this.alive || run !== this.run) return
          if (ok) this.done++
          else this.failed.push(name)
        }
        img.onload = () => complete(true)
        img.onerror = () => complete(false)
        img.src = asset(name)
      })
    },
    enter() {
      if (!this.ready || this.entering) return
      this.entering = true
      this.transitionTimer = setTimeout(
        () => this.$router.push('/welcome'),
        state.settings.reducedMotion || matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 0
          : 600
      )
    },
    toggleMotion() {
      state.settings.reducedMotion = !state.settings.reducedMotion
      persist()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/tokens.less';

/* 本组件的布局、状态、动效与响应式样式。 */

.splash-page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(ellipse at 50% 40%, #0a3154 0%, #061a2d 45%, #031220 85%);

  .splash-content {
    text-align: center;
    flex: 1;
    width: min(850px, 90%);
    margin: 12px auto 0;
    position: relative;

    h1 {
      font-size: clamp(25px, 3.1vw, 42px);
    }

    >p {
      color: #9abbd7;
    }

    .book-stage {
      width: min(700px, 100%);
      margin: -35px auto -50px;
    }

    .progress-track {
      width: 360px;
      max-width: 90%;
      height: 4px;
      margin: 10px auto 18px;

      >i {
        background: @cyan;
      }
    }

    .loading-meta {
      width: 360px;
      max-width: 90%;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #b6d2ed;
      margin: 0 auto;
    }

    .loading-steps {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 12px 0 24px;
      font-size: 12px;
      color: #587d9e;

      span {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .done {
        color: #55d6f1;
      }
    }

    .splash-enter {
      min-width: 260px;
      background: linear-gradient(90deg, #008cff, #00b9ee);
      margin-bottom: 14px;
    }

    .eyebrow {
      margin-bottom: 10px;
    }
  }

  .public-footer {
    margin-top: 24px;
  }

  &.is-entering .book-stage {
    transition:
      transform 0.6s ease,
      opacity 0.6s;
    transform: scale(1.12);
    opacity: 0.5;
  }
}

@media (max-width: 767px) {
  .splash-page {
    .splash-content {
      margin-top: 7dvh;
      width: 100%;
      padding: 0 20px;

      h1 {
        font-size: 27px;
        margin-bottom: 12px;
      }

      >p {
        font-size: 12px;
      }

      .eyebrow {
        font-size: 11px;
      }

      .book-stage {
        margin: 12px -10% -8px;
        width: 120%;
        max-width: none;
      }

      .loading-steps {
        gap: 12px;
        font-size: 10px;
      }

      .splash-enter {
        min-width: 240px;
      }

      .loading-meta,
      .progress-track {
        max-width: 85%;
      }
    }

    .public-footer {
      margin-top: auto;
    }
  }
}

@media (max-width: 380px) {
  .splash-page .splash-content h1 {
    font-size: 24px;
  }
}
</style>