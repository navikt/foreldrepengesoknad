import { PersonGroupIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { BodyLong, HStack, Heading, Link } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
}

export const FpMedKrav = ({ hvemPlanlegger }: Props) => {
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
                    <FormattedMessage id="HvaErMulig.ForeldrepengerMedAktivitetskrav" />
                </Heading>

                <BodyLong>
                    <FormattedMessage
                        id="HvaErMulig.ForeldrepengerMedAktivitetskrav.Tekst"
                        values={{
                            a: (msg) => (
                                <Link href={links.hvorLenge} rel="noreferrer" target="_blank">
                                    {msg}
                                </Link>
                            ),
                            erMedmor,
                        }}
                    />
                </BodyLong>
            </div>
        </HStack>
    );
};
