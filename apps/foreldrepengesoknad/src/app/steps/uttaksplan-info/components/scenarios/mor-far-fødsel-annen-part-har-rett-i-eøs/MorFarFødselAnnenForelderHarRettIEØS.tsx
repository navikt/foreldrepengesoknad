import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, GuidePanel } from '@navikt/ds-react';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { notEmpty } from '@navikt/fp-validation';
import Person from '@navikt/fp-common/src/common/types/Person';
import {
    Block,
    ISOStringToDate,
    StepButtonWrapper,
    Tidsperioden,
    Uttaksdagen,
    formaterNavn,
    getFlerbarnsuker,
    hasValue,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    uttaksConstants,
} from '@navikt/fp-common';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import SøknadRoutes from 'app/routes/routes';
import { MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import {
    morFarFødselAnnenForelderHarRettIEØSQuestionsConfig,
    MorFarFødselAnnenForelderHarRettIEØSQuestionsPayload,
} from './morFarFødselAnnenForelderHarRettIEØSQuestionsConfig';
import {
    MorFarFødselAnnenForelderHarRettIEØSFormComponents as MorFarFødselAnnenForelderHarRettIEØSFormComponents,
    MorFarFødselAnnenForelderHarRettIEØSFormData,
    MorFarFødselAnnenForelderHarRettIEØSFormField,
} from './morFarFødselAnnenForelderHarRettIEØSFormConfig';
import {
    getInitialMorFarFødselAnnenForelderHarRettIEØSValues,
    mapMorFarFødselAnnenForelderHarRettIEØSFormToState,
} from './morFarFødselAnnenForelderHarRettIEØSUtils';
import { skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';
import StartdatoPermisjonMor from '../mor-fodsel/StartdatoPermisjonMor';
import { getPreviousStepHref } from 'app/steps/stepsConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import BackButton from 'app/steps/BackButton';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    person: Person;
    mellomlagreSøknadOgNaviger: () => void;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const MorFarFødselAnnenForelderHarRettIEØS: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
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
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    // TODO (TOR) fjern as
    const uttaksplanInfo = useContextGetData(
        ContextDataType.UTTAKSPLAN_INFO,
    ) as MorFarFødselAnnenForelderHarRettIEØSUttaksplanInfo;

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
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
            tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer[getDekningsgradFromString(values.dekningsgrad)],
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
            dekningsgrad: getDekningsgradFromString(values.dekningsgrad),
            antallUkerIUttaksplan: getAntallUker(
                tilgjengeligeStønadskontoer[values.dekningsgrad! === '100' ? 100 : 80],
            ),
        });

        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN);

        mellomlagreSøknadOgNaviger();
    };

    if (!shouldRender) {
        return null;
    }

    const erSøkerMor = !erFarEllerMedmor;
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;

    const navnAnnenPart = oppgittAnnenForelder
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn, true)
        : '';

    const erDeltUttakINorge = false;

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
                uttaksplanMetadata?.dekningsgrad,
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
                            padBottom="xl"
                            visible={visibility.isIncluded(MorFarFødselAnnenForelderHarRettIEØSFormField.dekningsgrad)}
                        >
                            <DekningsgradSpørsmål
                                FormKomponent={MorFarFødselAnnenForelderHarRettIEØSFormComponents}
                                dekningsgradFeltNavn={MorFarFødselAnnenForelderHarRettIEØSFormField.dekningsgrad}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                erDeltUttak={erDeltUttakINorge}
                            />
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
                                visibility.isAnswered(MorFarFødselAnnenForelderHarRettIEØSFormField.dekningsgrad) &&
                                antallBarn > 1 &&
                                (formValues.permisjonStartdato !== undefined ||
                                    formValues.skalIkkeHaUttakFørTermin === true)
                            }
                        >
                            <GuidePanel>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.flerbarnsInformasjon.annenForelderHarRettIEØS"
                                    values={{
                                        uker: getFlerbarnsuker(formValues.dekningsgrad!, antallBarn),
                                        navnFar: navnFarMedmor,
                                        navnMor: navnMor,
                                    }}
                                />
                            </GuidePanel>
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
                    </MorFarFødselAnnenForelderHarRettIEØSFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFarFødselAnnenForelderHarRettIEØS;
