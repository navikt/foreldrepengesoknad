import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import { SkjemaFormData, initialSkjemaFormData } from './skjemaFormTypes';
import Tilrettelegging from 'app/types/Tilrettelegging';
import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';

export const getInitialSkjemaValuesFromState = (state: SvangerskapspengerContextState): SkjemaFormData => {
    const alleVedlegg = state.søknad.vedlegg;
    const tilrettelegginger = state.søknad.tilrettelegging;

    const vedleggPerTilrettelegging = tilrettelegginger.map((tilrettelegging: Tilrettelegging) => {
        return tilrettelegging.vedlegg?.map((vedleggId: string) => {
            return alleVedlegg.find((vedlegg: Attachment) => vedlegg.id === vedleggId);
        });
    }) as Attachment[][];

    return {
        ...initialSkjemaFormData,
        vedlegg: vedleggPerTilrettelegging,
    };
};

export const mapTilretteleggingMedSkjema = (
    tilrettelegging: Tilrettelegging[],
    values: Partial<SkjemaFormData>
): Tilrettelegging[] => {
    return tilrettelegging.map((t, index) => {
        return {
            ...t,
            vedlegg: values.vedlegg ? values.vedlegg[index].map((v) => v.id) : [],
        };
    });
};

export const getVedleggForTilrettelegging = (values: Partial<SkjemaFormData>, index: number): Attachment[] => {
    return values.vedlegg && values.vedlegg.length > index && values.vedlegg[index] ? values.vedlegg[index] : [] || [];
};
