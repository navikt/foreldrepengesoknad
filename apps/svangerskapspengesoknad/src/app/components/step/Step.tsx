import React, { ReactElement, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import classnames from 'classnames';
import StegIndikator from 'nav-frontend-stegindikator';

import { AppRoute } from 'app/types/Routes';
import { CustomFormikProps } from 'app/types/Formik';
import { FetchStatus } from 'app/types/FetchState';
import {
    parsePathFromLocation,
    getAllSteps,
    getAdjacentSteps,
    getSøknadStepPath,
    finnArbeidsforholdNavn,
} from 'app/utils/stepUtils';
import { State } from 'app/redux/store';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import BackButton from 'common/components/back-button/BackButton';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import ValidationErrorSummary from '../validation-error-summary/ValidationErrorSummary';
import './step.less';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Heading } from '@navikt/ds-react';

const cls = BEMHelper('step');

export interface StepProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
    className?: string;
    showNesteknapp?: boolean;
    children?: ReactElement | ReactElement[];
}

interface StateProps {
    arbeidsforhold: Arbeidsforhold[];
}

type Props = StepProps & StateProps;

const Step: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { step, formikProps, className, showNesteknapp, arbeidsforhold } = props;

    const allSøknadSteps = getAllSteps(formikProps.values.søknadsgrunnlag);
    const [previousStep, nextStep] = getAdjacentSteps(step, allSøknadSteps);

    const navigate = useNavigate();

    const config = {
        step,
        renderNesteknapp: showNesteknapp && nextStep.step !== StepID.INGEN,
        renderSendeknapp: nextStep.step === StepID.INGEN,
        renderTilbakeknapp: previousStep.step !== StepID.INGEN,
        onRequestNavigateToPreviousStep: () => {
            const previousPath = getSøknadStepPath(previousStep.step, previousStep.subStep);
            navigate(previousPath);
        },
    };

    const location = useLocation();

    const currentStep = parsePathFromLocation(location);
    const stegForStegIndikator = allSøknadSteps.map((otherStep, index) => {
        return {
            index,
            aktiv: otherStep.step === currentStep.step && otherStep.subStep === currentStep.subStep,
            label:
                otherStep.step === StepID.TILRETTELEGGING && otherStep.subStep
                    ? finnArbeidsforholdNavn(otherStep.subStep, arbeidsforhold)
                    : getMessage(intl, `stegtittel.${otherStep.step}`),
        };
    });

    return (
        <div className={classnames(cls.block, className)}>
            <h1 className={cls.classNames(cls.element('header'), 'blokk-xs')}>
                <FormattedMessage id={`stegtittel.${step.step}`} />
            </h1>
            {currentStep.subStep && (
                <Heading size="small" className={cls.classNames(cls.element('subHeader'), 'blokk-s')}>
                    {finnArbeidsforholdNavn(currentStep.subStep, arbeidsforhold)}
                </Heading>
            )}
            <div className={cls.classNames(cls.element('navigation'), 'blokk-l')}>
                <div>
                    {config.renderTilbakeknapp && (
                        <BackButton
                            text={getMessage(intl, 'steg.tilbake')}
                            hidden={false}
                            onClick={config.onRequestNavigateToPreviousStep}
                        />
                    )}
                </div>
                <StegIndikator kompakt={true} steg={stegForStegIndikator} visLabel={false} />
                <div />
            </div>

            <ValidationErrorSummary />
            <form onSubmit={formikProps.handleSubmit}>
                <div className={cls.classNames(cls.element('steginnhold'))}>{props.children}</div>
                <div className={cls.classNames(cls.element('stegkontroller'), 'blokk-m')}>
                    {config.renderNesteknapp && (
                        <Button variant="primary">
                            <FormattedMessage id="steg.nesteknapp" />
                        </Button>
                    )}
                    {config.renderSendeknapp && (
                        <Button variant="primary">
                            <FormattedMessage id="oppsummering.sendSøknad" />
                        </Button>
                    )}
                </div>
            </form>
            <hr className="blokk-xs" />
            <div className={cls.element('avbrytSøknadContainer')}>
                <button
                    type="button"
                    className={cls.classNames(cls.element('avbrytSøknad'), 'lenke')}
                    onClick={() => {
                        formikProps.handleReset();
                        navigate(AppRoute.INTRO);
                    }}
                >
                    <FormattedMessage id="steg.avbrytSøknad" />
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: State) => {
    const søkerinfo = state.api.søkerinfo;
    return { arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : undefined };
};

// @ts-ignore Fiks
export default connect(mapStateToProps)(Step);
