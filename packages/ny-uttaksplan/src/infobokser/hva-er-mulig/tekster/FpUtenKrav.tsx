import { PersonGroupIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';

export const FpUtenKrav = () => {
    const {
        foreldreInfo: { erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonGroupIcon
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
                    <FormattedMessage id="HvaErMulig.ForeldrepengerUtenAktivitetskrav" />
                </Heading>

                <BodyLong>
                    <FormattedMessage
                        id="HvaErMulig.ForeldrepengerUtenAktivitetskrav.Tekst"
                        values={{ erMedmor: erMedmorDelAvSøknaden }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
