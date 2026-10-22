export const initialCourses = [
  {
    id: 'linear',
    name: '线性代数',
    chapter: '第三章 · 特征值与特征向量',
    description: '从线性方程组、矩阵到特征值与特征向量，建立线性代数的核心知识体系。',
    teacher: '王老师',
    progress: 67,
    lessons: 18,
    cover: 'linear',
    archived: false
  },
  {
    id: 'structures',
    name: '数据结构',
    chapter: '第四章 · 树与二叉树',
    description: '从线性表、栈与队列到树与图，掌握数据结构的基本思想与常用算法。',
    teacher: '李老师',
    progress: 42,
    lessons: 19,
    cover: 'structures',
    archived: false
  },
  {
    id: 'english',
    name: '大学英语',
    chapter: '第三单元 · 学术写作与阅读',
    description: '读懂学术文本，在表达与练习中积累语言能力。',
    teacher: '陈老师',
    progress: 38,
    lessons: 16,
    cover: 'english',
    archived: false
  },
  {
    id: 'calculus',
    name: '高等数学',
    chapter: '第六章 · 多元函数微分学',
    description: '从变化中发现规律，理解微积分的基本思想。',
    teacher: '张老师',
    progress: 100,
    lessons: 18,
    cover: 'linear',
    archived: true
  }
]
export const initialMaterials = [
  {
    id: 'sample-linear',
    courseId: 'linear',
    name: '线性代数 第三章 讲义.txt',
    type: 'TXT',
    sample: true,
    text: '3.2 特征值与特征向量\n\n定义 3.1 对角矩阵的特征值，就是主对角线上的元素。\n\n设 A 是一个 n 阶对角矩阵，记为 A = diag(a₁, a₂, …, aₙ)。则 A 的特征值为 a₁, a₂, …, aₙ，对应的特征向量分别为标准基向量。\n\n例 3.1 考虑二阶对角矩阵 A = diag(2, 3)。根据定义，其特征值分别为 2 和 3。\n\n特征向量满足 Av = λv，其中 v 为非零向量。',
    size: '示例文本',
    created: '示例资料'
  },
  {
    id: 'sample-tree',
    courseId: 'structures',
    name: '树与二叉树 课堂笔记.txt',
    type: 'TXT',
    sample: true,
    text: '二叉树是每个节点最多有两个子节点的树结构。\n\n前序遍历：根节点 → 左子树 → 右子树。\n中序遍历：左子树 → 根节点 → 右子树。\n后序遍历：左子树 → 右子树 → 根节点。\n\n栈遵循后进先出原则，队列遵循先进先出原则。',
    size: '示例文本',
    created: '示例资料'
  }
]
export const questions = [
  {
    id: 'q1',
    title: '设矩阵 A 为对角矩阵 diag(2, 3)，它的特征值是什么？',
    options: ['0 和 1', '2 和 3', '1 和 5', '只有 2'],
    answer: 1,
    point: '特征值',
    explanation: '对角矩阵的特征值就是主对角线上的元素，所以 diag(2, 3) 的特征值分别为 2 和 3。',
    source: 'sample-linear'
  },
  {
    id: 'q2',
    title: '特征向量 v 需要满足哪一个条件？',
    options: ['v 必须为零向量', 'Av = λv，且 v 不为零向量', 'v 必须为单位向量', 'A 必须为单位矩阵'],
    answer: 1,
    point: '特征向量',
    explanation: '特征向量是使 Av = λv 成立的非零向量，λ 是对应的特征值。',
    source: 'sample-linear'
  },
  {
    id: 'q3',
    title: '二阶单位矩阵的特征值是什么？',
    options: ['都是 0', '都是 1', '一个 0，一个 1', '无法确定'],
    answer: 1,
    point: '特征值',
    explanation: '单位矩阵是主对角线上元素均为 1 的对角矩阵，因此特征值都是 1。',
    source: 'sample-linear'
  },
  {
    id: 'q4',
    title: '矩阵 A = diag(4, 7) 作用于标准基向量 e₁ 时，结果为？',
    options: ['7e₁', '4e₁', 'e₂', '零向量'],
    answer: 1,
    point: '特征向量',
    explanation: '对角矩阵在第一个标准基向量方向上的缩放系数是 4，因此 Ae₁ = 4e₁。',
    source: 'sample-linear'
  },
  {
    id: 'q5',
    title: '矩阵 diag(−1, 5) 的两个特征值之和为？',
    options: ['−5', '6', '4', '5'],
    answer: 2,
    point: '特征值',
    explanation: '主对角线上的两个元素就是特征值，−1 + 5 = 4。',
    source: 'sample-linear'
  }
]
export const initialTasks = [
  {
    id: 't1',
    title: '回顾特征值与特征向量',
    description: '阅读讲义，整理对角矩阵的性质',
    minutes: 15,
    date: '',
    done: false,
    target: '/app/courses/linear'
  },
  {
    id: 't2',
    title: '完成 5 道巩固练习',
    description: '用一道题检验一个知识点',
    minutes: 12,
    date: '',
    done: false,
    target: '/app/practice'
  },
  {
    id: 't3',
    title: '回看本周学习记录',
    description: '发现需要继续巩固的内容',
    minutes: 5,
    date: '',
    done: false,
    target: '/app/reports'
  }
]
