import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, UttakOverføringÅrsak_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen, formatDateExtended } from '@navikt/fp-utils';

import { Uttaksplanperiode, erPeriodeDto } from '../../../../types/UttaksplanPeriode';
import { getVarighetString } from '../../../../utils/dateUtils';
import { getStønadskvoteNavn } from '../../../utils/uttaksplanListeUtils';
import { GraderingTekst } from './GraderingTekst';

interface Props {
    periode: Uttaksplanperiode;
    inneholderKunEnPeriode: boolean;
    navnPåForeldre: NavnPåForeldre;
}

export const OverføringsperiodeContent = ({ periode, inneholderKunEnPeriode, navnPåForeldre }: Props) => {
    const intl = useIntl();

    const uttak = erPeriodeDto(periode) ? (periode.søker ?? periode.annenPart) : undefined;
    if (!uttak) {
        return null;
    }

    const morsAktivitet = uttak.morsAktivitet;
    const stønadskvoteNavn = getStønadskvoteNavn(intl, {
        navnPåForeldre,
        erFarEllerMedmor: uttak.forelder === 'FAR_MEDMOR',
        erEøsPeriode: false,
        morsAktivitet,
        konto: uttak.kontoType,
    });
    const navnPåAnnenForelder = uttak.forelder === 'FAR_MEDMOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

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
                        {getOverføringsTekst(stønadskvoteNavn, navnPåAnnenForelder, uttak.overføringÅrsak)}
                    </BodyShort>
                    {uttak.gradering !== undefined && (
                        <BodyShort>
                            <GraderingTekst
                                arbeidstidprosent={uttak.gradering.arbeidstidprosent}
                                erAnnenPartsPeriode={erPeriodeDto(periode) && !periode.søker}
                                forelder={uttak.forelder}
                                navnPåForeldre={navnPåForeldre}
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
