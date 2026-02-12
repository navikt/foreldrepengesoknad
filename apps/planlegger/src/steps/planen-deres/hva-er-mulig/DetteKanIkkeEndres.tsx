import { PersonPregnantIcon } from '@navikt/aksel-icons';
import { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erFarDelAvSøknaden, erFarOgFar, erMorDelAvSøknaden, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { harKunFarSøker1Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading, VStack } from '@navikt/ds-react';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
}

export const DetteKanIkkeEndres = ({ hvemPlanlegger, arbeidssituasjon }: Props) => {
    const intl = useIntl();
    const erAleneforsørger = utledHvemSomHarRett(arbeidssituasjon) !== 'beggeHarRett';
    const erMedmor = hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR;
    const erFar = erFarDelAvSøknaden(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);
    const hvem = finnSøker2Tekst(intl, hvemPlanlegger);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const morHarRett = hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunSøker1HarRett';

    const bTag = (msg: ReactNode[]) => <b>{msg}</b>;

    return (
        <HStack gap="space-20" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonPregnantIcon
                        height={22}
                        width={22}
                        fontSize="1.5rem"
                        color="var(--ax-bg-accent-strong)"
                        aria-hidden
                    />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="HvaErMulig.KanIkkeEndres" />
                </Heading>
                <VStack gap="space-8">
                    {!erFedre &&
                        hvemHarRett !== 'kunSøker2HarRett' &&
                        hvemPlanlegger.type !== HvemPlanleggerType.FAR && (
                            <BodyLong>
                                <FormattedMessage
                                    id="HvaErMulig.TreUkerFørTermin"
                                    values={{ b: bTag, erAleneforsørger }}
                                />
                            </BodyLong>
                        )}
                    {(hvemHarRett === 'beggeHarRett' ||
                        harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger) ||
                        (erAleneforsørger && erMorDelAvSøknaden(hvemPlanlegger)) ||
                        hvemHarRett === 'kunSøker2HarRett') && (
                        <BodyLong>
                            {morHarRett && !erFedre && (
                                <>
                                    <FormattedMessage id="HvaErMulig.SeksUkerEtterFødsel" values={{ b: bTag }} />

                                    <FormattedMessage
                                        id="HvaErMulig.SeksUkerEtterFødsel.DeFørsteUkene"
                                        values={{ erAleneforsørger, erMedmor }}
                                    />
                                </>
                            )}
                            {!erAleneforsørger && (
                                <FormattedMessage
                                    id="HvaErMulig.SeksUkerEtterFødsel.OfteFårFedre"
                                    values={{ erFar, hvem }}
                                />
                            )}
                        </BodyLong>
                    )}
                </VStack>
            </div>
        </HStack>
    );
};
