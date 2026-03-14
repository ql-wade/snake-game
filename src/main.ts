/**
 * 游戏入口文件
 *
 * 初始化游戏、渲染器和输入处理器
 */

import { Game, IRenderer, IInputHandler, GameState, Direction } from './core';

// 简单的 Canvas 渲染器实现
class CanvasRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cellSize: number;
  private scoreElement: HTMLElement;
  private gameOverElement: HTMLElement;

  constructor(canvasId: string, cellSize: number = 20) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.cellSize = cellSize;
    this.scoreElement = document.getElementById('score')!;
    this.gameOverElement = document.getElementById('game-over')!;
  }

  render(state: GameState): void {
    this.clear();

    // 更新分数显示
    this.scoreElement.textContent = `分数: ${state.score}`;

    // 显示/隐藏游戏结束
    this.gameOverElement.style.display = state.isGameOver ? 'block' : 'none';

    // 绘制食物
    this.drawFood(state.food);

    // 绘制蛇
    this.drawSnake(state.snake);
  }

  clear(): void {
    this.ctx.fillStyle = '#16213e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawSnake(snake: { x: number; y: number }[]): void {
    snake.forEach((segment, index) => {
      // 蛇头用不同颜色
      if (index === 0) {
        this.ctx.fillStyle = '#4ecca3';
      } else {
        this.ctx.fillStyle = '#45b393';
      }

      this.ctx.fillRect(
        segment.x * this.cellSize + 1,
        segment.y * this.cellSize + 1,
        this.cellSize - 2,
        this.cellSize - 2
      );
    });
  }

  private drawFood(food: { x: number; y: number }): void {
    this.ctx.fillStyle = '#e94560';
    this.ctx.beginPath();
    this.ctx.arc(
      food.x * this.cellSize + this.cellSize / 2,
      food.y * this.cellSize + this.cellSize / 2,
      this.cellSize / 2 - 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }
}

// 简单的输入处理器实现
class KeyboardInputHandler implements IInputHandler {
  private callback: ((dir: Direction) => void) | null = null;

  onDirectionChange(callback: (dir: Direction) => void): void {
    this.callback = callback;
    this.setupListeners();
  }

  private setupListeners(): void {
    document.addEventListener('keydown', (e) => {
      if (!this.callback) return;

      let direction: Direction | null = null;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = Direction.UP;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = Direction.DOWN;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = Direction.LEFT;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = Direction.RIGHT;
          break;
      }

      if (direction) {
        e.preventDefault();
        this.callback(direction);
      }
    });
  }
}

// 初始化游戏
function initGame(): void {
  const cellSize = 20;
  const gridWidth = 20;
  const gridHeight = 20;

  // 创建游戏实例
  const game = new Game({
    gridWidth,
    gridHeight,
    gameSpeed: 150,
    initialSnakeLength: 3
  });

  // 设置渲染器
  const renderer = new CanvasRenderer('game-canvas', cellSize);
  game.setRenderer(renderer);

  // 设置输入处理器
  const inputHandler = new KeyboardInputHandler();
  game.setInputHandler(inputHandler);

  // 空格键暂停/继续
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (game.checkIsGameOver()) {
        game.reset();
        game.start();
      } else {
        // 简单的暂停切换（需要扩展 Game 类）
      }
    }
  });

  // 启动游戏
  game.start();
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', initGame);
