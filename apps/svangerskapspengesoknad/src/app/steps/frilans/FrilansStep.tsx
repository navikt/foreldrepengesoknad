import { FormattedMessage, useIntl } from 'react-intl';
import { Radio } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import { Block, Step, date20YearsAgo, dateToday, intlUtils } from '@navikt/fp-common';
import { søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { getNextRouteForFrilans, useStepConfig } from 'app/steps/stepsConfig';
import { FrilansFormData, FrilansFormField } from './frilansFormConfig';
import { validateFrilansStart, validateJobberFortsattSomFrilanser } from './frilansValidation';
import { getFrilansTilretteleggingOption } from '../velg-arbeidsforhold/velgArbeidFormUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { useForm } from 'react-hook-form';
import { Datepicker, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import SøknadRoutes from 'app/routes/routes';
import { useNavigate } from 'react-router-dom';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const FrilansStep: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, søkerInfo }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const navigate = useNavigate();

    const frilans = useContextGetData(ContextDataType.FRILANS);
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterFrilans = useContextSaveData(ContextDataType.FRILANS);
    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const formMethods = useForm<FrilansFormData>({
        defaultValues: {
            frilansFom: frilans ? frilans.oppstart : undefined,
            jobberFremdelesSomFrilanser: frilans ? frilans.jobberFremdelesSomFrilans : undefined,
        },
    });

    const onSubmit = (values: Partial<FrilansFormData>) => {
        const harKunEtAktivtArbeid = søkerHarKunEtAktivtArbeid(
            barnet.termindato,
            søkerInfo.arbeidsforhold,
            inntektsinformasjon.harJobbetSomFrilans,
            inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
        );
        if (harKunEtAktivtArbeid) {
            const tilretteleggingOptions = [
                getFrilansTilretteleggingOption(tilrettelegginger || [], values.frilansFom!),
            ];
            oppdaterTilrettelegginger(tilretteleggingOptions);
        }

        oppdaterFrilans({
            jobberFremdelesSomFrilans: values.jobberFremdelesSomFrilanser!,
            oppstart: values.frilansFom!,
        });

        const { nextRoute, nextTilretteleggingId } = getNextRouteForFrilans(
            inntektsinformasjon,
            barnet.termindato,
            søkerInfo.arbeidsforhold,
        );
        oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        oppdaterAppRoute(nextRoute);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId="frilans"
            pageTitle={intlUtils(intl, 'steps.label.frilans')}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <Block padBottom="xxl">
                    <Datepicker
                        name={FrilansFormField.frilansFom}
                        label={intlUtils(intl, 'frilans.oppstart')}
                        validate={[validateFrilansStart(intl)]}
                        maxDate={dateToday}
                        minDate={date20YearsAgo}
                    />
                </Block>
                <Block padBottom="xxl">
                    <RadioGroup
                        name={FrilansFormField.jobberFremdelesSomFrilanser}
                        label={intlUtils(intl, 'frilans.jobberFremdelesSomFrilans')}
                        validate={[validateJobberFortsattSomFrilanser(intl)]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="frilans.jobberFremdelesSomFrilans.ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="frilans.jobberFremdelesSomFrilans.nei" />
                        </Radio>
                    </RadioGroup>
                </Block>
                <Block padBottom="l">
                    <StepButtonsHookForm<FrilansFormData>
                        goToPreviousStep={() => {
                            oppdaterAppRoute(SøknadRoutes.ARBEID);
                            navigate(SøknadRoutes.ARBEID);
                        }}
                    />
                </Block>
            </Form>
        </Step>
    );
};

export default FrilansStep;
