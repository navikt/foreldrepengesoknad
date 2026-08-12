type ArbeidsforholdOgInntektFelles = {
    harJobbetSomFrilans: boolean;
    harJobbetSomSelvstendigNæringsdrivende: boolean;
};

export type ArbeidsforholdOgInntektSvp = {
    harHattArbeidIUtlandet: boolean;
} & ArbeidsforholdOgInntektFelles;

export type ArbeidsforholdOgInntektFp = {
    harHattArbeidIUtlandet?: never;
} & ArbeidsforholdOgInntektFelles;

export type ArbeidsforholdOgInntekt = ArbeidsforholdOgInntektSvp | ArbeidsforholdOgInntektFp;

export const isArbeidsforholdOgInntektFp = (
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntekt,
): arbeidsforholdOgInntekt is ArbeidsforholdOgInntektFp => {
    return !isArbeidsforholdOgInntektSvp(arbeidsforholdOgInntekt);
};

export const isArbeidsforholdOgInntektSvp = (
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntekt,
): arbeidsforholdOgInntekt is ArbeidsforholdOgInntektSvp => {
    return (arbeidsforholdOgInntekt as ArbeidsforholdOgInntektSvp).harHattArbeidIUtlandet !== undefined;
};
