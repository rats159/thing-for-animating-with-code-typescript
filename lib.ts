export class Frame {}

export type Vector2 = [number, number]
export type Vector3 = [number, number, number]
export type Vector4 = [number, number, number, number]

export type Color = Vector4;
export type Font = unknown; // I don't know how to represent this yet

export type Rectangle = {
  pos: Vector2;
  size: Vector2;
  color: Color;
};

export type Text = {
  pos: Vector2;
  size: number;
  text: string;
  color: Color;
  font: Font;
};
