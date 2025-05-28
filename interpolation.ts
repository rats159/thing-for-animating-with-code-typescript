import { Vector2, Vector3, Vector4 } from "./lib.ts";

export function lerp_number(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t;
}

export function lerp_vector<V extends Vector2 | Vector3 | Vector4>(
  a: V,
  b: V,
  t: number,
): V {
  const out = Array<number>(a.length) as V;

  for (let i = 0; i < a.length; i++) {
    out[i] = lerp_number(a[i], b[i], t);
  }
  return out;
}
