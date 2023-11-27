import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@navikt/ds-react';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { notEmpty } from '@navikt/fp-validation';
import { FpDataType, useFpStateData, useFpStateSaveFn } from 'app/context/FpDataContext';
import Person from '@navikt/fp-common/src/common/types/Person';
import {
    Block,
    Forelder,
    ISOStringToDate,
    StepButtonWrapper,
    Uttaksdagen,
    formaterDatoUtenDag,
    getErMorUfør,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { FarMedmorAleneomsorgFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import SøknadRoutes from 'app/routes/routes';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
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

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    person: Person;
    mellomlagreSøknadOgNaviger: () => void;
}

const FarMedmorAleneomsorgFødsel: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    erEndringssøknad,
    person,
    mellomlagreSøknadOgNaviger,
}) => {
    const intl = useIntl();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = notEmpty(useFpStateData(FpDataType.SØKERSITUASJON));
    const barn = notEmpty(useFpStateData(FpDataType.OM_BARNET));
    const annenForelder = notEmpty(useFpStateData(FpDataType.ANNEN_FORELDER));
    const søker = notEmpty(useFpStateData(FpDataType.SØKER));
    const barnFraNesteSak = useFpStateData(FpDataType.BARN_FRA_NESTE_SAK);
    const uttaksplanMetadata = useFpStateData(FpDataType.UTTAKSPLAN_METADATA);
    // TODO (TOR) fjern as
    const uttaksplanInfo = useFpStateData(FpDataType.UTTAKSPLAN_INFO) as FarMedmorAleneomsorgFødselUttaksplanInfo;

    const lagreAppRoute = useFpStateSaveFn(FpDataType.APP_ROUTE);
    const lagreUttaksplanMetadata = useFpStateSaveFn(FpDataType.UTTAKSPLAN_METADATA);
    const lagreUttaksplanInfo = useFpStateSaveFn(FpDataType.UTTAKSPLAN_INFO);
    const lagreUttaksplan = useFpStateSaveFn(FpDataType.UTTAKSPLAN);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const datoForAleneomsorg = annenForelder.kanIkkeOppgis ? familiehendelsesdatoDate : barn.datoForAleneomsorg;

    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );
    const termindato = getTermindato(barn);
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

    const onSubmit = (values: Partial<FarMedmorAleneomsorgFødselFormData>) => {
        setIsSubmitting(true);

        const uttaksplanInfo: FarMedmorAleneomsorgFødselUttaksplanInfo = mapFarMedmorAleneomsorgFødselFormToState(
            values,
            dateToISOString(datoForAleneomsorg),
        );
        lagreUttaksplanInfo(uttaksplanInfo);

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
            tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer[getDekningsgradFromString(values.dekningsgrad)],
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

        const kontoerForValgtDekningsgrad = tilgjengeligeStønadskontoer[getDekningsgradFromString(values.dekningsgrad)];

        lagreUttaksplan(uttaksplan);

        lagreUttaksplanMetadata({
            ...uttaksplanMetadata,
            dekningsgrad: getDekningsgradFromString(values.dekningsgrad),
            antallUkerIUttaksplan: getAntallUker(kontoerForValgtDekningsgrad),
        });

        lagreAppRoute(SøknadRoutes.UTTAKSPLAN);

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

    return (
        <FarMedmorAleneomsorgFødselFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorAleneomsorgFødselValues(
                uttaksplanInfo,
                dateToISOString(datoForAleneomsorg),
                uttaksplanMetadata?.dekningsgrad,
            )}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = farMedmorAleneomsorgFødselAdopsjonQuestionsConfig.getVisbility(
                    formValues as FarMedmorAleneomsorgFødselFormData,
                );

                const valgtStønadskonto = tilgjengeligeStønadskontoer[formValues.dekningsgrad === '100' ? 100 : 80];

                return (
                    <FarMedmorAleneomsorgFødselFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block
                            padBottom="xl"
                            visible={visibility.isVisible(FarMedmorAleneomsorgFødselFormField.dekningsgrad)}
                        >
                            <DekningsgradSpørsmål
                                FormKomponent={FarMedmorAleneomsorgFødselFormComponents}
                                dekningsgradFeltNavn={FarMedmorAleneomsorgFødselFormField.dekningsgrad}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                erDeltUttak={false}
                            />
                        </Block>
                        <Block visible={formValues.dekningsgrad !== ''}>
                            {valgtStønadskonto && (
                                <TilgjengeligeDagerGraf
                                    erDeltUttak={false}
                                    erFarEllerMedmor={true}
                                    navnFarMedmor={navnFar}
                                    navnMor=""
                                    tilgjengeligeDager={getTilgjengeligeDager(
                                        valgtStønadskonto,
                                        false,
                                        Forelder.farMedmor,
                                    )}
                                />
                            )}
                        </Block>
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
                                validate={validateStartdatoUttakFarMedmorAleneomsorgFødsel(intl, familiehendelsesdato)}
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
    );
};

export default FarMedmorAleneomsorgFødsel;
