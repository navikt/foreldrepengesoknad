interface Arbeidsforhold {
    guid: string;
    arbeidsgiverNavn?: string;
    arbeidsgiverId?: string;
    arbeidsgiverIdType: string;
    fom: Date;
    tom?: Date;
    stillingsprosent: number;
}

export default Arbeidsforhold;
