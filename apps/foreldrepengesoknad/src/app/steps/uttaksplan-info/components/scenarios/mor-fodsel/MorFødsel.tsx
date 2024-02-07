import { FunctionComponent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { GuidePanel } from '@navikt/ds-react';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { notEmpty } from '@navikt/fp-validation';
import Person from '@navikt/fp-common/src/common/types/Person';
import {
    Block,
    EksisterendeSak,
    Forelder,
    ISOStringToDate,
    Tidsperioden,
    Uttaksdagen,
    formaterNavn,
    getFlerbarnsuker,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    uttaksConstants,
} from '@navikt/fp-common';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { MorFødselFormComponents, MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
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
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { StepButtons } from '@navikt/fp-ui';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakFar: EksisterendeSak | undefined;
    erEndringssøknad: boolean;
    person: Person;
    goToNextDefaultStep: () => Promise<void>;
    goToPreviousDefaultStep: () => Promise<void>;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const MorFødsel: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakFar,
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
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    // TODO (TOR) fjern as
    const uttaksplanInfo = useContextGetData(ContextDataType.UTTAKSPLAN_INFO) as MorFødselUttaksplanInfo;

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
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn, true)
        : '';

    const navnMor = formaterNavn(person.fornavn, person.etternavn, true, person.mellomnavn);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const førsteUttaksdag = Uttaksdagen(ISOStringToDate(familiehendelsesdato)!).denneEllerNeste();
    const defaultPermisjonStartdato = Uttaksdagen(førsteUttaksdag).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);

    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepengerINorge : false;

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

        return goToNextDefaultStep();
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

                return (
                    <MorFødselFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                        <Block padBottom="xl">
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
                        </Block>
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
                            <StepButtons
                                isNexButtonVisible={visibility.areAllQuestionsAnswered()}
                                goToPreviousStep={goToPreviousDefaultStep}
                                isDisabledAndLoading={isSubmitting}
                            />
                        </Block>
                    </MorFødselFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFødsel;
