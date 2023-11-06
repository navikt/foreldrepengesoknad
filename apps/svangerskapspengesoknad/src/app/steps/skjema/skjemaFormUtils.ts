import { intlUtils } from '@navikt/fp-common';
import { SkjemaFormData, initialSkjemaFormData } from './skjemaFormTypes';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { IntlShape } from 'react-intl';

export const getInitialSkjemaValuesFromState = (currentTilrettelegging: Tilrettelegging): SkjemaFormData => {
    const vedleggForTilrettelegging = currentTilrettelegging.vedlegg;
    return {
        ...initialSkjemaFormData,
        vedlegg: vedleggForTilrettelegging,
    };
};

export const mapTilretteleggingMedSkjema = (
    tilretteleggingFraState: Tilrettelegging[],
    currentTilrettelegging: Tilrettelegging,
    values: SkjemaFormData,
): Tilrettelegging[] => {
    const oppdatert = {
        ...currentTilrettelegging,
        vedlegg: values.vedlegg,
    } as Tilrettelegging;

    const nyTilretteleggingISøknad = tilretteleggingFraState.map((t) => {
        return t.id === currentTilrettelegging.id ? oppdatert : t;
    });
    return nyTilretteleggingISøknad;
};

export const getSkjemaLegend = (typeArbeid: Arbeidsforholdstype, intl: IntlShape) => {
    if (typeArbeid === Arbeidsforholdstype.FRILANSER) {
        return intlUtils(intl, 'skjema.legend.frilanser');
    }
    if (typeArbeid === Arbeidsforholdstype.SELVSTENDIG) {
        return intlUtils(intl, 'skjema.legend.selvstendig');
    }
    return intlUtils(intl, 'skjema.legend.virksomhet');
};

export const getSkjemaSideTittel = (erFlereTilrettelegginger: boolean, intl: IntlShape, navn: string): string => {
    return erFlereTilrettelegginger
        ? intlUtils(intl, 'steps.label.skjema.flere', { navn })
        : intlUtils(intl, 'steps.label.skjema.en');
};
