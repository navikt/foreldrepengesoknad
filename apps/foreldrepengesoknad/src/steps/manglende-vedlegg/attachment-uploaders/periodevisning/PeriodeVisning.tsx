import dayjs from 'dayjs';
import { JSX } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { getStønadskvoteNavn } from 'utils/stønadskvoterUtils';
import { getUttaksprosentFromStillingsprosent, prettifyProsent } from 'utils/uttaksplanInfoUtils';

import { BodyShort, HStack, Label, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, PeriodeDto_fpoversikt, Situasjon, UttakDto_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen, Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan/validators';

import { StønadskvoteIkon } from './StønadskvoteIkon';
import { UtsettelseIkon } from './UtsettelseIkon';
import UttaksplanAdvarselIkon from './UttaksplanAdvarselIkon';

interface Props {
    periode: PeriodeDto_fpoversikt;
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
        Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom),
        intl,
    );

    return (
        <HStack gap="space-24" align="center">
            <PeriodeIkon periode={periode} navnPåForeldre={navnPåForeldre} erFarEllerMedmor={erFarEllerMedmor} />
            <HStack justify="space-between" className="w-110">
                <VStack gap="space-4">
                    <Label as="h4">
                        <PeriodeTittel
                            periode={periode}
                            navnPåForeldre={navnPåForeldre}
                            familiehendelsesdato={familiehendelsesdato}
                            termindato={termindato}
                            situasjon={situasjon}
                            erFarEllerMedmor={erFarEllerMedmor}
                            erAleneOmOmsorg={erAleneOmOmsorg}
                        />
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

const PeriodeIkon = ({
    periode,
    navnPåForeldre,
    erFarEllerMedmor,
}: {
    periode: PeriodeDto_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}): React.ReactNode | null => {
    const side = periode.søker;
    if (!side) {
        return null;
    }

    const erUttak = Uttaksperioden.erUttaksperiode(side);
    if (erUttak) {
        if (side.resultat?.årsak === 'INNVILGET_UTTAK_AVSLÅTT_GRADERING_TILBAKE_I_TID') {
            return <UttaksplanAdvarselIkon />;
        }

        return (
            <StønadskvoteIkon
                konto={side.kontoType}
                forelder={side.forelder}
                gradert={!!side.gradering}
                navnPåForeldre={navnPåForeldre}
                erFarEllerMedmor={erFarEllerMedmor}
            />
        );
    }

    if (side.overføringÅrsak) {
        return (
            <StønadskvoteIkon
                konto={side.kontoType}
                forelder={side.forelder}
                navnPåForeldre={navnPåForeldre}
                erFarEllerMedmor={erFarEllerMedmor}
            />
        );
    }

    if (side.utsettelseÅrsak) {
        return <UtsettelseIkon årsak={side.utsettelseÅrsak} forelder={side.forelder} />;
    }

    return null;
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
    if (format === 'full' && dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--full`,
        })}${dagerStr}`;
    }
    if (format === 'normal' && dager > 0) {
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
                {d.get('date')}. {d.format('MMM').slice(0, 3)}.
            </BodyShort>
            {visÅr && (
                <BodyShort as="span">
                    <abbr title={`${d.format('MMMM')} ${d.format('YYYY')}`}>{d.format('YYYY')}</abbr>
                </BodyShort>
            )}
        </VStack>
    );
};

const PeriodeTittel = ({
    periode,
    navnPåForeldre,
    familiehendelsesdato,
    termindato,
    situasjon,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}: {
    periode: PeriodeDto_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg?: boolean;
}) => {
    const intl = useIntl();

    const side = periode.søker;
    if (!side) {
        return '';
    }

    const erUttak = Uttaksperioden.erUttaksperiode(side);
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
    if (side.overføringÅrsak) {
        return getStønadskvoteNavn(intl, side.kontoType, navnPåForeldre, erFarEllerMedmor);
    }
    if (side.utsettelseÅrsak) {
        return intl.formatMessage(
            { id: 'uttaksplan.periodeliste.utsettelsesårsak' },
            {
                årsak: intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${side.utsettelseÅrsak}` }),
            },
        );
    }
    return '';
};

const getPeriodeTittelUttaksPeriode = (
    intl: IntlShape,
    periode: PeriodeDto_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
    familiehendelsesdato: string,
    termindato: string | undefined,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    const side = periode.søker;
    if (!side) {
        return '';
    }

    const tittelMedNavn = getStønadskvoteNavn(
        intl,
        side.kontoType,
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
    if (side.gradering || side.samtidigUttak) {
        return `${tittel} ${intl.formatMessage(
            { id: 'gradering.prosent' },
            {
                stillingsprosent: getUttaksprosentFromStillingsprosent(
                    prettifyProsent(side.gradering?.arbeidstidprosent),
                    side.samtidigUttak ? prettifyProsent(side.samtidigUttak) : undefined,
                ),
            },
        )}`;
    }
    return tittel;
};

const appendPeriodeNavnHvisUttakRundtFødselFarMedmor = (
    intl: IntlShape,
    periodeNavn: string,
    periode: PeriodeDto_fpoversikt,
    situasjon: Situasjon,
    familiehendelsesdato: string,
    termindato: string | undefined,
): string => {
    return situasjon === 'fødsel' && isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato)
        ? periodeNavn + intl.formatMessage({ id: 'rundtFødsel' })
        : periodeNavn;
};

const isUttaksperiodeFarMedmorPgaFødsel = (
    periode: PeriodeDto_fpoversikt,
    familiehendelsesdato: string,
    termindato: string | undefined,
): boolean => {
    const side = periode.søker;
    return (
        !!side &&
        erFarMedmorMedValgForUttakRundtFødsel(side) &&
        UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            periode,
            familiehendelsesdato,
            termindato,
        )
    );
};

// Far/medmor kan velje å ta fedrekvote samtidig med mor sitt uttak rundt fødsel – då skal
// perioden merkast som "rundt fødsel" i visninga, uavhengig av om ho faktisk ligg i det lovpålagte
// tidsromet (det sjekkast separat i erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel).
const erFarMedmorMedValgForUttakRundtFødsel = (side: UttakDto_fpoversikt): boolean => {
    return (
        Uttaksperioden.erUttaksperiode(side) &&
        side.forelder === 'FAR_MEDMOR' &&
        side.kontoType === 'FEDREKVOTE' &&
        side.morsAktivitet === undefined &&
        !side.flerbarnsdager &&
        !!side.samtidigUttak
    );
};

