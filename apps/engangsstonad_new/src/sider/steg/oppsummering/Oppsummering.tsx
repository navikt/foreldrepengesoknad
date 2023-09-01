import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, Step, StepButtonWrapper } from '@navikt/fp-common';
import { Button, ConfirmationPanel, GuidePanel, Link } from '@navikt/ds-react';

import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import Person from 'types/Person';
import { PageKeys } from '../../PageKeys';
import stepConfig, { getPreviousStepHref } from '../stepConfig';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import OmDegOppsummering from './OmDegOppsummering';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import { FormValues as OmBarnetFormValues } from '../omBarnet/OmBarnetForm';
import { FormValues as UtenlandsoppholdFormFormValus } from '../utenlandsopphold/UtenlandsoppholdForm';
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
    avbrytSøknad: () => void;
    sendSøknad: () => void;
}

const Oppsummering: React.FunctionComponent<Props> = ({
    person,
    omBarnet,
    utenlandsopphold,
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

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="oppsummering"
            pageTitle={intl.formatMessage({ id: 'søknad.oppsummering' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
        >
            <Block padBottom="l">
                <GuidePanel>
                    <FormattedMessage id="oppsummering.text.lesNoye" />
                </GuidePanel>
            </Block>
            <Block padBottom="l">
                <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.omDeg' })}>
                    <OmDegOppsummering
                        søkerNavn={fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn)}
                        søkerFnr={person.fnr}
                    />
                </Oppsummeringspunkt>
                <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.omBarnet' })}>
                    <OmBarnetOppsummering barn={omBarnet} />
                </Oppsummeringspunkt>
                <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'søknad.utenlandsopphold' })}>
                    <UtenlandsoppholdOppsummering barn={omBarnet} informasjonOmUtenlandsopphold={utenlandsopphold} />
                </Oppsummeringspunkt>
            </Block>
            <Block margin="xl">
                <ConfirmationPanel
                    label={intl.formatMessage({ id: 'oppsummering.text.samtykke' })}
                    onChange={() => setChecked((state) => !state)}
                    checked={isChecked}
                />
            </Block>
            <Block margin="xl">
                <StepButtonWrapper>
                    <Button variant="secondary" as={Link} to={getPreviousStepHref('oppsummering')}>
                        <FormattedMessage id="backlink.label" />
                    </Button>
                    {isChecked && (
                        <Button type="button" onClick={sendSøknad}>
                            <FormattedMessage id="oppsummering.button.sendSøknad" />
                        </Button>
                    )}
                </StepButtonWrapper>
            </Block>
        </Step>
    );
};

export default Oppsummering;
