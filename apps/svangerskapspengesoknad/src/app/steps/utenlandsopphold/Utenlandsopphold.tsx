import { Block, intlUtils, Step, StepButtonWrapper, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import useSøknad from 'app/utils/hooks/useSøknad';
import stepConfig, { getPreviousSetStepHref } from '../stepsConfig';
import { BodyShort, Button } from '@navikt/ds-react';
import { Link as RouterLink } from 'react-router-dom';
import {
    UtenlandsoppholdField,
    UtenlandsoppholdFormComponents,
    UtenlandsoppholdFormData,
} from './utenlandsoppholdFormTypes';
import {
    getInitialUtenlandsoppholdValuesFromState,
    mapUtenlandsoppholdFormDataToState,
} from './utenlandsoppholdFormUtils';
import { utenlandsoppholdFormQuestions } from './utenlandsoppholdFormQuestions';
import { useState } from 'react';
import { BostedUtland } from 'app/types/BostedUtland';
import BostedUtlandDetails from './components/subform/BostedUtlandDetails';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import InformasjonOmUtenlandsopphold from './components/InformasjonOmUtenlandsopphold';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import SøknadRoutes from 'app/routes/routes';
import actionCreator from 'app/context/action/actionCreator';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';

const Utenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();
    const { informasjonOmUtenlandsopphold, barn } = useSøknad();
    const familiehendelsedato = barn.erBarnetFødt ? barn.fødselsdato : barn.termindato;
    const onAvbrytSøknad = useAvbrytSøknad();
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

    const onValidSubmitHandler = (values: Partial<UtenlandsoppholdFormData>) => {
        const utenlandsopphold = mapUtenlandsoppholdFormDataToState(
            values,
            bostedUtlandFremtid,
            bostedUtlandFortid,
            familiehendelsedato!
        );
        return [actionCreator.setUtenlandsopphold(utenlandsopphold)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.ARBEID);

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
                        onCancel={onAvbrytSøknad}
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
                                            intlUtils(intl, 'valideringsfeil.utenlandsopphold.skalBoINorge.påkrevd')
                                        )
                                    }
                                />
                            </Block>
                            <Block padBottom="xl" visible={formValues.skalBoINorgeNeste12Mnd === YesOrNo.NO}>
                                <BostedUtlandDetails
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
                                            intlUtils(intl, 'valideringsfeil.utenlandsopphold.harBoddINorge.påkrevd')
                                        )
                                    }
                                />
                            </Block>
                            <Block padBottom="xl" visible={formValues.harBoddINorgeSiste12Mnd === YesOrNo.NO}>
                                <BostedUtlandDetails
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
                                        to={getPreviousSetStepHref('utenlandsopphold')}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
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
