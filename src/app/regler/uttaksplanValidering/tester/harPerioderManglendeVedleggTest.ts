import moment from 'moment';
import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { findMissingAttachmentsForPerioder } from '../../../util/attachments/missingAttachmentUtil';
import { MissingAttachment } from '../../../types/MissingAttachment';
import { isInfoPeriode } from 'app/types/uttaksplan/periodetyper';
import { sorterPerioder } from 'app/util/uttaksplan/Periodene';

export const harPerioderManglendeVedleggTest: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const manglendeVedlegg: MissingAttachment[] = findMissingAttachmentsForPerioder(
        grunnlag.perioderSomSkalSendesInn,
        grunnlag.søknadsinfo
    );

    const førsteUttaksEllerUttsettelsesPeriode = grunnlag.perioder
        .filter((p) => p.tidsperiode.fom !== undefined && !isInfoPeriode(p))
        .sort(sorterPerioder)
        .shift();
    const erLikEllerMindreEnnFireUkerTilUttaketStarter =
        førsteUttaksEllerUttsettelsesPeriode !== undefined &&
        moment(førsteUttaksEllerUttsettelsesPeriode.tidsperiode.fom).isSameOrBefore(moment().add(4, 'weeks'));
    const regelTekst = erLikEllerMindreEnnFireUkerTilUttaketStarter
        ? 'oppsummering.veileder.manglendeVedlegg'
        : 'uttaksplan.validering.advarsel.forTidligUtenDokumentasjon';

    const passerer = manglendeVedlegg.length === 0;
    const x: RegelTestresultat = {
        passerer,
        info: passerer
            ? undefined
            : manglendeVedlegg.filter((vedlegg) => !!vedlegg.periodeId).map((vedlegg) => ({
                  periodeId: vedlegg.periodeId,
                  intlKey: regelTekst
              }))
    };
    return x;
};
