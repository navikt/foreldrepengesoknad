import { Block, intlUtils, Step, StepButtonWrapper, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import useSøknad from 'app/utils/hooks/useSøknad';
import stepConfig, { getPreviousSetStepHref } from '../stepsConfig';
import { Alert, BodyShort, Button } from '@navikt/ds-react';
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
import { convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common/src/common/utils/formUtils';

const Utenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();
    const { informasjonOmUtenlandsopphold, barn } = useSøknad();
    const [selectedOppholdIFremtid, setSelectedOppholdIFremtid] = useState<BostedUtland | undefined>(undefined);
    const [selectedOppholdIFortid, setSelectedOppholdIFortid] = useState<BostedUtland | undefined>(undefined);
    const [leggerTilNyttOppholdIFremtid, setLeggerTilNyttOppholdIFremtid] = useState(false);
    const [leggerTilNyttOppholdIFortid, setLeggerTilNyttOppholdIFortid] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);
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

    const handleOnSubmit = (values: Partial<UtenlandsoppholdFormData>) => {
        setSubmitClicked(true);
        // console.log('sel opphold frem i tid');
        // console.log(selectedOppholdIFremtid);
        // console.log('sel opphold tilbake i tid');
        // console.log(selectedOppholdIFortid);
        // console.log('ny opphold frem i tid');
        // console.log(leggerTilNyttOppholdIFremtid);
        // console.log('ny opphold tilbake i tid');
        // console.log(leggerTilNyttOppholdIFortid);
        if (
            selectedOppholdIFremtid === undefined &&
            selectedOppholdIFortid === undefined &&
            leggerTilNyttOppholdIFortid === false &&
            leggerTilNyttOppholdIFremtid === false
        ) {
            handleSubmit(values);
        }
    };

    return (
        <UtenlandsoppholdFormComponents.FormikWrapper
            initialValues={getInitialUtenlandsoppholdValuesFromState(informasjonOmUtenlandsopphold)}
            onSubmit={handleOnSubmit}
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
                                    onClick={() => {
                                        setSubmitClicked(false);
                                        setLeggerTilNyttOppholdIFremtid(
                                            !!convertYesOrNoOrUndefinedToBoolean(formValues.skalBoINorgeNeste12Mnd)
                                        );
                                    }}
                                />
                            </Block>
                            <Block padBottom="xl" visible={formValues.skalBoINorgeNeste12Mnd === YesOrNo.NO}>
                                <BostedUtlandDetails
                                    alleOpphold={bostedUtlandFremtid}
                                    oppgirIFortid={false}
                                    setUtenlandsopphold={setBostedUtlandFremtid}
                                    selectedOpphold={selectedOppholdIFremtid}
                                    setSelectedOpphold={setSelectedOppholdIFremtid}
                                    setSubmitIsClicked={setSubmitClicked}
                                    leggerTilNyttOppholdIUtlandet={leggerTilNyttOppholdIFremtid}
                                    setLeggerTilNyttOppholdIUtlandet={setLeggerTilNyttOppholdIFremtid}
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
                                    onClick={() => {
                                        setSubmitClicked(false);
                                        setLeggerTilNyttOppholdIFortid(
                                            !!convertYesOrNoOrUndefinedToBoolean(formValues.harBoddINorgeSiste12Mnd)
                                        );
                                    }}
                                />
                            </Block>
                            <Block padBottom="xl" visible={formValues.harBoddINorgeSiste12Mnd === YesOrNo.NO}>
                                <BostedUtlandDetails
                                    alleOpphold={bostedUtlandFortid}
                                    oppgirIFortid={true}
                                    selectedOpphold={selectedOppholdIFortid}
                                    leggerTilNyttOppholdIUtlandet={leggerTilNyttOppholdIFortid}
                                    setUtenlandsopphold={setBostedUtlandFortid}
                                    setSelectedOpphold={setSelectedOppholdIFortid}
                                    setSubmitIsClicked={setSubmitClicked}
                                    setLeggerTilNyttOppholdIUtlandet={setLeggerTilNyttOppholdIFortid}
                                />
                            </Block>
                            <Block padBottom="xl">
                                <InformasjonOmUtenlandsopphold />
                            </Block>
                            {submitClicked && selectedOppholdIFremtid && (
                                <Block padBottom="l">
                                    <Alert variant="error">
                                        <FormattedMessage id="utenlandsopphold.duMåEditereFerdig.iFremtid"></FormattedMessage>
                                    </Alert>
                                </Block>
                            )}
                            {submitClicked && selectedOppholdIFortid && (
                                <Block padBottom="l">
                                    <Alert variant="error">
                                        <FormattedMessage id="utenlandsopphold.duMåEditereFerdig.iFortid"></FormattedMessage>
                                    </Alert>
                                </Block>
                            )}
                            {submitClicked && leggerTilNyttOppholdIFremtid && (
                                <Block padBottom="l">
                                    <Alert variant="error">
                                        <FormattedMessage id="utenlandsopphold.duMåBliFerdig.iFremtid"></FormattedMessage>
                                    </Alert>
                                </Block>
                            )}
                            {submitClicked && leggerTilNyttOppholdIFortid && (
                                <Block padBottom="l">
                                    <Alert variant="error">
                                        <FormattedMessage id="utenlandsopphold.duMåBliFerdig.iFortid"></FormattedMessage>
                                    </Alert>
                                </Block>
                            )}
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
