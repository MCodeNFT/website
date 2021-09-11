export const shorter = (str) =>
    str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str