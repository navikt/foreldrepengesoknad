import { PersonGroupIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden, finnSøker1Tekst, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert } from 'utils/barnetUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
}

export const FarFellesperiode = ({ hvemPlanlegger, barnet }: Props) => {
    const intl = useIntl();
    const erAdopsjon = erBarnetAdoptert(barnet);
    const erFedre = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;
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
                {erAdopsjon ? (
                    <>
                        <Heading size="small">
                            <FormattedMessage
                                id="HvaErMulig.FarFellesperiode.Adopsjon"
                                values={{ hvem: finnSøker2Tekst(intl, hvemPlanlegger), erFedre, erMedmor }}
                            />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage
                                id="HvaErMulig.FarFellesperiode.Tekst.Adopsjon"
                                values={{
                                    hvem: capitalizeFirstLetter(finnSøker1Tekst(intl, hvemPlanlegger)),
                                    erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                                    erFar: finnSøker2Tekst(intl, hvemPlanlegger),
                                    erMedmor,
                                    erFedre,
                                    erAdopsjon,
                                }}
                            />
                        </BodyLong>
                    </>
                ) : (
                    <>
                        <Heading size="small">
                            <FormattedMessage
                                id="HvaErMulig.FarFellesperiode"
                                values={{ hvem: finnSøker2Tekst(intl, hvemPlanlegger), erMedmor }}
                            />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage
                                id="HvaErMulig.FarFellesperiode.Tekst"
                                values={{
                                    hvem: capitalizeFirstLetter(finnSøker1Tekst(intl, hvemPlanlegger)),
                                    erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                                    erFar: finnSøker2Tekst(intl, hvemPlanlegger),
                                    erMedmor,
                                    erFedre,
                                    erAdopsjon,
                                }}
                            />
                        </BodyLong>
                    </>
                )}
            </div>
        </HStack>
    );
};
