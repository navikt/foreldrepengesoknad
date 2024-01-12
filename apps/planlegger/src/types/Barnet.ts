export enum BarnetEnum {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
}

export type Barnet = {
    barnet: BarnetEnum;
    erFødt: boolean;
};
