import { ExclamationmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { FødtFørUke33 } from './tekster/FødtFørUke33';
import { HvisBarnetErInnlagt } from './tekster/HvisBarnetErInnlagt';
import { HvisBarnetErSykt } from './tekster/HvisBarnetErSykt';
import { HvisBarnetErSyktEllerInnlagt } from './tekster/HvisBarnetErSyktEllerInnlagt';
import { HvisDuBlirSyk } from './tekster/HvisDuBlirSyk';
import { HvisMorBlirSyk } from './tekster/HvisMorBlirSyk';
import { NyttBarnFørTreÅr } from './tekster/NyttBarnFørTreÅr';

interface Props {
    erFarOgFar: boolean;
    loggExpansionCardOpen: (tittel: string) => (open: boolean) => void;
}

export const UforutsetteEndringer = ({ erFarOgFar, loggExpansionCardOpen }: Props) => {
    const {
        familiesituasjon,
        foreldreInfo: { rettighetType, søker },
    } = useUttaksplanData();

    const erFødsel = familiesituasjon === 'fødsel';

    const erAleneforsørger = rettighetType === 'ALENEOMSORG';

    const beggeHarRett = rettighetType === 'BEGGE_RETT';

    // TODO (TOR) Er dette korrekt, eller er mor del av søknaden uansett om ho har rett eller ikkje?
    const erMorDelAvSøknaden = !erFarOgFar && (søker === 'MOR' || rettighetType === 'BEGGE_RETT');

    const kunMorHarRett = søker === 'MOR' && (rettighetType === 'BARE_SØKER_RETT' || erAleneforsørger);

    const kunFarEllerMedmorHarRett =
        søker === 'FAR_MEDMOR' && (erAleneforsørger || rettighetType === 'BARE_SØKER_RETT');

    const erFarOgFarKunMedfarHarRett = erFarOgFar && rettighetType === 'BARE_SØKER_RETT';

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
                                <HvisDuBlirSyk />

                                {erMorDelAvSøknaden && <HvisMorBlirSyk />}

                                {((erAleneforsørger && !erMorDelAvSøknaden) ||
                                    erFarOgFar ||
                                    kunFarEllerMedmorHarRett) && <HvisBarnetErSyktEllerInnlagt />}
                                {((beggeHarRett && !erFarOgFar) ||
                                    kunMorHarRett ||
                                    (erAleneforsørger && erMorDelAvSøknaden)) && <HvisBarnetErInnlagt />}

                                {((erAleneforsørger && erMorDelAvSøknaden) ||
                                    kunMorHarRett ||
                                    (beggeHarRett && !erFarOgFar)) && <HvisBarnetErSykt />}

                                {!erFarOgFarKunMedfarHarRett && <FødtFørUke33 />}

                                <NyttBarnFørTreÅr />
                            </>
                        ) : (
                            <>
                                <HvisDuBlirSyk />
                                <HvisBarnetErSyktEllerInnlagt />
                                <NyttBarnFørTreÅr />
                            </>
                        )}
                    </>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
