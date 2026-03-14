/**
 * Snake 类 - 贪吃蛇实体
 *
 * 管理蛇的状态、移动和生长逻辑
 */

import { Position, Direction } from './types';

export class Snake {
  private body: Position[];
  private currentDirection: Direction;
  private nextDirection: Direction;
  private growPending: boolean = false;

  /**
   * 创建蛇实例
   * @param initialPosition 初始头部位置
   * @param initialLength 初始长度
   */
  constructor(initialPosition: Position, initialLength: number = 3) {
    // 初始化蛇身体，水平向右排列
    this.body = [];
    for (let i = 0; i < initialLength; i++) {
      this.body.push({
        x: initialPosition.x - i,
        y: initialPosition.y
      });
    }

    this.currentDirection = Direction.RIGHT;
    this.nextDirection = Direction.RIGHT;
  }

  /**
   * 获取蛇身体各节位置
   */
  getBody(): Position[] {
    return [...this.body];
  }

  /**
   * 获取蛇头位置
   */
  getHead(): Position {
    return { ...this.body[0] };
  }

  /**
   * 获取当前移动方向
   */
  getDirection(): Direction {
    return this.currentDirection;
  }

  /**
   * 设置下一个移动方向
   * @param direction 目标方向
   */
  setDirection(direction: Direction): void {
    // 防止 180 度转向
    if (this.isOppositeDirection(direction)) {
      return;
    }
    this.nextDirection = direction;
  }

  /**
   * 移动蛇
   * @returns 移动后的新头部位置
   */
  move(): Position {
    // 更新方向
    this.currentDirection = this.nextDirection;

    // 计算新头部位置
    const head = this.body[0];
    const newHead = this.calculateNewHead(head);

    // 在头部添加新位置
    this.body.unshift(newHead);

    // 如果没有待生长，移除尾部
    if (!this.growPending) {
      this.body.pop();
    } else {
      this.growPending = false;
    }

    return newHead;
  }

  /**
   * 触发生长（吃到食物时调用）
   */
  grow(): void {
    this.growPending = true;
  }

  /**
   * 检查指定位置是否与蛇身碰撞（不含头部）
   * @param position 要检查的位置
   * @param excludeHead 是否排除头部
   */
  checkCollision(position: Position, excludeHead: boolean = true): boolean {
    const startIndex = excludeHead ? 1 : 0;
    for (let i = startIndex; i < this.body.length; i++) {
      const segment = this.body[i];
      if (segment.x === position.x && segment.y === position.y) {
        return true;
      }
    }
    return false;
  }

  /**
   * 获取蛇的长度
   */
  getLength(): number {
    return this.body.length;
  }

  /**
   * 计算新头部位置
   */
  private calculateNewHead(head: Position): Position {
    const newHead = { ...head };

    switch (this.currentDirection) {
      case Direction.UP:
        newHead.y -= 1;
        break;
      case Direction.DOWN:
        newHead.y += 1;
        break;
      case Direction.LEFT:
        newHead.x -= 1;
        break;
      case Direction.RIGHT:
        newHead.x += 1;
        break;
    }

    return newHead;
  }

  /**
   * 检查是否为相反方向
   */
  private isOppositeDirection(direction: Direction): boolean {
    const opposites: Record<Direction, Direction> = {
      [Direction.UP]: Direction.DOWN,
      [Direction.DOWN]: Direction.UP,
      [Direction.LEFT]: Direction.RIGHT,
      [Direction.RIGHT]: Direction.LEFT
    };

    return opposites[direction] === this.currentDirection;
  }
}
