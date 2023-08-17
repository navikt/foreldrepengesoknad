import { mapArbeidsforholdToSøknadsgrunnlagOptions } from 'app/steps/inntektsinformasjon/inntektsinformasjonFormUtils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Frilans } from 'app/types/Frilans';
import { Næring } from 'app/types/Næring';

export const mapTilrettelegging = (
    valgtTilrettelegging: string[],
    erFrilanser: boolean,
    harNæring: boolean,
    frilans: Frilans | undefined,
    næring: Næring[],
    arbeidsforhold: Arbeidsforhold[],
    termindato: Date
) => {
    const allTilretteleggingOptions = mapArbeidsforholdToSøknadsgrunnlagOptions(
        erFrilanser,
        harNæring,
        frilans,
        næring,
        arbeidsforhold,
        termindato
    );

    const selectedTilrettelegging = allTilretteleggingOptions.filter((o) =>
        valgtTilrettelegging.find((t) => t === o.id)
    );

    return selectedTilrettelegging;
};
