const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x1_00_00)
        .toString()
        .slice(1);
};

export const guid = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
