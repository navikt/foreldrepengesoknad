import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { NavnPåForeldre, UttakOverføringÅrsak_fpoversikt } from '@navikt/fp-types';
import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import { Uttaksdagen, formatDateExtended } from '@navikt/fp-utils';

import { Uttaksplanperiode, erPeriodeDto } from '../../../../types/UttaksplanPeriode';
import { getVarighetString } from '../../../../utils/dateUtils';
import { getStønadskvoteNavn } from '../../../utils/uttaksplanListeUtils';

interface Props {
    periode: Uttaksplanperiode;
    inneholderKunEnPeriode: boolean;
    navnPåForeldre: NavnPåForeldre;
}

export const OverføringsperiodeContent = ({ periode, inneholderKunEnPeriode, navnPåForeldre }: Props) => {
    const intl = useIntl();

    const side = erPeriodeDto(periode) ? (periode.søker ?? periode.annenPart) : undefined;
    if (!side) {
        return null;
    }

    const morsAktivitet = side.morsAktivitet;
    const stønadskvoteNavn = getStønadskvoteNavn(intl, {
        navnPåForeldre,
        erFarEllerMedmor: side.forelder === 'FAR_MEDMOR',
        erEøsPeriode: false,
        morsAktivitet,
        konto: side.kontoType,
    });
    const navnPåAnnenForelder = side.forelder === 'FAR_MEDMOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    return (
        <HStack gap="space-8">
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <VStack gap="space-8">
                <HStack gap="space-8">
                    <BodyShort weight="semibold">
                        {inneholderKunEnPeriode ? (
                            <FormattedMessage id="uttaksplan.varighet.helePerioden" />
                        ) : (
                            `${formatDateExtended(periode.fom)} - ${formatDateExtended(periode.tom)}`
                        )}
                    </BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            Uttaksdagen.denneEllerNeste(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom),
                            intl,
                        )}
                    </BodyShort>
                </HStack>
                <HStack gap="space-8">
                    <BodyShort>
                        {getOverføringsTekst(stønadskvoteNavn, navnPåAnnenForelder, side.overføringÅrsak)}
                    </BodyShort>
                    {side.gradering !== undefined && (
                        <BodyShort>
                            <FormattedMessage
                                id="uttaksplan.periodeListeContent.arbeid"
                                values={{
                                    arbeidstidprosent: side.gradering.arbeidstidprosent,
                                    uttaksprosent: 100 - side.gradering.arbeidstidprosent,
                                }}
                            />
                        </BodyShort>
                    )}
                </HStack>
            </VStack>
        </HStack>
    );
};

const getOverføringsTekst = (
    stønadskvoteNavn: string,
    navnPåAnnenForelder: string,
    overføringsÅrsak: UttakOverføringÅrsak_fpoversikt | undefined,
) => {
    switch (overføringsÅrsak) {
        case 'SYKDOM_ANNEN_FORELDER':
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.sykdomAnnenForelder"
                    values={{ stønadskvoteNavn, navnPåAnnenForelder }}
                />
            );
        case 'ALENEOMSORG':
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.aleneomsorg"
                    values={{ stønadskvoteNavn, navnPåAnnenForelder }}
                />
            );
        case 'IKKE_RETT_ANNEN_FORELDER':
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.ikkeRettAnnenForelder"
                    values={{ stønadskvoteNavn, navnPåAnnenForelder }}
                />
            );
        case 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER':
            return (
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.overføring.institusjonsoppholdAnnenForelder"
                    values={{ stønadskvoteNavn, navnPåAnnenForelder }}
                />
            );
        default:
            return 'Ingen overføringsårsak oppgitt';
    }
};
