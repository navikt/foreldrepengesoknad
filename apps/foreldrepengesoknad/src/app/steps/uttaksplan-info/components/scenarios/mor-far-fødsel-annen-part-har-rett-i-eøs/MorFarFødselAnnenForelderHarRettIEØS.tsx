import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { VStack } from '@navikt/ds-react';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { notEmpty } from '@navikt/fp-validation';
import Person from '@navikt/fp-common/src/common/types/Person';
import {
    Block,
    Dekningsgrad,
    ISOStringToDate,
    Uttaksdagen,
    formaterNavn,
    hasValue,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    uttaksConstants,
} from '@navikt/fp-common';
import { StepButtons } from '@navikt/fp-ui';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import {
    morFarFødselAnnenForelderHarRettIEØSQuestionsConfig,
    MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload,
} from './morFarFødselAnnenForelderHarRettIEØSQuestionsConfig';
import {
    MorFarFødselAnnenForelderHarRettIEØSFormComponents,
    MorFarFødselAnnenForelderHarRettIEØSFormData,
    MorFarFødselAnnenForelderHarRettIEØSFormField,
} from './morFarFødselAnnenForelderHarRettIEØSFormConfig';
import {
    getInitialMorFarFødselAnnenForelderHarRettIEØSValues,
    mapMorFarFødselAnnenForelderHarRettIEØSFormToState,
} from './morFarFødselAnnenForelderHarRettIEØSUtils';
import StartdatoPermisjonMor from '../mor-fodsel/StartdatoPermisjonMor';
import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    person: Person;
    goToNextDefaultStep: () => Promise<void>;
    goToPreviousDefaultStep: () => Promise<void>;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const MorFarFødselAnnenForelderHarRettIEØS: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
    erEndringssøknad,
    person,
    goToNextDefaultStep,
    goToPreviousDefaultStep,
    oppdaterBarnOgLagreUttaksplandata,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const intl = useIntl();
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const periodeMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    // TODO (TOR) fjern as
    const uttaksplanInfo = useContextGetData(
        ContextDataType.UTTAKSPLAN_INFO,
    ) as MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo;

    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);
    const termindato = getTermindato(barn);
    const erDeltUttak = true;
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

    const { dekningsgrad } = periodeMedForeldrepenger;

    const shouldRender = erFødsel;
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );
    const valgtStønadskonto = tilgjengeligeStønadskontoer[getDekningsgradFromString(dekningsgrad)];

    const onSubmit = async (values: Partial<MorFarFødselAnnenForelderHarRettIEØSFormData>) => {
        setIsSubmitting(true);

        const submissionValues = mapMorFarFødselAnnenForelderHarRettIEØSFormToState(values);
        const startdato = hasValue(values.permisjonStartdato) ? values.permisjonStartdato : undefined;

        oppdaterUttaksplanInfo(submissionValues);

        const uttaksplan = lagUttaksplan({
            annenForelderErUfør: false,
            erDeltUttak,
            erEndringssøknad,
            erEnkelEndringssøknad: erEndringssøknad,
            familiehendelsesdato: familiehendelsesdatoDate!,
            førsteUttaksdagEtterSeksUker: Uttaksdagen(Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()).leggTil(
                30,
            ),
            situasjon: søkersituasjon.situasjon,
            søkerErFarEllerMedmor: erFarEllerMedmor,
            søkerHarMidlertidigOmsorg: false,
            tilgjengeligeStønadskontoer: valgtStønadskonto,
            uttaksplanSkjema: {
                startdatoPermisjon: submissionValues.skalIkkeHaUttakFørTermin ? undefined : startdato,
                farSinFørsteUttaksdag: erFarEllerMedmor ? startdato : undefined,
            },
            bareFarMedmorHarRett: false,
            termindato: undefined,
            harAktivitetskravIPeriodeUtenUttak: getHarAktivitetskravIPeriodeUtenUttak({
                erDeltUttak,
                morHarRett: true,
                søkerErAleneOmOmsorg: false,
            }),
            annenForelderHarRettPåForeldrepengerIEØS: true,
            førsteUttaksdagNesteBarnsSak,
        });

        oppdaterUttaksplan(uttaksplan);

        oppdaterBarnOgLagreUttaksplandata({
            ...uttaksplanMetadata,
            antallUkerIUttaksplan: getAntallUker(tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80]),
        });

        return goToNextDefaultStep();
    };

    if (!shouldRender) {
        return null;
    }

    const erSøkerMor = !erFarEllerMedmor;
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;

    const navnAnnenPart = oppgittAnnenForelder
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn, false)
        : '';

    const navnSøker = formaterNavn(person.fornavn, person.etternavn, false, person.mellomnavn);
    const navnMor = erSøkerMor ? navnSøker : navnAnnenPart;
    const navnFarMedmor = erSøkerMor ? navnAnnenPart : navnSøker;

    const førsteUttaksdag = Uttaksdagen(ISOStringToDate(familiehendelsesdato)!).denneEllerNeste();
    const defaultPermisjonStartdato = erFarEllerMedmor
        ? førsteUttaksdag
        : Uttaksdagen(førsteUttaksdag).trekkFra(uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5);
    const minsterett =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? tilgjengeligeStønadskontoer100DTO.minsteretter
            : tilgjengeligeStønadskontoer80DTO.minsteretter;
    const fordelingScenario = getFordelingFraKontoer(
        valgtStønadskonto,
        minsterett,
        søkersituasjon,
        barn,
        søker.erAleneOmOmsorg,
        navnMor,
        navnFarMedmor,
        intl,
        true,
    );
    return (
        <VStack gap="5">
            <FordelingOversikt
                kontoer={valgtStønadskonto}
                navnFarMedmor={navnFarMedmor}
                navnMor={navnMor}
                deltUttak={true}
                fordelingScenario={fordelingScenario}
            ></FordelingOversikt>
            <MorFarFødselAnnenForelderHarRettIEØSFormComponents.FormikWrapper
                initialValues={getInitialMorFarFødselAnnenForelderHarRettIEØSValues(
                    defaultPermisjonStartdato,
                    uttaksplanInfo,
                )}
                onSubmit={onSubmit}
                renderForm={({ values: formValues, setFieldValue }) => {
                    const visibility = morFarFødselAnnenForelderHarRettIEØSQuestionsConfig.getVisbility({
                        ...formValues,
                        erFarEllerMedmor,
                    } as MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload);

                    return (
                        <MorFarFødselAnnenForelderHarRettIEØSFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                        >
                            <Block
                                visible={
                                    !erFarEllerMedmor &&
                                    visibility.isIncluded(
                                        MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato,
                                    )
                                }
                            >
                                <StartdatoPermisjonMor
                                    permisjonStartdato={formValues.permisjonStartdato!}
                                    skalIkkeHaUttakFørTermin={formValues.skalIkkeHaUttakFørTermin!}
                                    termindato={termindato}
                                    barn={barn}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={
                                    erFarEllerMedmor &&
                                    visibility.isIncluded(
                                        MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato,
                                    )
                                }
                            >
                                <FarMedmorsFørsteDag
                                    FormComponents={MorFarFødselAnnenForelderHarRettIEØSFormComponents}
                                    fieldName={MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato}
                                    familiehendelsesdato={familiehendelsesdatoDate!}
                                    setFieldValue={setFieldValue}
                                    morsSisteDag={undefined}
                                    navnMor={navnMor}
                                    termindato={undefined}
                                    situasjon={søkersituasjon.situasjon}
                                    morHarRettTilForeldrepengerIEØS={true}
                                />
                            </Block>
                            <Block>
                                <StepButtons
                                    isNexButtonVisible={visibility.areAllQuestionsAnswered()}
                                    goToPreviousStep={goToPreviousDefaultStep}
                                    isDisabledAndLoading={isSubmitting}
                                />
                            </Block>
                        </MorFarFødselAnnenForelderHarRettIEØSFormComponents.Form>
                    );
                }}
            />
        </VStack>
    );
};

export default MorFarFødselAnnenForelderHarRettIEØS;
