import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { dateToISOString, YesOrNo } from '@navikt/sif-common-formik/lib';
import { Block, intlUtils } from '@navikt/fp-common';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import useSøknad from 'app/utils/hooks/useSøknad';
import { getNavnGenitivEierform, formaterNavn } from 'app/utils/personUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getInitialMorFarAdopsjonValues, mapMorFarAdopsjonFormToState } from './morFarAdopsjonUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import VeilederNormal from 'app/assets/VeilederNormal';
import { Forelder } from 'app/types/Forelder';
import { getFlerbarnsuker } from 'app/steps/uttaksplan-info/utils/uttaksplanHarForMangeFlerbarnsuker';
import { isAdoptertAnnetBarn, isAdoptertBarn, isAdoptertStebarn } from 'app/context/types/Barn';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { dateIsSameOrAfter, findEldsteDato, ISOStringToDate } from 'app/utils/dateUtils';
import {
    MorFarAdopsjonFormComponents,
    MorFarAdopsjonFormData,
    MorFarAdopsjonFormField,
} from './morFarAdopsjonFormConfig';
import { morFarAdopsjonQuestionsConfig } from './morFarAdopsjonQuestionsConfig';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import StartdatoAdopsjon, { finnStartdatoAdopsjon } from './StartdatoAdopsjon';
import MorsSisteDagSpørsmål from '../spørsmål/MorsSisteDagSpørsmål';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from '../spørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import FordelingFellesperiodeSpørsmål from '../../fordelingFellesperiode/FordelingFellesperiodeSpørsmål';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import { MorFarAdopsjonUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const MorFarAdopsjon: FunctionComponent<Props> = ({
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
    const lagretUttaksplanInfo = useUttaksplanInfo<MorFarAdopsjonUttaksplanInfo>();

    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const søkerErAleneOmOmsorg = !!erAleneOmOmsorg;
    const annenForelderOppgittIkkeAleneOmOmsorg = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger !== undefined
        : false;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);

    const shouldRender =
        erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelder.kanIkkeOppgis || søkerErAleneOmOmsorg);

    const onValidSubmitHandler = (values: Partial<MorFarAdopsjonFormData>) => {
        const submissionValues = mapMorFarAdopsjonFormToState(values);
        const barnAdopsjonsdato = isAdoptertBarn(barn) ? barn.adopsjonsdato : undefined;
        const antallUker = getAntallUker(tilgjengeligeStønadskontoer[values.dekningsgrad!]);

        const startdato = finnStartdatoAdopsjon(
            values.startdatoAdopsjonValg!,
            values.annenStartdatoAdopsjon,
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
                    erDeltUttak: true,
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
                        fellesperiodeukerMor: submissionValues.fellesperiodeukerMor,
                        startdatoPermisjon: startdato,
                        antallDagerFellesperiodeFarMedmor: parseInt(submissionValues.antallDagerFellesperiode),
                        antallUkerFellesperiodeFarMedmor: parseInt(submissionValues.antallUkerFellesperiode),
                        harAnnenForelderSøktFP: submissionValues.harAnnenForelderSøktFP,
                        morSinSisteUttaksdag: submissionValues.annenForeldersSisteDag,
                        farSinFørsteUttaksdag: submissionValues.søkersFørsteDag,
                    },
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
    const harAnnenForeldreRettPåForeldrepenger = !!oppgittAnnenForelder?.harRettPåForeldrepenger;
    const fornavnAnnenForeldre = oppgittAnnenForelder?.fornavn;
    const erAnnenPartUfør = !!oppgittAnnenForelder?.erUfør;
    const navnAnnenPart = oppgittAnnenForelder
        ? formaterNavn(oppgittAnnenForelder.fornavn, oppgittAnnenForelder.etternavn)
        : '';

    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepenger : false;
    const erMorUfør = erSøkerMor ? false : erAnnenPartUfør;

    const navnSøker = formaterNavn(fornavn, etternavn, mellomnavn);
    const navnMor = erSøkerMor ? navnSøker : navnAnnenPart;
    const navnFarMedmor = erSøkerMor ? navnAnnenPart : navnSøker;

    const erAdoptertIUtlandet = isAdoptertAnnetBarn(barn) ? barn.adoptertIUtlandet : false;
    const ankomstdato = isAdoptertAnnetBarn(barn) ? barn.ankomstdato : undefined;
    const antallBarn = parseInt(barn.antallBarn, 10);
    const latestDate =
        ankomstdato !== undefined && barn.adopsjonsdato !== undefined
            ? dateToISOString(findEldsteDato([ankomstdato, barn.adopsjonsdato])) // todo - sjekk logikk her
            : barn.adopsjonsdato;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
        familiehendelsesdato,
        erMorUfør
    );

    return (
        <MorFarAdopsjonFormComponents.FormikWrapper
            initialValues={getInitialMorFarAdopsjonValues(lagretUttaksplanInfo, dekningsgrad)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = morFarAdopsjonQuestionsConfig.getVisbility({
                    ...formValues,
                    harAnnenForeldreRettPåForeldrepenger,
                    erAleneOmOmsorg,
                });

                const valgtStønadskonto = tilgjengeligeStønadskontoer[formValues.dekningsgrad];

                const tilgjengeligeDager = valgtStønadskonto
                    ? getTilgjengeligeDager(valgtStønadskonto, false, Forelder.farMedmor)
                    : undefined;

                return (
                    <MorFarAdopsjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                        <Block
                            padBottom="l"
                            visible={visibility.isIncluded(MorFarAdopsjonFormField.harAnnenForelderSøktFP)}
                        >
                            <MorFarAdopsjonFormComponents.YesOrNoQuestion
                                name={MorFarAdopsjonFormField.harAnnenForelderSøktFP}
                                legend={intlUtils(intl, 'uttaksplaninfo.spørsmål.harAnnenForelderSøktFP.label', {
                                    navnAnnenForelder: fornavnAnnenForeldre,
                                })}
                            />
                        </Block>
                        {formValues.harAnnenForelderSøktFP === YesOrNo.YES && (
                            <Block padBottom="l">
                                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                    <FormattedMessage
                                        id="uttaksplaninfo.informasjon.tilAnnenForelder"
                                        values={{
                                            navn: getNavnGenitivEierform(fornavnAnnenForeldre!, intl.locale),
                                        }}
                                    />
                                </Veilederpanel>
                            </Block>
                        )}
                        <Block padBottom="l" visible={visibility.isIncluded(MorFarAdopsjonFormField.dekningsgrad)}>
                            <DekningsgradSpørsmål
                                FormKomponent={MorFarAdopsjonFormComponents}
                                dekningsgradFeltNavn={MorFarAdopsjonFormField.dekningsgrad}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isAnswered(MorFarAdopsjonFormField.dekningsgrad)}>
                            {tilgjengeligeDager && (
                                <TilgjengeligeDagerGraf
                                    erDeltUttak={erDeltUttak}
                                    erFarEllerMedmor={!erSøkerMor}
                                    navnFarMedmor={navnFarMedmor}
                                    navnMor={navnMor}
                                    tilgjengeligeDager={tilgjengeligeDager}
                                />
                            )}
                        </Block>
                        <Block visible={visibility.isIncluded(MorFarAdopsjonFormField.startdatoAdopsjonValg)}>
                            <StartdatoAdopsjon valgtStartdatoAdopsjon={formValues.startdatoAdopsjonValg} />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={visibility.isIncluded(MorFarAdopsjonFormField.annenForeldersSisteDag)}
                        >
                            <MorsSisteDagSpørsmål
                                FormComponents={MorFarAdopsjonFormComponents}
                                fieldName={MorFarAdopsjonFormField.annenForeldersSisteDag}
                                navnMor={navnMor}
                                familiehendelsesdato={familiehendelsesdato}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isIncluded(MorFarAdopsjonFormField.søkersFørsteDag)}>
                            <FarMedmorsFørsteDag
                                FormComponents={MorFarAdopsjonFormComponents}
                                fieldName={MorFarAdopsjonFormField.søkersFørsteDag}
                                familiehendelsesdato={familiehendelsesdato}
                                setFieldValue={setFieldValue}
                                morsSisteDag={ISOStringToDate(formValues.annenForeldersSisteDag)}
                                navnMor={navnMor}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={
                                visibility.isAnswered(MorFarAdopsjonFormField.søkersFørsteDag) &&
                                !dateIsSameOrAfter(
                                    ISOStringToDate(formValues.annenForeldersSisteDag),
                                    ISOStringToDate(formValues.søkersFørsteDag)
                                ) &&
                                formValues.harAnnenForelderSøktFP === YesOrNo.YES
                            }
                        >
                            {tilgjengeligeDager && (
                                <AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål
                                    FormComponents={MorFarAdopsjonFormComponents}
                                    ukerFieldName={MorFarAdopsjonFormField.antallUkerFellesperiode}
                                    dagerFieldName={MorFarAdopsjonFormField.antallDagerFellesperiode}
                                    antallDager={formValues.antallDagerFellesperiode}
                                    antallUker={formValues.antallUkerFellesperiode}
                                    setFieldValue={setFieldValue}
                                    ukerMedFellesperiode={tilgjengeligeDager.dagerFelles / 5}
                                />
                            )}
                        </Block>
                        <Block
                            padBottom="l"
                            visible={
                                formValues.startdatoAdopsjonValg !== undefined &&
                                dayjs(latestDate).isBefore(
                                    dayjs(
                                        finnStartdatoAdopsjon(
                                            formValues.startdatoAdopsjonValg,
                                            formValues.annenStartdatoAdopsjon,
                                            dateToISOString(barn.adopsjonsdato),
                                            dateToISOString(ankomstdato),
                                            formValues.søkersFørsteDag
                                        )
                                    )
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
                        <Block visible={erAleneOmOmsorg === false && harAnnenForeldreRettPåForeldrepenger}>
                            <Block
                                padBottom="l"
                                visible={
                                    antallBarn > 1 &&
                                    formValues.startdatoAdopsjonValg !== undefined &&
                                    formValues.harAnnenForelderSøktFP !== YesOrNo.YES
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
                            <Block
                                padBottom="l"
                                visible={visibility.isIncluded(MorFarAdopsjonFormField.fellesperiodeukerMor)}
                            >
                                <FordelingFellesperiodeSpørsmål
                                    setFieldValue={setFieldValue}
                                    valgtStønadskonto={valgtStønadskonto}
                                    valgtFellesperiodeukerMor={formValues.fellesperiodeukerMor}
                                    mor={navnMor}
                                    farMedmor={navnFarMedmor}
                                    annenForelderErFarEllerMedmor={!erSøkerMor}
                                />
                            </Block>
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                {intlUtils(intl, 'søknad.gåVidere')}
                            </Hovedknapp>
                        </Block>
                    </MorFarAdopsjonFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFarAdopsjon;
