import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { HvemPlanlegger, getNavnPåSøker, isAlene } from 'types/HvemPlanlegger';
import { Situasjon } from 'types/Søkersituasjon';

import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';

const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR) {
        return intl.formatMessage({ id: 'OversiktSteg.Medmor' });
    }
    if (
        hvemPlanlegger.type === Situasjon.FAR ||
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR ||
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR
    ) {
        return intl.formatMessage({ id: 'OversiktSteg.Far' });
    }
    return undefined;
};
interface Props {
    hvemPlanlegger: HvemPlanlegger;
}

//TODO Skal denne brukast?

const Foreldrepengeinfo: FunctionComponent<Props> = ({ hvemPlanlegger }) => {
    const intl = useIntl();
    const erAlenesøker = isAlene(hvemPlanlegger);
    const erFarEllerMedmor =
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR || hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR;
    return (
        <VStack gap="10">
            <Box background="surface-alt-3-subtle" padding="4" borderRadius="large">
                <VStack gap="2">
                    {erAlenesøker && (
                        <VStack gap="2">
                            <Heading size="small">
                                <FormattedMessage id="Foreldrepengeinfo.ForeldrepengerInfo" values={{ erAlenesøker }} />
                            </Heading>

                            <BodyLong>
                                <FormattedMessage
                                    id="Foreldrepengeinfo.ForeldrepengerInfoTekst"
                                    values={{ erAlenesøker }}
                                />
                            </BodyLong>

                            <BodyLong>
                                {/* TODO Bytt ut tekst */}
                                <FormattedMessage
                                    id="Foreldrepengeinfo.ForeldrepengerInfoTekst"
                                    values={{ erAlenesøker }}
                                />
                            </BodyLong>
                        </VStack>
                    )}
                    {!erAlenesøker && (
                        <VStack gap="2">
                            <Heading size="small">
                                <FormattedMessage id="Foreldrepengeinfo.ForeldrepengerInfo" values={{ erAlenesøker }} />
                            </Heading>

                            <BodyLong>
                                <FormattedMessage
                                    id="Foreldrepengeinfo.ForeldrepengerInfoTekst"
                                    values={{
                                        erAlenesøker,
                                        navn: getNavnPåSøker(hvemPlanlegger, intl),
                                        erFarEllerMedmor,
                                        hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage
                                    id="Foreldrepengeinfo.ForeldrepengerInfoTekst.NAVanbefaler"
                                    values={{ navn: getNavnPåSøker(hvemPlanlegger, intl) }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage id="Foreldrepengeinfo.ForeldrepengerInfoTekst.toFørsteUkerDekket" />
                            </BodyLong>
                        </VStack>
                    )}
                </VStack>
            </Box>
        </VStack>
    );
};

export default Foreldrepengeinfo;
