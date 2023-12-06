import { useState } from 'react';
import { Step } from '@navikt/fp-common';
import { Accordion, BodyShort, ConfirmationPanel, VStack } from '@navikt/ds-react';
import { useAbortSignal } from '@navikt/fp-api';
import { notEmpty } from '@navikt/fp-validation';
import { StepButtons, useCustomIntl } from '@navikt/fp-ui';
import Person from 'types/Person';
import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { EsDataType, useEsStateData } from 'appData/EsDataContext';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';

const fullNameFormat = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

export interface Props {
    person: Person;
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
}

const OppsummeringSteg: React.FunctionComponent<Props> = ({ person, sendSøknad }) => {
    const { i18n } = useCustomIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator();

    const omBarnet = notEmpty(useEsStateData(EsDataType.OM_BARNET));
    const utenlandsopphold = notEmpty(useEsStateData(EsDataType.UTENLANDSOPPHOLD));
    const dokumentasjon = useEsStateData(EsDataType.DOKUMENTASJON);
    const tidligereUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const senereUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_SENERE);
    const abortSignal = useAbortSignal();

    const [isChecked, setChecked] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);

    const send = (setButtonsDisabled: (isDisabled: boolean) => void) => {
        setSubmitting(true);
        if (!isChecked) {
            setIsError(true);
        } else {
            setButtonsDisabled(true);
            sendSøknad(abortSignal);
        }
    };

    return (
        <Step
            bannerTitle={i18n('Søknad.Pageheading')}
            onCancel={navigator.avbrytSøknad}
            steps={stepConfig}
            useNoTempSavingText
        >
            <VStack gap="10">
                <Accordion indent={false}>
                    <Oppsummeringspunkt tittel={i18n('OppsummeringSteg.OmDeg')}>
                        <VStack gap="4">
                            <BodyShort>{fullNameFormat(person.fornavn, person.etternavn, person.mellomnavn)}</BodyShort>
                            <BodyShort>{person.fnr}</BodyShort>
                        </VStack>
                    </Oppsummeringspunkt>
                    <Oppsummeringspunkt tittel={i18n('OppsummeringSteg.OmBarnet')}>
                        <OmBarnetOppsummering omBarnet={omBarnet} dokumentasjon={dokumentasjon} />
                    </Oppsummeringspunkt>
                    <Oppsummeringspunkt tittel={i18n('OppsummeringSteg.Utenlandsopphold')}>
                        <UtenlandsoppholdOppsummering
                            omBarnet={omBarnet}
                            utenlandsopphold={utenlandsopphold}
                            tidligereUtenlandsopphold={tidligereUtenlandsopphold}
                            senereUtenlandsopphold={senereUtenlandsopphold}
                        />
                    </Oppsummeringspunkt>
                </Accordion>
                <ConfirmationPanel
                    label={i18n('OppsummeringSteg.Samtykke')}
                    onChange={() => setChecked((state) => !state)}
                    checked={isChecked}
                    error={isError && !isChecked && i18n('OppsummeringSteg.Validering.BekrefteOpplysninger')}
                />
                <StepButtons
                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                    nextButtonText={i18n('OppsummeringSteg.Button.SendSøknad')}
                    nextButtonOnClick={send}
                    isSubmitting={isSubmitting}
                />
            </VStack>
        </Step>
    );
};

export default OppsummeringSteg;
