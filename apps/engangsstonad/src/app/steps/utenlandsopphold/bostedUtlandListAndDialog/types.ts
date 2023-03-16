export interface BostedUtland {
    id?: string;
    fom: string;
    tom: string;
    landkode: string;
}

export const isValidBostedUtland = (bosted: Partial<BostedUtland>): bosted is BostedUtland => {
    const { fom, landkode, tom } = bosted;
    return fom !== undefined && landkode !== undefined && tom !== undefined;
};
