
// https://stackoverflow.com/a/62765924
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const groupBy = <T, K extends keyof any>(list: Array<T>, getKey: (item: T) => K): Record<K, Array<T>> =>
    list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<K, Array<T>>);