import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Step } from '@navikt/fp-common';
import { Accordion, BodyShort, ConfirmationPanel, VStack } from '@navikt/ds-react';

import StepButtons from 'fpcommon/components/StepButtons';
import Person from 'types/Person';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import useEsNavigator from '../../../useEsNavigator';
import { EsDataType, useEsStateData } from '../../../EsDataContext';
import { OmBarnet } from 'types/OmBarnet';
import { Utenlandsopphold, UtenlandsoppholdNeste, UtenlandsoppholdSiste } from 'types/Utenlandsopphold';
import { notEmpty } from 'fpcommon/validering/valideringUtil';

const fullNameFormat = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    if (mellomnavn) {
        return `${fornavn} ${mellomnavn} ${etternavn}`;
    }
    return `${fornavn} ${etternavn}`;
};

export interface Props {
    person: Person;
    sendSøknad: (
        omBarnet: OmBarnet,
        utenlandsopphold: Utenlandsopphold,
        sisteUtenlandsopphold?: UtenlandsoppholdSiste,
        nesteUtenlandsopphold?: UtenlandsoppholdNeste,
    ) => void;
}

const OppsummeringSteg: React.FunctionComponent<Props> = ({ person, sendSøknad }) => {
    const intl = useIntl();

    const navigator = useEsNavigator();
    const omBarnet = notEmpty(useEsStateData(EsDataType.OM_BARNET));
    const utenlandsopphold = notEmpty(useEsStateData(EsDataType.UTENLANDSOPPHOLD));
    const sisteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_SISTE);
    const nesteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_NESTE);

    const [isChecked, setChecked] = useState(false);
    const [isError, setIsError] = useState(false);

    const send = useCallback(async () => {
        if (!isChecked) {
            setIsError(true);
        } else {
            sendSøknad(omBarnet, utenlandsopphold, sisteUtenlandsopphold, nesteUtenlandsopphold);
            navigator.goToNextDefaultStep();
        }
    }, [isChecked]);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.oppsummering' })}
            onCancel={navigator.avbrytSøknad}
            steps={navigator.pageInfo.stepConfig}
            activeStepId={navigator.pageInfo.activeStepId}
        >
            <VStack gap="10">
                <Accordion>
                    <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.omDeg' })}>
                        <VStack gap="4">
                            <BodyShort>{fullNameFormat(person.fornavn, person.etternavn, person.mellomnavn)}</BodyShort>
                            <BodyShort>{person.fnr}</BodyShort>
                        </VStack>
                    </Oppsummeringspunkt>
                    <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.omBarnet' })}>
                        <OmBarnetOppsummering omBarnet={omBarnet} />
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
                        intl.formatMessage({ id: 'valideringsfeil.velkommen.bekreftLestOgForståttRettigheter' })
                    }
                />
                <StepButtons
                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                    nextText={intl.formatMessage({ id: 'oppsummering.button.sendSøknad' })}
                    nextOnClick={send}
                />
            </VStack>
        </Step>
    );
};

export default OppsummeringSteg;
