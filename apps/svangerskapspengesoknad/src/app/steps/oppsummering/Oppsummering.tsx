import { Accordion, BodyShort, Button } from '@navikt/ds-react';
import { Block, Step, StepButtonWrapper, bemUtils, formatDate, guid, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getBackLinkForOppsummeringSteg } from '../stepsConfig';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { getAktiveArbeidsforhold, getTekstOmManglendeArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { Link } from 'react-router-dom';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';

import './oppsummering.css';

import {
    OppsummeringFormComponents,
    OppsummeringFormData,
    OppsummeringFormField,
    getInitialOppsummeringValues,
} from './oppsummeringFormConfig';
import actionCreator from 'app/context/action/actionCreator';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { useEffect, useMemo, useState } from 'react';
import { validateHarGodkjentOppsummering } from './validation/oppsummeringValidation';
import Api from 'app/api/api';
import useAbortSignal from 'app/hooks/useAbortSignal';
import { redirect, redirectToLogin } from 'app/utils/redirectUtils';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { getSøknadForInnsending } from 'app/utils/apiUtils';
import { dagenFør3UkerFørFamiliehendelse } from 'app/utils/dateUtils';
import { mapTilretteleggingTilPerioder } from 'app/utils/tilretteleggingUtils';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FEIL_VED_INNSENDING, UKJENT_UUID, getErrorCallId, sendErrorMessageToSentry } from 'app/utils/errorUtils';
import { SendtSøknad } from 'app/types/SendtSøknad';
import Environment from 'app/Environment';
import UtenlandsoppholdOppsummering from './utenlandsopphold-oppsummering/UtenlandsoppholdOppsummering';
import ArbeidsforholdInformasjon from '../inntektsinformasjon/components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import FrilansVisning from 'app/components/frilans-visning/FrilansVisning';
import EgenNæringVisning from 'app/components/egen-næring-visning/EgenNæringVisning';
import ArbeidIUtlandetVisning from 'app/components/arbeid-i-utlandet-visning/ArbeidIUtlandetVisning';
import PeriodeOppsummering from './periode-oppsummering/PeriodeOppsummering';
import AccordionItem from 'app/components/accordion/AccordionItem';
import AccordionContent from 'app/components/accordion/AccordionContent';

