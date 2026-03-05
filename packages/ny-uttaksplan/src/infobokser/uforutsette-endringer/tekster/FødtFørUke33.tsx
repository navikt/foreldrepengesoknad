import { BabyWrappedIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';

export const FødtFørUke33 = () => {
    const {
        foreldreInfo: { rettighetType, søker, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    const kunEnPartSkalHa = rettighetType !== 'BEGGE_RETT';

    const morHarIkkeRett =
        søker === 'FAR_MEDMOR' && (rettighetType === 'BARE_SØKER_RETT' || rettighetType === 'ALENEOMSORG');

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <BabyWrappedIcon
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
                    <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.FødtFørUke33" />
                </Heading>
                <BodyLong>
                    {morHarIkkeRett ? (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.FødtFørUke33.TekstMorIkkeRett"
                            values={{
                                erAleneforsørger: kunEnPartSkalHa,
                                erMedmor: erMedmorDelAvSøknaden,
                            }}
                        />
                    ) : (
                        <FormattedMessage
                            id="UforutsetteEndringer.UforutsetteEndringer.FødtFørUke33.Tekst"
                            values={{ erAleneforsørger: kunEnPartSkalHa }}
                        />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
