type ArbeidsforholdOgInntektFelles = {
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
};

export type ArbeidsforholdOgInntektSvp = {
    harHattArbeidIUtlandet: boolean;
} & ArbeidsforholdOgInntektFelles;

export type ArbeidsforholdOgInntektFp = {
    harHattAndreInntektskilder: boolean;
} & ArbeidsforholdOgInntektFelles;

export type ArbeidsforholdOgInntekt = ArbeidsforholdOgInntektSvp | ArbeidsforholdOgInntektFp;
