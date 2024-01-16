import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, GuidePanel, VStack } from '@navikt/ds-react';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { notEmpty } from '@navikt/fp-validation';
import Person from '@navikt/fp-common/src/common/types/Person';
import {
    Block,
    EksisterendeSak,
    ISOStringToDate,
    StepButtonWrapper,
    Tidsperioden,
    Uttaksdagen,
    formaterNavn,
    getFlerbarnsuker,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    uttaksConstants,
} from '@navikt/fp-common';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { MorFødselFormComponents, MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';
import { getInitialMorFødselValues, mapMorFødselFormToState } from './morFødselUtils';
import StartdatoPermisjonMor from './StartdatoPermisjonMor';
import FordelingFellesperiodeSpørsmål from '../../fordelingFellesperiode/FordelingFellesperiodeSpørsmål';
import { MorFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { MorFødselQuestionsPayload, morFødselQuestionsConfig } from './morFødselQuestionsConfig';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';
import { leggTilAnnenPartsPerioderISøkerenesUttaksplan } from 'app/steps/uttaksplan-info/utils/leggTilAnnenPartsPerioderISøkerensUttaksplan';
import { getPreviousStepHref } from 'app/steps/stepsConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import BackButton from 'app/steps/BackButton';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingMorFødsel } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakFar: EksisterendeSak | undefined;
    erEndringssøknad: boolean;
    person: Person;
    mellomlagreSøknadOgNaviger: () => void;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const MorFødsel: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakFar,
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
    const uttaksplanInfo = useContextGetData(ContextDataType.UTTAKSPLAN_INFO) as MorFødselUttaksplanInfo;

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const antallBarn = barn.antallBarn;
    const { dekningsgrad } = periodeMedForeldrepenger;

    const fødselsdato = getFødselsdato(barn);
    const termindato = getTermindato(barn);
    const visInfoOmPrematuruker = skalViseInfoOmPrematuruker(fødselsdato, termindato, søkersituasjon.situasjon);
    const ekstraDagerGrunnetPrematurFødsel = visInfoOmPrematuruker
        ? Tidsperioden({ fom: fødselsdato!, tom: termindato! }).getAntallUttaksdager() - 1
        : undefined;
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erMorUfør = !!oppgittAnnenForelder?.erUfør;
    const harRettPåForeldrepengerINorge = !!oppgittAnnenForelder?.harRettPåForeldrepengerINorge;
    const navnFarMedmor = oppgittAnnenForelder
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn, false)
        : '';

    const navnMor = formaterNavn(person.fornavn, person.etternavn, false, person.mellomnavn);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const førsteUttaksdag = Uttaksdagen(ISOStringToDate(familiehendelsesdato)!).denneEllerNeste();
    const defaultPermisjonStartdato = Uttaksdagen(førsteUttaksdag).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);

    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepengerINorge : false;
    const annenForeldrerHarRettiNorgeEllerEØS =
        isAnnenForelderOppgitt(annenForelder) &&
        !!(annenForelder.harRettPåForeldrepengerINorge || annenForelder.harRettPåForeldrepengerIEØS);
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );

    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);

    const onSubmit = (values: Partial<MorFødselFormData>) => {
        setIsSubmitting(true);

        const submissionValues = mapMorFødselFormToState(values);

        const uttaksplanforslag = lagUttaksplan({
            annenForelderErUfør: erMorUfør,
            erDeltUttak,
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
                fellesperiodeukerMor: submissionValues.fellesperiodeukerMor,
                startdatoPermisjon: submissionValues.skalIkkeHaUttakFørTermin
                    ? undefined
                    : submissionValues.permisjonStartdato,
                skalIkkeHaUttakFørTermin: submissionValues.skalIkkeHaUttakFørTermin,
            },
            bareFarMedmorHarRett: false,
            termindato,
            harAktivitetskravIPeriodeUtenUttak: false,
            førsteUttaksdagNesteBarnsSak,
        });
        const harAktivitetskravIPeriodeUtenUttak = getHarAktivitetskravIPeriodeUtenUttak({
            erDeltUttak,
            morHarRett: true,
            søkerErAleneOmOmsorg: false,
        });

        let uttaksplanMedAnnenPart;

        if (eksisterendeSakFar && uttaksplanforslag.length > 0) {
            uttaksplanMedAnnenPart = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
                eksisterendeSakFar.uttaksplan,
                uttaksplanforslag,
                familiehendelsesdatoDate!,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                false,
                false,
                førsteUttaksdagNesteBarnsSak,
            );
        } else if (eksisterendeSakFar) {
            uttaksplanMedAnnenPart = eksisterendeSakFar.uttaksplan;
        } else {
            uttaksplanMedAnnenPart = uttaksplanforslag;
        }

        oppdaterUttaksplanInfo(submissionValues);

        oppdaterUttaksplan(uttaksplanMedAnnenPart);

        oppdaterBarnOgLagreUttaksplandata({
            ...uttaksplanMetadata,
            antallUkerIUttaksplan: getAntallUker(tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80]),
        });

        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <MorFødselFormComponents.FormikWrapper
            initialValues={getInitialMorFødselValues(defaultPermisjonStartdato, uttaksplanInfo)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = morFødselQuestionsConfig.getVisbility({
                    ...formValues,
                    harRettPåForeldrepengerINorge,
                    erAleneOmOmsorg: søker.erAleneOmOmsorg,
                } as MorFødselQuestionsPayload);

                const valgtStønadskonto = tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80];
                const fordelingScenario = getFordelingMorFødsel(valgtStønadskonto, intl);
                return (
                    <VStack gap="5">
                        <FordelingOversikt
                            kontoer={valgtStønadskonto}
                            erFarEllerMedmor={false}
                            navnFarMedmor={navnFarMedmor}
                            navnMor={navnMor}
                            erAdopsjon={erAdopsjon}
                            annenForeldrerHarRett={annenForeldrerHarRettiNorgeEllerEØS}
                            fordelingScenario={fordelingScenario}
                        ></FordelingOversikt>
                        <MorFødselFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            {/* <Block padBottom="xl">
                                {valgtStønadskonto && (
                                    <TilgjengeligeDagerGraf
                                        erDeltUttak={erDeltUttak}
                                        erFarEllerMedmor={false}
                                        navnFarMedmor={navnFarMedmor}
                                        navnMor={navnMor}
                                        tilgjengeligeDager={getTilgjengeligeDager(
                                            valgtStønadskonto,
                                            false,
                                            Forelder.farMedmor,
                                        )}
                                    />
                                )}
                            </Block> */}
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
                            <Block>
                                <StartdatoPermisjonMor
                                    permisjonStartdato={formValues.permisjonStartdato!}
                                    skalIkkeHaUttakFørTermin={formValues.skalIkkeHaUttakFørTermin!}
                                    termindato={termindato}
                                    barn={barn}
                                />
                            </Block>
                            <Block visible={søker.erAleneOmOmsorg === false && harRettPåForeldrepengerINorge}>
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
                                            id="uttaksplaninfo.veileder.flerbarnsInformasjon"
                                            values={{
                                                uker: getFlerbarnsuker(dekningsgrad, antallBarn),
                                                navnFar: navnFarMedmor,
                                                navnMor: navnMor,
                                            }}
                                        />
                                    </GuidePanel>
                                </Block>
                                <Block
                                    padBottom="xl"
                                    visible={visibility.isVisible(MorFødselFormField.fellesperiodeukerMor)}
                                >
                                    <FordelingFellesperiodeSpørsmål
                                        setFieldValue={setFieldValue}
                                        valgtStønadskonto={valgtStønadskonto}
                                        valgtFellesperiodeukerMor={formValues.fellesperiodeukerMor}
                                        mor={navnMor}
                                        farMedmor={navnFarMedmor}
                                        annenForelderErFarEllerMedmor={!erFarEllerMedmor}
                                    />
                                </Block>
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
                        </MorFødselFormComponents.Form>
                    </VStack>
                );
            }}
        />
    );
};

export default MorFødsel;
