



export const randomColours = () => {
    const getRandomValue = () => Math.floor(Math.random() * 256);
    const randomColor = () => `#rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;

    return randomColor();
}


