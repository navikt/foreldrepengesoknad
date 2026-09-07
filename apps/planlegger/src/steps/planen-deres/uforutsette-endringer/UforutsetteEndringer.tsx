import { ExclamationmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, HvemPlanleggerType } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';
import { erFødtFørUke33 } from 'utils/dateUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { loggExpansionCardOpen } from 'utils/umamiUtils';

import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { OmBarnetPlanlegger } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

import { HvisBarnetErInnlagt } from './HvisBarnetErInnlagt';
import { HvisDuBlirSyk } from './HvisDuBlirSyk';
import { HvisMorBlirSyk } from './HvisMorBlirSyk';
import { FødtFørUke33 } from './FødtFørUke33';
import { PrematurBarnInnlagtEtterTermin } from './PrematurBarnInnlagtEtterTermin';
import { PrematurBarnInnlagtFørTermin } from './PrematurBarnInnlagtFørTermin';
import { NyttBarnFørTreÅr } from './NyttBarnFørTreÅr';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    barnet: OmBarnetPlanlegger;
}

export const UforutsetteEndringer = ({ hvemPlanlegger, arbeidssituasjon, barnet }: Props) => {
    const erFødsel = barnet.erFødsel;
    const erPrematurFødsel = erFødtFørUke33(barnet.fødselsdato, barnet.termindato);
    const visInfoOmPrematurFødsel = erFødsel && !barnet.erBarnetFødt && barnet.termindato !== undefined;
    const erAleneforsørger =
        hvemPlanlegger.type === HvemPlanleggerType.MOR || hvemPlanlegger.type === HvemPlanleggerType.FAR;
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const beggeHarRett = hvemHarRett === 'beggeHarRett';
    const kunMorHarRett = erMorDelAvSøknaden(hvemPlanlegger) && arbeidssituasjon.jobberAnnenPart === false;
    const kunFarEllerMedmorHarRett = hvemHarRett === 'kunSøker2HarRett';
    const erFarOgFar = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;

    return (
        <ExpansionCard aria-label="." onToggle={loggExpansionCardOpen('toggle-uforutsette-endringer')} size="small">
            <ExpansionCard.Header>
                <HStack gap="space-24" align="center" wrap={false}>
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
                <VStack gap="space-20">
                    <>
                        {erFødsel ? (
                            <>
                                <HvisDuBlirSyk arbeidssituasjon={arbeidssituasjon} />

                                {erMorDelAvSøknaden(hvemPlanlegger) && (
                                    <HvisMorBlirSyk
                                        hvemPlanlegger={hvemPlanlegger}
                                        arbeidssituasjon={arbeidssituasjon}
                                    />
                                )}

                                {!erPrematurFødsel &&
                                    ((erAleneforsørger && !erMorDelAvSøknaden(hvemPlanlegger)) ||
                                        erFarOgFar ||
                                        kunFarEllerMedmorHarRett) && (
                                        <HvisBarnetErInnlagt arbeidssituasjon={arbeidssituasjon} />
                                    )}
                                {!erPrematurFødsel &&
                                    ((beggeHarRett && !erFarOgFar) ||
                                        kunMorHarRett ||
                                        (erAleneforsørger && erMorDelAvSøknaden(hvemPlanlegger))) && (
                                        <HvisBarnetErInnlagt arbeidssituasjon={arbeidssituasjon} />
                                    )}

                                {erPrematurFødsel && (
                                    <>
                                        <PrematurBarnInnlagtFørTermin arbeidssituasjon={arbeidssituasjon} />
                                        <PrematurBarnInnlagtEtterTermin />
                                    </>
                                )}

                                {visInfoOmPrematurFødsel && (
                                    <FødtFørUke33 arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} />
                                )}

                                <NyttBarnFørTreÅr arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} />
                            </>
                        ) : (
                            <>
                                <HvisDuBlirSyk arbeidssituasjon={arbeidssituasjon} />
                                <HvisBarnetErInnlagt arbeidssituasjon={arbeidssituasjon} />
                                <NyttBarnFørTreÅr arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} />
                            </>
                        )}
                    </>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
