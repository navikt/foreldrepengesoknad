export interface UtenlandsoppholdData {
  id?: string;
  landkode: string;
  fom: Date;
  tom: Date;
}
export type UtenlandsoppholdPartial = Partial<UtenlandsoppholdData>;

export interface FødselData {
  harFødt: boolean;
  antallBarn: number;
  termindato: number;
}
export type FødselDataPartial = Partial<FødselData>;

export interface TerminbekreftelseData {
  vedlegg: File[];
  terminbekreftelsesdato: Date;
}

interface Søknad {
  navn: string;
  fødsel?: FødselData;
  terminbekreftelse?: TerminbekreftelseData;
  utenlandsopphold?: UtenlandsoppholdData[];
}

export default Søknad;
