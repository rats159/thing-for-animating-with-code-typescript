import { animate_string, animate_vector, chain, elements_to_frames, write_to_elements } from "./animating.ts"
import { Frame, Rectangle, Text } from "./lib.ts"
import { ease, ease_in_cubic } from "./timing.ts";
const font = {}

function generate_animation(): Frame[] {
    const red: Rectangle = {
        pos: [0, 0],
        size: [100, 100],
        color: [255, 127, 127, 255],
    }

    const text: Text = {
        pos: [0, 100],
        size: 24,
        text: "Hello",
        color: [0, 0, 0, 255],
        font: font,
    }

    const red_slide = chain(
        animate_vector([red.pos], [700, 0], 60, ease),
        animate_vector([red.pos], [700, 700], 60, ease),
        animate_vector([red.pos], [0, 700], 60, ease),
        animate_vector([red.pos], [0, 0], 60, ease),
    )

    const text_typeout = chain(
        animate_string([text.text], "Hello, World!", 30, ease),
        animate_string([text.text], "Hello!!", 30, ease),
        animate_string([text.text], "Hello! Here's some much longer text to showcase tweening!", 60, ease),
        animate_string([text.text], "", 60, ease_in_cubic),
        animate_string([text.text], "Animating to an empty string, then back to this", 60, ease_in_cubic),
    )


    const red_path = write_to_elements(red_slide, "pos", red)
    const text_path = write_to_elements(text_typeout, "text", text)

    const full_anim = elements_to_frames(red_path, text_path)

    return full_anim
}

console.log(generate_animation())