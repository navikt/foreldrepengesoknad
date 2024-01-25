import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, VStack } from '@navikt/ds-react';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import Person from '@navikt/fp-common/src/common/types/Person';
import {
    Block,
    Dekningsgrad,
    ISOStringToDate,
    StepButtonWrapper,
    Uttaksdagen,
    formaterDatoUtenDag,
    getErMorUfør,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isFødtBarn,
} from '@navikt/fp-common';
import { FarMedmorAleneomsorgFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import SøknadRoutes from 'app/routes/routes';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import {
    FarMedmorAleneomsorgFødselFormComponents,
    FarMedmorAleneomsorgFødselFormData,
    FarMedmorAleneomsorgFødselFormField,
} from './farMedmorAleneomsorgFødselFormConfig';
import farMedmorAleneomsorgFødselAdopsjonQuestionsConfig from './farMedmorAleneomsorgFødselQuestionsConfig';
import {
    getInitialFarMedmorAleneomsorgFødselValues,
    mapFarMedmorAleneomsorgFødselFormToState,
} from './farMedmorAleneomsorgFødselUtils';
import { validateStartdatoUttakFarMedmorAleneomsorgFødsel } from './validation/farMedmorAleneomsorgFødselValidation';
import { getPreviousStepHref } from 'app/steps/stepsConfig';
import BackButton from 'app/steps/BackButton';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { UttaksplanInfoScenario } from '../scenarios';
import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    person: Person;
    scenario: UttaksplanInfoScenario;
    mellomlagreSøknadOgNaviger: () => void;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const FarMedmorAleneomsorgFødsel: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    erEndringssøknad,
    person,
    mellomlagreSøknadOgNaviger,
    oppdaterBarnOgLagreUttaksplandata,
}) => {
    const intl = useIntl();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const periodeMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    // TODO (TOR) fjern as
    const uttaksplanInfo = useContextGetData(
        ContextDataType.UTTAKSPLAN_INFO,
    ) as FarMedmorAleneomsorgFødselUttaksplanInfo;

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const datoForAleneomsorg = annenForelder.kanIkkeOppgis ? familiehendelsesdatoDate : barn.datoForAleneomsorg;

    const { dekningsgrad } = periodeMedForeldrepenger;

    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erBarnetFødt = isFødtBarn(barn);
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );
    const termindato = getTermindato(barn);
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const navnMor = erFarEllerMedmor && isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : person.fornavn;

    const onSubmit = (values: Partial<FarMedmorAleneomsorgFødselFormData>) => {
        setIsSubmitting(true);

        const uttaksplanInfo: FarMedmorAleneomsorgFødselUttaksplanInfo = mapFarMedmorAleneomsorgFødselFormToState(
            values,
            dateToISOString(datoForAleneomsorg),
        );
        oppdaterUttaksplanInfo(uttaksplanInfo);

        const uttaksplan = lagUttaksplan({
            annenForelderErUfør: erMorUfør,
            erDeltUttak: false,
            erEndringssøknad,
            erEnkelEndringssøknad: erEndringssøknad,
            familiehendelsesdato: familiehendelsesdatoDate!,
            førsteUttaksdagEtterSeksUker: Uttaksdagen(Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()).leggTil(
                30,
            ),
            situasjon: erFødsel ? 'fødsel' : 'adopsjon',
            søkerErFarEllerMedmor: erFarEllerMedmor,
            søkerHarMidlertidigOmsorg: false,
            tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer[getDekningsgradFromString(dekningsgrad)],
            uttaksplanSkjema: {
                startdatoPermisjon: uttaksplanInfo.startdatoUttak,
            },
            bareFarMedmorHarRett: false,
            termindato,
            harAktivitetskravIPeriodeUtenUttak: getHarAktivitetskravIPeriodeUtenUttak({
                erDeltUttak: false,
                morHarRett: false,
                søkerErAleneOmOmsorg: true,
            }),
            førsteUttaksdagNesteBarnsSak,
        });

        const kontoerForValgtDekningsgrad = tilgjengeligeStønadskontoer[getDekningsgradFromString(dekningsgrad)];

        oppdaterUttaksplan(uttaksplan);

        oppdaterBarnOgLagreUttaksplandata({
            ...uttaksplanMetadata,
            antallUkerIUttaksplan: getAntallUker(kontoerForValgtDekningsgrad),
        });

        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN);

        mellomlagreSøknadOgNaviger();
    };

    const shouldRender = erFødsel && erFarEllerMedmor && (!!søker.erAleneOmOmsorg || annenForelder.kanIkkeOppgis);

    if (!shouldRender) {
        return null;
    }

    const navnFar = erFarEllerMedmor
        ? person.fornavn
        : isAnnenForelderOppgitt(annenForelder)
          ? annenForelder.fornavn
          : '';
    const valgtStønadskonto = tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80];
    const minsterett =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? tilgjengeligeStønadskontoer100DTO.minsteretter
            : tilgjengeligeStønadskontoer80DTO.minsteretter;

    const fordelingScenario = getFordelingFraKontoer(
        valgtStønadskonto,
        minsterett,
        erFarEllerMedmor,
        erBarnetFødt,
        familiehendelsesdatoDate!,
        erAdopsjon,
        true,
        navnMor,
        navnFar,
        barn.antallBarn,
        intl,
    );
    return (
        <VStack gap="5">
            <FordelingOversikt
                kontoer={valgtStønadskonto}
                erFarEllerMedmor={true}
                navnFarMedmor={navnFar}
                navnMor={navnMor}
                erAdopsjon={erAdopsjon}
                erBarnetFødt={erBarnetFødt}
                annenForeldrerHarRett={false}
                antallBarn={barn.antallBarn}
                dekningsgrad={dekningsgrad}
                familiehendelsesdato={familiehendelsesdatoDate!}
                fordelingScenario={fordelingScenario}
            ></FordelingOversikt>
            <FarMedmorAleneomsorgFødselFormComponents.FormikWrapper
                initialValues={getInitialFarMedmorAleneomsorgFødselValues(
                    uttaksplanInfo,
                    dateToISOString(datoForAleneomsorg),
                    dekningsgrad,
                )}
                onSubmit={onSubmit}
                renderForm={({ values: formValues }) => {
                    const visibility = farMedmorAleneomsorgFødselAdopsjonQuestionsConfig.getVisbility(
                        formValues as FarMedmorAleneomsorgFødselFormData,
                    );

                    return (
                        <FarMedmorAleneomsorgFødselFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                        >
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(
                                    FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse,
                                )}
                            >
                                <FarMedmorAleneomsorgFødselFormComponents.YesOrNoQuestion
                                    name={FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse}
                                    legend={intlUtils(intl, 'uttaksplaninfo.startdatoAleneomsorgFarMedmor.spørsmål')}
                                    labels={{
                                        yes: intlUtils(
                                            intl,
                                            'uttaksplaninfo.startdatoAdopsjon.alternativ.omsorgsovertakelse',
                                            {
                                                dato: formaterDatoUtenDag(datoForAleneomsorg!),
                                            },
                                        ),
                                        no: intlUtils(intl, 'uttaksplaninfo.startdatoAleneomsorgFarMedmor.annenDato'),
                                    }}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(FarMedmorAleneomsorgFødselFormField.startdatoUttak)}
                            >
                                <FarMedmorAleneomsorgFødselFormComponents.DatePicker
                                    name={FarMedmorAleneomsorgFødselFormField.startdatoUttak}
                                    label="Startdato"
                                    validate={validateStartdatoUttakFarMedmorAleneomsorgFødsel(
                                        intl,
                                        familiehendelsesdato,
                                    )}
                                    minDate={ISOStringToDate(familiehendelsesdato)}
                                    placeholder={'dd.mm.åååå'}
                                />
                            </Block>
                            <Block>
                                <StepButtonWrapper>
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={getPreviousStepHref('uttaksplanInfo')}
                                    />
                                    {visibility.areAllQuestionsAnswered() && (
                                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                            {intlUtils(intl, 'søknad.gåVidere')}
                                        </Button>
                                    )}
                                </StepButtonWrapper>
                            </Block>
                        </FarMedmorAleneomsorgFødselFormComponents.Form>
                    );
                }}
            />
        </VStack>
    );
};

export default FarMedmorAleneomsorgFødsel;
