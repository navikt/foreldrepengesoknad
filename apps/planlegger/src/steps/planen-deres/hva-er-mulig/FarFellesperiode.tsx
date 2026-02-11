import { BabyWrappedIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden, finnSøker1Tekst, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
}

export const FarFellesperiode = ({ hvemPlanlegger }: Props) => {
    const intl = useIntl();
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
                <Heading size="small">
                    <FormattedMessage
                        id="HvaErMulig.FarFellesperiode"
                        values={{ hvem: finnSøker2Tekst(intl, hvemPlanlegger) }}
                    />
                </Heading>
                <BodyLong>
                    <FormattedMessage
                        id="HvaErMulig.MorIAktivitet"
                        values={{
                            hvem: capitalizeFirstLetter(finnSøker1Tekst(intl, hvemPlanlegger)),
                            erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                            erFar: finnSøker2Tekst(intl, hvemPlanlegger),
                            erMedmor: hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR,
                        }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
