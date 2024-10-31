import { PencilWritingIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker, erFarOgFar } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { IconCircleWrapper } from '@navikt/fp-ui';

import DetteKanIkkeEndres from './DetteKanIkkeEndres';
import FarFellesperiode from './FarFellesperiode';
import JobbeSamtidig from './JobbeSamtidig';
import LeggeTilFerie from './LeggeTilFerie';
import PermisjonSamtidig from './PermisjonSamtidig';

const onToggleExpansionCard = (open: boolean) => {
    if (open) {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'planlegger',
            team: 'foreldrepenger',
            pageKey: 'toggle-tilpasse-planen',
        });
    }
};

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    barnet: OmBarnet;
}
const HvaErMulig: React.FunctionComponent<Props> = ({ hvemPlanlegger, arbeidssituasjon, barnet }) => {
    const erAlene = erAlenesøker(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';
    const kunSøker2SkalHa = hvemHarRett === 'kunSøker2HarRett';

    return (
        <ExpansionCard aria-label="Expansion card" onToggle={onToggleExpansionCard} size="small">
            <ExpansionCard.Header>
                <HStack gap="6" align="center" wrap={false}>
                    <div>
                        <IconCircleWrapper color="lightBlue" size="medium">
                            <PencilWritingIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage id="HvaErMulig.Tittel" />
                        </ExpansionCard.Title>
                    </div>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="5">
                    <BodyLong>
                        <FormattedMessage id="HvaErMulig.MyeManKanEndre" />
                    </BodyLong>
                    {!erBarnetAdoptert(barnet) && (
                        <>
                            <DetteKanIkkeEndres hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} />

                            <LeggeTilFerie hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} />

                            {!kunEnPartSkalHa && <FarFellesperiode hvemPlanlegger={hvemPlanlegger} />}

                            {!kunSøker2SkalHa && <JobbeSamtidig />}

                            {(!erAlene || !erFedre) && !kunEnPartSkalHa && <PermisjonSamtidig />}
                        </>
                    )}
                    {erBarnetAdoptert(barnet) && (
                        <>
                            <FarFellesperiode hvemPlanlegger={hvemPlanlegger} />

                            <LeggeTilFerie hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} />

                            <JobbeSamtidig />

                            {(!erAlene || !erFedre) && !kunEnPartSkalHa && <PermisjonSamtidig erAdopsjon />}
                        </>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default HvaErMulig;
