export function rgbToHex(rgb) {
    // Caso rápido: si ya viene en hex
    if (rgb.startsWith("#")) return rgb;
    console.log(rgb)
    // Extraer valores numéricos de "rgb(r, g, b)" o "rgba(r, g, b, a)"
    const result = rgb.match(/\d+/g);
    if (!result) return "#0CCCF2";

    // Solo usamos los tres primeros (r,g,b)
    const r = parseInt(result[0], 10);
    const g = parseInt(result[1], 10);
    const b = parseInt(result[2], 10);

    // Convertir a hex
    return (
        "#" +
        [r, g, b]
            .map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    );
}