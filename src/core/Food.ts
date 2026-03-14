/**
 * Food 类 - 食物实体
 *
 * 管理食物的位置和生成逻辑
 */

import { Position } from './types';

export class Food {
  private position: Position;
  private gridWidth: number;
  private gridHeight: number;

  /**
   * 创建食物实例
   * @param gridWidth 网格宽度
   * @param gridHeight 网格高度
   * @param initialPosition 初始位置（可选，不提供则随机生成）
   */
  constructor(
    gridWidth: number,
    gridHeight: number,
    initialPosition?: Position
  ) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;

    if (initialPosition) {
      this.position = { ...initialPosition };
    } else {
      this.position = this.generateRandomPosition();
    }
  }

  /**
   * 获取食物位置
   */
  getPosition(): Position {
    return { ...this.position };
  }

  /**
   * 重新生成食物位置
   * @param occupiedPositions 被占用的位置列表（如蛇身体）
   */
  respawn(occupiedPositions: Position[]): void {
    let newPosition: Position;
    let attempts = 0;
    const maxAttempts = this.gridWidth * this.gridHeight;

    do {
      newPosition = this.generateRandomPosition();
      attempts++;
    } while (
      this.isPositionOccupied(newPosition, occupiedPositions) &&
      attempts < maxAttempts
    );

    this.position = newPosition;
  }

  /**
   * 检查指定位置是否与食物位置相同
   * @param position 要检查的位置
   */
  isAt(position: Position): boolean {
    return (
      this.position.x === position.x && this.position.y === position.y
    );
  }

  /**
   * 生成随机位置
   */
  private generateRandomPosition(): Position {
    return {
      x: Math.floor(Math.random() * this.gridWidth),
      y: Math.floor(Math.random() * this.gridHeight)
    };
  }

  /**
   * 检查位置是否被占用
   */
  private isPositionOccupied(
    position: Position,
    occupiedPositions: Position[]
  ): boolean {
    return occupiedPositions.some(
      (occupied) => occupied.x === position.x && occupied.y === position.y
    );
  }
}
