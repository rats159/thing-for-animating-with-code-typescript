import { lerp_number, lerp_vector } from "./interpolation.ts";
import { Frame, Rectangle, Text, Vector2, Vector3, Vector4 } from "./lib.ts";
import { linear, TimingFunc } from "./timing.ts";

export type Animated<T> = T[];
export type Animation_Element = Rectangle | Text;

export function chain<T>(...sub_animations: Animated<T>[]): Animated<T> {
  if (sub_animations.length == 0) {
    return [];
  }

  let total_len = 0;

  for (const anim of sub_animations) {
    total_len += anim.length;
  }

  const full_anim = Array<T>(total_len);

  let i = 0;

  for (const anim of sub_animations) {
    for (let j = 0; j < anim.values.length; i++, j++) {
      full_anim[i] = anim[i];
    }
  }

  return full_anim;
}

export type InterpolationFunc<T> = (start: T, stop: T, duration: number) => T;

export function animate_string(
  from: [string],
  to: string,
  duration: number,
  timing: TimingFunc = linear,
): Animated<string> {
  return animate_custom(from, to, duration, timing, lerp_text);
}

export function animate_vector<V extends Vector2 | Vector3 | Vector4>(
  from: [V],
  to: V,
  duration: number,
  timing: TimingFunc = linear,
): Animated<V> {
  return animate_custom(from, to, duration, timing, lerp_vector);
}

export function animate_number(
  from: [number],
  to: number,
  duration: number,
  timing: TimingFunc = linear,
): Animated<number> {
  return animate_custom(from, to, duration, timing, lerp_number);
}

export function animate_custom<T>(
  from: [T],
  to: T,
  duration: number,
  timing: TimingFunc = linear,
  interpolator: InterpolationFunc<T>,
): Animated<T> {
  const anim = Array<T>(duration);

  for (let i = 0; i < duration; i++) {
    const intermediate = interpolator(from[0], to, timing(1 / duration * i));
    anim[i] = intermediate;
  }

  from[0] = to;
  return anim;
}

export function write_to_elements<
  T extends Animation_Element,
  K extends keyof T,
>(
  values: Animated<T[K]>,
  property: K,
  base: T,
): Animation_Element[] {
  const elements = Array<T>(values.length);

  for (let i = 0; i < elements.length; i++) {
    elements[i] = base;
    elements[i][property] = values[i];
  }

  return elements;
}

export function elements_to_frames(...elem_list: Animation_Element[][]): Frame[] {
  let duration = 0;
  for (const rect_anim of elem_list) {
    if (duration < rect_anim.length) {
      duration = rect_anim.length;
    }
  }

  // frames := make([]Frame, duration)
  const frames = Array<Frame>(duration);

  for (let frame_index = 0; frame_index < duration; frame_index++) {
    const elements = Array<Animation_Element>(elem_list.length);
    for (let n = 0; n < elem_list.length; n++) {
      const elem_steps = elem_list[n];
      elements[n] = elem_steps[frame_index];
    }
    frames[frame_index] = elements;
  }
  return frames;
}


// Inspired by motion canvas
function lerp_text(from: string, to: string, value: number): string {
	const to_len = to.length
	const from_len = from.length

	if (to_len >= from_len) {
		const current = Math.floor(to_len * value)
		const currentLength = Math.floor(lerp_number(from_len - 1, to_len, value))
		let text = "" 

		for (let i = 0; i < to_len; i++) {
			if (i < current) {
				text += to[i]
			} else if (i < from_len) {
				text += from[i]
			} else if (i <= currentLength) {
				text += to[i]
			}
		}

		return text
	} else {
		const current = Math.floor(from_len) * (1 - value)
		const currentLength = Math.floor(lerp_number(from_len + 1, to_len, value))

		let text = ""

		for (let i = from_len - 1; i >= 0; i -= 1) {
			if (i < current) {
				text += from[i]
			} else if (i < to_len) {
				text += to[i]
			} else if (i < currentLength) {
				text += from[i]
			}
		}

		return [...text].reverse().join('') 
	}
}