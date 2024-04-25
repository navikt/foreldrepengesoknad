import { PencilWritingIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { erAlenesøker, erFarOgFar } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import DeFørsteSeksUkene from './DeFørsteSeksUkene';
import FørTermin from './FørTermin';
import JobbeSamtidig from './JobbeSamtidig';
import LeggeTilFerie from './LeggeTilFerie';
import PermisjonSamtidig from './PermisjonSamtidig';
import ToUkerRundtFødsel from './ToUkerRundtFødsel';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    barnet: OmBarnet;
}
const OmÅTilpassePlanen: React.FunctionComponent<Props> = ({ hvemPlanlegger, arbeidssituasjon, barnet }) => {
    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    const erAlene = erAlenesøker(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);
    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';
    const kunFar1HarRett = hvemHarRett === 'kunFarSøker1HarRett';
    const kunFarEllerMedmorHarRett = hvemHarRett === 'kunMedmorEllerFarSøker2HarRett';

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
                    {!erBarnetAdoptert(barnet) && (
                        <>
                            {!morHarIkkeRett && !erFedre && hvemPlanlegger.type !== Situasjon.FAR && (
                                <FørTermin hvemPlanlegger={hvemPlanlegger} barnet={barnet} />
                            )}

                            {!morHarIkkeRett && !erFedre && <DeFørsteSeksUkene hvemPlanlegger={hvemPlanlegger} />}

                            {(kunFarEllerMedmorHarRett || erFedre) && (
                                <ToUkerRundtFødsel hvemPlanlegger={hvemPlanlegger} />
                            )}

                            <LeggeTilFerie hvemPlanlegger={hvemPlanlegger} />

                            {<JobbeSamtidig />}

                            {(!erAlene || !erFedre) && !kunEnPartSkalHa && <PermisjonSamtidig />}
                        </>
                    )}
                    {erBarnetAdoptert(barnet) && (
                        <>
                            <LeggeTilFerie hvemPlanlegger={hvemPlanlegger} />

                            {(!morHarIkkeRett || kunFar1HarRett) && !kunEnPartSkalHa && <JobbeSamtidig />}

                            {(!erAlene || !erFedre) && !kunEnPartSkalHa && <PermisjonSamtidig />}
                        </>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default OmÅTilpassePlanen;
