import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { UttakOverføringÅrsak_fpoversikt } from '@navikt/fp-types';
import { TidsperiodenString, formatDateExtended } from '@navikt/fp-utils';

import {
    Uttaksplanperiode,
    erEøsUttakPeriode,
    erUttaksplanHull,
    erVanligUttakPeriode,
} from '../../../types/UttaksplanPeriode';
import { getVarighetString } from '../../../utils/dateUtils';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';

interface Props {
    periode: Uttaksplanperiode;
    inneholderKunEnPeriode: boolean;
    navnPåForeldre: NavnPåForeldre;
}

export const OverføringsperiodeContent = ({ periode, inneholderKunEnPeriode, navnPåForeldre }: Props) => {
    const intl = useIntl();

    if (erEøsUttakPeriode(periode) || erUttaksplanHull(periode)) {
        throw new Error('Her er perioden feilaktig eøs-uttak eller ett hull');
    }

    const morsAktivitet = erVanligUttakPeriode(periode) && periode.morsAktivitet ? periode.morsAktivitet : undefined;
    const stønadskontoNavn = getStønadskontoNavn(
        intl,
        navnPåForeldre,
        periode.forelder === 'FAR_MEDMOR',
        morsAktivitet,
        periode.kontoType,
    );
    const navnPåAnnenForelder = periode.forelder === 'FAR_MEDMOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    return (
        <HStack gap="space-8">
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <VStack gap="space-8">
                <HStack gap="space-8">
                    <BodyShort weight="semibold">{getLengdePåPeriode(intl, inneholderKunEnPeriode, periode)}</BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
                            intl,
                        )}
                    </BodyShort>
                </HStack>
                <HStack gap="space-8">
                    <BodyShort>
                        {getOverføringsTekst(stønadskontoNavn, navnPåAnnenForelder, periode.overføringÅrsak)}
                    </BodyShort>
                    {periode.gradering !== undefined && (
                        <BodyShort>{getArbeidsTekst(periode.gradering.arbeidstidprosent)}</BodyShort>
                    )}
                </HStack>
            </VStack>
        </HStack>
    );
};

const getArbeidsTekst = (arbeidstidprosent: number) => {
    const uttaksprosent = 100 - arbeidstidprosent;

    return (
        <FormattedMessage id="uttaksplan.periodeListeContent.arbeid" values={{ arbeidstidprosent, uttaksprosent }} />
    );
};

const getLengdePåPeriode = (intl: IntlShape, inneholderKunEnPeriode: boolean, periode: Uttaksplanperiode) => {
    if (inneholderKunEnPeriode) {
        return intl.formatMessage({ id: 'uttaksplan.varighet.helePerioden' });
    }

    return `${formatDateExtended(periode.fom)} - ${formatDateExtended(periode.tom)}`;
};

const getOverføringsTekst = (
    stønadskontoNavn: string,
    navnPåAnnenForelder: string,
    overføringsÅrsak: UttakOverføringÅrsak_fpoversikt | undefined,
) => {
    switch (overføringsÅrsak) {
        case 'SYKDOM_ANNEN_FORELDER':
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.sykdomAnnenForelder"
                    values={{ stønadskontoNavn, navnPåAnnenForelder }}
                />
            );
        case 'ALENEOMSORG':
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.aleneomsorg"
                    values={{ stønadskontoNavn, navnPåAnnenForelder }}
                />
            );
        case 'IKKE_RETT_ANNEN_FORELDER':
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.ikkeRettAnnenForelder"
                    values={{ stønadskontoNavn, navnPåAnnenForelder }}
                />
            );
        case 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER':
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.institusjonsoppholdAnnenForelder"
                    values={{ stønadskontoNavn, navnPåAnnenForelder }}
                />
            );
        default:
            return 'Ingen overføringsårsak oppgitt';
    }
};
