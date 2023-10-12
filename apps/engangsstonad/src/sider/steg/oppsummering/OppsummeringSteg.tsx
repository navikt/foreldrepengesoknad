import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Step } from '@navikt/fp-common';
import { Accordion, BodyShort, ConfirmationPanel, VStack } from '@navikt/ds-react';

import Person from 'types/Person';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import useEsNavigator from 'appData/useEsNavigator';
import useStepData from 'appData/useStepData';
import { EsDataType, useEsStateData } from 'appData/EsDataContext';
import { OmBarnet } from 'types/OmBarnet';
import { Utenlandsopphold, UtenlandsoppholdNeste, UtenlandsoppholdSiste } from 'types/Utenlandsopphold';
import { notEmpty } from '@navikt/fp-validation';
import { StepButtons } from '@navikt/fp-ui';
import Dokumentasjon from 'types/Dokumentasjon';

const fullNameFormat = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

export interface Props {
    person: Person;
    sendSøknad: (
        omBarnet: OmBarnet,
        utenlandsopphold: Utenlandsopphold,
        dokumentasjon?: Dokumentasjon,
        sisteUtenlandsopphold?: UtenlandsoppholdSiste,
        nesteUtenlandsopphold?: UtenlandsoppholdNeste,
    ) => void;
}

const OppsummeringSteg: React.FunctionComponent<Props> = ({ person, sendSøknad }) => {
    const intl = useIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const omBarnet = notEmpty(useEsStateData(EsDataType.OM_BARNET));
    const utenlandsopphold = notEmpty(useEsStateData(EsDataType.UTENLANDSOPPHOLD));
    const dokumentasjon = useEsStateData(EsDataType.DOKUMENTASJON);
    const sisteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_SISTE);
    const nesteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_NESTE);

    const [isChecked, setChecked] = useState(false);
    const [isError, setIsError] = useState(false);

    const send = useCallback(() => {
        if (!isChecked) {
            setIsError(true);
        } else {
            sendSøknad(omBarnet, utenlandsopphold, dokumentasjon, sisteUtenlandsopphold, nesteUtenlandsopphold);
            navigator.goToNextDefaultStep();
        }
    }, [isChecked]);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.oppsummering' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
            useNoTempSavingText
        >
            <VStack gap="10">
                <Accordion>
                    <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.omDeg' })}>
                        <VStack gap="4">
                            <BodyShort>{fullNameFormat(person.fornavn, person.etternavn, person.mellomnavn)}</BodyShort>
                            <BodyShort>{person.fnr}</BodyShort>
                        </VStack>
                    </Oppsummeringspunkt>
                    <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'OmBarnetSteg.OmBarnet' })}>
                        <OmBarnetOppsummering omBarnet={omBarnet} dokumentasjon={dokumentasjon} />
                    </Oppsummeringspunkt>
                    <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.utenlandsopphold' })}>
                        <UtenlandsoppholdOppsummering
                            omBarnet={omBarnet}
                            utenlandsopphold={utenlandsopphold}
                            utenlandsoppholdNeste={nesteUtenlandsopphold}
                            utenlandsoppholdSiste={sisteUtenlandsopphold}
                        />
                    </Oppsummeringspunkt>
                </Accordion>
                <ConfirmationPanel
                    label={intl.formatMessage({ id: 'oppsummering.text.samtykke' })}
                    onChange={() => setChecked((state) => !state)}
                    checked={isChecked}
                    error={
                        isError &&
                        !isChecked &&
                        intl.formatMessage({ id: 'OppsummeringSteg.Validering.BekrefteOpplysninger' })
                    }
                />
                <StepButtons
                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                    nextButtonText="oppsummering.button.sendSøknad"
                    nextButtonOnClick={send}
                />
            </VStack>
        </Step>
    );
};

export default OppsummeringSteg;
