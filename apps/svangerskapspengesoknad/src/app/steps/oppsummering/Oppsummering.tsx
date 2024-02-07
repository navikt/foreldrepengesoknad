import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { Accordion, BodyShort, Button } from '@navikt/ds-react';
import { Block, Step, StepButtonWrapper, bemUtils, formatDate, guid, intlUtils } from '@navikt/fp-common';
import { useAbortSignal } from '@navikt/fp-api';
import { notEmpty } from '@navikt/fp-validation';
import { mapTilretteleggingTilPerioder } from 'app/utils/tilretteleggingUtils';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { getAktiveArbeidsforhold, getTekstOmManglendeArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import FrilansVisning from 'app/components/frilans-visning/FrilansVisning';
import EgenNæringVisning from 'app/components/egen-næring-visning/EgenNæringVisning';
import ArbeidIUtlandetVisning from 'app/components/arbeid-i-utlandet-visning/ArbeidIUtlandetVisning';
import AccordionItem from 'app/components/accordion/AccordionItem';
import AccordionContent from 'app/components/accordion/AccordionContent';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { getSisteDagForSvangerskapspenger } from 'app/utils/dateUtils';
import { getBackLinkAndIdForOppsummeringSteg, useStepConfig } from '../stepsConfig';
import {
    OppsummeringFormComponents,
    OppsummeringFormData,
    OppsummeringFormField,
    getInitialOppsummeringValues,
} from './oppsummeringFormConfig';
import { validateHarGodkjentOppsummering } from './validation/oppsummeringValidation';
import UtenlandsoppholdOppsummering from './utenlandsopphold-oppsummering/UtenlandsoppholdOppsummering';
import ArbeidsforholdInformasjon from '../inntektsinformasjon/components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import PeriodeOppsummering from './periode-oppsummering/PeriodeOppsummering';
import VedleggOppsummering from './vedlegg-oppsummering/VedleggOppsummering';
import BackButton from '../BackButton';

import './oppsummering.css';

type Props = {
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const Oppsummering: React.FunctionComponent<Props> = ({
    sendSøknad,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold);
    const bem = bemUtils('oppsummering');
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const abortSignal = useAbortSignal();

    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const arbeidIUtlandet = useContextGetData(ContextDataType.ARBEID_I_UTLANDET);
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const utenlandsoppholdSenere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdTidligere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const allePerioderMedFomOgTom = useMemo(
        () => mapTilretteleggingTilPerioder(tilrettelegginger, sisteDagForSvangerskapspenger),
        [tilrettelegginger, sisteDagForSvangerskapspenger],
    );
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(søkerInfo.arbeidsforhold, barn.termindato);
    const tilretteleggingMedFrilans = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER,
    );
    const tilretteleggingMedSN = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG,
    );

    const { previousRoute, previousTilretteleggingId } = getBackLinkAndIdForOppsummeringSteg(tilrettelegginger);

    const setForrigeTilretteleggingIdOgMellomlagre = () => {
        oppdaterValgtTilretteleggingId(previousTilretteleggingId);
        return mellomlagreSøknadOgNaviger();
    };

    const sendInn = async (values: Partial<OppsummeringFormData>) => {
        if (values.harGodkjentOppsummering) {
            setIsSubmitting(true);
            await sendSøknad(abortSignal);
        }
    };

    return (
        <OppsummeringFormComponents.FormikWrapper
            initialValues={getInitialOppsummeringValues()}
            onSubmit={sendInn}
            renderForm={() => {
                return (
                    <OppsummeringFormComponents.Form includeButtons={false}>
                        <Step
                            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                            activeStepId="oppsummering"
                            pageTitle="Oppsummering"
                            steps={stepConfig}
                            onCancel={avbrytSøknad}
                            onContinueLater={onFortsettSøknadSenere}
                        >
                            <Block padBottom="l">
                                <div className={bem.block}>
                                    <Accordion>
                                        <AccordionItem title={intlUtils(intl, 'oppsummering.omDeg')}>
                                            <AccordionContent>
                                                <Block padBottom="m">
                                                    <BodyShort>{`${søkerInfo.person.fornavn} ${søkerInfo.person.etternavn}`}</BodyShort>
                                                </Block>
                                                <Block>
                                                    <BodyShort>{søkerInfo.person.fnr}</BodyShort>
                                                </Block>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem title={intlUtils(intl, 'oppsummering.omBarnet')}>
                                            <AccordionContent>
                                                <BodyShort>{`Termindato: ${formatDate(barn.termindato)}`}</BodyShort>
                                                {barn.erBarnetFødt && barn.fødselsdato && (
                                                    <Block margin="m">
                                                        <BodyShort>{`Fødselsdato: ${
                                                            barn.fødselsdato ? formatDate(barn.fødselsdato) : undefined
                                                        }`}</BodyShort>
                                                    </Block>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem title={intlUtils(intl, 'oppsummering.omUtenlandsopphold')}>
                                            <AccordionContent>
                                                <UtenlandsoppholdOppsummering
                                                    barn={barn}
                                                    utenlandsopphold={utenlandsopphold}
                                                    senereUtenlandsopphold={utenlandsoppholdSenere}
                                                    tidligereUtenlandsopphold={utenlandsoppholdTidligere}
                                                />
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
                                                    {inntektsinformasjon.harJobbetSomFrilans && frilans && (
                                                        <FrilansVisning frilans={frilans}></FrilansVisning>
                                                    )}
                                                    {inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende &&
                                                        egenNæring && (
                                                            <EgenNæringVisning næring={egenNæring}></EgenNæringVisning>
                                                        )}
                                                    {inntektsinformasjon.harHattAnnenInntekt &&
                                                        arbeidIUtlandet &&
                                                        arbeidIUtlandet.map((arbeid) => {
                                                            return (
                                                                <ArbeidIUtlandetVisning
                                                                    key={guid()}
                                                                    arbeidIUtlandet={arbeid}
                                                                ></ArbeidIUtlandetVisning>
                                                            );
                                                        })}
                                                    {(!inntektsinformasjon.harJobbetSomFrilans ||
                                                        !inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende ||
                                                        !inntektsinformasjon.harHattAnnenInntekt) && (
                                                        <Block padBottom="m">
                                                            <BodyShort>
                                                                {getTekstOmManglendeArbeidsforhold(
                                                                    inntektsinformasjon,
                                                                    intl,
                                                                )}
                                                            </BodyShort>
                                                        </Block>
                                                    )}
                                                </Block>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem title={intlUtils(intl, 'oppsummering.skjema')}>
                                            <AccordionContent>
                                                <VedleggOppsummering tilrettelegging={tilrettelegginger} />
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
                                                    barn={barn}
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
                                            <BackButton
                                                mellomlagreSøknadOgNaviger={setForrigeTilretteleggingIdOgMellomlagre}
                                                route={previousRoute}
                                            />
                                            <Button
                                                icon={<PaperplaneIcon aria-hidden />}
                                                iconPosition="right"
                                                type="submit"
                                                disabled={isSubmitting}
                                                loading={isSubmitting}
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
