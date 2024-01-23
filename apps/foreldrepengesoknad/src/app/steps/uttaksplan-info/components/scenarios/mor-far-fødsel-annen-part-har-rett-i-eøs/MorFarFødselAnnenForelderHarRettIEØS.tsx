import { FunctionComponent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { GuidePanel } from '@navikt/ds-react';
import {
    Block,
    ISOStringToDate,
    Tidsperioden,
    Uttaksdagen,
    formaterNavn,
    getFlerbarnsuker,
    hasValue,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    uttaksConstants,
} from '@navikt/fp-common';
import Person from '@navikt/fp-common/src/common/types/Person';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';
import StartdatoPermisjonMor from '../mor-fodsel/StartdatoPermisjonMor';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import {
    MorFarFødselAnnenForelderHarRettIEØSFormComponents,
    MorFarFødselAnnenForelderHarRettIEØSFormData,
    MorFarFødselAnnenForelderHarRettIEØSFormField,
} from './morFarFødselAnnenForelderHarRettIEØSFormConfig';
import {
    MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload,
    morFarFødselAnnenForelderHarRettIEØSQuestionsConfig,
} from './morFarFødselAnnenForelderHarRettIEØSQuestionsConfig';
import {
    getInitialMorFarFødselAnnenForelderHarRettIEØSValues,
    mapMorFarFødselAnnenForelderHarRettIEØSFormToState,
} from './morFarFødselAnnenForelderHarRettIEØSUtils';

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

    const fødselsdato = getFødselsdato(barn);
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
            tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer[getDekningsgradFromString(dekningsgrad)],
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
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn, true)
        : '';

    const navnSøker = formaterNavn(person.fornavn, person.etternavn, true, person.mellomnavn);
    const navnMor = erSøkerMor ? navnSøker : navnAnnenPart;
    const navnFarMedmor = erSøkerMor ? navnAnnenPart : navnSøker;
    const antallBarn = barn.antallBarn;
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );

    const visInfoOmPrematuruker =
        !erFarEllerMedmor && skalViseInfoOmPrematuruker(fødselsdato, termindato, søkersituasjon.situasjon);
    const ekstraDagerGrunnetPrematurFødsel = visInfoOmPrematuruker
        ? Tidsperioden({ fom: fødselsdato!, tom: termindato! }).getAntallUttaksdager() - 1
        : undefined;
    const førsteUttaksdag = Uttaksdagen(ISOStringToDate(familiehendelsesdato)!).denneEllerNeste();
    const defaultPermisjonStartdato = erFarEllerMedmor
        ? førsteUttaksdag
        : Uttaksdagen(førsteUttaksdag).trekkFra(uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5);

    return (
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
                        <Block padBottom="xl" visible={visInfoOmPrematuruker === true}>
                            <GuidePanel>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.informasjonPrematuruker"
                                    values={{
                                        antallprematuruker: Math.floor(ekstraDagerGrunnetPrematurFødsel! / 5),
                                        antallprematurdager: ekstraDagerGrunnetPrematurFødsel! % 5,
                                    }}
                                />
                            </GuidePanel>
                        </Block>
                        <Block
                            visible={
                                !erFarEllerMedmor &&
                                visibility.isIncluded(MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato)
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
                                visibility.isIncluded(MorFarFødselAnnenForelderHarRettIEØSFormField.permisjonStartdato)
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
                        <Block
                            padBottom="xl"
                            visible={
                                antallBarn > 1 &&
                                (formValues.permisjonStartdato !== undefined ||
                                    formValues.skalIkkeHaUttakFørTermin === true)
                            }
                        >
                            <GuidePanel>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.flerbarnsInformasjon.annenForelderHarRettIEØS"
                                    values={{
                                        uker: getFlerbarnsuker(dekningsgrad, antallBarn),
                                        navnFar: navnFarMedmor,
                                        navnMor: navnMor,
                                    }}
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
                    </MorFarFødselAnnenForelderHarRettIEØSFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFarFødselAnnenForelderHarRettIEØS;
