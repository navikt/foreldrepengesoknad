import { ExclamationmarkIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';

import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import HvisManBlirSyk from './HvisManBlirSyk';
import HvisMorBlirSyk from './HvisMorBlirSyk';
import NyttBarnFørTreÅr from './NyttBarnFørTreÅr';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
}
const UforutsetteEndringer: React.FunctionComponent<Props> = ({ hvemPlanlegger, barnet, arbeidssituasjon }) => {
    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    return (
        <ExpansionCard aria-label=".">
            <ExpansionCard.Header>
                <HStack gap="10" align="center" wrap={false}>
                    <div>
                        <IconCircleWrapper color="green" size="large">
                            <ExclamationmarkIcon height={22} width={22} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <ExpansionCard.Title size="medium">
                            <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer" />
                        </ExpansionCard.Title>
                    </div>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="5">
                    {erMorDelAvSøknaden(hvemPlanlegger) && !morHarIkkeRett ? (
                        <>
                            <HvisManBlirSyk arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} />
                            <HvisMorBlirSyk
                                barnet={barnet}
                                hvemPlanlegger={hvemPlanlegger}
                                arbeidssituasjon={arbeidssituasjon}
                            />

                            <NyttBarnFørTreÅr />
                        </>
                    ) : (
                        <>
                            <HvisManBlirSyk arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} />
                            <NyttBarnFørTreÅr />
                        </>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default UforutsetteEndringer;
