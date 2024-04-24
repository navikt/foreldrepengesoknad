import { ExclamationmarkIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import HvisManBlirSyk from './uforutsetteEndringer/HvisManBlirSyk';
import HvisMorBlirSyk from './uforutsetteEndringer/HvisMorBlirSyk';
import NyttBarnFørTreÅr from './uforutsetteEndringer/NyttBarnFørTreÅr';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
}
const UforutsetteEndringer: React.FunctionComponent<Props> = ({ hvemPlanlegger, barnet, arbeidssituasjon }) => {
    const hvemHarRett =
        hvemPlanlegger && arbeidssituasjon ? utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon) : undefined;

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
                    <HvisManBlirSyk arbeidssituasjon={arbeidssituasjon} />
                    {hvemHarRett === 'beggeHarRett' && (
                        <HvisMorBlirSyk barnet={barnet} hvemPlanlegger={hvemPlanlegger} />
                    )}

                    <NyttBarnFørTreÅr />
                </VStack>{' '}
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default UforutsetteEndringer;
