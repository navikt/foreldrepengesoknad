import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import actionCreator from 'app/context/action/actionCreator';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { formaterNavn } from 'app/utils/personUtils';
import { getFlerbarnsuker } from '../../../utils/uttaksplanHarForMangeFlerbarnsuker';
import { MorFødselFormComponents, MorFødselFormData, MorFødselFormField } from './morFødselFormConfig';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { Tidsperioden } from '../../../utils/Tidsperioden';
import { getInitialMorFødselValues, mapMorFødselFormToState } from './morFødselUtils';
import StartdatoPermisjonMor from './StartdatoPermisjonMor';
import FordelingFellesperiodeSpørsmål from '../../fordelingFellesperiode/FordelingFellesperiodeSpørsmål';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import uttaksConstants from 'app/constants';
import { Forelder } from 'app/types/Forelder';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import SøknadRoutes from 'app/routes/routes';
import { MorFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { MorFødselQuestionsPayload, morFødselQuestionsConfig } from './morFødselQuestionsConfig';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { getHarAktivitetskravIPeriodeUtenUttak } from 'app/utils/uttaksplan/uttaksplanUtils';
import { leggTilAnnenPartsPerioderISøkerenesUttaksplan } from 'app/steps/uttaksplan-info/utils/leggTilAnnenPartsPerioderISøkerensUttaksplan';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { Button, GuidePanel } from '@navikt/ds-react';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakFar: EksisterendeSak | undefined;
}

const MorFødsel: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakFar,
}) => {
    const intl = useIntl();
    const { state } = useForeldrepengesøknadContext();
    const {
        annenForelder,
        søkersituasjon,
        barn,
        søker: { erAleneOmOmsorg },
        dekningsgrad,
        erEndringssøknad,
    } = useSøknad();
    const {
        person: { fornavn, mellomnavn, etternavn },
    } = useSøkerinfo();
    const lagretUttaksplanInfo = useUttaksplanInfo<MorFødselUttaksplanInfo>();

    const antallBarn = barn.antallBarn;

    const fødselsdato = getFødselsdato(barn);
    const termindato = getTermindato(barn);
    const visInfoOmPrematuruker = skalViseInfoOmPrematuruker(fødselsdato, termindato, søkersituasjon.situasjon);
    const ekstraDagerGrunnetPrematurFødsel = visInfoOmPrematuruker
        ? Tidsperioden({ fom: fødselsdato!, tom: termindato! }).getAntallUttaksdager() - 1
        : undefined;
    const førsteUttaksdagNesteBarnsSak =
        state.barnFraNesteSak !== undefined ? state.barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erMorUfør = !!oppgittAnnenForelder?.erUfør;
    const harRettPåForeldrepengerINorge = !!oppgittAnnenForelder?.harRettPåForeldrepengerINorge;
    const navnFarMedmor = oppgittAnnenForelder
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn, true)
        : '';

    const navnMor = formaterNavn(fornavn, etternavn, true, mellomnavn);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const førsteUttaksdag = Uttaksdagen(ISOStringToDate(familiehendelsesdato)!).denneEllerNeste();
    const defaultPermisjonStartdato = Uttaksdagen(førsteUttaksdag).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5
    );
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);

    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepengerINorge : false;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO
    );
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);

    const onValidSubmitHandler = (values: Partial<MorFødselFormData>) => {
        const submissionValues = mapMorFødselFormToState(values);
        const uttaksplanforslag = lagUttaksplan({
            annenForelderErUfør: erMorUfør,
            erDeltUttak,
            erEndringssøknad,
            erEnkelEndringssøknad: erEndringssøknad,
            familiehendelsesdato: familiehendelsesdatoDate!,
            førsteUttaksdagEtterSeksUker: Uttaksdagen(Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()).leggTil(
                30
            ),
            situasjon: erFødsel ? 'fødsel' : 'adopsjon',
            søkerErFarEllerMedmor: erFarEllerMedmor,
            søkerHarMidlertidigOmsorg: false,
            tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer[getDekningsgradFromString(values.dekningsgrad)],
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
        const antallUker = getAntallUker(tilgjengeligeStønadskontoer[values.dekningsgrad! === '100' ? 100 : 80]);
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
                førsteUttaksdagNesteBarnsSak
            );
        } else if (eksisterendeSakFar) {
            uttaksplanMedAnnenPart = eksisterendeSakFar.uttaksplan;
        } else {
            uttaksplanMedAnnenPart = uttaksplanforslag;
        }
        return [
            actionCreator.setAntallUkerIUttaksplan(antallUker),
            actionCreator.setUttaksplanInfo(submissionValues),
            actionCreator.setDekningsgrad(getDekningsgradFromString(values.dekningsgrad)),
            actionCreator.lagUttaksplanforslag(uttaksplanMedAnnenPart),
        ];
    };
    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.UTTAKSPLAN,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );

    return (
        <MorFødselFormComponents.FormikWrapper
            initialValues={getInitialMorFødselValues(defaultPermisjonStartdato, lagretUttaksplanInfo, dekningsgrad)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = morFødselQuestionsConfig.getVisbility({
                    ...formValues,
                    harRettPåForeldrepengerINorge,
                    erAleneOmOmsorg,
                } as MorFødselQuestionsPayload);

                const valgtStønadskonto = tilgjengeligeStønadskontoer[formValues.dekningsgrad === '100' ? 100 : 80];

                return (
                    <MorFødselFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                        <Block padBottom="l">
                            <DekningsgradSpørsmål
                                FormKomponent={MorFødselFormComponents}
                                dekningsgradFeltNavn={MorFødselFormField.dekningsgrad}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                erDeltUttak={erDeltUttak}
                            />
                        </Block>
                        <Block padBottom="xl" visible={visibility.isAnswered(MorFødselFormField.dekningsgrad)}>
                            {valgtStønadskonto && (
                                <TilgjengeligeDagerGraf
                                    erDeltUttak={erDeltUttak}
                                    erFarEllerMedmor={false}
                                    navnFarMedmor={navnFarMedmor}
                                    navnMor={navnMor}
                                    tilgjengeligeDager={getTilgjengeligeDager(
                                        valgtStønadskonto,
                                        false,
                                        Forelder.farMedmor
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
                        <Block visible={visibility.isAnswered(MorFødselFormField.dekningsgrad)}>
                            <StartdatoPermisjonMor
                                permisjonStartdato={formValues.permisjonStartdato!}
                                skalIkkeHaUttakFørTermin={formValues.skalIkkeHaUttakFørTermin!}
                            />
                        </Block>
                        <Block
                            visible={
                                erAleneOmOmsorg === false &&
                                harRettPåForeldrepengerINorge &&
                                visibility.isAnswered(MorFødselFormField.dekningsgrad)
                            }
                        >
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
                                            uker: getFlerbarnsuker(formValues.dekningsgrad!, antallBarn),
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
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                {intlUtils(intl, 'søknad.gåVidere')}
                            </Button>
                        </Block>
                    </MorFødselFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFødsel;
