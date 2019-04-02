import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { findMissingAttachmentsForPerioder } from '../../../util/attachments/missingAttachmentUtil';
import { MissingAttachment } from '../../../types/MissingAttachment';

export const harPerioderManglendeVedleggTest: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const manglendeVedlegg: MissingAttachment[] = findMissingAttachmentsForPerioder(
        grunnlag.perioder,
        grunnlag.søknadsinfo
    );

    const passerer = manglendeVedlegg.length === 0;
    const x: RegelTestresultat = {
        passerer,
        info: passerer
            ? undefined
            : manglendeVedlegg.filter((vedlegg) => !!vedlegg.periodeId).map((vedlegg) => ({
                  periodeId: vedlegg.periodeId,
                  intlKey: 'oppsummering.veileder.manglendeVedlegg'
              }))
    };
    return x;
};
