import dayjs from 'dayjs';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { MissingAttachment, Søknadsinfo, isInfoPeriode, sorterPerioder } from '@navikt/fp-common';
import { findMissingAttachmentsForPerioder } from '../../utils/manglendeVedleggUtils';

export const harPerioderManglendeVedleggTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const manglendeVedlegg: MissingAttachment[] = findMissingAttachmentsForPerioder(grunnlag);

    const førsteUttaksEllerUttsettelsesPeriode = grunnlag.perioder
        .filter((p) => p.tidsperiode.fom !== undefined && !isInfoPeriode(p))
        .sort(sorterPerioder)
        .shift();
    const erLikEllerMindreEnnFireUkerTilUttaketStarter =
        førsteUttaksEllerUttsettelsesPeriode !== undefined &&
        dayjs(førsteUttaksEllerUttsettelsesPeriode.tidsperiode.fom).isSameOrBefore(dayjs().add(4, 'weeks'), 'day');
    const regelTekst = erLikEllerMindreEnnFireUkerTilUttaketStarter
        ? 'uttaksplan.validering.info.manglendeVedlegg'
        : 'uttaksplan.validering.advarsel.forTidligUtenDokumentasjon';

    const passerer = manglendeVedlegg.length === 0;
    const x: RegelTestresultat = {
        passerer,
        info: passerer
            ? undefined
            : manglendeVedlegg
                  .filter((vedlegg) => !!vedlegg.periodeId)
                  .map((vedlegg) => ({
                      periodeId: vedlegg.periodeId,
                      intlKey: regelTekst,
                  })),
    };
    return x;
};
