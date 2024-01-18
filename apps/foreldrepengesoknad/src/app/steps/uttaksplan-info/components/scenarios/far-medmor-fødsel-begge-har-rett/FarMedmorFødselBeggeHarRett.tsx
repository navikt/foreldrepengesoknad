import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { notEmpty } from '@navikt/fp-validation';
import Person from '@navikt/fp-common/src/common/types/Person';
import { Button, GuidePanel, VStack } from '@navikt/ds-react';
import {
    Block,
    Forelder,
    ISOStringToDate,
    StepButtonWrapper,
    Uttaksdagen,
    andreAugust2022ReglerGjelder,
    getErMorUfør,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isFødtBarn,
} from '@navikt/fp-common';
import {
    FarMedmorFødselBeggeHarRettFormComponents,
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';
import {
    getInitialFarMedmorFødselBeggeHarRettValues,
    mapFarMedmorFødselBeggeHarRettToState,
} from './farMedmorFødselBeggeHarRettUtils';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import farMedmorFødselBeggeHarRettQuestionsConfig, {
    FarMedmorFødselBeggeHarRettFormPayload,
} from './farMedmorFødselBeggeHarRettQuestionsConfig';
import MorsSisteDagSpørsmål from '../spørsmål/MorsSisteDagSpørsmål';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from '../spørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import SøknadRoutes from 'app/routes/routes';
import { FarMedmorFødselBeggeHarRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { getPreviousStepHref } from 'app/steps/stepsConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import BackButton from 'app/steps/BackButton';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingBeggeHarRett } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    person: Person;
    mellomlagreSøknadOgNaviger: () => void;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const FarMedmorFødselFørsteganggsøknadBeggeHarRett: FunctionComponent<Props> = ({
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
    const perioderMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    // TODO (TOR) fjern as
    const uttaksplanInfo = useContextGetData(
        ContextDataType.UTTAKSPLAN_INFO,
    ) as FarMedmorFødselBeggeHarRettUttaksplanInfo;

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erBarnetFødt = isFødtBarn(barn);
    const navnFarMedmor = erFarEllerMedmor
        ? person.fornavn
        : isAnnenForelderOppgitt(annenForelder)
          ? annenForelder.fornavn
          : '';
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const navnMor = erFarEllerMedmor && isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : person.fornavn;

    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );

    const { dekningsgrad } = perioderMedForeldrepenger;

    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const termindato = getTermindato(barn);
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const valgtStønadskonto = tilgjengeligeStønadskontoer[getDekningsgradFromString(dekningsgrad)];
    const fordelingScenario = getFordelingBeggeHarRett(valgtStønadskonto, true, erBarnetFødt, intl);

    const onSubmit = (values: Partial<FarMedmorFødselBeggeHarRettFormData>) => {
        setIsSubmitting(true);

        const uttaksplan = lagUttaksplan({
            annenForelderErUfør: erMorUfør,
            erDeltUttak: true,
            erEndringssøknad,
            erEnkelEndringssøknad: erEndringssøknad,
            familiehendelsesdato: familiehendelsesdatoDate!,
            førsteUttaksdagEtterSeksUker: Uttaksdagen(Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()).leggTil(
                30,
            ),
            situasjon: erFødsel ? 'fødsel' : 'adopsjon',
            søkerErFarEllerMedmor: erFarEllerMedmor,
            søkerHarMidlertidigOmsorg: false,
            tilgjengeligeStønadskontoer: valgtStønadskonto,
            uttaksplanSkjema: {
                morSinSisteUttaksdag: values.morsSisteDag,
                farSinFørsteUttaksdag: values.farMedmorsFørsteDag,
                antallDagerFellesperiodeFarMedmor: parseInt(values.antallDagerFellesperiode || '0', 10),
                antallUkerFellesperiodeFarMedmor: parseInt(values.antallUkerFellesperiode || '0', 10),
            },
            bareFarMedmorHarRett: false,
            termindato,
            harAktivitetskravIPeriodeUtenUttak: false,
            førsteUttaksdagNesteBarnsSak,
        });

        oppdaterUttaksplanInfo(mapFarMedmorFødselBeggeHarRettToState(values));

        oppdaterUttaksplan(uttaksplan);

        oppdaterBarnOgLagreUttaksplandata({
            ...uttaksplanMetadata,
            antallUkerIUttaksplan: getAntallUker(tilgjengeligeStønadskontoer[dekningsgrad! === '100' ? 100 : 80]),
        });

        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <VStack gap="5">
            <FordelingOversikt
                kontoer={valgtStønadskonto}
                erFarEllerMedmor={true}
                navnFarMedmor={navnFarMedmor}
                navnMor={navnMor}
                erAdopsjon={erAdopsjon}
                erBarnetFødt={erBarnetFødt}
                annenForeldrerHarRett={true}
                fordelingScenario={fordelingScenario}
            ></FordelingOversikt>
            <FarMedmorFødselBeggeHarRettFormComponents.FormikWrapper
                initialValues={getInitialFarMedmorFødselBeggeHarRettValues(uttaksplanInfo)}
                onSubmit={onSubmit}
                renderForm={({ values: formValues, setFieldValue }) => {
                    const visibility = farMedmorFødselBeggeHarRettQuestionsConfig.getVisbility({
                        ...formValues,
                        familiehendelsesdato: familiehendelsesdatoDate!,
                    } as FarMedmorFødselBeggeHarRettFormPayload);

                    const tilgjengeligeDager = valgtStønadskonto
                        ? getTilgjengeligeDager(valgtStønadskonto, false, Forelder.farMedmor)
                        : undefined;

                    return (
                        <FarMedmorFødselBeggeHarRettFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                        >
                            <Block
                                padBottom="xl"
                                visible={
                                    erFarEllerMedmor &&
                                    !andreAugust2022ReglerGjelder(ISOStringToDate(familiehendelsesdato)!)
                                }
                            >
                                <GuidePanel>
                                    <FormattedMessage
                                        id="uttaksplaninfo.veileder.farMedmor.infoOmTidsromMellomMorsSisteDagOgFarsFørsteDag"
                                        values={{ navnMor }}
                                    />
                                </GuidePanel>
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(FarMedmorFødselBeggeHarRettFormField.morsSisteDag)}
                            >
                                <MorsSisteDagSpørsmål
                                    FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                    fieldName={FarMedmorFødselBeggeHarRettFormField.morsSisteDag}
                                    navnMor={navnMor}
                                    familiehendelsesdato={familiehendelsesdato}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag)}
                            >
                                <FarMedmorsFørsteDag
                                    FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                    fieldName={FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag}
                                    familiehendelsesdato={familiehendelsesdatoDate!}
                                    setFieldValue={setFieldValue}
                                    morsSisteDag={ISOStringToDate(formValues.morsSisteDag)}
                                    navnMor={navnMor}
                                    termindato={termindato}
                                    situasjon={søkersituasjon.situasjon}
                                    morHarRettTilForeldrepengerIEØS={false}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(
                                    FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode,
                                )}
                            >
                                {tilgjengeligeDager && (
                                    <AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål
                                        FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                        ukerFieldName={FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode}
                                        dagerFieldName={FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode}
                                        antallDager={formValues.antallDagerFellesperiode!}
                                        antallUker={formValues.antallUkerFellesperiode!}
                                        setFieldValue={setFieldValue}
                                        ukerMedFellesperiode={tilgjengeligeDager.dagerFelles / 5}
                                    />
                                )}
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
                        </FarMedmorFødselBeggeHarRettFormComponents.Form>
                    );
                }}
            />
        </VStack>
    );
};

export default FarMedmorFødselFørsteganggsøknadBeggeHarRett;
