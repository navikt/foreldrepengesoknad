import { BabyWrappedIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden, finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
}

export const DeFørsteSeksUkene = ({ hvemPlanlegger, arbeidssituasjon }: Props) => {
    const intl = useIntl();

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const kunMorHarRett = erMorDelAvSøknaden(hvemPlanlegger) && hvemHarRett === 'kunSøker1HarRett';

    return (
        <HStack gap="5" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <BabyWrappedIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small" level="4">
                    <FormattedMessage id="OmÅTilpassePlanen.DeFørsteSeksUkene" />
                </Heading>
                <BodyLong>
                    {kunMorHarRett ? (
                        <FormattedMessage id="OmÅTilpassePlanen.DeFørsteSeksUkene.TekstAlenemor" />
                    ) : (
                        <FormattedMessage
                            id="OmÅTilpassePlanen.DeFørsteSeksUkene.Tekst"
                            values={{
                                hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                            }}
                        />
                    )}
                </BodyLong>
            </div>
        </HStack>
    );
};
