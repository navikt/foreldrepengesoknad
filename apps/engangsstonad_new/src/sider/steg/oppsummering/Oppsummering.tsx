import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Step, StepButtonWrapper } from '@navikt/fp-common';
import { Accordion, BodyShort, Button, ConfirmationPanel, Link, VStack } from '@navikt/ds-react';

import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import Person from 'types/Person';
import { PageKeys } from '../../PageKeys';
import stepConfig, { getPreviousStepHref } from '../stepConfig';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import { FormValues as OmBarnetFormValues } from '../omBarnet/OmBarnetForm';
import { FormValues as UtenlandsoppholdFormFormValus } from '../utenlandsopphold/UtenlandsoppholdForm';
import { FormValues as UtenlandsoppholdFremtidigFormFormValus } from '../utlandsoppholdFremtidig/FremtidigUtlandsopphold';
import { FormValues as UtenlandsoppholdTidligereFormFormValus } from '../utlandsoppholdTidligere/TidligereUtlandsopphold';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';

const fullNameFormat = (fornavn: string, mellomnavn: string, etternavn: string) => {
    if (mellomnavn) {
        return `${fornavn} ${mellomnavn} ${etternavn}`;
    }
    return `${fornavn} ${etternavn}`;
};

interface Props {
    person: Person;
    omBarnet: OmBarnetFormValues;
    utenlandsopphold: UtenlandsoppholdFormFormValus;
    utenlandsoppholdFremtidig: UtenlandsoppholdFremtidigFormFormValus;
    utenlandsoppholdTidligere: UtenlandsoppholdTidligereFormFormValus;
    avbrytSøknad: () => void;
    sendSøknad: () => void;
}

const Oppsummering: React.FunctionComponent<Props> = ({
    person,
    omBarnet,
    utenlandsopphold,
    utenlandsoppholdFremtidig,
    utenlandsoppholdTidligere,
    avbrytSøknad,
    sendSøknad,
}) => {
    const intl = useIntl();

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.Oppsummering,
    });

    const [isChecked, setChecked] = useState(false);
    const [isError, setIsError] = useState(false);

    const send = useCallback(() => {
        if (!isChecked) {
            setIsError(true);
        } else {
            sendSøknad();
        }
    }, [isChecked, sendSøknad]);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="oppsummering"
            pageTitle={intl.formatMessage({ id: 'søknad.oppsummering' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
        >
            <VStack gap="10">
                <Accordion>
                    <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.omDeg' })}>
                        <VStack gap="4">
                            <BodyShort>{fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn)}</BodyShort>
                            <BodyShort>{person.fnr}</BodyShort>
                        </VStack>
                    </Oppsummeringspunkt>
                    <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.omBarnet' })}>
                        <OmBarnetOppsummering barn={omBarnet} />
                    </Oppsummeringspunkt>
                    <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.utenlandsopphold' })}>
                        <UtenlandsoppholdOppsummering
                            barn={omBarnet}
                            informasjonOmUtenlandsopphold={utenlandsopphold}
                            utenlandsoppholdFremtidig={utenlandsoppholdFremtidig}
                            utenlandsoppholdTidligere={utenlandsoppholdTidligere}
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
                <StepButtonWrapper>
                    <Button variant="secondary" as={Link} to={getPreviousStepHref('oppsummering')}>
                        <FormattedMessage id="backlink.label" />
                    </Button>
                    <Button type="button" onClick={send}>
                        <FormattedMessage id="oppsummering.button.sendSøknad" />
                    </Button>
                </StepButtonWrapper>
            </VStack>
        </Step>
    );
};

export default Oppsummering;
