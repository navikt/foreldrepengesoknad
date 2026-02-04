import dayjs from 'dayjs';
import { JSX } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { getForelderNavn } from 'utils/isFarEllerMedmor';
import { getStønadskontoNavn } from 'utils/stønadskontoerUtils';
import {
    erIkkeEøsPeriode,
    erUttaksperiode,
    getUttaksprosentFromStillingsprosent,
    isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel,
    prettifyProsent,
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
} from 'utils/uttaksplanInfoUtils';

import { BodyShort, HStack, Label, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, Situasjon } from '@navikt/fp-common';
import {
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { TidsperiodenString, capitalizeFirstLetter } from '@navikt/fp-utils';

import { StønadskontoIkon } from './StønadskontoIkon';
import { UtsettelseIkon } from './UtsettelseIkon';
import UttaksplanAdvarselIkon from './UttaksplanAdvarselIkon';

interface Props {
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
}

export const PeriodeVisning = ({
    periode,
    navnPåForeldre,
    familiehendelsesdato,
    termindato,
    situasjon,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}: Props) => {
    const intl = useIntl();

    const varighetString = getVarighetString(
        TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
        intl,
    );

    return (
        <HStack gap="space-24" align="center">
            {getPeriodeIkon(periode, navnPåForeldre, erFarEllerMedmor)}
            <HStack justify="space-between" className="w-110">
                <VStack gap="space-4">
                    <Label as="h4">
                        {getPeriodeTittel(
                            intl,
                            periode,
                            navnPåForeldre,
                            familiehendelsesdato,
                            termindato,
                            situasjon,
                            erFarEllerMedmor,
                            erAleneOmOmsorg,
                        )}
                    </Label>
                    <BodyShort>{varighetString}</BodyShort>
                </VStack>
                <HStack gap="space-12">
                    {renderDagMnd(periode.fom)}
                    {renderDagMnd(periode.tom)}
                </HStack>
            </HStack>
        </HStack>
    );
};

const getPeriodeIkon = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
    situasjon?: Situasjon,
    erAleneOmOmsorg?: boolean,
): React.ReactNode | undefined => {
    const erUttak = erIkkeEøsPeriode(periode) && erUttaksperiode(periode);
    if (erUttak) {
        if (periode.resultat?.årsak === 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID') {
            return <UttaksplanAdvarselIkon />;
        }

        return (
            <StønadskontoIkon
                konto={periode.kontoType}
                forelder={periode.forelder}
                gradert={!!periode.gradering}
                navnPåForeldre={navnPåForeldre}
                harMidlertidigOmsorg={harMidlertidigOmsorg}
                erFarEllerMedmor={erFarEllerMedmor}
                situasjon={situasjon}
                erAleneOmOmsorg={erAleneOmOmsorg}
            />
        );
    }

    if (erIkkeEøsPeriode(periode) && periode.overføringÅrsak) {
        return (
            <StønadskontoIkon
                konto={periode.kontoType}
                forelder={periode.forelder}
                navnPåForeldre={navnPåForeldre}
                erFarEllerMedmor={erFarEllerMedmor}
            />
        );
    }

    if (erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak && periode.forelder) {
        return <UtsettelseIkon årsak={periode.utsettelseÅrsak} forelder={periode.forelder} />;
    }

    if (erIkkeEøsPeriode(periode) && periode.oppholdÅrsak) {
        return (
            <StønadskontoIkon
                konto={'FORELDREPENGER'}
                forelder={periode.forelder}
                navnPåForeldre={navnPåForeldre}
                erFarEllerMedmor={erFarEllerMedmor}
            />
        );
    }

    return undefined;
};

type VarighetFormat = 'full' | 'normal';

const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker,
    };
};

const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'varighet.dager' },
        {
            dager,
        },
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'varighet.uker' }, { uker });
    if (dager > 0 && format === 'full') {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--full`,
        })}${dagerStr}`;
    }
    if (dager > 0 && format === 'normal') {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--normal`,
        })}${dagerStr}`;
    }
    return ukerStr;
};

