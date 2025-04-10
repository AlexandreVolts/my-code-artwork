export abstract class Env {
  private static readonly SIZE = 1000;
  public static readonly TABLE_WIDTH = 280;
  public static readonly TABLE_HEIGHT = 152;
  public static readonly SCALE = Env.SIZE / Env.TABLE_WIDTH;
  public static readonly FRICTION = 1;
  public static readonly TABLE_BORDER = 20 * Env.SCALE;
}