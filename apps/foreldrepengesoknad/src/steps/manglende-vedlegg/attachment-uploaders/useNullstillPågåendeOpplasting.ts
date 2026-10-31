import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { ManglendeVedleggFormData, OppdaterVedlegg } from '../ManglendeVedleggFormData';

// FileUploader melder ikke fra når den avmonteres midt i en opplasting, så uten dette ville neste-knappen forblitt sperret.
export const useNullstillPågåendeOpplasting = (
    skjemanummer: GyldigeSkjemanummer,
    updateAttachments: OppdaterVedlegg,
) => {
    const { getValues } = useFormContext<ManglendeVedleggFormData>();
    const updateAttachmentsRef = useRef(updateAttachments);

    useEffect(() => {
        updateAttachmentsRef.current = updateAttachments;
    }, [updateAttachments]);

    useEffect(() => {
        return () => {
            updateAttachmentsRef.current(getValues(skjemanummer), false);
        };
    }, [getValues, skjemanummer]);
};
