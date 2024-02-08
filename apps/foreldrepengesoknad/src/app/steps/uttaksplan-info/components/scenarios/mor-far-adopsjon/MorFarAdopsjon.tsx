import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { notEmpty } from '@navikt/fp-validation';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { GuidePanel, VStack } from '@navikt/ds-react';
import {
    Block,
    Dekningsgrad,
    Forelder,
    ISOStringToDate,
    Uttaksdagen,
    formaterNavn,
    intlUtils,
    isAdoptertAnnetBarn,
    isAdoptertBarn,
    isAdoptertStebarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getInitialMorFarAdopsjonValues, mapMorFarAdopsjonFormToState } from './morFarAdopsjonUtils';
import { dateIsSameOrAfter, findEldsteDato } from 'app/utils/dateUtils';
import {
    MorFarAdopsjonFormComponents,
    MorFarAdopsjonFormData,
    MorFarAdopsjonFormField,
} from './morFarAdopsjonFormConfig';
import { MorFarAdopsjonQuestionsPayload, morFarAdopsjonQuestionsConfig } from './morFarAdopsjonQuestionsConfig';
import { getTilgjengeligeDager } from '../../../../../utils/tilgjengeligeDagerUtils';
import StartdatoAdopsjon, { finnStartdatoAdopsjon } from './StartdatoAdopsjon';
import MorsSisteDagSpørsmål from '../spørsmål/MorsSisteDagSpørsmål';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from '../spørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import FordelingFellesperiodeSpørsmål from '../../fordelingFellesperiode/FordelingFellesperiodeSpørsmål';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import AdopsjonStartdatoValg from './adopsjonStartdatoValg';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import Person from '@navikt/fp-common/src/common/types/Person';
import { MorFarAdopsjonUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import { StepButtons } from '@navikt/fp-ui';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    person: Person;
    goToNextDefaultStep: () => Promise<void>;
    goToPreviousDefaultStep: () => Promise<void>;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const MorFarAdopsjon: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
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
    const uttaksplanInfo = useContextGetData(ContextDataType.UTTAKSPLAN_INFO) as MorFarAdopsjonUttaksplanInfo;

    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const { fornavn, mellomnavn, etternavn } = person;
    const { dekningsgrad } = periodeMedForeldrepenger;

    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const søkerErAleneOmOmsorg = !!søker.erAleneOmOmsorg;
    const annenForelderOppgittIkkeAleneOmOmsorg = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerINorge !== undefined ||
          annenForelder.harRettPåForeldrepengerIEØS !== undefined
        : false;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const bareFarMedmorHarRett =
        erFarEllerMedmor &&
        isAnnenForelderOppgitt(annenForelder) &&
        !søkerErAleneOmOmsorg &&
        !annenForelder.harRettPåForeldrepengerINorge &&
        !annenForelder.harRettPåForeldrepengerIEØS;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

    const shouldRender =
        erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelder.kanIkkeOppgis || søkerErAleneOmOmsorg);

    const onSubmit = (values: Partial<MorFarAdopsjonFormData>) => {
        setIsSubmitting(true);

        oppdaterUttaksplanInfo(mapMorFarAdopsjonFormToState(values));

        const submissionValues = mapMorFarAdopsjonFormToState(values);
        const barnAdopsjonsdato = isAdoptertBarn(barn) ? barn.adopsjonsdato : undefined;

        const startdato = finnStartdatoAdopsjon(
            values.startdatoAdopsjonValg!,
            values.annenStartdatoAdopsjon,
            dateToISOString(barnAdopsjonsdato),
            dateToISOString(ankomstdato),
            values.søkersFørsteDag,
        );
        const uttaksplan = lagUttaksplan({
            annenForelderErUfør: erMorUfør,
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
            tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer[getDekningsgradFromString(dekningsgrad)],
            uttaksplanSkjema: {
                fellesperiodeukerMor: submissionValues.fellesperiodeukerMor,
                startdatoPermisjon: startdato,
                antallDagerFellesperiodeFarMedmor: parseInt(submissionValues.antallDagerFellesperiode),
                antallUkerFellesperiodeFarMedmor: parseInt(submissionValues.antallUkerFellesperiode),
                harAnnenForelderSøktFP: submissionValues.harAnnenForelderSøktFP,
                morSinSisteUttaksdag: submissionValues.annenForeldersSisteDag,
                farSinFørsteUttaksdag: submissionValues.søkersFørsteDag,
            },
            bareFarMedmorHarRett: bareFarMedmorHarRett,
            termindato: undefined,
            harAktivitetskravIPeriodeUtenUttak: getHarAktivitetskravIPeriodeUtenUttak({
                erDeltUttak,
                morHarRett: !bareFarMedmorHarRett,
                søkerErAleneOmOmsorg,
            }),
            førsteUttaksdagNesteBarnsSak,
        });

        oppdaterUttaksplan(uttaksplan);

        oppdaterBarnOgLagreUttaksplandata({
            ...uttaksplanMetadata,
            antallUkerIUttaksplan: getAntallUker(tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80]),
        });

        return goToNextDefaultStep();
    };

    if (!shouldRender || !isAdoptertBarn(barn)) {
        return null;
    }

    const erSøkerMor = !erFarEllerMedmor;

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const harAnnenForelderRettPåForeldrepengerINorge = !!oppgittAnnenForelder?.harRettPåForeldrepengerINorge;
    const harAnnenForelderRett =
        !!oppgittAnnenForelder?.harRettPåForeldrepengerINorge || !!oppgittAnnenForelder?.harRettPåForeldrepengerIEØS;
    const fornavnAnnenForeldre = oppgittAnnenForelder?.fornavn;
    const erAnnenPartUfør = !!oppgittAnnenForelder?.erUfør;
    const navnAnnenPart = oppgittAnnenForelder
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn, false)
        : '';

    const erDeltUttak = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;

    const erMorUfør = erSøkerMor ? false : erAnnenPartUfør;

    const navnSøker = formaterNavn(fornavn, etternavn, false, mellomnavn);
    const navnMor = erSøkerMor ? navnSøker : navnAnnenPart;
    const navnFarMedmor = erSøkerMor ? navnAnnenPart : navnSøker;

    const erAdoptertIUtlandet = isAdoptertAnnetBarn(barn) ? barn.adoptertIUtlandet : false;
    const ankomstdato = isAdoptertAnnetBarn(barn) ? barn.ankomstdato : undefined;
    const latestDate =
        ankomstdato !== undefined && barn.adopsjonsdato !== undefined
            ? dateToISOString(findEldsteDato([ankomstdato, barn.adopsjonsdato])) // todo - sjekk logikk her
            : barn.adopsjonsdato;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );

    const valgtStønadskonto = tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80];
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
    );
    return (
        <VStack gap="5">
            <FordelingOversikt
                kontoer={valgtStønadskonto}
                erFarEllerMedmor={erFarEllerMedmor}
                navnFarMedmor={navnFarMedmor}
                navnMor={navnMor}
                erAdopsjon={erAdopsjon}
                erBarnetFødt={false}
                annenForeldrerHarRett={harAnnenForelderRett}
                antallBarn={barn.antallBarn}
                dekningsgrad={dekningsgrad}
                familiehendelsesdato={familiehendelsesdatoDate!}
                fordelingScenario={fordelingScenario}
            ></FordelingOversikt>
            <MorFarAdopsjonFormComponents.FormikWrapper
                initialValues={getInitialMorFarAdopsjonValues(uttaksplanInfo)}
                onSubmit={onSubmit}
                renderForm={({ values: formValues, setFieldValue }) => {
                    const visibility = morFarAdopsjonQuestionsConfig.getVisbility({
                        ...formValues,
                        harAnnenForelderRettPåForeldrepengerINorge,
                        erAleneOmOmsorg: søker.erAleneOmOmsorg,
                    } as MorFarAdopsjonQuestionsPayload);

                    const valgtStønadskonto = tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80];

                    const tilgjengeligeDager = valgtStønadskonto
                        ? getTilgjengeligeDager(valgtStønadskonto, false, Forelder.farMedmor)
                        : undefined;

                    return (
                        <MorFarAdopsjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block
                                padBottom="xl"
                                visible={visibility.isIncluded(MorFarAdopsjonFormField.harAnnenForelderSøktFP)}
                            >
                                <MorFarAdopsjonFormComponents.YesOrNoQuestion
                                    name={MorFarAdopsjonFormField.harAnnenForelderSøktFP}
                                    legend={intlUtils(intl, 'uttaksplaninfo.spørsmål.harAnnenForelderSøktFP.label', {
                                        navnAnnenForelder: fornavnAnnenForeldre,
                                    })}
                                />
                            </Block>
                            <Block visible={visibility.isIncluded(MorFarAdopsjonFormField.startdatoAdopsjonValg)}>
                                <StartdatoAdopsjon
                                    valgtStartdatoAdopsjon={formValues.startdatoAdopsjonValg}
                                    barn={barn}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isIncluded(MorFarAdopsjonFormField.annenForeldersSisteDag)}
                            >
                                <MorsSisteDagSpørsmål
                                    FormComponents={MorFarAdopsjonFormComponents}
                                    fieldName={MorFarAdopsjonFormField.annenForeldersSisteDag}
                                    navnMor={navnAnnenPart}
                                    familiehendelsesdato={familiehendelsesdato}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isIncluded(MorFarAdopsjonFormField.søkersFørsteDag)}
                            >
                                <FarMedmorsFørsteDag
                                    FormComponents={MorFarAdopsjonFormComponents}
                                    fieldName={MorFarAdopsjonFormField.søkersFørsteDag}
                                    familiehendelsesdato={familiehendelsesdatoDate!}
                                    setFieldValue={setFieldValue}
                                    morsSisteDag={ISOStringToDate(formValues.annenForeldersSisteDag)}
                                    navnMor={navnMor}
                                    termindato={undefined}
                                    situasjon={søkersituasjon.situasjon}
                                    morHarRettTilForeldrepengerIEØS={false}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={
                                    visibility.isAnswered(MorFarAdopsjonFormField.søkersFørsteDag) &&
                                    !dateIsSameOrAfter(
                                        ISOStringToDate(formValues.annenForeldersSisteDag),
                                        ISOStringToDate(formValues.søkersFørsteDag),
                                    ) &&
                                    formValues.harAnnenForelderSøktFP === YesOrNo.YES
                                }
                            >
                                {tilgjengeligeDager && (
                                    <AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål
                                        FormComponents={MorFarAdopsjonFormComponents}
                                        ukerFieldName={MorFarAdopsjonFormField.antallUkerFellesperiode}
                                        dagerFieldName={MorFarAdopsjonFormField.antallDagerFellesperiode}
                                        antallDager={formValues.antallDagerFellesperiode!}
                                        antallUker={formValues.antallUkerFellesperiode!}
                                        setFieldValue={setFieldValue}
                                        ukerMedFellesperiode={tilgjengeligeDager.dagerFelles / 5}
                                    />
                                )}
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={
                                    formValues.startdatoAdopsjonValg === AdopsjonStartdatoValg.ANNEN &&
                                    dayjs(latestDate).isBefore(
                                        dayjs(
                                            finnStartdatoAdopsjon(
                                                formValues.startdatoAdopsjonValg,
                                                formValues.annenStartdatoAdopsjon,
                                                dateToISOString(barn.adopsjonsdato),
                                                dateToISOString(ankomstdato),
                                                formValues.søkersFørsteDag,
                                            ),
                                        ),
                                        'day',
                                    ) &&
                                    !isAdoptertStebarn(barn) &&
                                    !erDeltUttak
                                }
                            >
                                <GuidePanel>
                                    <FormattedMessage
                                        id={
                                            erAdoptertIUtlandet === false
                                                ? 'uttaksplaninfo.info.ikkeAdoptertIUtlandet'
                                                : 'uttaksplaninfo.info.adoptertIUtlandet'
                                        }
                                    />
                                </GuidePanel>
                            </Block>
                            <Block
                                visible={søker.erAleneOmOmsorg === false && harAnnenForelderRettPåForeldrepengerINorge}
                            >
                                <Block
                                    padBottom="xl"
                                    visible={visibility.isIncluded(MorFarAdopsjonFormField.fellesperiodeukerMor)}
                                >
                                    <FordelingFellesperiodeSpørsmål
                                        setFieldValue={setFieldValue}
                                        valgtStønadskonto={valgtStønadskonto}
                                        valgtFellesperiodeukerMor={formValues.fellesperiodeukerMor}
                                        mor={navnMor}
                                        farMedmor={navnFarMedmor}
                                        annenForelderErFarEllerMedmor={!erSøkerMor}
                                    />
                                </Block>
                            </Block>
                            <Block>
                                <StepButtons
                                    isNexButtonVisible={visibility.areAllQuestionsAnswered()}
                                    goToPreviousStep={goToPreviousDefaultStep}
                                    isDisabledAndLoading={isSubmitting}
                                />
                            </Block>
                        </MorFarAdopsjonFormComponents.Form>
                    );
                }}
            />
        </VStack>
    );
};

export default MorFarAdopsjon;
