import { BabyWrappedIcon, InformationIcon, TeddyBearIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker as erAlene } from 'utils/HvemPlanleggerUtils';
import { loggExpansionCardOpen } from 'utils/amplitudeUtils';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';

import { BodyShort, ExpansionCard, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { BluePanel, IconCircleWrapper, Infobox } from '@navikt/fp-ui';

export const getFamiliehendelsedato = (barnet: OmBarnet) => {
    if (erBarnetAdoptert(barnet)) {
        return barnet.overtakelsesdato;
    }
    return erBarnetUFødt(barnet) ? barnet.termindato : barnet.fødselsdato;
};
interface Props {
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
}

export const BarnehageplassOppsummering = ({ hvemPlanlegger, barnet }: Props) => {
    const intl = useIntl();
    const erAlenesøker = erAlene(hvemPlanlegger);
    const antallBarn = barnet.antallBarn;

    return (
        <VStack gap="space-40">
            <ExpansionCard aria-label="" onToggle={loggExpansionCardOpen('toggle-oppgitt-informasjon')} size="small">
                <ExpansionCard.Header>
                    <HStack gap="space-24" align="center" wrap={false}>
                        <IconCircleWrapper size="medium" color="lightBlue">
                            <TeddyBearIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage id="BarnehageplassOppsummering.Tittel" />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="space-8">
                        <BluePanel>
                            <VStack gap="space-8">
                                <HStack justify="space-between" wrap={false}>
                                    <Heading size="xsmall" level="4">
                                        <FormattedMessage
                                            id="BarnehageplassOppsummering.KanHaPlass"
                                            values={{
                                                erAlenesøker,
                                                barnehagestartdato: intl.formatDate(barnehagestartDato(barnet), {
                                                    month: 'long',
                                                    year: 'numeric',
                                                }),
                                            }}
                                        />
                                    </Heading>
                                    <IconCircleWrapper size="medium" color="blue">
                                        <BabyWrappedIcon
                                            height={24}
                                            width={24}
                                            color="var(--ax-bg-accent-strong)"
                                            fontSize="1.5rem"
                                            aria-hidden
                                        />
                                    </IconCircleWrapper>
                                </HStack>

                                <BodyShort>
                                    <FormattedMessage
                                        id="BarnehageplassOppsummering.Beregnet"
                                        values={{
                                            erAlenesøker,
                                            familiehendelsesdato: intl.formatDate(getFamiliehendelsedato(barnet), {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            }),
                                            antallBarn,
                                            erFødt: erBarnetFødt(barnet),
                                            a: (msg) => (
                                                <Link href={links.barnehageloven} target="_blank" rel="noreferrer">
                                                    {msg}
                                                </Link>
                                            ),
                                            erAdopsjon: erBarnetAdoptert(barnet),
                                        }}
                                    />
                                </BodyShort>
                            </VStack>
                        </BluePanel>
                        <Infobox
                            header={<FormattedMessage id="BarnehageplassOppsummering.ManKanFå" />}
                            color="gray"
                            icon={
                                <InformationIcon
                                    height={24}
                                    width={24}
                                    color="var(--ax-bg-neutral-strong)"
                                    fontSize="1.5rem"
                                    aria-hidden
                                />
                            }
                        >
                            <BodyShort>
                                <FormattedMessage
                                    id="BarnehageplassOppsummering.Kommune"
                                    values={{
                                        erAlenesøker,
                                    }}
                                />
                            </BodyShort>
                        </Infobox>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};
