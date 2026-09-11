import { CalendarIcon, ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { BrukerRolleSak_fpoversikt, MorsAktivitet, NavnPåForeldre } from '@navikt/fp-types';
import { Uttaksdagen, capitalizeFirstLetter, formatDateExtended } from '@navikt/fp-utils';
import { assertUnreachable } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';
import { Uttaksplanperiode, erPeriodeDto } from '../../../../types/UttaksplanPeriode';
import { getVarighetString } from '../../../../utils/dateUtils';
import {
    erAvslåttPeriode,
    harPeriodeDerMorsAktivitetIkkeErValgt,
    harPeriodeMedUkjentGraderingsaktivitet,
} from '../../../../utils/periodeUtils';
import { getStønadskvoteNavn } from '../../../utils/uttaksplanListeUtils';

interface Props {
    periode: Uttaksplanperiode;
    inneholderKunEnPeriode: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

export const UttaksperiodeContent = ({ periode, inneholderKunEnPeriode, navnPåForeldre, erFarEllerMedmor }: Props) => {
    const intl = useIntl();
    const {
        foreldreInfo: { rettighetType, søker, erIkkeSøkerSpesifisert, erFarOgFar },
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();

    // Vel søkjar si eiga side når ho finst, elles annan part si side – berre éi av dei kan i
    // praksis vera relevant her sidan denne komponenten ikkje viser opphald/EØS (dei har eigne
    // content-komponentar), men samtidig uttak (begge sider) prioriterer søkjar sitt uttak.
    const side = erPeriodeDto(periode) ? (periode.søker ?? periode.annenPart) : undefined;
    const erEøsPeriode = erPeriodeDto(periode) && !!periode.annenPartEøs && !side;

    const erAvslått = erAvslåttPeriode(periode);
    const morsAktivitet = side?.morsAktivitet;

    const stønadskvoteNavn = getStønadskvoteNavn(intl, {
        navnPåForeldre,
        erFarEllerMedmor,
        erEøsPeriode,
        morsAktivitet,
        konto: side?.kontoType ?? (erPeriodeDto(periode) ? periode.annenPartEøs?.kontoType : undefined),
        erAleneOmOmsorg: rettighetType === 'ALENEOMSORG',
        erAvslått,
    });

    return (
        <HStack gap="space-8">
            {harPeriodeDerMorsAktivitetIkkeErValgt(
                rettighetType,
                søker,
                erIkkeSøkerSpesifisert ?? false,
                [periode],
                erFarOgFar,
            ) && (
                <ExclamationmarkTriangleFillIcon
                    title={intl.formatMessage({ id: 'PeriodeListeHeader.MorsAktivitetIkkeValgt' })}
                    fontSize="1.5rem"
                    className="text-ax-danger-800"
                />
            )}
            {kanVelgeArbeidsgiver && harPeriodeMedUkjentGraderingsaktivitet([periode], søker) && (
                <ExclamationmarkTriangleFillIcon
                    title={intl.formatMessage({ id: 'PeriodeListeHeader.GraderingsaktivitetIkkeValgt' })}
                    fontSize="1.5rem"
                    className="text-ax-danger-800"
                />
            )}
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <VStack gap="space-4">
                <HStack gap="space-8">
                    <BodyShort weight="semibold">{getLengdePåPeriode(intl, inneholderKunEnPeriode, periode)}</BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom),
                            intl,
                        )}
                    </BodyShort>
                </HStack>
                <VStack gap="space-8">
                    <BodyShort>{stønadskvoteNavn}</BodyShort>
                    {!erAvslått && morsAktivitet !== undefined && (
                        <BodyShort>{getMorsAktivitetTekst(intl, morsAktivitet)}</BodyShort>
                    )}
                    {erEøsPeriode ? (
                        <BodyShort>
                            <FormattedMessage id="uttaksplan.periodeListeContent.eøs" />
                        </BodyShort>
                    ) : (
                        <BodyShort>
                            {getTekstForArbeidOgSamtidigUttak(periode, erFarEllerMedmor, navnPåForeldre)}
                        </BodyShort>
                    )}
                </VStack>
            </VStack>
        </HStack>
    );
};

const getLengdePåPeriode = (intl: IntlShape, inneholderKunEnPeriode: boolean, periode: Uttaksplanperiode) => {
    if (inneholderKunEnPeriode) {
        return intl.formatMessage({ id: 'uttaksplan.varighet.helePerioden' });
    }

    return `${formatDateExtended(periode.fom)} - ${formatDateExtended(periode.tom)}`;
};

export const getMorsAktivitetTekst = (intl: IntlShape, aktivitet: MorsAktivitet): string => {
    switch (aktivitet) {
        case 'ARBEID':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Arbeid' });
        case 'ARBEID_OG_UTDANNING':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.ArbeidOgUtdanning' });
        case 'INNLAGT':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Innlagt' });
        case 'INTROPROG':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Introduksjonsprogrammet' });
        case 'KVALPROG':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Kvalifiseringsprogrammet' });
        case 'TRENGER_HJELP':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.TrengerHjelp' });
        case 'UFØRE':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Uføre' });
        case 'UTDANNING':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Utdanning' });
        case 'IKKE_OPPGITT':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.UtenAktivitetsKrav' });
        default:
            return assertUnreachable('Mor har ingen aktivitet');
    }
};

const getTekstForArbeidOgSamtidigUttak = (
    periode: Uttaksplanperiode,
    erFarEllerMedmor: boolean,
    navnPåForeldre: NavnPåForeldre,
) => {
    if (!erPeriodeDto(periode)) {
        return undefined;
    }
    const side = periode.søker ?? periode.annenPart;
    if (!side) {
        return undefined;
    }

    if (side.gradering !== undefined) {
        const uttaksprosent = Math.round((100 - side.gradering.arbeidstidprosent) * 100) / 100;
        return (
            <FormattedMessage
                id="uttaksplan.periodeListeContent.arbeid"
                values={{ arbeidstidprosent: side.gradering.arbeidstidprosent, uttaksprosent }}
            />
        );
    }

    if (side.samtidigUttak !== undefined) {
        return getSamtidigUttakTekst(side.samtidigUttak, side.forelder, erFarEllerMedmor, navnPåForeldre);
    }

    return undefined;
};

const getSamtidigUttakTekst = (
    samtidiguttaksProsent: number,
    forelderIPerioden: BrukerRolleSak_fpoversikt,
    erFarEllerMedmor: boolean,
    navnPåForeldre: NavnPåForeldre,
) => {
    const periodenGjelderSøker = erFarEllerMedmor ? forelderIPerioden === 'FAR_MEDMOR' : forelderIPerioden === 'MOR';
    const navnPåAnnenForelderIPerioden = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const navnPåHovedforelderIPerioden = erFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;

    return periodenGjelderSøker ? (
        <FormattedMessage
            id="uttaksplan.periodeListeContent.samtidigUttak"
            values={{
                samtidiguttaksProsent,
                navnPåHovedforelderIPerioden: capitalizeFirstLetter(navnPåHovedforelderIPerioden),
            }}
        />
    ) : (
        <FormattedMessage
            id="uttaksplan.periodeListeContent.samtidigUttak.annenForelder"
            values={{
                navnPåAnnenForelderIPerioden: capitalizeFirstLetter(navnPåAnnenForelderIPerioden),
                samtidiguttaksProsent,
            }}
        />
    );
};
