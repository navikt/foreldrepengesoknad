import { BabyWrappedIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { finnTekstForMedmorEllerFar } from '../../../infobokser/utils/infoboksUtils';

interface Props {
    erFarOgFar: boolean;
}

export const ToUkerRundtFødsel = ({ erFarOgFar }: Props) => {
    const intl = useIntl();

    const {
        foreldreInfo: { erMedmorDelAvSøknaden, søker, rettighetType },
    } = useUttaksplanData();

    const hvem = finnTekstForMedmorEllerFar(intl, søker, rettighetType, erMedmorDelAvSøknaden);

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
                    <FormattedMessage id="HvaErMulig.ToUkerRundtFødsel" />
                </Heading>
                <BodyLong>
                    {!erFarOgFar ? (
                        <FormattedMessage
                            id="HvaErMulig.ToUkerRundtFødsel.Tekst"
                            values={{
                                hvem,
                            }}
                        />
                    ) : (
                        <FormattedMessage
                            id="HvaErMulig.ToUkerRundtFødsel.FedreTekst"
                            values={{
                                hvem,
                            }}
                        />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
