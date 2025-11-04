export const getDekningsgradFromString = (dekningsgrad: string | undefined) => {
    if (!dekningsgrad) {
        return '100';
    }

    return dekningsgrad === '100' ? '100' : '80';
};
