/**
 * Game 类 - 游戏主控制器
 *
 * 整合 Snake、Food，管理游戏状态和主循环
 */

import { Snake } from './Snake';
import { Food } from './Food';
import {
  GameState,
  Direction,
  IRenderer,
  IInputHandler,
  GameConfig,
  DEFAULT_GAME_CONFIG,
  Position
} from './types';

export class Game {
  private snake: Snake;
  private food: Food;
  private config: GameConfig;
  private renderer: IRenderer | null = null;
  private inputHandler: IInputHandler | null = null;
  private gameLoop: number | null = null;
  private isRunning: boolean = false;
  private isGameOver: boolean = false;
  private score: number = 0;

  /**
   * 创建游戏实例
   * @param config 游戏配置
   */
  constructor(config: Partial<GameConfig> = {}) {
    this.config = { ...DEFAULT_GAME_CONFIG, ...config };

    // 初始化蛇，放在网格中央
    const centerX = Math.floor(this.config.gridWidth / 2);
    const centerY = Math.floor(this.config.gridHeight / 2);
    this.snake = new Snake(
      { x: centerX, y: centerY },
      this.config.initialSnakeLength
    );

    // 初始化食物
    this.food = new Food(this.config.gridWidth, this.config.gridHeight);
    this.food.respawn(this.snake.getBody());
  }

  /**
   * 设置渲染器
   */
  setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  /**
   * 设置输入处理器
   */
  setInputHandler(inputHandler: IInputHandler): void {
    this.inputHandler = inputHandler;
    this.inputHandler.onDirectionChange((dir) => {
      this.handleDirectionChange(dir);
    });
  }

  /**
   * 获取当前游戏状态
   */
  getState(): GameState {
    return {
      snake: this.snake.getBody(),
      food: this.food.getPosition(),
      score: this.score,
      isGameOver: this.isGameOver
    };
  }

  /**
   * 获取当前分数
   */
  getScore(): number {
    return this.score;
  }

  /**
   * 检查游戏是否结束
   */
  checkIsGameOver(): boolean {
    return this.isGameOver;
  }

  /**
   * 启动游戏
   */
  start(): void {
    if (this.isRunning || this.isGameOver) {
      return;
    }

    this.isRunning = true;
    this.gameLoop = window.setInterval(() => {
      this.update();
    }, this.config.gameSpeed);

    // 渲染初始状态
    this.render();
  }

  /**
   * 暂停游戏
   */
  pause(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    if (this.gameLoop !== null) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
  }

  /**
   * 恢复游戏
   */
  resume(): void {
    if (this.isRunning || this.isGameOver) {
      return;
    }

    this.start();
  }

  /**
   * 重置游戏
   */
  reset(): void {
    this.pause();

    // 重置分数和状态
    this.score = 0;
    this.isGameOver = false;

    // 重新初始化蛇
    const centerX = Math.floor(this.config.gridWidth / 2);
    const centerY = Math.floor(this.config.gridHeight / 2);
    this.snake = new Snake(
      { x: centerX, y: centerY },
      this.config.initialSnakeLength
    );

    // 重新初始化食物
    this.food = new Food(this.config.gridWidth, this.config.gridHeight);
    this.food.respawn(this.snake.getBody());

    // 渲染重置后的状态
    this.render();
  }

  /**
   * 游戏主更新逻辑
   */
  private update(): void {
    if (this.isGameOver) {
      return;
    }

    // 移动蛇
    const newHead = this.snake.move();

    // 检查碰撞
    if (this.checkCollision(newHead)) {
      this.endGame();
      return;
    }

    // 检查是否吃到食物
    if (this.food.isAt(newHead)) {
      this.snake.grow();
      this.score += 10;
      this.food.respawn(this.snake.getBody());
    }

    // 渲染
    this.render();
  }

  /**
   * 检查碰撞（墙壁和自身）
   */
  private checkCollision(position: Position): boolean {
    // 检查墙壁碰撞
    if (
      position.x < 0 ||
      position.x >= this.config.gridWidth ||
      position.y < 0 ||
      position.y >= this.config.gridHeight
    ) {
      return true;
    }

    // 检查自身碰撞
    if (this.snake.checkCollision(position, true)) {
      return true;
    }

    return false;
  }

  /**
   * 处理方向变化
   */
  private handleDirectionChange(direction: Direction): void {
    if (this.isGameOver) {
      return;
    }
    this.snake.setDirection(direction);
  }

  /**
   * 结束游戏
   */
  private endGame(): void {
    this.isGameOver = true;
    this.pause();
    this.render();
  }

  /**
   * 渲染当前状态
   */
  private render(): void {
    if (this.renderer) {
      this.renderer.render(this.getState());
    }
  }
}
