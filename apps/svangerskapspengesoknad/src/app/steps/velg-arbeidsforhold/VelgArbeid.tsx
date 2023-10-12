import { VelgArbeidFormComponents, VelgArbeidFormField } from './velgArbeidFormConfig';
import { Block, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import stepConfig, { getBackLinkForVelgArbeidSteg } from 'app/steps/stepsConfig';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { getValgtTilrettelegging } from 'app/utils/tilretteleggingUtils';
import SøknadRoutes from 'app/routes/routes';
import {
    getInitialVelgArbeidFormValues,
    mapArbeidsforholdToVelgArbeidOptions,
    validateVelgArbeidIsAnswered,
} from './velgArbeidFormUtils';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import { useMemo, useState } from 'react';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { capitalizeFirstLetter } from '@navikt/fp-common/src/common/utils/stringUtils';

const VelgArbeid: React.FunctionComponent = () => {
    useUpdateCurrentTilretteleggingId(undefined);
    const intl = useIntl();
    const { søker, tilrettelegging, barn } = useSøknad();
    const { termindato } = barn;
    const { arbeidsforhold } = useSøkerinfo();

    const [nextRoute, setNextRoute] = useState(SøknadRoutes.SKJEMA.toString());
    const [valgtTilrettelegging, setValgtTilrettelegging] = useState<Tilrettelegging[]>([]);
    const tilretteleggingOptions = useMemo(
        () => mapArbeidsforholdToVelgArbeidOptions(tilrettelegging, søker, arbeidsforhold, termindato, intl),
        [tilrettelegging, søker, arbeidsforhold, barn.termindato, intl],
    );
    const onValidSubmitHandler = () => {
        return [actionCreator.setTilrettelegging(valgtTilrettelegging)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <VelgArbeidFormComponents.FormikWrapper
            initialValues={getInitialVelgArbeidFormValues(tilrettelegging)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="velgArbeid"
                        pageTitle={intlUtils(intl, 'steps.label.velgArbeid')}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl)}
                        useNoTempSavingText={true}
                    >
                        <VelgArbeidFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block padBottom="l">
                                <VelgArbeidFormComponents.CheckboxGroup
                                    name={VelgArbeidFormField.arbeidMedTilrettelegging}
                                    legend={intlUtils(intl, 'velgArbeid.hvor')}
                                    checkboxes={tilretteleggingOptions.map((option) => ({
                                        label:
                                            option.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER
                                                ? capitalizeFirstLetter(option.arbeidsforhold.navn)
                                                : option.arbeidsforhold.navn,
                                        value: option.id,
                                    }))}
                                    validate={(value) => validateVelgArbeidIsAnswered(value, intl)}
                                />
                            </Block>

                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getBackLinkForVelgArbeidSteg(søker)}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                        onClick={() => {
                                            const tilretteleggingValg = getValgtTilrettelegging(
                                                tilretteleggingOptions,
                                                formValues.arbeidMedTilrettelegging!,
                                            );
                                            setValgtTilrettelegging(tilretteleggingValg);
                                            const førsteTilretteleggingId =
                                                tilretteleggingValg.length > 0 ? tilretteleggingValg[0].id : undefined;
                                            if (førsteTilretteleggingId) {
                                                setNextRoute(`${SøknadRoutes.SKJEMA}/${førsteTilretteleggingId}`);
                                            }
                                        }}
                                    >
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </VelgArbeidFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default VelgArbeid;
