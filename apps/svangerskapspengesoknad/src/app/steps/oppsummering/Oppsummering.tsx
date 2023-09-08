import { Accordion, BodyShort, Button, ConfirmationPanel } from '@navikt/ds-react';
import { Block, Step, StepButtonWrapper, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
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

import './oppsummering.css';

const Oppsummering = () => {
    const søknad = useSøknad();
    const { barn, informasjonOmUtenlandsopphold, tilrettelegging } = søknad;
    const søkerinfo = useSøkerinfo();
    const { arbeidsforhold } = søkerinfo;
    const intl = useIntl();
    const formatertTermindato = formatDate(barn.termindato);
    useUpdateCurrentTilretteleggingId(undefined);
    const bem = bemUtils('oppsummering');

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId="oppsummering"
            pageTitle="Oppsummering"
            steps={stepConfig(intl)}
        >
            <Accordion>
                <Accordion.Item className={bem.element('header-reverse-chevron')}>
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
                <Accordion.Item className={bem.element('header-reverse-chevron')}>
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
                <Accordion.Item className={bem.element('header-reverse-chevron')}>
                    <Accordion.Header>
                        <FormattedMessage id="oppsummering.omUtenlandsopphold" />
                    </Accordion.Header>
                    <Accordion.Content>
                        <UtenlandsoppholdOppsummering informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item className={bem.element('header-reverse-chevron')}>
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
                <Accordion.Item className={bem.element('header-reverse-chevron')}>
                    <Accordion.Header>
                        <FormattedMessage id="oppsummering.periodeMedSvangerskapspenger" />
                    </Accordion.Header>
                    <Accordion.Content>
                        <Block margin="m">
                            <BodyShort>{`Termindato: ${formatertTermindato}`}</BodyShort>
                        </Block>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
            <Block margin="xl">
                <ConfirmationPanel label={intlUtils(intl, 'oppsummering.bekreft')} />
            </Block>
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
