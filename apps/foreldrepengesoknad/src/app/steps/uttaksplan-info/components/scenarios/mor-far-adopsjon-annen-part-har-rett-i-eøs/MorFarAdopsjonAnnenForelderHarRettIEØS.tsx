import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Block, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { formaterNavn } from 'app/utils/personUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { getFlerbarnsuker } from 'app/steps/uttaksplan-info/utils/uttaksplanHarForMangeFlerbarnsuker';
import { isAdoptertAnnetBarn, isAdoptertBarn, isAdoptertStebarn } from 'app/context/types/Barn';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { findEldsteDato, ISOStringToDate } from 'app/utils/dateUtils';
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
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { Button, GuidePanel } from '@navikt/ds-react';
import { MorFarAdopsjonAnnenForelderHarRettIEØSQuestionsPayload } from './morFarAdopsjonAnnenForelderHarRettIEØSQuestionsConfig';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const MorFarAdopsjonAnnenForelderHarRettIEØS: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
}) => {
    const intl = useIntl();
    const { state } = useForeldrepengesøknadContext();
    const { søkersituasjon, annenForelder, barn, dekningsgrad, erEndringssøknad } = useSøknad();
    const {
        person: { fornavn, mellomnavn, etternavn },
    } = useSøkerinfo();
    const lagretUttaksplanInfo = useUttaksplanInfo<MorFarAdopsjonAnnenForelderHarRettIEØSUttaksplanInfo>();
    const erDeltUttak = true;
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const førsteUttaksdagNesteBarnsSak =
        state.barnFraNesteSak !== undefined ? state.barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

    const onValidSubmitHandler = (values: Partial<MorFarAdopsjonAnnenForelderHarRettIEØSFormData>) => {
        const submissionValues = mapMorFarAdopsjonAnnenForelderHarRettIEØSFormToState(values);
        const barnAdopsjonsdato = isAdoptertBarn(barn) ? barn.adopsjonsdato : undefined;
        const antallUker = getAntallUker(tilgjengeligeStønadskontoer[values.dekningsgrad! === '100' ? 100 : 80]);

        const startdato = finnStartdatoAdopsjon(
            values.startdatoAdopsjonValg!,
            values.annenStartdatoAdopsjon,
            dateToISOString(barnAdopsjonsdato),
            dateToISOString(ankomstdato)
        );

        return [
            actionCreator.setAntallUkerIUttaksplan(antallUker),
            actionCreator.setUttaksplanInfo(submissionValues),
            actionCreator.setDekningsgrad(getDekningsgradFromString(values.dekningsgrad)),
            actionCreator.lagUttaksplanforslag(
                lagUttaksplan({
                    annenForelderErUfør: false,
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
                })
            ),
        ];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.UTTAKSPLAN,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );

    if (!erAdopsjon || !isAdoptertBarn(barn)) {
        return null;
    }

    const erSøkerMor = !erFarEllerMedmor;
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const navnAnnenPart = oppgittAnnenForelder
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn, true)
        : '';

    const erDeltUttakINorge = false;
    const navnSøker = formaterNavn(fornavn, etternavn, true, mellomnavn);
    const navnMor = erSøkerMor ? navnSøker : navnAnnenPart;
    const navnFarMedmor = erSøkerMor ? navnAnnenPart : navnSøker;
    const erAdoptertIUtlandet = isAdoptertAnnetBarn(barn) ? barn.adoptertIUtlandet : false;
    const ankomstdato = isAdoptertAnnetBarn(barn) ? barn.ankomstdato : undefined;
    const antallBarn = barn.antallBarn;
    const latestDate =
        ankomstdato !== undefined && barn.adopsjonsdato !== undefined
            ? dateToISOString(findEldsteDato([ankomstdato, barn.adopsjonsdato]))
            : barn.adopsjonsdato;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO
    );

    return (
        <MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents.FormikWrapper
            initialValues={getInitialMorFarAdopsjonAnnenForelderHarRettIEØSValues(lagretUttaksplanInfo, dekningsgrad)}
            onSubmit={handleSubmit}
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
                            padBottom="xl"
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
                                            dateToISOString(ankomstdato)
                                        )
                                    ),
                                    'day'
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
                            padBottom="xl"
                            visible={antallBarn > 1 && formValues.startdatoAdopsjonValg !== undefined}
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
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                {intlUtils(intl, 'søknad.gåVidere')}
                            </Button>
                        </Block>
                    </MorFarAdopsjonAnnenForelderHarRettIEØSFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFarAdopsjonAnnenForelderHarRettIEØS;
