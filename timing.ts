export type TimingFunc = (t:number)=>number

export function linear(t: number): number {
    return t
}

export function ease(t: number): number {
  return ease_in_out_cubic(t);
}

export function ease_in_quad(t: number): number {
  return t * t;
}

export function ease_out_quad(t: number): number {
  return t * (2 - t);
}

export function ease_in_out_quad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function ease_in_cubic(t: number): number {
  return t * t * t;
}

export function ease_out_cubic(t: number): number {
  return (--t) * t * t + 1;
}

export function ease_in_out_cubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}