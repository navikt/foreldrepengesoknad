import { Block, dateToday, intlUtils, Step, StepButtonWrapper } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import useSøknad from 'app/utils/hooks/useSøknad';
import stepConfig, {
    getBackLinkForBostedIFremtid,
    getNextRouteForBostedIFortid,
    getPreviousSetStepHref,
} from '../stepsConfig';
import { Button } from '@navikt/ds-react';
import { Link as RouterLink } from 'react-router-dom';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import SøknadRoutes from 'app/routes/routes';
import actionCreator from 'app/context/action/actionCreator';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { BoIUtlandetFormComponents, BoIUtlandetFormData, BoIUtlandetFormField } from './boIUtlandetFormConfig';
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons';
import { FieldArray } from 'formik';
import {
    getInitialBostedIUtlandetFormData,
    getMinValueTomInput,
    getUferdigBostedUtlandInput,
    mapBostedUtland,
} from './boIUtlandetFormUtils';
import { validateBostedUtlandLand, validateBostedUtlandFom, validateBostedUtlandTom } from './boIUtlandetValidering';
import HorizontalLine from 'app/components/horizontal-line/HorizontalLine';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';

interface Props {
    oppgirIFortid: boolean;
}
const BoIUtlandet: React.FunctionComponent<Props> = ({ oppgirIFortid }) => {
    const intl = useIntl();
    const søknad = useSøknad();
    const { informasjonOmUtenlandsopphold, barn } = søknad;
    const { arbeidsforhold } = useSøkerinfo();

    const familiehendelsedato = barn.erBarnetFødt ? barn.fødselsdato : barn.termindato;
    const utenlandsopphold = oppgirIFortid
        ? informasjonOmUtenlandsopphold.tidligereOpphold
        : informasjonOmUtenlandsopphold.senereOpphold;
    const nextRoute = oppgirIFortid ? getNextRouteForBostedIFortid(informasjonOmUtenlandsopphold) : SøknadRoutes.ARBEID;
    const onAvbrytSøknad = useAvbrytSøknad();

    const backLink = oppgirIFortid
        ? getPreviousSetStepHref('boIUtlandetIFortid')
        : getBackLinkForBostedIFremtid(informasjonOmUtenlandsopphold);
    const spmTekst = oppgirIFortid
        ? intlUtils(intl, 'boIUtlandet.spørsmål.hvilketLandHarDuBoddI')
        : intlUtils(intl, 'boIUtlandet.spørsmål.hvilketLandSkalDuBoI');
    const stepId = `boIUtlandet${oppgirIFortid ? 'IFortid' : 'IFremtid'}`;
    const pageTitle = oppgirIFortid
        ? intlUtils(intl, 'steps.label.boIUtlandetIFortid')
        : intlUtils(intl, 'steps.label.boIUtlandetIFremtid');

    const onValidSubmitHandler = (values: Partial<BoIUtlandetFormData>) => {
        const utenlandsopphold = mapBostedUtland(
            values,
            informasjonOmUtenlandsopphold,
            familiehendelsedato!,
            oppgirIFortid,
        );
        return [actionCreator.setUtenlandsopphold(utenlandsopphold)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);
    return (
        <BoIUtlandetFormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={getInitialBostedIUtlandetFormData(utenlandsopphold)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId={stepId}
                        pageTitle={pageTitle}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl, søknad, arbeidsforhold)}
                        supportsTempSaving={false}
                    >
                        <BoIUtlandetFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <FieldArray
                                validateOnChange={false}
                                name={BoIUtlandetFormField.bostedIUtlandet}
                                render={(arrayHelpers) =>
                                    formValues.bostedIUtlandet &&
                                    formValues.bostedIUtlandet.length > 0 &&
                                    formValues.bostedIUtlandet.map((_opphold, index) => (
                                        <div key={index}>
                                            <Block padBottom="xxl">
                                                <BoIUtlandetFormComponents.CountrySelect
                                                    style={{ width: 'var(--app-text-input-width)' }}
                                                    name={`bostedIUtlandet.${index}.land`}
                                                    label={spmTekst}
                                                    validate={validateBostedUtlandLand(intl)}
                                                    useAlpha3Code={false}
                                                />
                                            </Block>
                                            <Block padBottom="xxl">
                                                <BoIUtlandetFormComponents.DatePicker
                                                    name={`bostedIUtlandet.${index}.fom`}
                                                    label={intlUtils(intl, 'boIUtlandet.fraogmed')}
                                                    validate={validateBostedUtlandFom(
                                                        oppgirIFortid,
                                                        intl,
                                                        formValues.bostedIUtlandet,
                                                        index,
                                                    )}
                                                    maxDate={oppgirIFortid ? dateToday : undefined}
                                                    minDate={!oppgirIFortid ? dateToday : undefined}
                                                    showYearSelector={true}
                                                    placeholder={'dd.mm.åååå'}
                                                />
                                            </Block>
                                            <Block padBottom="xxl">
                                                <BoIUtlandetFormComponents.DatePicker
                                                    name={`bostedIUtlandet.${index}.tom`}
                                                    label={intlUtils(intl, 'boIUtlandet.tilogmed')}
                                                    validate={validateBostedUtlandTom(
                                                        formValues.bostedIUtlandet![index].fom,
                                                        oppgirIFortid,
                                                        intl,
                                                        formValues.bostedIUtlandet,
                                                        index,
                                                    )}
                                                    maxDate={oppgirIFortid ? dateToday : undefined}
                                                    minDate={getMinValueTomInput(
                                                        oppgirIFortid,
                                                        formValues.bostedIUtlandet![index].fom,
                                                        dateToday,
                                                    )}
                                                    showYearSelector={true}
                                                    placeholder={'dd.mm.åååå'}
                                                />
                                            </Block>
                                            {index !== 0 && (
                                                <Block>
                                                    <Button
                                                        icon={<TrashIcon />}
                                                        type="button"
                                                        variant="tertiary"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                    >
                                                        {intlUtils(intl, 'boIUtlandet.slett')}
                                                    </Button>
                                                </Block>
                                            )}
                                            {formValues.bostedIUtlandet && formValues.bostedIUtlandet.length > 1 && (
                                                <HorizontalLine />
                                            )}

                                            {formValues.bostedIUtlandet &&
                                                index === formValues.bostedIUtlandet.length - 1 && (
                                                    <Block padBottom="xxl">
                                                        <Button
                                                            icon={<PlusIcon />}
                                                            type="button"
                                                            variant="secondary"
                                                            onClick={() =>
                                                                arrayHelpers.push(getUferdigBostedUtlandInput())
                                                            }
                                                        >
                                                            {intlUtils(intl, 'boIUtlandet.ny')}
                                                        </Button>
                                                    </Block>
                                                )}
                                        </div>
                                    ))
                                }
                            />
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={RouterLink} to={backLink}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </BoIUtlandetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default BoIUtlandet;