const Oppsummering = () => {
    useUpdateCurrentTilretteleggingId(undefined);
    const søknad = useSøknad();
    const { søker, tilrettelegging } = søknad;
    const søkerinfo = useSøkerinfo();
    const { dispatch } = useSvangerskapspengerContext();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSendingSøknad, setIsSendingSøknad] = useState(false);
    const [submitError, setSubmitError] = useState<any>(undefined);
    const [sendtSøknad, setSendtSøknad] = useState<undefined | SendtSøknad>(undefined);
    useUpdateCurrentTilretteleggingId(undefined);
    const onAvbrytSøknad = useAvbrytSøknad();
    const abortSignal = useAbortSignal();
    const { barn, informasjonOmUtenlandsopphold } = søknad;
    const { arbeidsforhold } = søkerinfo;
    const intl = useIntl();
    const formatertTermindato = formatDate(barn.termindato);
    const formatertFødselsdato = formatDate(barn.fødselsdato!);
    const bem = bemUtils('oppsummering');
    const familiehendelsedato = barn.erBarnetFødt ? barn.fødselsdato : barn.termindato;
    const sisteDagForSvangerskapspenger = dagenFør3UkerFørFamiliehendelse(familiehendelsedato!);
    const allePerioderMedFomOgTom = useMemo(
        () => mapTilretteleggingTilPerioder(søknad.tilrettelegging, sisteDagForSvangerskapspenger),
        [søknad.tilrettelegging, sisteDagForSvangerskapspenger],
    );
    const søknadForInnsending = useMemo(() => getSøknadForInnsending(søknad, allePerioderMedFomOgTom), [søknad, intl]);
    const handleSubmit = (values: Partial<OppsummeringFormData>) => {
        dispatch(actionCreator.setGodkjentOppsummering(values.harGodkjentOppsummering!));
        setFormSubmitted(true);
    };
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, barn.termindato);
    const tilretteleggingMedFrilans = tilrettelegging.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER,
    );
    const tilretteleggingMedSN = tilrettelegging.find((t) => t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG);
    useEffect(() => {
        if (formSubmitted && !isSendingSøknad) {
            setIsSendingSøknad(true);

            Api.sendSøknad(søknadForInnsending, abortSignal)
                .then((response) => {
                    setSendtSøknad(response.data);
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        redirectToLogin();
                    } else {
                        setSubmitError(error);
                    }
                });
        }
    });

    useEffect(() => {
        if (submitError !== undefined) {
            sendErrorMessageToSentry(submitError);
            const submitErrorCallId = getErrorCallId(submitError);
            const callIdForBruker =
                submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
            throw new Error(FEIL_VED_INNSENDING + callIdForBruker);
        }
    }, [submitError]);

    useEffect(() => {
        if (sendtSøknad) {
            let navigateTo = Environment.INNSYN;
            if (sendtSøknad.saksNr) {
                navigateTo = `${Environment.INNSYN}/sak/${sendtSøknad.saksNr}`;
            }
            redirect(navigateTo);
        }
    }, [sendtSøknad]);

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
                            onCancel={onAvbrytSøknad}
                            useNoTempSavingText={true}
                        >
                            <Block padBottom="l">
                                <div className={bem.block}>
                                    <Accordion>
                                        <AccordionItem title={intlUtils(intl, 'oppsummering.omDeg')}>
                                            <AccordionContent>
                                                <Block padBottom="m">
                                                    <BodyShort>{`${søkerinfo.person.fornavn} ${søkerinfo.person.etternavn}`}</BodyShort>
                                                </Block>
                                                <Block>
                                                    <BodyShort>{søkerinfo.person.fnr}</BodyShort>
                                                </Block>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem title={intlUtils(intl, 'oppsummering.omBarnet')}>
                                            <AccordionContent>
                                                <BodyShort>{`Termindato: ${formatertTermindato}`}</BodyShort>
                                                {barn.erBarnetFødt && barn.fødselsdato && (
                                                    <Block margin="m">
                                                        <BodyShort>{`Fødselsdato: ${formatertFødselsdato}`}</BodyShort>
                                                    </Block>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem title={intlUtils(intl, 'oppsummering.omUtenlandsopphold')}>
                                            <AccordionContent>
                                                <Block padBottom="l"> </Block>
                                                <Block>
                                                    <UtenlandsoppholdOppsummering
                                                        informasjonOmUtenlandsopphold={informasjonOmUtenlandsopphold}
                                                    />
                                                </Block>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem title={intlUtils(intl, 'oppsummering.omArbeidsforhold')}>
                                            <AccordionContent>
                                                <Block padBottom="xl">
                                                    {aktiveArbeidsforhold.length > 0 && (
                                                        <ArbeidsforholdInformasjon
                                                            visManglerInfo={false}
                                                            arbeidsforhold={aktiveArbeidsforhold}
                                                        />
                                                    )}
                                                    {søker.harJobbetSomFrilans && søker.frilansInformasjon && (
                                                        <FrilansVisning
                                                            frilans={søker.frilansInformasjon}
                                                        ></FrilansVisning>
                                                    )}
                                                    {søker.harJobbetSomSelvstendigNæringsdrivende &&
                                                        søker.selvstendigNæringsdrivendeInformasjon && (
                                                            <EgenNæringVisning
                                                                næring={søker.selvstendigNæringsdrivendeInformasjon}
                                                            ></EgenNæringVisning>
                                                        )}
                                                    {søker.harHattAnnenInntekt &&
                                                        søker.andreInntekter &&
                                                        søker.andreInntekter.map((arbeid) => {
                                                            return (
                                                                <ArbeidIUtlandetVisning
                                                                    key={guid()}
                                                                    arbeidIUtlandet={arbeid}
                                                                ></ArbeidIUtlandetVisning>
                                                            );
                                                        })}
                                                    {(!søker.harJobbetSomFrilans ||
                                                        !søker.harJobbetSomSelvstendigNæringsdrivende ||
                                                        !søker.harHattAnnenInntekt) && (
                                                        <Block padBottom="m">
                                                            <BodyShort>
                                                                {getTekstOmManglendeArbeidsforhold(søker, intl)}
                                                            </BodyShort>
                                                        </Block>
                                                    )}
                                                </Block>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem
                                            title={intlUtils(intl, 'oppsummering.periodeMedSvangerskapspenger')}
                                        >
                                            <AccordionContent>
                                                {tilretteleggingMedFrilans && (
                                                    <>
                                                        <Block padBottom="l">
                                                            <BodyShort className={bem.element('label')}>
                                                                {'Risikofaktorer i jobben din som frilanser:'}
                                                            </BodyShort>
                                                            <BodyShort>
                                                                {tilretteleggingMedFrilans.risikofaktorer}
                                                            </BodyShort>
                                                        </Block>
                                                        <Block padBottom="l">
                                                            <BodyShort className={bem.element('label')}>
                                                                {'Tilretteleggingstiltak i jobben din som frilanser:'}
                                                            </BodyShort>
                                                            <BodyShort>
                                                                {tilretteleggingMedFrilans.tilretteleggingstiltak}
                                                            </BodyShort>
                                                        </Block>
                                                    </>
                                                )}
                                                {tilretteleggingMedSN && (
                                                    <>
                                                        <Block padBottom="l">
                                                            <BodyShort
                                                                className={bem.element('label')}
                                                            >{`Risikofaktorer i ${tilretteleggingMedSN.arbeidsforhold.navn}`}</BodyShort>
                                                            <BodyShort>{tilretteleggingMedSN.risikofaktorer}</BodyShort>
                                                        </Block>
                                                        <Block padBottom="l">
                                                            <BodyShort className={bem.element('label')}>
                                                                {`Tilretteleggingstiltak i ${tilretteleggingMedSN.arbeidsforhold.navn}`}
                                                            </BodyShort>
                                                            <BodyShort>
                                                                {tilretteleggingMedSN.tilretteleggingstiltak}
                                                            </BodyShort>
                                                        </Block>
                                                    </>
                                                )}
                                                <PeriodeOppsummering
                                                    perioder={allePerioderMedFomOgTom}
                                                    sisteDagForSvangerskapspenger={sisteDagForSvangerskapspenger}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    <Block margin="xl" padBottom="xl">
                                        <OppsummeringFormComponents.ConfirmationCheckbox
                                            name={OppsummeringFormField.harGodkjentOppsummering}
                                            label={intlUtils(intl, 'oppsummering.bekreft')}
                                            validate={validateHarGodkjentOppsummering(intl)}
                                        />
                                    </Block>
                                    <Block padBottom="l">
                                        <StepButtonWrapper>
                                            <Button
                                                variant="secondary"
                                                as={Link}
                                                to={getBackLinkForOppsummeringSteg(tilrettelegging)}
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
                                                {intlUtils(intl, 'send.søknad')}
                                            </Button>
                                        </StepButtonWrapper>
                                    </Block>
                                </div>
                            </Block>
                        </Step>
                    </OppsummeringFormComponents.Form>
                );
            }}
        />
    );
};

export default Oppsummering;
