/**
 * Snake Game - 核心类型定义
 *
 * 此文件定义了所有模块共享的接口契约
 * 其他模块（renderer, input）必须依赖此文件
 */

/**
 * 2D 坐标位置
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * 游戏状态快照
 */
export interface GameState {
  /** 蛇身体各节的位置，索引 0 为头部 */
  snake: Position[];
  /** 食物位置 */
  food: Position;
  /** 当前分数 */
  score: number;
  /** 游戏是否结束 */
  isGameOver: boolean;
}

/**
 * 移动方向枚举
 */
export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

/**
 * 渲染器接口
 * 由 renderer 模块实现
 */
export interface IRenderer {
  /** 渲染当前游戏状态 */
  render(state: GameState): void;
  /** 清空画布 */
  clear(): void;
}

/**
 * 输入处理器接口
 * 由 input 模块实现
 */
export interface IInputHandler {
  /** 注册方向变化回调 */
  onDirectionChange(callback: (dir: Direction) => void): void;
}

/**
 * 游戏配置
 */
export interface GameConfig {
  /** 网格宽度（格子数） */
  gridWidth: number;
  /** 网格高度（格子数） */
  gridHeight: number;
  /** 游戏速度（毫秒/帧） */
  gameSpeed: number;
  /** 初始蛇长度 */
  initialSnakeLength: number;
}

/**
 * 默认游戏配置
 */
export const DEFAULT_GAME_CONFIG: GameConfig = {
  gridWidth: 20,
  gridHeight: 20,
  gameSpeed: 150,
  initialSnakeLength: 3
};
