interface Arbeidsforhold {
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: Date;
    tom?: Date;
    stillingsprosent: number;
}

export type ArbeidsforholdPartial = Partial<Arbeidsforhold>;
export default Arbeidsforhold;
