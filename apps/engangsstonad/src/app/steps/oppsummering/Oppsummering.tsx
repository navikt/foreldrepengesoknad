import { bemUtils, Block, intlUtils, Locale, Step } from '@navikt/fp-common';
import { Button, GuidePanel } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import Person from 'app/types/domain/Person';
import { fullNameFormat } from 'app/util/formats/formatUtils';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import UtenlandsoppholdOppsummering from './UtenlandsoppholdOppsummering';
import stepConfig, { getPreviousStepHref } from 'app/step-config/stepConfig';
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';
import { OppsummeringFormComponents, initialOppsummeringValues, OppsummeringFormField } from './oppsummeringFormConfig';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik-ds/lib';
import oppsummeringQuestionsConfig from './oppsummeringQuestionsConfig';
import { EngangsstønadSøknadDto } from 'app/types/domain/EngangsstønadSøknad';
import { mapStateForInnsending } from 'app/util/apiUtils';
import Api from 'app/api/api';
import { useNavigate } from 'react-router-dom';
import actionCreator from 'app/context/action/actionCreator';
import { onAvbrytSøknad } from 'app/util/globalUtil';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import { PageKeys } from 'app/types/PageKeys';

import './oppsummering.less';
import OmDegOppsummering from './OmDegOppsummering';

interface Props {
    person: Person;
    locale: Locale;
}

const Oppsummering: React.FunctionComponent<Props> = ({ person, locale }) => {
    const intl = useIntl();
    const bem = bemUtils('oppsummering');
    const { state, dispatch } = useEngangsstønadContext();
    const navigate = useNavigate();
    const [isSending, setIsSending] = useState(false);

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.Oppsummering,
    });

    const sendSøknad = async () => {
        const søknadForInnsending: EngangsstønadSøknadDto = mapStateForInnsending(state, locale);
        setIsSending(true);

        try {
            const kvitteringResponse = Api.sendSøknad(søknadForInnsending);

            kvitteringResponse.then((response) => {
                dispatch(actionCreator.setKvittering(response.data));
                navigate('/kvittering');
                setIsSending(false);
            });

            logAmplitudeEvent('skjema fullført', {
                app: 'engangsstonadny',
                team: 'foreldrepenger',
            });
        } catch (error) {
            navigate('/kvittering');
        }
    };

    return (
        <OppsummeringFormComponents.FormikWrapper
            initialValues={initialOppsummeringValues}
            onSubmit={() => sendSøknad()}
            renderForm={({ values: formValues }) => {
                // @ts-ignore Fiks denne
                const visibility = oppsummeringQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="oppsummering"
                        pageTitle={intlUtils(intl, 'søknad.oppsummering')}
                        backLinkHref={getPreviousStepHref('oppsummering')}
                        onCancel={() => onAvbrytSøknad(dispatch, navigate)}
                        steps={stepConfig}
                    >
                        <OppsummeringFormComponents.Form
                            includeButtons={false}
                            noButtonsContentRenderer={
                                allQuestionsAnswered
                                    ? undefined
                                    : () => (
                                          <UnansweredQuestionsInfo>
                                              {intlUtils(intl, 'søknad.footer.spørsmålMåBesvares')}
                                          </UnansweredQuestionsInfo>
                                      )
                            }
                        >
                            <Block padBottom="l">
                                <GuidePanel>{intlUtils(intl, 'oppsummering.text.lesNoye')}</GuidePanel>
                            </Block>
                            <div className={bem.block}>
                                <Oppsummeringspunkt tittel={intlUtils(intl, 'søknad.omDeg')}>
                                    <OmDegOppsummering
                                        søkerNavn={fullNameFormat(person.fornavn, person.mellomnavn, person.etternavn)}
                                        søkerFnr={person.fnr}
                                    />
                                </Oppsummeringspunkt>
                                <Oppsummeringspunkt tittel={intlUtils(intl, 'søknad.omBarnet')}>
                                    <OmBarnetOppsummering barn={state.søknad.omBarnet} />
                                </Oppsummeringspunkt>
                                <Oppsummeringspunkt tittel={intlUtils(intl, 'søknad.utenlandsopphold')}>
                                    <UtenlandsoppholdOppsummering
                                        barn={state.søknad.omBarnet}
                                        informasjonOmUtenlandsopphold={state.søknad.utenlandsopphold}
                                    />
                                </Oppsummeringspunkt>
                            </div>
                            <Block margin="xl">
                                <OppsummeringFormComponents.ConfirmationCheckbox
                                    name={OppsummeringFormField.oppgittKorrekteOpplysninger}
                                    label={intlUtils(intl, 'oppsummering.text.samtykke')}
                                />
                            </Block>
                            {allQuestionsAnswered && (
                                <Block margin="xl">
                                    <div className={bem.element('sendSøknadKnapp')}>
                                        <Button type="submit" disabled={isSending} loading={isSending}>
                                            {intlUtils(intl, 'oppsummering.button.sendSøknad')}
                                        </Button>
                                    </div>
                                </Block>
                            )}
                        </OppsummeringFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Oppsummering;
