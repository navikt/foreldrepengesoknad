import {
    Periode,
    Periodetype,
    SenEndringÅrsak,
    StønadskontoType,
    UtsettelseÅrsakType
} from '../../types/uttaksplan/periodetyper';
import moment from 'moment';

export const erUttakAvAnnenForeldersKvote = (
    konto: StønadskontoType | undefined,
    søkerErFarEllerMedmor: boolean
): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

export const erUttakEgenKvote = (konto: StønadskontoType | undefined, søkerErFarEllerMedmor: boolean): boolean => {
    return erUttakAvAnnenForeldersKvote(konto, søkerErFarEllerMedmor) === false;
};

const erUtsettelsePgaSykdomTilbakeITid = (periode: Periode) =>
    periode.type === Periodetype.Utsettelse &&
    (periode.årsak === UtsettelseÅrsakType.Sykdom ||
        periode.årsak === UtsettelseÅrsakType.InstitusjonSøker ||
        periode.årsak === UtsettelseÅrsakType.InstitusjonBarnet) &&
    moment(periode.tidsperiode.fom).isBefore(moment().startOf('day'));

const erUttakMerEnnTreMånederSiden = (periode: Periode) =>
    periode.type === Periodetype.Uttak &&
    moment(periode.tidsperiode.fom).isBefore(
        moment()
            .startOf('day')
            .subtract(3, 'months')
    );

export const finnÅrsakTilSenEndring = (uttaksplan: Periode[]): SenEndringÅrsak => {
    const inneholderTidligereUtsettelserPgaSykdom = uttaksplan.some(erUtsettelsePgaSykdomTilbakeITid);
    const inneholderUttakMerEnnTreMånederTilbakeITid = uttaksplan.some(erUttakMerEnnTreMånederSiden);

    if (inneholderTidligereUtsettelserPgaSykdom) {
        return inneholderUttakMerEnnTreMånederTilbakeITid ? SenEndringÅrsak.SykdomOgUttak : SenEndringÅrsak.Sykdom;
    } else {
        return inneholderUttakMerEnnTreMånederTilbakeITid ? SenEndringÅrsak.Uttak : SenEndringÅrsak.Ingen;
    }
};
