import { useIntl, FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Radio, VStack, ReadMore, Link } from '@navikt/ds-react';
import { Dekningsgrad, TilgjengeligStønadskonto, Uttaksdagen, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { isRequired, notEmpty } from '@navikt/fp-validation';
import { RadioGroup, Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import PeriodeMedForeldrepenger from 'app/context/types/PeriodeMedForeldrepenger';
import { links } from '@navikt/fp-constants';

const finnSisteDagMedForeldrepenger = (dager: number, termindato?: string) => {
    if (!termindato) {
        return undefined;
    }
    const dager49 = Uttaksdagen(dayjs(termindato).toDate()).denneEllerNeste();
    const dag = Uttaksdagen(dager49).leggTil(dager);
    return dayjs(dag).format('dddd DD. MMMM YYYY');
};

type Props = {
    mellomlagreSøknadOgNaviger: () => void;
    termindato?: string;
    stønadskonto100: TilgjengeligStønadskonto[];
    stønadskonto80: TilgjengeligStønadskonto[];
};

const DekningsgradForm: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    termindato,
    stønadskonto100,
    stønadskonto80,
}) => {
    const intl = useIntl();

    const periodeMedForeldrepenger = useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const oppdaterPeriodeMedForeldrepenger = useContextSaveData(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

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

    const erDeltUttak =
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true);

    // FIXME termindato kan vera undefined
    const sisteDag100Prosent = finnSisteDagMedForeldrepenger(49 * 5, termindato);
    const sisteDag80Prosent = finnSisteDagMedForeldrepenger(59 * 5, termindato);

    return (
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
                        isRequired(intl.formatMessage({ id: 'søkersituasjon.validering.oppgiFodselEllerAdopsjon' })),
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
                                antallUker: getAntallUker(stønadskonto100),
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
                                antallUker: getAntallUker(stønadskonto80),
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
    );
};

export default DekningsgradForm;