const renderDagMnd = (dato: string, visÅr = true): JSX.Element => {
    const d = dayjs(dato);

    return (
        <VStack gap="space-4">
            <BodyShort>
                {d.get('date')}. {d.format('MMM').substr(0, 3)}.
            </BodyShort>
            {visÅr && (
                <BodyShort as="span">
                    <abbr title={`${d.format('MMMM')} ${d.format('YYYY')}`}>{d.format('YYYY')}</abbr>
                </BodyShort>
            )}
        </VStack>
    );
};

const getPeriodeTittel = (
    intl: IntlShape,
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
    familiehendelsesdato: string,
    termindato: string | undefined,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
): string => {
    const erUttak = erIkkeEøsPeriode(periode) && erUttaksperiode(periode);
    if (erUttak) {
        return getPeriodeTittelUttaksPeriode(
            intl,
            periode,
            navnPåForeldre,
            familiehendelsesdato,
            termindato,
            situasjon,
            erFarEllerMedmor,
            erAleneOmOmsorg,
        );
    }
    if (erIkkeEøsPeriode(periode) && periode.overføringÅrsak) {
        return getStønadskontoNavn(intl, periode.kontoType, navnPåForeldre, erFarEllerMedmor);
    }
    if (erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak) {
        return intl.formatMessage(
            { id: 'uttaksplan.periodeliste.utsettelsesårsak' },
            {
                årsak: intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${periode.utsettelseÅrsak}` }),
            },
        );
    }
    if (erIkkeEøsPeriode(periode) && periode.oppholdÅrsak) {
        return getOppholdskontoNavn(
            intl,
            periode.oppholdÅrsak,
            getForelderNavn(periode.forelder, navnPåForeldre),
            periode.forelder === 'MOR',
        );
    }
    return '';
};

const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: UttakOppholdÅrsak_fpoversikt,
    foreldernavn: string,
    erMor: boolean,
) => {
    const navn = capitalizeFirstLetter(foreldernavn);
    if (erMor) {
        if (årsak === 'FEDREKVOTE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.FEDREKVOTE_ANNEN_FORELDER` },
                { foreldernavn: navn },
            );
        }
        if (årsak === 'FELLESPERIODE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.FELLESPERIODE_ANNEN_FORELDER` },
                { foreldernavn: navn },
            );
        }
        if (årsak === 'MØDREKVOTE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.MØDREKVOTE_ANNEN_FORELDER` },
                { foreldernavn: navn },
            );
        }
    }

    if (årsak === 'MØDREKVOTE_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.MØDREKVOTE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }
    if (årsak === 'FEDREKVOTE_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.FEDREKVOTE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }
    if (årsak === 'FELLESPERIODE_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.FELLESPERIODE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }

    throw new Error(`Ukjent oppholdsårsak: ${årsak}`);
};

const getPeriodeTittelUttaksPeriode = (
    intl: IntlShape,
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
    familiehendelsesdato: string,
    termindato: string | undefined,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    const tittelMedNavn = getStønadskontoNavn(
        intl,
        periode.kontoType,
        navnPåForeldre,
        erFarEllerMedmor,
        erAleneOmOmsorg,
    );
    const tittel = appendPeriodeNavnHvisUttakRundtFødselFarMedmor(
        intl,
        tittelMedNavn,
        periode,
        situasjon,
        familiehendelsesdato,
        termindato,
    );
    if (erIkkeEøsPeriode(periode) && (periode.gradering || periode.samtidigUttak)) {
        return `${tittel} ${intl.formatMessage(
            { id: 'gradering.prosent' },
            {
                stillingsprosent: getUttaksprosentFromStillingsprosent(
                    prettifyProsent(periode.gradering?.arbeidstidprosent),
                    periode.samtidigUttak ? prettifyProsent(periode.samtidigUttak) : undefined,
                ),
            },
        )}`;
    }
    return tittel;
};

const appendPeriodeNavnHvisUttakRundtFødselFarMedmor = (
    intl: IntlShape,
    periodeNavn: string,
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    situasjon: Situasjon,
    familiehendelsesdato: string,
    termindato: string | undefined,
): string => {
    return situasjon === 'fødsel' && isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato)
        ? periodeNavn + intl.formatMessage({ id: 'rundtFødsel' })
        : periodeNavn;
};

const isUttaksperiodeFarMedmorPgaFødsel = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsesdato: string,
    termindato: string | undefined,
): boolean => {
    return (
        isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel(periode) &&
        starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(periode.fom, familiehendelsesdato, termindato)
    );
};
