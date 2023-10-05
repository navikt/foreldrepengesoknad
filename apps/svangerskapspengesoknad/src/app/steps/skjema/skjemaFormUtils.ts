import { SkjemaFormData, initialSkjemaFormData } from './skjemaFormTypes';
import Tilrettelegging from 'app/types/Tilrettelegging';

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
