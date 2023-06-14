import { FunctionComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppRoute } from 'app/types/Routes';
import { CustomFormikProps } from 'app/types/Formik';
import { getSøknadStepPath, isNextStepAvailable } from 'app/utils/stepUtils';
import { StepID } from 'app/types/SøknadStep';
import Arbeidsforhold from '../arbeidsforhold/Arbeidsforhold';
import Intro from '../intro/Intro';
import Oppsummering from '../oppsummering/Oppsummering';
import SøknadSendt from '../søknad-sendt/SøknadSendt';
import Termin from '../termin/Termin';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import Utenlandsopphold from '../utenlandsopphold/Utenlandsopphold';

interface Props {
    harSendtSøknad: boolean;
    formikProps: CustomFormikProps;
}

const SøknadRoutes: FunctionComponent<Props> = ({ formikProps, harSendtSøknad }) => {
    const { values } = formikProps;

    const isSøknadAvailable = isNextStepAvailable({ path: AppRoute.INTRO }, values);
    const isNextAvailable = (step: StepID) => isNextStepAvailable({ path: AppRoute.SØKNAD, step }, values);

    const tilretteleggingRoutes = values.tilrettelegging.map(({ id }) => {
        const søknadStep = {
            step: StepID.TILRETTELEGGING,
            subStep: id,
        };

        return (
            <Route
                path={getSøknadStepPath(søknadStep.step, søknadStep.subStep)}
                key={`${StepID.TILRETTELEGGING}.${id}`}
                element={<Tilrettelegging id={id} step={søknadStep} formikProps={formikProps} />}
            />
        );
    });
    const søknadRoutes = (
        <Routes>
            <Route path={AppRoute.INTRO} element={<Intro formik={formikProps} />} />

            {isSøknadAvailable && (
                <Route
                    path={getSøknadStepPath(StepID.TERMIN)}
                    key={StepID.TERMIN}
                    element={<Termin step={{ step: StepID.TERMIN }} formikProps={formikProps} />}
                />
            )}

            {isNextAvailable(StepID.TERMIN) && (
                <Route
                    path={getSøknadStepPath(StepID.ARBEIDSFORHOLD)}
                    key={StepID.ARBEIDSFORHOLD}
                    element={<Arbeidsforhold step={{ step: StepID.ARBEIDSFORHOLD }} formikProps={formikProps} />}
                />
            )}

            {isNextAvailable(StepID.ARBEIDSFORHOLD) && values.søknadsgrunnlag.length > 0 && tilretteleggingRoutes}

            {isNextAvailable(StepID.TILRETTELEGGING) && (
                <Route
                    path={getSøknadStepPath(StepID.UTENLANDSOPPHOLD)}
                    key={StepID.UTENLANDSOPPHOLD}
                    element={<Utenlandsopphold step={{ step: StepID.UTENLANDSOPPHOLD }} formikProps={formikProps} />}
                />
            )}

            {isNextAvailable(StepID.UTENLANDSOPPHOLD) && (
                <Route
                    path={getSøknadStepPath(StepID.OPPSUMMERING)}
                    key={StepID.OPPSUMMERING}
                    element={<Oppsummering step={{ step: StepID.OPPSUMMERING }} formikProps={formikProps} />}
                />
            )}

            <Route path="/" element={<Navigate to={AppRoute.INTRO} key="redirect" />} />
        </Routes>
    );

    const kvitteringRoute = (
        <Routes>
            <Route path={AppRoute.SENDT} element={<SøknadSendt />} />
            <Route path="*" element={<Navigate to={AppRoute.SENDT} key="redirect" />} />
        </Routes>
    );

    return harSendtSøknad ? kvitteringRoute : søknadRoutes;
};

export default SøknadRoutes;
