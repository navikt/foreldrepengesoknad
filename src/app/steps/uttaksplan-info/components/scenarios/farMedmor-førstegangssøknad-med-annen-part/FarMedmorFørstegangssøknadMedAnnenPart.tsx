import { Block, intlUtils } from '@navikt/fp-common';
import InfoOmSøknaden from 'app/components/info-eksisterende-sak/InfoOmSøknaden';
import actionCreator from 'app/context/action/actionCreator';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import SøknadRoutes from 'app/routes/routes';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Forelder } from 'app/types/Forelder';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { storeAppState } from 'app/utils/submitUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { isInfoPeriode } from 'uttaksplan/types/Periode';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import {
    FarMedmorFørstegangssøknadMedAnnenPartFormComponents,
    FarMedmorFørstegangssøknadMedAnnenPartFormData,
    FarMedmorFørstegangssøknadMedAnnenPartFormField,
} from './farMedmorFørstegangssøknadMedAnnenPartFormConfig';
import { farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig } from './farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig';
import { getFarMedmorFørstegangssøknadMedAnnenPartInitialValues } from './farMedmorFørstegangssøknadMedAnnenPartUtils';
import addPeriode from 'uttaksplan/builder/addPeriode';
import { getUttaksstatusFunc } from 'uttaksplan/utils/uttaksstatus';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
}

const FarMedmorFørstegangssøknadMedAnnenPart: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakAnnenPart,
}) => {
    const søknad = useSøknad();
    const intl = useIntl();
    const { barn, søkersituasjon, annenForelder, erEndringssøknad } = søknad;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const lagretUttaksplanInfo = useUttaksplanInfo<FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo>();
    const familiehendelsedato = getFamiliehendelsedato(barn);
    const familiehendelsedatoDate = ISOStringToDate(familiehendelsedato);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const harMorRett = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepenger;
    const erDeltUttak = true;
    const erFlerbarnssøknad = barn.antallBarn > 1;
    const harKomplettUttaksplan = false;

    const onValidSubmitHandler = (values: Partial<FarMedmorFørstegangssøknadMedAnnenPartFormData>) => {
        const uttaksplanInfo: FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo = {
            permisjonStartdato: values.permisjonStartdato!,
        };
        const stønadskontoer = tilgjengeligeStønadskontoer[getDekningsgradFromString(grunnlag.dekningsgrad)];
        const antallUker = getAntallUker(tilgjengeligeStønadskontoer[grunnlag.dekningsgrad]);
        const farMedmorSinePerioder = lagUttaksplan({
            annenForelderErUfør: erMorUfør,
            erDeltUttak,
            erEndringssøknad,
            erEnkelEndringssøknad: erEndringssøknad,
            familiehendelsesdato: familiehendelsedatoDate!,
            førsteUttaksdagEtterSeksUker: Uttaksdagen(Uttaksdagen(familiehendelsedatoDate!).denneEllerNeste()).leggTil(
                30
            ),
            situasjon: erFødsel ? 'fødsel' : 'adopsjon',
            søkerErFarEllerMedmor: erFarEllerMedmor,
            søkerHarMidlertidigOmsorg: false,
            tilgjengeligeStønadskontoer: stønadskontoer,
            uttaksplanSkjema: {
                morSinSisteUttaksdag: undefined,
                farSinFørsteUttaksdag: values.permisjonStartdato,
                antallDagerFellesperiodeFarMedmor: undefined,
                antallUkerFellesperiodeFarMedmor: undefined,
            },
            bareFarMedmorHarRett: false,
        });
        let uttaksplanMedAnnenPart;
        const nyPeriode = farMedmorSinePerioder.length > 0 ? farMedmorSinePerioder[0] : undefined;
        if (eksisterendeSakAnnenPart && nyPeriode !== undefined) {
            uttaksplanMedAnnenPart = addPeriode({
                getUttaksstatusFunc: getUttaksstatusFunc({
                    erDeltUttak,
                    erEndringssøknad,
                    harKomplettUttaksplan,
                    erFarEllerMedmor,
                    tilgjengeligeStønadskontoer: stønadskontoer,
                    uttaksplan,
                }),
                uttaksplan,
                nyPeriode,
                tilgjengeligeStønadskontoer: stønadskontoer,
                familiehendelsesdato: familiehendelsedatoDate!,
                erFlerbarnssøknad,
                erEndringsøknadUtenEkisterendeSak: false,
                relevantStartDatoForUttak: nyPeriode.tidsperiode.fom,
                harMidlertidigOmsorg: false,
                harAktivitetskravIPeriodeUtenUttak: !erDeltUttak && !harMorRett,
                erAdopsjon: søkersituasjon.situasjon === 'adopsjon',
                opprinneligPlan: eksisterendeSakAnnenPart.uttaksplan,
            }).updatedPlan;
        } else if (eksisterendeSakAnnenPart) {
            uttaksplanMedAnnenPart = eksisterendeSakAnnenPart.uttaksplan;
        } else {
            uttaksplanMedAnnenPart = farMedmorSinePerioder;
        }

        return [
            actionCreator.setAntallUkerIUttaksplan(antallUker),
            actionCreator.setUttaksplanInfo(uttaksplanInfo),
            actionCreator.setDekningsgrad(grunnlag.dekningsgrad),
            actionCreator.lagUttaksplanforslag(uttaksplanMedAnnenPart),
        ];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.UTTAKSPLAN,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );

    if (!eksisterendeSakAnnenPart || !erFarEllerMedmor) {
        return null;
    }

    const navnMor = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : '';
    const { grunnlag, uttaksplan } = eksisterendeSakAnnenPart;
    const morsPerioder = uttaksplan.filter((p) => isInfoPeriode(p) && p.forelder === Forelder.mor);
    const morsSisteDag = morsPerioder.reverse()[0].tidsperiode.tom;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO
    );

    return (
        <FarMedmorFørstegangssøknadMedAnnenPartFormComponents.FormikWrapper
            initialValues={getFarMedmorFørstegangssøknadMedAnnenPartInitialValues(lagretUttaksplanInfo)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig.getVisbility(formValues);
                const valgtMengdeStønadskonto = tilgjengeligeStønadskontoer[grunnlag.dekningsgrad];

                return (
                    <FarMedmorFørstegangssøknadMedAnnenPartFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block padBottom="l">
                            <InfoOmSøknaden
                                eksisterendeSak={eksisterendeSakAnnenPart}
                                erIUttaksplanenSteg={false}
                                tilgjengeligeStønadskontoer={valgtMengdeStønadskonto}
                            />
                        </Block>
                        <Block padBottom="l">
                            <FarMedmorsFørsteDag
                                FormComponents={FarMedmorFørstegangssøknadMedAnnenPartFormComponents}
                                fieldName={FarMedmorFørstegangssøknadMedAnnenPartFormField.permisjonStartdato}
                                familiehendelsesdato={familiehendelsedato}
                                setFieldValue={setFieldValue}
                                morsSisteDag={morsSisteDag}
                                navnMor={navnMor}
                            />
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                {intlUtils(intl, 'søknad.gåVidere')}
                            </Hovedknapp>
                        </Block>
                    </FarMedmorFørstegangssøknadMedAnnenPartFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFørstegangssøknadMedAnnenPart;
