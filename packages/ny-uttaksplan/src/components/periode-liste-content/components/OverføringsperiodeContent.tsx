import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { Forelder } from '@navikt/fp-constants';
import { OverføringÅrsakType } from '@navikt/fp-types';
import { TidsperiodenString, formatDateExtended } from '@navikt/fp-utils';

import { Planperiode } from '../../../types/Planperiode';
import { getVarighetString } from '../../../utils/dateUtils';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';

interface Props {
    periode: Planperiode;
    inneholderKunEnPeriode: boolean;
    navnPåForeldre: NavnPåForeldre;
}

export const OverføringsperiodeContent = ({ periode, inneholderKunEnPeriode, navnPåForeldre }: Props) => {
    const intl = useIntl();
    const { forelder } = periode;
    const stønadskontoNavn = getStønadskontoNavn(
        intl,
        // TODO fiks bruk av !
        periode.kontoType!,
        navnPåForeldre,
        forelder === Forelder.farMedmor,
    );
    const navnPåAnnenForelder = forelder === Forelder.farMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

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

const getLengdePåPeriode = (intl: IntlShape, inneholderKunEnPeriode: boolean, periode: Planperiode) => {
    if (inneholderKunEnPeriode) {
        return intl.formatMessage({ id: 'uttaksplan.varighet.helePerioden' });
    }

    return `${formatDateExtended(periode.fom)} - ${formatDateExtended(periode.tom)}`;
};

const getOverføringsTekst = (
    stønadskontoNavn: string,
    navnPåAnnenForelder: string,
    overføringsÅrsak: OverføringÅrsakType | undefined,
) => {
    switch (overføringsÅrsak) {
        case OverføringÅrsakType.sykdomAnnenForelder:
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.sykdomAnnenForelder"
                    values={{ stønadskontoNavn, navnPåAnnenForelder }}
                />
            );
        case OverføringÅrsakType.aleneomsorg:
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.aleneomsorg"
                    values={{ stønadskontoNavn, navnPåAnnenForelder }}
                />
            );
        case OverføringÅrsakType.ikkeRettAnnenForelder:
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.ikkeRettAnnenForelder"
                    values={{ stønadskontoNavn, navnPåAnnenForelder }}
                />
            );
        case OverføringÅrsakType.institusjonsoppholdAnnenForelder:
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
