import {
    Block,
    EksisterendeSak,
    Forelder,
    ISOStringToDate,
    Uttaksdagen,
    getErMorUfør,
    getMorHarRettPåForeldrepengerINorgeEllerEØS,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isInfoPeriode,
} from '@navikt/fp-common';
import { Søker } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import InfoOmSøknaden from 'app/components/info-eksisterende-sak/InfoOmSøknaden';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { leggTilAnnenPartsPerioderISøkerenesUttaksplan } from 'app/steps/uttaksplan-info/utils/leggTilAnnenPartsPerioderISøkerensUttaksplan';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { FunctionComponent, useState } from 'react';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import {
    FarMedmorFørstegangssøknadMedAnnenPartFormComponents,
    FarMedmorFørstegangssøknadMedAnnenPartFormData,
    FarMedmorFørstegangssøknadMedAnnenPartFormField,
} from './farMedmorFørstegangssøknadMedAnnenPartFormConfig';
import { farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig } from './farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig';
import { getFarMedmorFørstegangssøknadMedAnnenPartInitialValues } from './farMedmorFørstegangssøknadMedAnnenPartUtils';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
    erEndringssøknad: boolean;
    goToNextDefaultStep: () => Promise<void>;
    goToPreviousDefaultStep: () => Promise<void>;
    søker: Søker;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const FarMedmorFørstegangssøknadMedAnnenPart: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakAnnenPart,
    erEndringssøknad,
    goToNextDefaultStep,
    goToPreviousDefaultStep,
    søker,
    oppdaterBarnOgLagreUttaksplandata,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    // TODO (TOR) fjern as
    const uttaksplanInfo = useContextGetData(
        ContextDataType.UTTAKSPLAN_INFO,
    ) as FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo;

    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsedato = getFamiliehendelsedato(barn);
    const familiehendelsedatoDate = ISOStringToDate(familiehendelsedato);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const bareFarHarRett = !getMorHarRettPåForeldrepengerINorgeEllerEØS(
        søkersituasjon.rolle,
        erFarEllerMedmor,
        annenForelder,
    );
    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const erDeltUttak = true;
    const termindato = getTermindato(barn);
    const harAktivitetskravIPeriodeUtenUttak = getHarAktivitetskravIPeriodeUtenUttak({
        erDeltUttak,
        morHarRett: true,
        søkerErAleneOmOmsorg: false,
    });

    const morsSisteUttaksdag =
        eksisterendeSakAnnenPart && eksisterendeSakAnnenPart.uttaksplan.length > 0
            ? dateToISOString(
                  eksisterendeSakAnnenPart.uttaksplan[eksisterendeSakAnnenPart.uttaksplan.length - 1].tidsperiode.tom,
              )
            : undefined;

    const onSubmit = (values: Partial<FarMedmorFørstegangssøknadMedAnnenPartFormData>) => {
        setIsSubmitting(true);

        const uttaksplanInfo: FarMedmorFørstegangssøknadMedAnnenPartUttaksplanInfo = {
            permisjonStartdato: values.permisjonStartdato!,
        };
        oppdaterUttaksplanInfo(uttaksplanInfo);

        const stønadskontoer = tilgjengeligeStønadskontoer[getDekningsgradFromString(grunnlag.dekningsgrad)];
        const farMedmorSinePerioder = lagUttaksplan({
            annenForelderErUfør: erMorUfør,
            erDeltUttak,
            erEndringssøknad,
            erEnkelEndringssøknad: erEndringssøknad,
            familiehendelsesdato: familiehendelsedatoDate!,
            førsteUttaksdagEtterSeksUker: Uttaksdagen(Uttaksdagen(familiehendelsedatoDate!).denneEllerNeste()).leggTil(
                30,
            ),
            situasjon: erFødsel ? 'fødsel' : 'adopsjon',
            søkerErFarEllerMedmor: erFarEllerMedmor,
            søkerHarMidlertidigOmsorg: false,
            tilgjengeligeStønadskontoer: stønadskontoer,
            uttaksplanSkjema: {
                morSinSisteUttaksdag: morsSisteUttaksdag,
                farSinFørsteUttaksdag: values.permisjonStartdato,
                antallDagerFellesperiodeFarMedmor: undefined,
                antallUkerFellesperiodeFarMedmor: undefined,
            },
            bareFarMedmorHarRett: bareFarHarRett,
            termindato,
            harAktivitetskravIPeriodeUtenUttak,
            førsteUttaksdagNesteBarnsSak,
        });
        let uttaksplanMedAnnenPart;

        if (eksisterendeSakAnnenPart && farMedmorSinePerioder.length > 0) {
            uttaksplanMedAnnenPart = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
                eksisterendeSakAnnenPart.uttaksplan,
                farMedmorSinePerioder,
                familiehendelsedatoDate!,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarHarRett,
                erFarEllerMedmor,
                førsteUttaksdagNesteBarnsSak,
            );
        } else if (eksisterendeSakAnnenPart) {
            uttaksplanMedAnnenPart = eksisterendeSakAnnenPart.uttaksplan;
        } else {
            uttaksplanMedAnnenPart = farMedmorSinePerioder;
        }

        const antallUker = getAntallUker(tilgjengeligeStønadskontoer[grunnlag.dekningsgrad]);

        oppdaterUttaksplan(uttaksplanMedAnnenPart);

        oppdaterBarnOgLagreUttaksplandata({
            ...uttaksplanMetadata,
            antallUkerIUttaksplan: antallUker,
        });

        return goToNextDefaultStep();
    };

    if (!eksisterendeSakAnnenPart || !erFarEllerMedmor) {
        return null;
    }

    const navnMor = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : '';
    const { grunnlag, uttaksplan } = eksisterendeSakAnnenPart;
    const morsPerioder = uttaksplan.filter((p) => isInfoPeriode(p) && p.forelder === Forelder.mor);
    const morsSisteDag = morsPerioder.reverse()[0].tidsperiode.tom;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );

    return (
        <FarMedmorFørstegangssøknadMedAnnenPartFormComponents.FormikWrapper
            initialValues={getFarMedmorFørstegangssøknadMedAnnenPartInitialValues(uttaksplanInfo)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = farMedmorFørstegangssøknadMedAnnenPartQuestionsConfig.getVisbility(
                    formValues as FarMedmorFørstegangssøknadMedAnnenPartFormData,
                );
                const valgtMengdeStønadskonto = tilgjengeligeStønadskontoer[grunnlag.dekningsgrad];

                return (
                    <FarMedmorFørstegangssøknadMedAnnenPartFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block padBottom="xl">
                            <InfoOmSøknaden
                                eksisterendeSak={eksisterendeSakAnnenPart}
                                erIUttaksplanenSteg={false}
                                tilgjengeligeStønadskontoer={valgtMengdeStønadskonto}
                                søker={søker}
                            />
                        </Block>
                        <Block padBottom="xl">
                            <FarMedmorsFørsteDag
                                FormComponents={FarMedmorFørstegangssøknadMedAnnenPartFormComponents}
                                fieldName={FarMedmorFørstegangssøknadMedAnnenPartFormField.permisjonStartdato}
                                familiehendelsesdato={familiehendelsedatoDate!}
                                setFieldValue={setFieldValue}
                                morsSisteDag={morsSisteDag}
                                navnMor={navnMor}
                                termindato={termindato}
                                situasjon={søkersituasjon.situasjon}
                                morHarRettTilForeldrepengerIEØS={false}
                            />
                        </Block>
                        <Block>
                            <StepButtons
                                isNexButtonVisible={visibility.areAllQuestionsAnswered()}
                                goToPreviousStep={goToPreviousDefaultStep}
                                isDisabledAndLoading={isSubmitting}
                            />
                        </Block>
                    </FarMedmorFørstegangssøknadMedAnnenPartFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFørstegangssøknadMedAnnenPart;
