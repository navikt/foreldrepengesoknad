import { PencilWritingIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { erFarOgFar, isAlene } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';

import { BodyLong, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import DeFørsteSeksUkene from './tilpassePlanen/DeFørsteSeksUkene';
import FørTermin from './tilpassePlanen/FørTermin';
import JobbeSamtidig from './tilpassePlanen/JobbeSamtidig';
import LeggeTilFerie from './tilpassePlanen/LeggeTilFerie';
import PermisjonSamtidig from './tilpassePlanen/PermisjonSamtidig';
import ToUkerRundtFødsel from './tilpassePlanen/ToUkerRundtFødsel';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    barnet: OmBarnet;
}
const OmÅTilpassePlanen: React.FunctionComponent<Props> = ({ hvemPlanlegger, arbeidssituasjon, barnet }) => {
    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    const erAlenesøker = isAlene(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);
    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';

    return (
        <ExpansionCard aria-label="Expansion card">
            <ExpansionCard.Header>
                <HStack gap="10" align="center" wrap={false}>
                    <div>
                        <IconCircleWrapper color="green" size="large">
                            <PencilWritingIcon height={22} width={22} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <ExpansionCard.Title size="medium">
                            <FormattedMessage id="OmÅTilpassePlanen.Oversikt.OmÅTilpassePlanen" />
                        </ExpansionCard.Title>
                    </div>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="5">
                    <BodyLong>
                        <FormattedMessage id="OmÅTilpassePlanen.Tekst" />
                    </BodyLong>

                    {!morHarIkkeRett &&
                        !erBarnetAdoptert(barnet) &&
                        !erFedre &&
                        hvemPlanlegger.type !== Situasjon.FAR && <FørTermin barnet={barnet} />}
                    {!morHarIkkeRett &&
                        !erBarnetAdoptert(barnet) &&
                        !erFedre &&
                        hvemPlanlegger.type !== Situasjon.FAR && <DeFørsteSeksUkene hvemPlanlegger={hvemPlanlegger} />}
                    {!morHarIkkeRett && <LeggeTilFerie hvemPlanlegger={hvemPlanlegger} />}
                    {erFedre ||
                        (morHarIkkeRett && !erBarnetAdoptert(barnet) && (
                            <ToUkerRundtFødsel hvemPlanlegger={hvemPlanlegger} />
                        ))}
                    {erFedre || (morHarIkkeRett && <LeggeTilFerie hvemPlanlegger={hvemPlanlegger} />)}
                    {!erAlenesøker && !morHarIkkeRett && !erBarnetAdoptert(barnet) && <JobbeSamtidig />}
                    {(!erAlenesøker || !erFedre) && !kunEnPartSkalHa && <PermisjonSamtidig />}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default OmÅTilpassePlanen;
