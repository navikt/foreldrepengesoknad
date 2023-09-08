import { Alert, Button } from '@navikt/ds-react';
import { Block, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from 'react';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import actionCreator from 'app/context/action/actionCreator';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import SøknadRoutes from 'app/routes/routes';
import stepConfig, { getPreviousStepHref } from 'app/steps/stepsConfig';
import { Link } from 'react-router-dom';
import useSøknad from 'app/utils/hooks/useSøknad';
import ArbeidIUtlandetList from './components/ArbeidIUtlandetList';
import ArbeidIUtlandetSubform from './components/subform/ArbeidIUtlandetSubform';

const ArbeidIUtlandetStep: React.FunctionComponent = () => {
    const intl = useIntl();
    const { søker } = useSøknad();
    const [arbeidIUtlandet, setArbeidIUtlandet] = useState(søker.andreInntekterSiste10Mnd || []);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
    const [selectedAnnenInntekt, setSelectedAnnenInntekt] = useState<ArbeidIUtlandet | undefined>(undefined);
    const [leggerTilNyttArbeidIUtlandet, setLeggerTilNyttArbeidIUtlandet] = useState(
        !søker.andreInntekterSiste10Mnd || søker.andreInntekterSiste10Mnd.length === 0
    );
    const [erFørsteInput, setErFørsteInput] = useState(true);

    const addAnnenInntekt = (annenInntekt: ArbeidIUtlandet) => {
        const updatedandreInntekterInformasjon = arbeidIUtlandet.concat(annenInntekt);
        setArbeidIUtlandet(updatedandreInntekterInformasjon);
        setSelectedAnnenInntekt(undefined);
        setLeggerTilNyttArbeidIUtlandet(false);
        setErFørsteInput(false);
        setFeilmelding(undefined);
    };

    const deleteAnnenInntekt = (inntektSomSlettes: ArbeidIUtlandet) => {
        const updatedAndreInntekterInformasjon = arbeidIUtlandet.filter(
            (inntekt: ArbeidIUtlandet) => inntekt !== inntektSomSlettes
        );
        setArbeidIUtlandet(updatedAndreInntekterInformasjon);
        setSelectedAnnenInntekt(undefined);

        if (updatedAndreInntekterInformasjon.length === 0) {
            setLeggerTilNyttArbeidIUtlandet(true);
        }
    };

    const editAnnenInntekt = (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => {
        const updatedAndreInntekterInformasjon = arbeidIUtlandet
            .filter((inntekt: ArbeidIUtlandet) => inntekt !== inntektSomEditeres)
            .concat(oppdatertInntekt);
        setSelectedAnnenInntekt(undefined);
        setArbeidIUtlandet(updatedAndreInntekterInformasjon);
    };

    const handleOnLeggTilArbeidIUtlandet = () => {
        setLeggerTilNyttArbeidIUtlandet(true);
        setSelectedAnnenInntekt(undefined);
    };

    const onValidSubmitHandler = () => {
        const søkerMedArbeidIUtlandet = { ...søker, andreInntekterSiste10Mnd: arbeidIUtlandet };
        return [actionCreator.setSøker(søkerMedArbeidIUtlandet)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.VELG_ARBEID);
    const onAvbrytSøknad = useAvbrytSøknad();

    const visAlertOmNødvendigInput = !erFørsteInput && arbeidIUtlandet.length === 0;

    const handleOnClickSubmit = (values: any) => {
        if (leggerTilNyttArbeidIUtlandet) {
            setFeilmelding('Du er ikke ferdig med å legge til informasjon om arbeid i utlandet');
        } else {
            setFeilmelding(undefined);
            handleSubmit(values);
        }
    };
    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId="arbeidIUtlandet"
            pageTitle={intlUtils(intl, 'steps.label.arbeidIUtlandet')}
            onCancel={onAvbrytSøknad}
            steps={stepConfig(intl)}
        >
            {arbeidIUtlandet.length > 0 && (
                <ArbeidIUtlandetList
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    allArbeidIUtlandet={arbeidIUtlandet}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    deleteAnnenInntekt={deleteAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    setLeggTilNyttArbeidIUtlandet={setLeggerTilNyttArbeidIUtlandet}
                />
            )}
            {visAlertOmNødvendigInput && (
                <Block padBottom="l">
                    <Alert variant="info" style={{ padding: '0.5rem' }}>
                        {intlUtils(intl, 'arbeidIUtlandet.duMåOppgiInformasjon')}
                    </Alert>
                </Block>
            )}
            {leggerTilNyttArbeidIUtlandet && (
                <ArbeidIUtlandetSubform
                    allArbeidIUtlandet={arbeidIUtlandet}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    erFørsteInput={arbeidIUtlandet.length === 0}
                    setLeggTilNyttArbeidIUtlandet={setLeggerTilNyttArbeidIUtlandet}
                />
            )}
            {arbeidIUtlandet.length > 0 && !leggerTilNyttArbeidIUtlandet && (
                <Block padBottom="xl">
                    <Button
                        aria-label="legg til ny informasjon om arbeid i utlandet"
                        variant="secondary"
                        type="button"
                        onClick={handleOnLeggTilArbeidIUtlandet}
                    >
                        <FormattedMessage id="inntektsinformasjon.arbeid.leggTil" />
                    </Button>
                </Block>
            )}
            {feilmelding && (
                <Block padBottom="xl">
                    <Alert variant="error">{feilmelding}</Alert>{' '}
                </Block>
            )}
            <Block margin="xl">
                <StepButtonWrapper>
                    <Button variant="secondary" as={Link} to={getPreviousStepHref('arbeidIUtlandet', søker)}>
                        <FormattedMessage id="backlink.label" />
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        onClick={(values) => handleOnClickSubmit(values)}
                    >
                        {intlUtils(intl, 'søknad.gåVidere')}
                    </Button>
                </StepButtonWrapper>
            </Block>
        </Step>
    );
};

export default ArbeidIUtlandetStep;
