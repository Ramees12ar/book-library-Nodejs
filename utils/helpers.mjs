/**
 * fn to format title or author name uppercase based on space
 * @returns formatted label
 */
async function nameFormatter(name) {
    const label = name.toLowerCase().split(" ");
    for (let i = 0; i < label.length; i++) {
        label[i] = label[i].charAt(0).toUpperCase() + label[i].slice(1);
    }
    return label.join(" ");
}

export default nameFormatter;