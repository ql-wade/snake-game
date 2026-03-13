# Snake-Game 多智能体开发项目

> **项目类型**: 多智能体协作演示
> **开发理念**: AI-Agent协作 · SDD规约驱动 · 渐进式开发
> **开发模式**: OpenSpec 规约驱动开发 (SDD)

---

## 项目定位

本项目用于演示多智能体协作开发能力，以经典贪吃蛇游戏为载体。

### 核心目标

| 目标 | 说明 |
|-----|------|
| **多智能体协作** | 演示多个 AI Agent 如何并行协作完成复杂任务 |
| **SDD 实践** | 验证 OpenSpec 规约驱动开发流程 |
| **Agent Orchestrator** | 验证 Agent Orchestrator 编排能力 |
| **代码质量** | 产出可维护、可扩展的高质量代码 |

---

## 技术栈

| 技术类别 | 具体技术 |
|---------|---------|
| **开发语言** | TypeScript |
| **运行环境** | Node.js + Browser |
| **构建工具** | Vite |
| **渲染引擎** | HTML Canvas |
| **版本控制** | Git + OpenSpec |
| **开发工具** | OpenCode + Claude Code + Agent Orchestrator |

---

## 项目结构

```
snake-game/
├── src/                    # 源代码
│   ├── core/              # 游戏核心逻辑 (Snake, Food, Game)
│   │   ├── Snake.ts
│   │   ├── Food.ts
│   │   ├── Game.ts
│   │   └── types.ts
│   ├── renderer/          # Canvas渲染
│   │   └── Renderer.ts
│   ├── input/             # 键盘输入处理
│   │   └── InputHandler.ts
│   └── main.ts            # 入口文件
├── tests/                 # 测试文件
├── openspec/              # OpenSpec 规约管理
│   ├── config.yaml
│   ├── project.md
│   ├── schemas/
│   ├── specs/
│   └── changes/
├── .opencode/             # OpenCode 配置
│   ├── skills/
│   └── commands/
└── .trinity-context.md    # Agent Orchestrator 桥接层
```

---

## 模块边界

### 模块划分

| 模块 | 职责 | 文件 |
|------|------|------|
| **Core** | 游戏核心逻辑 | `src/core/*` |
| **Renderer** | Canvas渲染 | `src/renderer/*` |
| **Input** | 键盘输入处理 | `src/input/*` |

### 接口契约

```typescript
// src/core/types.ts

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  score: number;
  isGameOver: boolean;
}

export interface IRenderer {
  render(state: GameState): void;
  clear(): void;
}

export interface IInputHandler {
  onDirectionChange(callback: (dir: Direction) => void): void;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}
```

---

## 项目约定

### 代码风格
- 使用 TypeScript strict 模式
- 每个类单独一个文件
- 函数和变量使用 camelCase
- 类和接口使用 PascalCase
- Git commit 使用 Conventional Commits

### 架构模式
- 模块化设计
- 关注点分离
- 依赖注入
- 事件驱动

### 测试策略
- 单元测试覆盖核心逻辑
- 使用 Vitest 测试框架
- 测试覆盖率目标: 80%+

---

## 多智能体协作计划

### Agent 分配

| Agent | 角色 | CLI | 负责模块 |
|-------|------|-----|---------|
| Agent 1 | 核心开发者 | Claude Code | `src/core/*` |
| Agent 2 | 渲染开发者 | OpenCode | `src/renderer/*` |
| Agent 3 | 输入开发者 | Claude Code | `src/input/*` |

### 并行开发流程

```
┌─────────────────────────────────────────────────────────┐
│                    Agent Orchestrator                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ Agent 1  │  │ Agent 2  │  │ Agent 3  │               │
│  │ (Core)   │  │ (Render) │  │ (Input)  │               │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘               │
│       │             │             │                      │
│       ▼             ▼             ▼                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ core/*   │  │renderer/*│  │ input/*  │               │
│  └──────────┘  └──────────┘  └──────────┘               │
│                                                          │
│              共享接口: src/core/types.ts                  │
└─────────────────────────────────────────────────────────┘
```

---

## 重要约束

- 所有产出物使用简体中文
- 遵循 OpenSpec 工作流规范
- 使用 Trinity Skills 管理变更
- 纯前端，无后端依赖
- 游戏帧率目标: 60 FPS

---

## 外部依赖

- Vite - 构建工具
- Vitest - 测试框架
- TypeScript - 类型系统
- Agent Orchestrator - 多Agent编排