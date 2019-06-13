import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { findMissingAttachmentsForPerioder } from '../../../util/attachments/missingAttachmentUtil';
import { MissingAttachment } from '../../../types/MissingAttachment';

export const harPerioderManglendeVedleggTest: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const manglendeVedlegg: MissingAttachment[] = findMissingAttachmentsForPerioder(
        grunnlag.perioderSomSkalSendesInn,
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
