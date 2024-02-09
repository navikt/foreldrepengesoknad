import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import {
    Block,
    Forelder,
    ISOStringToDate,
    Uttaksdagen,
    formaterDatoUtenDag,
    getErMorUfør,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { StepButtons } from '@navikt/fp-ui';
import { FarMedmorAleneomsorgFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
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
import { Person } from '@navikt/fp-types';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    person: Person;
    goToNextDefaultStep: () => Promise<void>;
    goToPreviousDefaultStep: () => Promise<void>;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const FarMedmorAleneomsorgFødsel: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    erEndringssøknad,
    person,
    goToNextDefaultStep,
    goToPreviousDefaultStep,
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

    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const datoForAleneomsorg = annenForelder.kanIkkeOppgis ? familiehendelsesdatoDate : barn.datoForAleneomsorg;

    const { dekningsgrad } = periodeMedForeldrepenger;

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

        return goToNextDefaultStep();
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
                dekningsgrad,
            )}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = farMedmorAleneomsorgFødselAdopsjonQuestionsConfig.getVisbility(
                    formValues as FarMedmorAleneomsorgFødselFormData,
                );

                const valgtStønadskonto = tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80];

                return (
                    <FarMedmorAleneomsorgFødselFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block>
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
                            <StepButtons
                                isNexButtonVisible={visibility.areAllQuestionsAnswered()}
                                goToPreviousStep={goToPreviousDefaultStep}
                                isDisabledAndLoading={isSubmitting}
                            />
                        </Block>
                    </FarMedmorAleneomsorgFødselFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorAleneomsorgFødsel;
