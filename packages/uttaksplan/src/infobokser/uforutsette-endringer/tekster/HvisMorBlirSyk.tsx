import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { finnTekstForMedmorEllerFar } from '../../utils/infoboksUtils';

export const HvisMorBlirSyk = () => {
    const intl = useIntl();

    const {
        foreldreInfo: { søker, rettighetType, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    const erMedmor = erMedmorDelAvSøknaden;

    const kunEnPartSkalHa = rettighetType !== 'BEGGE_RETT';

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <StethoscopeIcon
                        height={22}
                        width={22}
                        fontSize="1.5rem"
                        color="var(--ax-bg-accent-strong)"
                        aria-hidden
                    />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small" level="4">
                    <FormattedMessage
                        id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk"
                        values={{ erAlene: rettighetType === 'ALENEOMSORG' }}
                    />
                </Heading>
                <BodyLong>
                    {søker === 'MOR' && kunEnPartSkalHa && (
                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.TekstAlene" />
                    )}
                    {søker === 'FAR_MEDMOR' && kunEnPartSkalHa && (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.TekstKunFarEllerMedmor"
                            values={{
                                hvem: finnTekstForMedmorEllerFar(intl, søker, rettighetType, erMedmor),
                                erMedmor,
                            }}
                        />
                    )}
                    {!kunEnPartSkalHa && (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.Tekst"
                            values={{
                                hvem: finnTekstForMedmorEllerFar(intl, søker, rettighetType, erMedmor),
                                erMedmor,
                            }}
                        />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
