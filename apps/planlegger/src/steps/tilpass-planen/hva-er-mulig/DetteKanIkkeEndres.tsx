import { PersonPregnantIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import {
    erAlenesøker,
    erFarDelAvSøknaden,
    erFarOgFar,
    erMorDelAvSøknaden,
    finnSøker2Tekst,
} from 'utils/HvemPlanleggerUtils';
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
    const erFar = erFarDelAvSøknaden(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);
    const hvem = finnSøker2Tekst(intl, hvemPlanlegger);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const morHarRett = hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunSøker1HarRett';

    return (
        <HStack gap="5" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonPregnantIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="HvaErMulig.KanIkkeEndres" />
                </Heading>
                <VStack gap="2">
                    {!erFedre &&
                        hvemHarRett !== 'kunSøker2HarRett' &&
                        hvemPlanlegger.type !== HvemPlanleggerType.FAR && (
                            <>
                                {erAlenesøker(hvemPlanlegger) && erMorDelAvSøknaden(hvemPlanlegger) ? (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="HvaErMulig.TreUkerFørTermin.Alenemor"
                                            values={{ b: (msg) => <b>{msg}</b> }}
                                        />
                                    </BodyLong>
                                ) : (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="HvaErMulig.TreUkerFørTermin"
                                            values={{ b: (msg) => <b>{msg}</b> }}
                                        />
                                    </BodyLong>
                                )}
                            </>
                        )}
                    {(hvemHarRett === 'beggeHarRett' ||
                        harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger) ||
                        hvemHarRett === 'kunSøker2HarRett') && (
                        <BodyLong>
                            <FormattedMessage
                                id="HvaErMulig.SeksUkerEtterFødsel"
                                values={{ b: (msg) => <b>{msg}</b> }}
                            />
                            {morHarRett && !erFedre && (
                                <FormattedMessage id="HvaErMulig.SeksUkerEtterFødsel.DeFørsteUkene" />
                            )}
                            <FormattedMessage
                                id="HvaErMulig.SeksUkerEtterFødsel.OfteFårFedre"
                                values={{ erFar, hvem }}
                            />
                        </BodyLong>
                    )}
                </VStack>
            </div>
        </HStack>
    );
};
