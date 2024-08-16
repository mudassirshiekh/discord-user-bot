export const getRandomItemFromArray = (array: string[]): string => {
    if (!array) {
        throw new Error('Invalid array');
    }

    const length = array.length;
    const randomIndex = Math.floor(Math.random() * length);

    return array[randomIndex];
};
