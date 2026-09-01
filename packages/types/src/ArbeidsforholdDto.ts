import {
    ArbeidsforholdDto,
    FrilanserDto,
    PrivatArbeidsgiverDto,
    SelvstendigNæringsdrivendeDto,
    VirksomhetDto,
} from './fpsoknadDtoGenerert';

// Same problemstilling som i BarnDto.ts: openapi-ts genererer `type: string` for ArbeidsforholdDto i
// staden for literal-typar per variant, sjølv om backend sitt discriminator.mapping (frilanser/privat/
// selvstendig/virksomhet) er korrekt. Desse type guardane gjer manuell innsnevring mogleg.
export const isFrilanserDto = (arbeidsforhold: ArbeidsforholdDto): arbeidsforhold is ArbeidsforholdDto & FrilanserDto =>
    arbeidsforhold.type === 'frilanser';

export const isPrivatArbeidsgiverDto = (
    arbeidsforhold: ArbeidsforholdDto,
): arbeidsforhold is ArbeidsforholdDto & PrivatArbeidsgiverDto => arbeidsforhold.type === 'privat';

export const isSelvstendigNæringsdrivendeDto = (
    arbeidsforhold: ArbeidsforholdDto,
): arbeidsforhold is ArbeidsforholdDto & SelvstendigNæringsdrivendeDto => arbeidsforhold.type === 'selvstendig';

export const isVirksomhetDto = (
    arbeidsforhold: ArbeidsforholdDto,
): arbeidsforhold is ArbeidsforholdDto & VirksomhetDto => arbeidsforhold.type === 'virksomhet';
