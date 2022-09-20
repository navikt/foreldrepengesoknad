import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { Block, intlUtils } from '@navikt/fp-common';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import useSøknad from 'app/utils/hooks/useSøknad';
import { formaterNavn } from 'app/utils/personUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import VeilederNormal from 'app/assets/VeilederNormal';
import { getFlerbarnsuker } from 'app/steps/uttaksplan-info/utils/uttaksplanHarForMangeFlerbarnsuker';
import { isAdoptertAnnetBarn, isAdoptertBarn, isAdoptertStebarn } from 'app/context/types/Barn';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { findEldsteDato, ISOStringToDate } from 'app/utils/dateUtils';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import { MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { getHarAktivitetskravIPeriodeUtenUttak } from 'app/utils/uttaksplan/uttaksplanUtils';
import StartdatoAdopsjon, { finnStartdatoAdopsjon } from '../mor-far-adopsjon/StartdatoAdopsjon';
import { morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig } from './morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig';
import {
    MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormData,
    MorFarAdopsjonAnnenForelderHarRettIEØSFormField,
} from './morFarAdopsjonAnnenForelderHarRettIEØSFormConfig';
import {
    getInitialMorFarAdopsjonAnnenForelderHarRettIEØSValues,
    mapMorFarAdopsjonAnnenForelderHarRettIEØSFormToState,
} from './morFarAdopsjonAnnenForelderHarRettIEØSUtils';
import AdopsjonStartdatoValg from '../mor-far-adopsjon/adopsjonStartdatoValg';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const MorFarAdopsjonAnnenForelderHarRettIEØS: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
}) => {
    const intl = useIntl();
    const {
        søkersituasjon,
        annenForelder,
        barn,
        søker: { erAleneOmOmsorg },
        dekningsgrad,
        erEndringssøknad,
    } = useSøknad();
    const {
        person: { fornavn, mellomnavn, etternavn },
    } = useSøkerinfo();
    const lagretUttaksplanInfo = useUttaksplanInfo<MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo>();
    const erDeltUttak = true; //TODO: Er dette riktig?
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const søkerErAleneOmOmsorg = !!erAleneOmOmsorg;
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

    const shouldRender =
        erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelder.kanIkkeOppgis || søkerErAleneOmOmsorg);

    const onValidSubmitHandler = (values: Partial<MorFarAdopsjonAnnenForelderHarRettIEØSFormData>) => {
        const submissionValues = mapMorFarAdopsjonAnnenForelderHarRettIEØSFormToState(values);
        const barnAdopsjonsdato = isAdoptertBarn(barn) ? barn.adopsjonsdato : undefined;
        const antallUker = getAntallUker(tilgjengeligeStønadskontoer[values.dekningsgrad!]);

        const startdato = finnStartdatoAdopsjon(
            values.startdatoAdopsjonValg!,
            undefined,
            dateToISOString(barnAdopsjonsdato),
            dateToISOString(ankomstdato),
            values.søkersFørsteDag
        );

        return [
            actionCreator.setAntallUkerIUttaksplan(antallUker),
            actionCreator.setUttaksplanInfo(submissionValues),
            actionCreator.setDekningsgrad(getDekningsgradFromString(values.dekningsgrad)),
            actionCreator.lagUttaksplanforslag(
                lagUttaksplan({
                    annenForelderErUfør: erMorUfør,
                    erDeltUttak,
                    erEndringssøknad,
                    erEnkelEndringssøknad: erEndringssøknad,
                    familiehendelsesdato: familiehendelsesdatoDate!,
                    førsteUttaksdagEtterSeksUker: Uttaksdagen(
                        Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()
                    ).leggTil(30),
                    situasjon: søkersituasjon.situasjon,
                    søkerErFarEllerMedmor: erFarEllerMedmor,
                    søkerHarMidlertidigOmsorg: false,
                    tilgjengeligeStønadskontoer:
                        tilgjengeligeStønadskontoer[getDekningsgradFromString(values.dekningsgrad)],
                    uttaksplanSkjema: {
                        startdatoPermisjon: startdato,
                        farSinFørsteUttaksdag: submissionValues.søkersFørsteDag,
                    },
                    bareFarMedmorHarRett: bareFarMedmorHarRett,
                    termindato: undefined,
                    harAktivitetskravIPeriodeUtenUttak: getHarAktivitetskravIPeriodeUtenUttak({
                        erDeltUttak,
                        morHarRett: !bareFarMedmorHarRett,
                        søkerErAleneOmOmsorg,
                    }),
                })
            ),
        ];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.UTTAKSPLAN,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );

    if (!shouldRender || !isAdoptertBarn(barn)) {
        return null;
    }

    const erSøkerMor = !erFarEllerMedmor;

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const harAnnenForeldreRettPåForeldrepengerINorge = !!oppgittAnnenForelder?.harRettPåForeldrepengerINorge;
    const erAnnenPartUfør = !!oppgittAnnenForelder?.erUfør;
    const navnAnnenPart = oppgittAnnenForelder
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn)
        : '';

    const erDeltUttakINorge = false;

    const erMorUfør = erSøkerMor ? false : erAnnenPartUfør;

    const navnSøker = formaterNavn(fornavn, etternavn, mellomnavn);
    const navnMor = erSøkerMor ? navnSøker : navnAnnenPart;
    const navnFarMedmor = erSøkerMor ? navnAnnenPart : navnSøker;

    const erAdoptertIUtlandet = isAdoptertAnnetBarn(barn) ? barn.adoptertIUtlandet : false;
    const ankomstdato = isAdoptertAnnetBarn(barn) ? barn.ankomstdato : undefined;
    const antallBarn = barn.antallBarn;
    const latestDate =
        ankomstdato !== undefined && barn.adopsjonsdato !== undefined
            ? dateToISOString(findEldsteDato([ankomstdato, barn.adopsjonsdato])) // todo - sjekk logikk her
            : barn.adopsjonsdato;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO
    );

    const erFødsel = søkersituasjon.situasjon === 'fødsel';

    return (
        <MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents.FormikWrapper
            initialValues={getInitialMorFarAdopsjonAnnenForelderHarRettIEØSValues(lagretUttaksplanInfo, dekningsgrad)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig.getVisbility({
                    ...formValues,
                    erFarEllerMedmor,
                    erFødsel,
                });

                return (
                    <MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block
                            padBottom="l"
                            visible={visibility.isIncluded(
                                MorFarAdopsjonAnnenForelderHarRettIEØSFormField.dekningsgrad
                            )}
                        >
                            <DekningsgradSpørsmål
                                FormKomponent={MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents}
                                dekningsgradFeltNavn={MorFarAdopsjonAnnenForelderHarRettIEØSFormField.dekningsgrad}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                erDeltUttak={erDeltUttakINorge}
                            />
                        </Block>
                        <Block
                            visible={visibility.isIncluded(
                                MorFarAdopsjonAnnenForelderHarRettIEØSFormField.startdatoAdopsjonValg
                            )}
                        >
                            <StartdatoAdopsjon valgtStartdatoAdopsjon={formValues.startdatoAdopsjonValg} />
                        </Block>

                        <Block
                            padBottom="l"
                            visible={visibility.isIncluded(
                                MorFarAdopsjonAnnenForelderHarRettIEØSFormField.søkersFørsteDagAdopsjon
                            )}
                        >
                            <FarMedmorsFørsteDag
                                FormComponents={MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents}
                                fieldName={MorFarAdopsjonAnnenForelderHarRettIEØSFormField.søkersFørsteDagAdopsjon}
                                familiehendelsesdato={familiehendelsesdatoDate!}
                                setFieldValue={setFieldValue}
                                morsSisteDag={undefined}
                                navnMor={navnMor}
                                termindato={undefined}
                                situasjon={søkersituasjon.situasjon}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={
                                !erFødsel &&
                                formValues.startdatoAdopsjonValg === AdopsjonStartdatoValg.ANNEN &&
                                dayjs(latestDate).isBefore(
                                    dayjs(
                                        finnStartdatoAdopsjon(
                                            formValues.startdatoAdopsjonValg!,
                                            undefined,
                                            dateToISOString(barn.adopsjonsdato),
                                            dateToISOString(ankomstdato),
                                            formValues.søkersFørsteDag
                                        )
                                    ),
                                    'day'
                                ) &&
                                !isAdoptertStebarn(barn)
                            }
                        >
                            <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                <FormattedMessage
                                    id={
                                        erAdoptertIUtlandet === false
                                            ? 'uttaksplaninfo.info.ikkeAdoptertIUtlandet'
                                            : 'uttaksplaninfo.info.adoptertIUtlandet'
                                    }
                                />
                            </Veilederpanel>
                        </Block>
                        <Block visible={erAleneOmOmsorg === false && harAnnenForeldreRettPåForeldrepengerINorge}>
                            <Block
                                padBottom="l"
                                visible={
                                    antallBarn > 1 && formValues.startdatoAdopsjonValg !== undefined //&&
                                    //formValues.harAnnenForelderSøktFP !== YesOrNo.YES
                                }
                            >
                                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                    <FormattedMessage
                                        id="uttaksplaninfo.veileder.flerbarnsInformasjon"
                                        values={{
                                            uker: getFlerbarnsuker(formValues.dekningsgrad!, antallBarn),
                                            navnFar: navnFarMedmor,
                                            navnMor: navnMor,
                                        }}
                                    />
                                </Veilederpanel>
                            </Block>
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                {intlUtils(intl, 'søknad.gåVidere')}
                            </Hovedknapp>
                        </Block>
                    </MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFarAdopsjonAnnenForelderHarRettIEØS;
