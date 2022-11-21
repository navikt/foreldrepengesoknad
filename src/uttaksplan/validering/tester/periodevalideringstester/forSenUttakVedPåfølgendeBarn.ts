import { Søknadsinfo } from '../../utils/types/Søknadsinfo';
import { RegelTest, RegelTestresultat } from 'uttaksplan/validering/utils/types/regelTypes';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import dayjs from 'dayjs';
import uttaksConstants from 'app/constants';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { formatDate } from '@navikt/fp-common';

const periodeErForSenVedPåfølgendeBarn = (periode: Periode, førsteUttaksdagForPåfølgendeBarn: Date | undefined) => {
    if (
        førsteUttaksdagForPåfølgendeBarn !== undefined &&
        (periode.type === Periodetype.Uttak ||
            periode.type === Periodetype.Overføring ||
            periode.type === Periodetype.Utsettelse ||
            periode.type === Periodetype.Opphold)
    ) {
        return (
            dayjs(periode.tidsperiode.fom).isSameOrAfter(førsteUttaksdagForPåfølgendeBarn) ||
            dayjs(periode.tidsperiode.tom).isSameOrAfter(førsteUttaksdagForPåfølgendeBarn)
        );
    }
    return false;
};

export const forSenUttakVedPåfølgendeBarn: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const sisteDagFørFødselNesteBarn = grunnlag.familiehendelsesdatoNesteSak
        ? Uttaksdagen(dayjs(grunnlag.familiehendelsesdatoNesteSak).toDate()).forrige()
        : undefined;
    if (sisteDagFørFødselNesteBarn === undefined) {
        return {
            passerer: true,
        };
    }
    const treUkerFørPåfølgendeBarn = Uttaksdagen(sisteDagFørFødselNesteBarn).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1
    );
    const perioderMedUgyldigTidsperiode = grunnlag.perioder.filter((periode) =>
        periodeErForSenVedPåfølgendeBarn(periode, treUkerFørPåfølgendeBarn)
    );
    const sisteMuligeUttaksdag = Uttaksdagen(treUkerFørPåfølgendeBarn).trekkFra(1);
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
