const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString()
        .substring(1);
};

export const guid = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
