import { getTotalFileSize } from 'util/attachment/utils';

export const validerSamletFilstørrelse = (
    vedlegg: File[],
    maxTotalFilesize: number
): boolean => {
    return (
        vedlegg.length === 0 || getTotalFileSize(vedlegg) <= maxTotalFilesize
    );
};
