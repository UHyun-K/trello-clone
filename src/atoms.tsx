import { atom, selector } from "recoil";

export const minutesState = atom({
    key: "minnutes",
    default: 0,
});

export const hourSelector = selector<number>({
    key: "hours",
    get: ({ get }) => {
        const min = get(minutesState);
        return min / 60;
    },
    set: ({ set }, newValue) => {
        const minutes = Number(newValue) * 60;
        set(minutesState, minutes);
    },
});