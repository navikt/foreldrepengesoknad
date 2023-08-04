import { Block, intlUtils, Step, StepButtonWrapper, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
// import actionCreator from 'app/context/action/actionCreator';
// import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import { BodyShort, Button } from '@navikt/ds-react';
import { Link as RouterLink } from 'react-router-dom';
import {
    UtenlandsoppholdField,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFormData,
} from './components/utenlandsoppholdFormTypes';
import { getInitialUtenlandsoppholdValuesFromState } from './components/utenlandsoppholdFormUtils';
import { utenlandsoppholdFormQuestions } from './components/utenlandsoppholdFormQuestions';
import { useState } from 'react';
import { BostedUtland } from 'app/types/BostedUtland';
import BostedUtlandComponent from './subform/BostedUtlandComponent';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import InformasjonOmUtenlandsopphold from './components/InformasjonOmUtenlandsopphold';

const Utenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();
    const { informasjonOmUtenlandsopphold } = useSøknad();

    const handleSubmit = () => {
        console.log('TODO SUBMIT Utenlandsopphold');
        //map BostedUtland to Utenlandsopphold
    };
    const [bostedUtlandFremtid, setBostedUtlandFremtid] = useState<BostedUtland[]>(
        informasjonOmUtenlandsopphold.senereOpphold.map((opphold, index) => {
            return {
                id: index,
                fom: opphold.tidsperiode.fom,
                tom: opphold.tidsperiode.tom,
                landkode: opphold.land,
            };
        })
    );

    const [bostedUtlandFortid, setBostedUtlandFortid] = useState<BostedUtland[]>(
        informasjonOmUtenlandsopphold.tidligereOpphold.map((opphold, index) => {
            return {
                id: index,
                fom: opphold.tidsperiode.fom,
                tom: opphold.tidsperiode.tom,
                landkode: opphold.land,
            };
        })
    );

    return (
        <UtenlandsoppholdFormComponents.FormikWrapper
            initialValues={getInitialUtenlandsoppholdValuesFromState(informasjonOmUtenlandsopphold)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = utenlandsoppholdFormQuestions.getVisbility(formValues as UtenlandsoppholdFormData);

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="utenlandsopphold"
                        pageTitle={intlUtils(intl, 'steps.label.utenlandsopphold')}
                        // onCancel={onAvbrytSøknad}
                        // onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl)}
                    >
                        <UtenlandsoppholdFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block padBottom="l">
                                <BodyShort size="medium">{intlUtils(intl, 'utenlandsopphold.infotekst')}</BodyShort>
                            </Block>
                            <Block
                                visible={visibility.isVisible(UtenlandsoppholdField.skalBoINorgeNeste12Mnd)}
                                padBottom="l"
                            >
                                <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                    legend={intlUtils(intl, 'utenlandsopphold.neste12Måneder.spørsmål')}
                                    name={UtenlandsoppholdField.skalBoINorgeNeste12Mnd}
                                    labels={{
                                        yes: intlUtils(
                                            intl,
                                            'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddINorge'
                                        ),
                                        no: intlUtils(
                                            intl,
                                            'utenlandsopphold.neste12MånederInfotekst.radiobutton.boddIUtlandet'
                                        ),
                                    }}
                                    validate={(skalBoINorgeNeste12Mnd) =>
                                        validateYesOrNoIsAnswered(
                                            skalBoINorgeNeste12Mnd,
                                            'valideringsfeil.utenlandsopphold.skalBoINorgePåkrevd'
                                        )
                                    }
                                />
                            </Block>
                            <Block padBottom="xl" visible={formValues.skalBoINorgeNeste12Mnd === YesOrNo.NO}>
                                <BostedUtlandComponent
                                    alleOpphold={bostedUtlandFremtid}
                                    oppgirIFortid={false}
                                    setUtenlandsopphold={setBostedUtlandFremtid}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(UtenlandsoppholdField.harBoddINorgeSiste12Mnd)}
                            >
                                <UtenlandsoppholdFormComponents.YesOrNoQuestion
                                    legend={intlUtils(intl, 'utenlandsopphold.siste12Måneder.spørsmål')}
                                    name={UtenlandsoppholdField.harBoddINorgeSiste12Mnd}
                                    labels={{
                                        yes: intlUtils(
                                            intl,
                                            'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddINorge'
                                        ),
                                        no: intlUtils(
                                            intl,
                                            'utenlandsopphold.siste12MånederInfotekst.radiobutton.boddIUtlandet'
                                        ),
                                    }}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            'valideringsfeil.utenlandsopphold.harBoddINorge.påkrevd'
                                        )
                                    }
                                />
                            </Block>
                            <Block padBottom="xl" visible={formValues.harBoddINorgeSiste12Mnd === YesOrNo.NO}>
                                <BostedUtlandComponent
                                    alleOpphold={bostedUtlandFortid}
                                    oppgirIFortid={true}
                                    setUtenlandsopphold={setBostedUtlandFortid}
                                />
                            </Block>
                            <Block padBottom="xl">
                                <InformasjonOmUtenlandsopphold />
                            </Block>
                            <Block>
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={RouterLink}
                                        to={getPreviousStepHref('utenlandsopphold')}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    {visibility.areAllQuestionsAnswered() && (
                                        // <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        <Button type="submit">{intlUtils(intl, 'søknad.gåVidere')}</Button>
                                    )}
                                </StepButtonWrapper>
                            </Block>
                        </UtenlandsoppholdFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Utenlandsopphold;
