import { Accordion, BodyShort, Button } from '@navikt/ds-react';
import { Block, Step, StepButtonWrapper, formatDate, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import ArbeidsforholdInformasjon from '../inntektsinformasjon/components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { Link } from 'react-router-dom';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import UtenlandsoppholdOppsummering from './utenlandsopphold-oppsummering/UtenlandsoppholdOppsummering';

const Oppsummering = () => {
    const søknad = useSøknad();
    const { barn, informasjonOmUtenlandsopphold, tilrettelegging } = søknad;
    const søkerinfo = useSøkerinfo();
    const { arbeidsforhold } = søkerinfo;
    const intl = useIntl();
    const formatertTermindato = formatDate(barn.termindato);
    useUpdateCurrentTilretteleggingId(undefined);
    console.log(søknad);

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId="oppsummering"
            pageTitle="Oppsummering"
            steps={stepConfig(intl)}
        >
            <Accordion>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>
                        <FormattedMessage id="oppsummering.omDeg" />
                    </Accordion.Header>
                    <Accordion.Content>
                        <Block padBottom="xl" margin="m">
                            <BodyShort>{`${søkerinfo.person.fornavn} ${søkerinfo.person.etternavn}`}</BodyShort>
                        </Block>
                        <BodyShort>{søkerinfo.person.fnr}</BodyShort>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>
                        <FormattedMessage id="oppsummering.omBarnet" />
                    </Accordion.Header>
                    <Accordion.Content>
                        <Block margin="m" padBottom={barn.erBarnetFødt ? 'xl' : 'none'}>
                            <BodyShort>{`Termindato: ${formatertTermindato}`}</BodyShort>
                        </Block>
                        {barn.erBarnetFødt && barn.fødselsdato && (
                            <Block margin="m">
                                <BodyShort>{`Termindato: ${formatertTermindato}`}</BodyShort>
                            </Block>
                        )}
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>
                        <FormattedMessage id="oppsummering.omUtenlandsopphold" />
                    </Accordion.Header>
                    <Accordion.Content>
                        <Block margin="m" padBottom="xl">
                            <BodyShort>
                                {informasjonOmUtenlandsopphold.iNorgeSiste12Mnd
                                    ? 'Du har bodd i Norge de siste 12 månedene'
                                    : 'Du har oppholdt deg i utlandet i de siste 12 månedene'}
                            </BodyShort>
                        </Block>
                        <Block padBottom="xl">
                            <BodyShort>
                                {informasjonOmUtenlandsopphold.iNorgeNeste12Mnd
                                    ? 'Du skal bo i Norge de neste 12 månedene'
                                    : 'Du skal oppholde deg i utlandet de neste 12 månedene'}
                            </BodyShort>
                        </Block>
                        <Block padBottom="xl">
                            <BodyShort>
                                {informasjonOmUtenlandsopphold.iNorgePåHendelsestidspunktet
                                    ? 'På fødselstidspunktet kommer du til å bo i Norge'
                                    : 'På fødselstidpunktet kommer du ikke til å bo i Norge'}
                            </BodyShort>
                        </Block>
                        <UtenlandsoppholdOppsummering informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>
                        <FormattedMessage id="oppsummering.omArbeidsforhold" />
                    </Accordion.Header>
                    <Accordion.Content>
                        <ArbeidsforholdInformasjon
                            visManglerInfo={false}
                            arbeidsforhold={getAktiveArbeidsforhold(arbeidsforhold, barn.termindato)}
                        />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item defaultOpen={true}>
                    <Accordion.Header>Periode med svangerskapspenger</Accordion.Header>
                    <Accordion.Content>
                        <Block margin="m">
                            <BodyShort>{`Termindato: ${formatertTermindato}`}</BodyShort>
                        </Block>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
            <Block margin="xl">
                <StepButtonWrapper>
                    <Button
                        variant="secondary"
                        as={Link}
                        to={getPreviousStepHref('oppsummering', tilrettelegging, undefined)}
                    >
                        <FormattedMessage id="backlink.label" />
                    </Button>
                    <Button
                        icon={<PaperplaneIcon />}
                        iconPosition="right"
                        type="submit"
                        // disabled={formSubmitted}
                        // loading={formSubmitted}
                    >
                        Send inn søknad
                    </Button>
                </StepButtonWrapper>
            </Block>
        </Step>
    );
};

export default Oppsummering;
