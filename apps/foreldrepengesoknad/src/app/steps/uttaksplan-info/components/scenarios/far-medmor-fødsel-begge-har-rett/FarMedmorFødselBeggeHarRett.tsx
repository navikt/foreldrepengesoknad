import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { GuidePanel, VStack } from '@navikt/ds-react';

import {
    Block,
    Dekningsgrad,
    Forelder,
    ISOStringToDate,
    Uttaksdagen,
    andreAugust2022ReglerGjelder,
    getErMorUfør,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { Søker } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { FarMedmorFødselBeggeHarRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';

import { getTilgjengeligeDager } from '../../../../../utils/tilgjengeligeDagerUtils';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from '../spørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import MorsSisteDagSpørsmål from '../spørsmål/MorsSisteDagSpørsmål';
import {
    FarMedmorFødselBeggeHarRettFormComponents,
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';
import farMedmorFødselBeggeHarRettQuestionsConfig, {
    FarMedmorFødselBeggeHarRettFormPayload,
} from './farMedmorFødselBeggeHarRettQuestionsConfig';
import {
    getInitialFarMedmorFødselBeggeHarRettValues,
    mapFarMedmorFødselBeggeHarRettToState,
} from './farMedmorFødselBeggeHarRettUtils';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    søker: Søker;
    goToNextDefaultStep: () => Promise<void>;
    goToPreviousDefaultStep: () => Promise<void>;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const FarMedmorFødselFørsteganggsøknadBeggeHarRett: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    erEndringssøknad,
    søker,
    goToNextDefaultStep,
    goToPreviousDefaultStep,
    oppdaterBarnOgLagreUttaksplandata,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const intl = useIntl();
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

    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const navnFarMedmor = erFarEllerMedmor
        ? søker.fornavn
        : isAnnenForelderOppgitt(annenForelder)
          ? annenForelder.fornavn
          : '';
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const navnMor = erFarEllerMedmor && isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : søker.fornavn;

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
    const minsterett =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? tilgjengeligeStønadskontoer100DTO.minsteretter
            : tilgjengeligeStønadskontoer80DTO.minsteretter;

    const fordelingScenario = getFordelingFraKontoer(
        valgtStønadskonto,
        minsterett,
        søkersituasjon,
        barn,
        false,
        navnMor,
        navnFarMedmor,
        intl,
    );

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

        return goToNextDefaultStep();
    };

    return (
        <VStack gap="5">
            <FordelingOversikt
                kontoer={valgtStønadskonto}
                navnFarMedmor={navnFarMedmor}
                navnMor={navnMor}
                deltUttak={true}
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

                    const valgtStønadskonto =
                        tilgjengeligeStønadskontoer[dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? 100 : 80];
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
                                <StepButtons
                                    isNexButtonVisible={visibility.areAllQuestionsAnswered()}
                                    goToPreviousStep={goToPreviousDefaultStep}
                                    isDisabledAndLoading={isSubmitting}
                                />
                            </Block>
                        </FarMedmorFødselBeggeHarRettFormComponents.Form>
                    );
                }}
            />
        </VStack>
    );
};

export default FarMedmorFødselFørsteganggsøknadBeggeHarRett;
