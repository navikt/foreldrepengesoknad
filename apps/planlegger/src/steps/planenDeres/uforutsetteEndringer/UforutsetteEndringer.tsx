import { ExclamationmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';

import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { IconCircleWrapper } from '@navikt/fp-ui';

import HvisManBlirSyk from './HvisManBlirSyk';
import HvisMorBlirSyk from './HvisMorBlirSyk';
import NyttBarnFørTreÅr from './NyttBarnFørTreÅr';

const onToggleExpansionCard = (open: boolean) => {
    if (open) {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'planlegger',
            team: 'foreldrepenger',
            pageKey: 'toggle-uforutsette-endringer',
        });
    }
};

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
}
const UforutsetteEndringer: React.FunctionComponent<Props> = ({ hvemPlanlegger, barnet, arbeidssituasjon }) => {
    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    return (
        <ExpansionCard aria-label="." onToggle={onToggleExpansionCard} size="small">
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

export default UforutsetteEndringer;
