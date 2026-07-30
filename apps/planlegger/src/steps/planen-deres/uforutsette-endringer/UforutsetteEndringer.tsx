import { ExclamationmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, HvemPlanleggerType } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { loggExpansionCardOpen } from 'utils/umamiUtils';
import { erFødtFørUke33 } from 'utils/dateUtils';

import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { OmBarnetPlanlegger } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

import { FødtFørUke33 } from './FødtFørUke33';
import { HvisBarnetErInnlagt } from './HvisBarnetErInnlagt';
import { HvisBarnetErInnlagtEtterTermin } from './HvisBarnetErInnlagtEtterTermin';
import { HvisBarnetErInnlagtFørTermin } from './HvisBarnetErInnlagtFørTermin';
import { HvisBarnetErSykt } from './HvisBarnetErSykt';
import { HvisBarnetErSyktEllerInnlagt } from './HvisBarnetErSyktEllerInnlagt';
import { HvisDuBlirSyk } from './HvisDuBlirSyk';
import { HvisMorBlirSyk } from './HvisMorBlirSyk';
import { NyttBarnFørTreÅr } from './NyttBarnFørTreÅr';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    barnet: OmBarnetPlanlegger;
}

export const UforutsetteEndringer = ({ hvemPlanlegger, arbeidssituasjon, barnet }: Props) => {
    const erFødsel = barnet.erFødsel === true;
    const erAleneforsørger =
        hvemPlanlegger.type === HvemPlanleggerType.MOR || hvemPlanlegger.type === HvemPlanleggerType.FAR;
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const beggeHarRett = hvemHarRett === 'beggeHarRett';
    const kunMorHarRett = erMorDelAvSøknaden(hvemPlanlegger) && arbeidssituasjon.jobberAnnenPart === false;
    const kunFarEllerMedmorHarRett = hvemHarRett === 'kunSøker2HarRett';
    const erFarOgFar = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;
    const erFarOgFarKunMedfarHarRett =
        hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR && kunFarEllerMedmorHarRett;

    const fødtBarn = 'fødselsdato' in barnet && 'termindato' in barnet ? barnet : undefined;
    const erPrematurFødsel = erFødtFørUke33(fødtBarn?.fødselsdato, fødtBarn?.termindato);

    const visInnlagtForMorRettigheter =
        (beggeHarRett && !erFarOgFar) || kunMorHarRett || (erAleneforsørger && erMorDelAvSøknaden(hvemPlanlegger));

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
                            erPrematurFødsel ? (
                                <>
                                    {!erFarOgFarKunMedfarHarRett && (
                                        <FødtFørUke33
                                            arbeidssituasjon={arbeidssituasjon}
                                            hvemPlanlegger={hvemPlanlegger}
                                        />
                                    )}

                                    {visInnlagtForMorRettigheter && (
                                        <>
                                            <HvisBarnetErInnlagtFørTermin />
                                            <HvisBarnetErInnlagtEtterTermin />
                                        </>
                                    )}

                                    <HvisDuBlirSyk arbeidssituasjon={arbeidssituasjon} />

                                    {erMorDelAvSøknaden(hvemPlanlegger) && (
                                        <HvisMorBlirSyk
                                            hvemPlanlegger={hvemPlanlegger}
                                            arbeidssituasjon={arbeidssituasjon}
                                        />
                                    )}

                                    <NyttBarnFørTreÅr
                                        arbeidssituasjon={arbeidssituasjon}
                                        hvemPlanlegger={hvemPlanlegger}
                                    />
                                </>
                            ) : (
                                <>
                                    <HvisDuBlirSyk arbeidssituasjon={arbeidssituasjon} />

                                    {erMorDelAvSøknaden(hvemPlanlegger) && (
                                        <HvisMorBlirSyk
                                            hvemPlanlegger={hvemPlanlegger}
                                            arbeidssituasjon={arbeidssituasjon}
                                        />
                                    )}

                                    {((erAleneforsørger && !erMorDelAvSøknaden(hvemPlanlegger)) ||
                                        erFarOgFar ||
                                        kunFarEllerMedmorHarRett) && (
                                        <HvisBarnetErSyktEllerInnlagt arbeidssituasjon={arbeidssituasjon} />
                                    )}

                                    {visInnlagtForMorRettigheter && (
                                        <HvisBarnetErInnlagt arbeidssituasjon={arbeidssituasjon} />
                                    )}

                                    {((erAleneforsørger && erMorDelAvSøknaden(hvemPlanlegger)) ||
                                        kunMorHarRett ||
                                        (beggeHarRett && !erFarOgFar)) && (
                                        <HvisBarnetErSykt arbeidssituasjon={arbeidssituasjon} />
                                    )}

                                    {!erFarOgFarKunMedfarHarRett && (
                                        <FødtFørUke33
                                            arbeidssituasjon={arbeidssituasjon}
                                            hvemPlanlegger={hvemPlanlegger}
                                        />
                                    )}

                                    <NyttBarnFørTreÅr
                                        arbeidssituasjon={arbeidssituasjon}
                                        hvemPlanlegger={hvemPlanlegger}
                                    />
                                </>
                            )
                        ) : (
                            <>
                                <HvisDuBlirSyk arbeidssituasjon={arbeidssituasjon} />
                                <HvisBarnetErSyktEllerInnlagt arbeidssituasjon={arbeidssituasjon} />
                                <NyttBarnFørTreÅr arbeidssituasjon={arbeidssituasjon} hvemPlanlegger={hvemPlanlegger} />
                            </>
                        )}
                    </>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
