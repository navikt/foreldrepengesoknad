import { ExclamationmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';
import { loggExpansionCardOpen } from 'utils/amplitudeUtils';

import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { HvisManBlirSyk } from './HvisManBlirSyk';
import { HvisMorBlirSyk } from './HvisMorBlirSyk';
import { NyttBarnFørTreÅr } from './NyttBarnFørTreÅr';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
}

export const UforutsetteEndringer = ({ hvemPlanlegger, barnet, arbeidssituasjon }: Props) => {
    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    return (
        <ExpansionCard aria-label="." onToggle={loggExpansionCardOpen('toggle-uforutsette-endringer')} size="small">
            <ExpansionCard.Header>
                <HStack gap="6" align="center" wrap={false}>
                    <div>
                        <IconCircleWrapper color="lightBlue" size="medium">
                            <ExclamationmarkIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer" />
                        </ExpansionCard.Title>
                    </div>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="5">
                    {erMorDelAvSøknaden(hvemPlanlegger) && !morHarIkkeRett ? (
                        <>
                            <HvisManBlirSyk arbeidssituasjon={arbeidssituasjon} />
                            <HvisMorBlirSyk
                                barnet={barnet}
                                hvemPlanlegger={hvemPlanlegger}
                                arbeidssituasjon={arbeidssituasjon}
                            />

                            <NyttBarnFørTreÅr />
                        </>
                    ) : (
                        <>
                            <HvisManBlirSyk arbeidssituasjon={arbeidssituasjon} />
                            <NyttBarnFørTreÅr />
                        </>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
