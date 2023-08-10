export const toLowerCaseBesidesFirst = (word: string) => {
    return `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
}