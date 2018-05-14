import { getTotalFileSize } from '../../util/attachment';

export const validerSamletFilstørrelse = (
    vedlegg: File[],
    maxTotalFilesize: number
): boolean => {
    return (
        vedlegg.length === 0 || getTotalFileSize(vedlegg) <= maxTotalFilesize
    );
};
