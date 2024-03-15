import P5 from "p5";

/**
 * Computes a hash from a string.
 *
 * Not good for crypto.
 *
 * @param str - The string to hash.
 * @return A 32bit integer
 */
function hash_code(str: string) {
  const update_hash = (hash: number, char: string): number => {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    return hash | 0;
  };
  return str.split("").reduce(update_hash, 0);
}

function generate_new_seed(): string {
  const symbols = "abcdefghijklmnopqrstuvwxyz0123456890";
  const seed_len = 8;
  let seed = "";
  for (let i = 0; i < seed_len; i++) {
    const index = Math.floor(Math.random() * symbols.length);
    seed = seed + symbols.charAt(index);
  }
  return seed;
}

/**
 * Set the page's seed query param.
 *
 * Calling this forces a refresh.
 *
 * @param seed - the new seed to use.
 */
function set_seed(seed: string) {
  const params = new URLSearchParams();
  params.set("seed", seed);
  window.location.search = params.toString();
}

/**
 * Gets the current seed string from the window url.
 * @return A valid string. Empty string is returned if no value is present.
 */
export function get_current_seed(): string {
  const params = new URLSearchParams(window.location.search);
  const seed = params.get("seed");
  if (seed == undefined || seed == null || seed == "") {
    return "1234";
  }
  return seed;
}

export class Page {
  private p5: P5;

  constructor(name: string, sketch: (p5: P5) => void) {
    document.title = name;

    const root = document.getElementById("sketch_root")!;
    this.p5 = new P5((p5: P5) => {
      p5.randomSeed(hash_code(get_current_seed()));
      return sketch(p5);
    }, root);

    const header = document.getElementById("sketch_header")!;
    const regen_link = document.createElement("a");
    regen_link.href = "#";
    regen_link.textContent = "Regenerate";
    regen_link.onclick = () => {
      set_seed(generate_new_seed());
    };
    header.append(regen_link);
  }
}
