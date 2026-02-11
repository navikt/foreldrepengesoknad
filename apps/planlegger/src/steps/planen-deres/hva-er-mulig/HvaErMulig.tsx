import { PencilWritingIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker, erFarDelAvSøknaden, erFarOgFar } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { loggExpansionCardOpen } from 'utils/umamiUtils';

import { ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

import { AktivitetskravFar } from './AktivitetskravFar';
import { Barnehageplass } from './Barnehageplass';
import { DetteKanIkkeEndres } from './DetteKanIkkeEndres';
import { FarFellesperiode } from './FarFellesperiode';
import { ForeldrepengerSamtidig } from './ForeldrepengerSamtidig';
import { FpMedKrav } from './FpMedKrav';
import { FpUtenKrav } from './FpUtenKrav';
import { JobbeSamtidig } from './JobbeSamtidig';
import { LeggeTilFerie } from './LeggeTilFerie';
import { ToUkerRundtFødsel } from './ToUkerRundtFødsel';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    barnet: OmBarnet;
}

export const HvaErMulig = ({ hvemPlanlegger, arbeidssituasjon, barnet }: Props) => {
    const erAlene = erAlenesøker(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);
    const erFarAlene = erAlene && erFarDelAvSøknaden(hvemPlanlegger);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';
    const kunSøker2SkalHa = hvemHarRett === 'kunSøker2HarRett';

    const kunFarSøker2EllerMedmorHarRett =
        hvemHarRett === 'kunSøker2HarRett' &&
        (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR ||
            hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR);

    return (
        <ExpansionCard
            aria-label="Expansion card"
            onToggle={loggExpansionCardOpen('toggle-tilpasse-planen')}
            size="small"
            defaultOpen={true}
        >
            <ExpansionCard.Header>
                <HStack gap="space-24" align="center" wrap={false}>
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
                <VStack gap="space-20">
                    <Heading size="small">
                        <FormattedMessage id="HvaErMulig.MyeDuKanEndre" />
                    </Heading>
                    {!erBarnetAdoptert(barnet) && (
                        <>
                            {!(erFarAlene || erFedre || kunFarSøker2EllerMedmorHarRett) && (
                                <DetteKanIkkeEndres
                                    hvemPlanlegger={hvemPlanlegger}
                                    arbeidssituasjon={arbeidssituasjon}
                                />
                            )}

                            <Barnehageplass />

                            {(kunFarSøker2EllerMedmorHarRett || erFedre) && (
                                <ToUkerRundtFødsel hvemPlanlegger={hvemPlanlegger} />
                            )}
                            {erFedre && !kunEnPartSkalHa && <AktivitetskravFar />}

                            <LeggeTilFerie hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} />

                            {!kunEnPartSkalHa && !erFedre && <FarFellesperiode hvemPlanlegger={hvemPlanlegger} />}

                            {!kunSøker2SkalHa && <JobbeSamtidig />}

                            {!erAlene && !kunEnPartSkalHa && (
                                <ForeldrepengerSamtidig
                                    hvemPlanlegger={hvemPlanlegger}
                                    arbeidssituasjon={arbeidssituasjon}
                                    barnet={barnet}
                                />
                            )}
                            {kunFarSøker2EllerMedmorHarRett && (
                                <>
                                    <FpUtenKrav hvemPlanlegger={hvemPlanlegger} />
                                    <FpMedKrav hvemPlanlegger={hvemPlanlegger} />
                                </>
                            )}
                        </>
                    )}
                    {erBarnetAdoptert(barnet) && (
                        <>
                            {!erFarAlene && <FarFellesperiode hvemPlanlegger={hvemPlanlegger} />}

                            <Barnehageplass />

                            <LeggeTilFerie hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} />

                            <JobbeSamtidig />

                            {(!erAlene || !erFedre) && !kunEnPartSkalHa && (
                                <ForeldrepengerSamtidig
                                    erAdopsjon
                                    hvemPlanlegger={hvemPlanlegger}
                                    arbeidssituasjon={arbeidssituasjon}
                                    barnet={barnet}
                                />
                            )}
                        </>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
