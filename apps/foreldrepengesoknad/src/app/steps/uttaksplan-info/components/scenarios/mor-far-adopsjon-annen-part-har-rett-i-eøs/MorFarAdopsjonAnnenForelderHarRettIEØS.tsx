import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { GuidePanel, VStack } from '@navikt/ds-react';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { notEmpty } from '@navikt/fp-validation';
import {
    Block,
    Dekningsgrad,
    ISOStringToDate,
    Uttaksdagen,
    formaterNavn,
    isAdoptertAnnetBarn,
    isAdoptertBarn,
    isAdoptertStebarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { StepButtons } from '@navikt/fp-ui';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { findEldsteDato } from 'app/utils/dateUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import StartdatoAdopsjon, { finnStartdatoAdopsjon } from '../mor-far-adopsjon/StartdatoAdopsjon';
import AdopsjonStartdatoValg from '../mor-far-adopsjon/adopsjonStartdatoValg';
import {
    MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
} from './morFarAdopsjonAnnenForelderHarRettIEØSFormConfig';
import {
    MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload,
    morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig,
} from './morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig';
import {
    getInitialMorFarAdopsjonAnnenForelderHarRettIEØSValues,
    mapMorFarAdopsjonAnnenForelderHarRettIEØSFormToState,
} from './morFarAdopsjonAnnenForelderHarRettIEØSUtils';
import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import { Søker } from '@navikt/fp-types';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    søker: Søker;
    goToNextDefaultStep: () => Promise<void>;
    goToPreviousDefaultStep: () => Promise<void>;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const MorFarAdopsjonAnnenForelderHarRettIEØS: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
    erEndringssøknad,
    søker,
    goToNextDefaultStep,
    goToPreviousDefaultStep,
    oppdaterBarnOgLagreUttaksplandata,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const intl = useIntl();
    const søkerData = notEmpty(useContextGetData(ContextDataType.SØKER_DATA));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const periodeMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    // TODO (TOR) fjern as
    const uttaksplanInfo = useContextGetData(
        ContextDataType.UTTAKSPLAN_INFO,
    ) as MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo;

    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const erDeltUttak = true;
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

    const { dekningsgrad } = periodeMedForeldrepenger;
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );
    const valgtStønadskonto = tilgjengeligeStønadskontoer[getDekningsgradFromString(dekningsgrad)];

    const onSubmit = (values: Partial<MorFarAdopsjonAnnenForelderHarRettIEØSFormData>) => {
        setIsSubmitting(true);

        oppdaterUttaksplanInfo(mapMorFarAdopsjonAnnenForelderHarRettIEØSFormToState(values));

        const barnAdopsjonsdato = isAdoptertBarn(barn) ? barn.adopsjonsdato : undefined;
        const startdato = finnStartdatoAdopsjon(
            values.startdatoAdopsjonValg!,
            values.annenStartdatoAdopsjon,
            dateToISOString(barnAdopsjonsdato),
            dateToISOString(ankomstdato),
        );

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
                startdatoPermisjon: startdato,
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
            antallUkerIUttaksplan: getAntallUker(tilgjengeligeStønadskontoer[dekningsgrad! === '100' ? 100 : 80]),
        });

        return goToNextDefaultStep();
    };

    if (!erAdopsjon || !isAdoptertBarn(barn)) {
        return null;
    }

    const erSøkerMor = !erFarEllerMedmor;
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const navnAnnenPart = oppgittAnnenForelder
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn, false)
        : '';

    const navnSøker = formaterNavn(søker.fornavn, søker.etternavn, false, søker.mellomnavn);
    const navnMor = erSøkerMor ? navnSøker : navnAnnenPart;
    const navnFarMedmor = erSøkerMor ? navnAnnenPart : navnSøker;
    const erAdoptertIUtlandet = isAdoptertAnnetBarn(barn) ? barn.adoptertIUtlandet : false;
    const ankomstdato = isAdoptertAnnetBarn(barn) ? barn.ankomstdato : undefined;
    const latestDate =
        ankomstdato !== undefined && barn.adopsjonsdato !== undefined
            ? dateToISOString(findEldsteDato([ankomstdato, barn.adopsjonsdato]))
            : barn.adopsjonsdato;
    const minsterett =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? tilgjengeligeStønadskontoer100DTO.minsteretter
            : tilgjengeligeStønadskontoer80DTO.minsteretter;

    const fordelingScenario = getFordelingFraKontoer(
        valgtStønadskonto,
        minsterett,
        søkersituasjon,
        barn,
        søkerData.erAleneOmOmsorg,
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
            <MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents.FormikWrapper
                initialValues={getInitialMorFarAdopsjonAnnenForelderHarRettIEØSValues(uttaksplanInfo)}
                onSubmit={onSubmit}
                renderForm={({ values: formValues }) => {
                    const visibility = morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig.getVisbility({
                        ...formValues,
                        erFarEllerMedmor,
                    } as MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload);

                    return (
                        <MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                        >
                            <Block
                                visible={visibility.isIncluded(
                                    MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg,
                                )}
                            >
                                <StartdatoAdopsjon
                                    valgtStartdatoAdopsjon={formValues.startdatoAdopsjonValg}
                                    barn={barn}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={
                                    erAdopsjon &&
                                    isAdoptertBarn(barn) &&
                                    formValues.startdatoAdopsjonValg === AdopsjonStartdatoValg.ANNEN &&
                                    dayjs(latestDate).isBefore(
                                        dayjs(
                                            finnStartdatoAdopsjon(
                                                formValues.startdatoAdopsjonValg!,
                                                undefined,
                                                dateToISOString(barn.adopsjonsdato),
                                                dateToISOString(ankomstdato),
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
                            <Block>
                                <StepButtons
                                    isNexButtonVisible={visibility.areAllQuestionsAnswered()}
                                    goToPreviousStep={goToPreviousDefaultStep}
                                    isDisabledAndLoading={isSubmitting}
                                />
                            </Block>
                        </MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents.Form>
                    );
                }}
            />
        </VStack>
    );
};

export default MorFarAdopsjonAnnenForelderHarRettIEØS;
