import { ParasolBeachIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { finnTekstForMedmorEllerFar } from '../../utils/infoboksUtils';

export const LeggeTilFerie = () => {
    const intl = useIntl();

    const {
        foreldreInfo: { rettighetType, søker, erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    const erAlenesøker = rettighetType === 'ALENEOMSORG';
    const kunSøker2SkalHa = rettighetType !== 'BEGGE_RETT' && søker === 'FAR_MEDMOR';

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <ParasolBeachIcon
                        height={22}
                        width={22}
                        fontSize="1.5rem"
                        color="var(--ax-bg-accent-strong)"
                        aria-hidden
                    />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="HvaErMulig.LeggeTilFerie" />
                </Heading>
                <BodyLong>
                    <FormattedMessage
                        id="HvaErMulig.LeggeTilFerie.Tekst"
                        values={{
                            hvem: finnTekstForMedmorEllerFar(intl, søker, rettighetType, erMedmorDelAvSøknaden),
                            erAlenesøker,
                            kunSøker2HarRett: kunSøker2SkalHa,
                            erMedmor: erMedmorDelAvSøknaden,
                        }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
