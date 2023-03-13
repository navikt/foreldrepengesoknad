import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTest, RegelTestresultat } from 'uttaksplan/validering/utils/types/regelTypes';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import dayjs from 'dayjs';
import { isUttakAnnenPart, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { formatDate } from '@navikt/fp-common';

export const laTilPeriodeEtterFørsteStønadsdagPåfølgendeBarn = (
    periode: Periode,
    førsteUttaksdagForPåfølgendeBarn: Date | undefined
) => {
    if (
        førsteUttaksdagForPåfølgendeBarn !== undefined &&
        (periode.type === Periodetype.Uttak ||
            periode.type === Periodetype.Overføring ||
            periode.type === Periodetype.Utsettelse ||
            periode.type === Periodetype.Opphold ||
            isUttakAnnenPart(periode))
    ) {
        return (
            dayjs(periode.tidsperiode.fom).isSameOrAfter(førsteUttaksdagForPåfølgendeBarn, 'd') ||
            dayjs(periode.tidsperiode.tom).isSameOrAfter(førsteUttaksdagForPåfølgendeBarn, 'd')
        );
    }
    return false;
};

export const forSenUttakVedPåfølgendeBarn: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    if (
        grunnlag.familiehendelsesdatoNesteSak === undefined ||
        grunnlag.førsteUttaksdagNesteBarnsSak === undefined ||
        (grunnlag.minsterettUkerToTette && grunnlag.minsterettUkerToTette > 0)
    ) {
        return {
            passerer: true,
        };
    }
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) =>
        laTilPeriodeEtterFørsteStønadsdagPåfølgendeBarn(periode, grunnlag.førsteUttaksdagNesteBarnsSak)
    );
    const sisteMuligeUttaksdag = Uttaksdagen(grunnlag.førsteUttaksdagNesteBarnsSak).trekkFra(1);
    return {
        passerer: perioderMedUgyldigTidsperiode.length === 0,
        info: perioderMedUgyldigTidsperiode.map((periode) => ({
            intlKey: 'uttaksplan.validering.info.forSenUttakVedPåfølgendeBarn',
            values: {
                fom: formatDate(periode.tidsperiode.fom),
                tom: formatDate(periode.tidsperiode.tom),
                sisteMuligeUttaksdag: formatDate(sisteMuligeUttaksdag),
            },
            periodeId: periode.id,
        })),
    };
};
