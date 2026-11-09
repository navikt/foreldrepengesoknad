import { useEffect, useEffectEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { ManglendeVedleggFormData, OppdaterVedlegg } from '../ManglendeVedleggFormData';

// FileUploader melder ikke fra når den avmonteres midt i en opplasting, så uten dette ville neste-knappen forblitt sperret.
export const useNullstillOpplastingVedUnmount = (
    skjemanummer: GyldigeSkjemanummer,
    updateAttachments: OppdaterVedlegg,
) => {
    const { getValues } = useFormContext<ManglendeVedleggFormData>();

    const nullstillOpplasting = useEffectEvent(() => {
        updateAttachments(getValues(skjemanummer), false);
    });

    useEffect(() => {
        return () => nullstillOpplasting();
    }, []);
};
