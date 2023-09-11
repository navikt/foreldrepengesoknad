import { Accordion, BodyShort, Button } from '@navikt/ds-react';
import { Block, Step, StepButtonWrapper, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getBackLinkTilretteleggingEllerSkjemaSteg } from '../stepsConfig';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import ArbeidsforholdInformasjon from '../inntektsinformasjon/components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { Link } from 'react-router-dom';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import UtenlandsoppholdOppsummering from './utenlandsopphold-oppsummering/UtenlandsoppholdOppsummering';

import './oppsummering.css';
import {
    OppsummeringFormComponents,
    OppsummeringFormData,
    OppsummeringFormField,
    getInitialOppsummeringValues,
} from './oppsummeringFormConfig';
import actionCreator from 'app/context/action/actionCreator';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { useEffect, useState } from 'react';
import { validateHarGodkjentOppsummering } from './validation/oppsummeringValidation';
import Api from 'app/api/api';
import useAbortSignal from 'app/hooks/useAbortSignal';
import { redirectToLogin } from 'app/utils/redirectToLogin';
import EgenNæringVisning from '../../components/egen-næring-visning/EgenNæringVisning';
import ArbeidIUtlandetVisning from '../arbeid_i_utlandet/components/visning/ArbeidIUtlandetVisning';
import FrilansVisning from 'app/components/frilans-visning/FrilansVisning';

const Oppsummering = () => {
    const søknad = useSøknad();
    const søkerinfo = useSøkerinfo();
    const { dispatch } = useSvangerskapspengerContext();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSendingSøknad, setIsSendingSøknad] = useState(false);
    useUpdateCurrentTilretteleggingId(undefined);
    const abortSignal = useAbortSignal();

    const { barn, informasjonOmUtenlandsopphold, tilrettelegging } = søknad;
    const { arbeidsforhold } = søkerinfo;
    const intl = useIntl();
    const formatertTermindato = formatDate(barn.termindato);
    const bem = bemUtils('oppsummering');

    const handleSubmit = (values: Partial<OppsummeringFormData>) => {
        dispatch(actionCreator.setGodkjentOppsummering(values.harGodkjentOppsummering!));
        setFormSubmitted(true);
    };
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, barn.termindato);

    useEffect(() => {
        if (formSubmitted && !isSendingSøknad) {
            setIsSendingSøknad(true);

            Api.sendSøknad(søknad, abortSignal)
                .then(() => {
                    console.log('Søknad sendt inn success');
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        redirectToLogin();
                    }

                    console.log('Søknad innsending error');
                });
        }
    });

    return (
        <OppsummeringFormComponents.FormikWrapper
            initialValues={getInitialOppsummeringValues()}
            onSubmit={handleSubmit}
            renderForm={() => {
                return (
                    <OppsummeringFormComponents.Form includeButtons={false}>
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
                                        <UtenlandsoppholdOppsummering
                                            informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold}
                                        />
                                    </Accordion.Content>
                                </Accordion.Item>
                                <Accordion.Item className={bem.element('header-reverse-chevron')}>
                                    <Accordion.Header>
                                        <FormattedMessage id="oppsummering.omArbeidsforhold" />
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <Block padBottom="xl">
                                            {aktiveArbeidsforhold.length > 0 && (
                                                <ArbeidsforholdInformasjon
                                                    visManglerInfo={false}
                                                    arbeidsforhold={aktiveArbeidsforhold}
                                                />
                                            )}
                                            {søknad.søker.harJobbetSomFrilansSiste10Mnd &&
                                                søknad.søker.frilansInformasjon && (
                                                    <FrilansVisning
                                                        frilans={søknad.søker.frilansInformasjon}
                                                    ></FrilansVisning>
                                                )}
                                            {søknad.søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd &&
                                                søknad.søker.selvstendigNæringsdrivendeInformasjon && (
                                                    <EgenNæringVisning
                                                        næring={søknad.søker.selvstendigNæringsdrivendeInformasjon}
                                                    ></EgenNæringVisning>
                                                )}
                                            {søknad.søker.harHattAnnenInntektSiste10Mnd &&
                                                søknad.søker.andreInntekterSiste10Mnd &&
                                                søknad.søker.andreInntekterSiste10Mnd.map((arbeid) => {
                                                    return (
                                                        <ArbeidIUtlandetVisning
                                                            arbeidIUtlandet={arbeid}
                                                        ></ArbeidIUtlandetVisning>
                                                    );
                                                })}
                                        </Block>
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
                                <OppsummeringFormComponents.ConfirmationCheckbox
                                    name={OppsummeringFormField.harGodkjentOppsummering}
                                    label={intlUtils(intl, 'oppsummering.bekreft')}
                                    validate={validateHarGodkjentOppsummering(intl)}
                                />
                            </Block>
                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={Link}
                                        to={getBackLinkTilretteleggingEllerSkjemaSteg(tilrettelegging, undefined)}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button
                                        icon={<PaperplaneIcon />}
                                        iconPosition="right"
                                        type="submit"
                                        disabled={formSubmitted}
                                        loading={formSubmitted}
                                    >
                                        Send inn søknad
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </Step>
                    </OppsummeringFormComponents.Form>
                );
            }}
        />
    );
};

export default Oppsummering;
