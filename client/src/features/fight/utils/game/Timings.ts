export class Timings {
  /**
   * value in milliseconds
   */
  static attackingDuration = 500;

  /**
   * value in milliseconds
   */
  static attackedDuration = 200;

  /**
   * value in milliseconds
   */
  static attackedDelay = this.attackingDuration - this.attackedDuration;

  /**
   * value in milliseconds
   */
  static turnDelay = this.attackingDuration * 3;

  /**
   * value in milliseconds
   */
  static roundDelay = this.turnDelay;
}
