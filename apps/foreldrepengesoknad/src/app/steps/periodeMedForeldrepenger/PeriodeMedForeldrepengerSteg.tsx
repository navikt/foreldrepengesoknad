import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Radio, VStack, ReadMore, Loader, Link } from '@navikt/ds-react';
import {
    AnnenForelder,
    Barn,
    Dekningsgrad,
    Step,
    Uttaksdagen,
    isAnnenForelderOppgitt,
    isFødtBarn,
} from '@navikt/fp-common';
import { isRequired, notEmpty } from '@navikt/fp-validation';
import { RadioGroup, Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import SøknadRoutes from 'app/routes/routes';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import PeriodeMedForeldrepenger from 'app/context/types/PeriodeMedForeldrepenger';
import { useApiPostData, useApiGetData } from 'app/api/context/useFpApiData';
import { FpApiDataType } from 'app/api/context/FpApiDataContext';
import getStønadskontoParams from 'app/api/getStønadskontoParams';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { RequestStatus } from 'app/types/RequestState';
import stepConfig from '../stepsConfig';
import { links } from '@navikt/fp-constants';

const getAnnenPartVedtakParam = (annenForelder: AnnenForelder, barn: Barn) => {
    const annenPartFnr =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr === false ? annenForelder.fnr : undefined;
    const barnFnr = isFødtBarn(barn) && barn.fnr !== undefined && barn.fnr?.length > 0 ? barn.fnr[0] : undefined;
    return {
        annenPartFnr,
        barnFnr,
        familiehendelsesdato: getFamiliehendelsedato(barn),
    };
};

const finnSisteDagMedForeldrepenger = (dager: number, termindato?: string) => {
    if (!termindato) {
        return undefined;
    }
    const dager49 = Uttaksdagen(dayjs(termindato).toDate()).denneEllerNeste();
    const dag = Uttaksdagen(dager49).leggTil(dager);
    return dayjs(dag).format('dddd DD. MMMM YYYY');
};

const shouldSuspendAnnenPartVedtakApiRequest = (annenForelder: AnnenForelder) => {
    const annenPartFnr =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr === false ? annenForelder.fnr : undefined;
    return annenPartFnr !== undefined && annenPartFnr !== '' ? false : true;
};

type Props = {
    mellomlagreSøknadOgNaviger: () => void;
    avbrytSøknad: () => void;
};

const PeriodeMedForeldrepengerSteg: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad }) => {
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const periodeMedForeldrepenger = useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const oppdaterPeriodeMedForeldrepenger = useContextSaveData(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const suspendAnnenPartVedtakApiRequest = shouldSuspendAnnenPartVedtakApiRequest(annenForelder);

    const { data: annenPartsVedtak, requestStatus: statusAnnenPartVedtak } = useApiPostData(
        FpApiDataType.ANNEN_PART_VEDTAK,
        getAnnenPartVedtakParam(annenForelder, barn),
        suspendAnnenPartVedtakApiRequest,
    );

    const params = getStønadskontoParams(
        barn,
        annenForelder,
        søkersituasjon,
        søker,
        barnFraNesteSak,
        annenPartsVedtak,
        eksisterendeSak,
    );

    const suspendStønadskontoApiRequests = suspendAnnenPartVedtakApiRequest
        ? false
        : statusAnnenPartVedtak !== RequestStatus.FINISHED;

    const { data: tilgjengeligeStønadskontoer80, error: error1 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_80,
        params.stønadskontoParams80,
        suspendStønadskontoApiRequests,
    );
    const { data: tilgjengeligeStønadskontoer100 } = useApiGetData(
        FpApiDataType.STØNADSKONTOER_100,
        params.stønadskontoParams100,
        suspendStønadskontoApiRequests,
    );
    console.log(error1);
    // console.log(error2);

    const formMethods = useForm<PeriodeMedForeldrepenger>({
        defaultValues: periodeMedForeldrepenger,
    });

    const onSubmit = (values: PeriodeMedForeldrepenger) => {
        oppdaterPeriodeMedForeldrepenger(values);
        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN_INFO);

        mellomlagreSøknadOgNaviger();
    };

    const goToPreviousStep = () => {
        oppdaterAppRoute(SøknadRoutes.ANNEN_FORELDER);
        mellomlagreSøknadOgNaviger();
    };

    const tilgjengeligeStønadskontoer =
        tilgjengeligeStønadskontoer80 && tilgjengeligeStønadskontoer100
            ? getValgtStønadskontoFor80Og100Prosent(tilgjengeligeStønadskontoer80, tilgjengeligeStønadskontoer100)
            : undefined;

    const erDeltUttak =
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true);

    // FIXME termindato kan vera undefined
    const sisteDag100Prosent = finnSisteDagMedForeldrepenger(49 * 5, params.stønadskontoParams100.termindato);
    const sisteDag80Prosent = finnSisteDagMedForeldrepenger(59 * 5, params.stønadskontoParams80.termindato);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="periodeMedForeldrepenger"
            pageTitle={intl.formatMessage({ id: 'søknad.søkersituasjon' })}
            onCancel={avbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl, false)}
        >
            {!tilgjengeligeStønadskontoer && (
                <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                    <Loader size="2xlarge" />
                </div>
            )}
            {tilgjengeligeStønadskontoer && (
                <Form formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <RadioGroup
                            name="dekningsgrad"
                            description={<FormattedMessage id="uttaksplaninfo.dekningsgrad.beskrivelse" />}
                            label={
                                erDeltUttak ? (
                                    <FormattedMessage id="uttaksplaninfo.dekningsgrad.label.deltUttak" />
                                ) : (
                                    <FormattedMessage id="uttaksplaninfo.dekningsgrad.label.ikkeDeltUttak" />
                                )
                            }
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'søkersituasjon.validering.oppgiFodselEllerAdopsjon' }),
                                ),
                            ]}
                        >
                            <Radio
                                value={Dekningsgrad.HUNDRE_PROSENT}
                                description={intl.formatMessage(
                                    { id: 'uttaksplaninfo.Uker.beskrivelse' },
                                    { dato: sisteDag100Prosent },
                                )}
                            >
                                <FormattedMessage
                                    id="uttaksplaninfo.49Uker"
                                    values={{
                                        antallUker: getAntallUker(
                                            tilgjengeligeStønadskontoer[Dekningsgrad.HUNDRE_PROSENT],
                                        ),
                                    }}
                                />
                            </Radio>
                            <Radio
                                value={Dekningsgrad.ÅTTI_PROSENT}
                                description={intl.formatMessage(
                                    { id: 'uttaksplaninfo.Uker.beskrivelse' },
                                    { dato: sisteDag80Prosent },
                                )}
                            >
                                <FormattedMessage
                                    id="uttaksplaninfo.59Uker"
                                    values={{
                                        antallUker: getAntallUker(
                                            tilgjengeligeStønadskontoer[Dekningsgrad.ÅTTI_PROSENT],
                                        ),
                                    }}
                                />
                            </Radio>
                        </RadioGroup>
                        <ReadMore header={<FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad.header" />}>
                            <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad" />
                            <Link href={links.søknadsfrister} target="_blank">
                                <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad.link" />
                            </Link>
                        </ReadMore>
                        <StepButtonsHookForm goToPreviousStep={goToPreviousStep} />
                    </VStack>
                </Form>
            )}
        </Step>
    );
};

export default PeriodeMedForeldrepengerSteg;
