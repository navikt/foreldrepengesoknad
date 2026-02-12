import { PersonGroupIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
}

export const FpUtenKrav = ({ hvemPlanlegger }: Props) => {
    const erMedmor = hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR;

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
                    <FormattedMessage id="HvaErMulig.ForeldrepengerUtenAktivitetskrav.Tekst" values={{ erMedmor }} />
                </BodyLong>
            </div>
        </HStack>
    );
};
