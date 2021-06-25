import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { dateToISOString, ISOStringToDate, YesOrNo } from '@navikt/sif-common-formik/lib';
import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import useSøknad from 'app/utils/hooks/useSøknad';
import { getNavnGenitivEierform, formaterNavn } from 'app/utils/personUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoMengde } from 'app/utils/stønadskontoUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getInitialMorFarAdopsjonValues } from './morFarAdopsjonUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import VeilederNormal from 'app/assets/VeilederNormal';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { Forelder } from 'app/types/Forelder';
import { getFlerbarnsuker } from 'app/steps/uttaksplan-info/utils/uttaksplanHarForMangeFlerbarnsuker';
import {
    getAntallUker,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { isAdoptertAnnetBarn, isAdoptertBarn, isAdoptertStebarn } from 'app/context/types/Barn';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { dateIsSameOrAfter, findEldsteDato } from 'app/utils/dateUtils';
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

    const shouldRender =
        erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelder.kanIkkeOppgis || søkerErAleneOmOmsorg);

    const onValidSubmitHandler = (values: MorFarAdopsjonFormData) => {
        const uttaksplanInfo: MorFarAdopsjonUttaksplanInfo = {
            ...values,
            dekningsgrad:
                values.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
                    ? Dekningsgrad.HUNDRE_PROSENT
                    : Dekningsgrad.ÅTTI_PROSENT,
        };
        return [actionCreator.setUttaksplanInfo(uttaksplanInfo)];
    };

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTTAKSPLAN);

    if (!shouldRender || !isAdoptertBarn(barn)) {
        return null;
    }

    const erSøkerMor = søkersituasjon.rolle === 'mor';
    const familiehendelsesdato = getFamiliehendelsedato(barn);

    const harAnnenForeldreRettPåForeldrepenger = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger
        : false;
    const fornavnAnnenForeldre = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : undefined;

    const erDeltUttak = erAleneOmOmsorg === false || !annenForelder.kanIkkeOppgis;

    const erAnnenPartUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erUfør : false;
    const erMorUfør = erSøkerMor ? false : erAnnenPartUfør;

    const navnSøker = formaterNavn(fornavn, etternavn, mellomnavn);
    const navnAnnenPart = isAnnenForelderOppgitt(annenForelder)
        ? formaterNavn(annenForelder.fornavn, annenForelder.etternavn)
        : '';
    const navnMor = erSøkerMor ? navnSøker : navnAnnenPart;
    const navnFarMedmor = erSøkerMor ? navnAnnenPart : navnSøker;

    const erAdoptertIUtlandet = isAdoptertAnnetBarn(barn) ? barn.adoptertIUtlandet : false;
    const antallBarn = parseInt(barn.antallBarn, 10);

    const ankomstdato = isAdoptertAnnetBarn(barn) ? barn.ankomstdato : undefined;
    const ankomstdatoDate = ankomstdato ? ISOStringToDate(ankomstdato) : undefined;
    const adopsjonsdatoDate = ISOStringToDate(barn.adopsjonsdato);
    const latestDate =
        ankomstdatoDate !== undefined && adopsjonsdatoDate !== undefined
            ? dateToISOString(findEldsteDato([ankomstdatoDate, adopsjonsdatoDate])) // todo - sjekk logikk her
            : barn.adopsjonsdato;

    return (
        <MorFarAdopsjonFormComponents.FormikWrapper
            initialValues={getInitialMorFarAdopsjonValues(lagretUttaksplanInfo)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = morFarAdopsjonQuestionsConfig.getVisbility({
                    ...formValues,
                });

                const tilgjengeligeStønadskontoer100 = getValgtStønadskontoMengde(
                    Dekningsgrad.HUNDRE_PROSENT,
                    tilgjengeligeStønadskontoer80DTO,
                    tilgjengeligeStønadskontoer100DTO,
                    familiehendelsesdato,
                    erMorUfør
                );
                const tilgjengeligeStønadskontoer80 = getValgtStønadskontoMengde(
                    Dekningsgrad.ÅTTI_PROSENT,
                    tilgjengeligeStønadskontoer80DTO,
                    tilgjengeligeStønadskontoer100DTO,
                    familiehendelsesdato,
                    erMorUfør
                );
                const valgtStønadskonto =
                    formValues.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
                        ? tilgjengeligeStønadskontoer100
                        : tilgjengeligeStønadskontoer80;
                const tilgjengeligeDager = getTilgjengeligeDager(valgtStønadskonto, false, Forelder.farMedmor);

                const fellesperiodeukerMor = Math.round((getAntallUkerFellesperiode(valgtStønadskonto) || 0) / 2);

                return (
                    <MorFarAdopsjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                        <Block padBottom="l" visible={harAnnenForeldreRettPåForeldrepenger}>
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
                        <Block
                            padBottom="l"
                            visible={
                                formValues.harAnnenForelderSøktFP !== YesOrNo.UNANSWERED ||
                                !harAnnenForeldreRettPåForeldrepenger
                            }
                        >
                            <MorFarAdopsjonFormComponents.RadioPanelGroup
                                name={MorFarAdopsjonFormField.dekningsgrad}
                                radios={[
                                    {
                                        label: intlUtils(intl, 'uttaksplaninfo.49Uker', {
                                            antallUker: getAntallUker(tilgjengeligeStønadskontoer100),
                                        }),
                                        value: Dekningsgrad.HUNDRE_PROSENT,
                                    },
                                    {
                                        label: intlUtils(intl, 'uttaksplaninfo.59Uker', {
                                            antallUker: getAntallUker(tilgjengeligeStønadskontoer80),
                                        }),
                                        value: Dekningsgrad.ÅTTI_PROSENT,
                                    },
                                ]}
                                legend={intlUtils(intl, 'uttaksplaninfo.dekningsgrad.label.deltUttak')}
                                description={
                                    <UtvidetInformasjon apneLabel="Les mer om lengden på foreldrepengeperioden">
                                        <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad80" />
                                    </UtvidetInformasjon>
                                }
                                useTwoColumns={true}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isAnswered(MorFarAdopsjonFormField.dekningsgrad)}>
                            <TilgjengeligeDagerGraf
                                erDeltUttak={erDeltUttak}
                                erFarEllerMedmor={!erSøkerMor}
                                navnFarMedmor={navnFarMedmor}
                                navnMor={navnMor}
                                tilgjengeligeDager={tilgjengeligeDager}
                            />
                        </Block>
                        <Block
                            visible={
                                visibility.isAnswered(MorFarAdopsjonFormField.dekningsgrad) &&
                                formValues.harAnnenForelderSøktFP !== YesOrNo.YES
                            }
                        >
                            <StartdatoAdopsjon valgtStartdatoAdopsjon={formValues.startdatoAdopsjonValg} />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={
                                visibility.isAnswered(MorFarAdopsjonFormField.dekningsgrad) &&
                                formValues.harAnnenForelderSøktFP === YesOrNo.YES
                            }
                        >
                            <MorsSisteDagSpørsmål
                                FormComponents={MorFarAdopsjonFormComponents}
                                fieldName={MorFarAdopsjonFormField.morsSisteDag}
                                navnMor={navnMor}
                                familiehendelsesdato={familiehendelsesdato}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={
                                visibility.isAnswered(MorFarAdopsjonFormField.morsSisteDag) &&
                                formValues.harAnnenForelderSøktFP === YesOrNo.YES
                            }
                        >
                            <FarMedmorsFørsteDag
                                FormComponents={MorFarAdopsjonFormComponents}
                                fieldName={MorFarAdopsjonFormField.farMedmorsFørsteDag}
                                familiehendelsesdato={familiehendelsesdato}
                                setFieldValue={setFieldValue}
                                farMedmorsFørsteDag={MorFarAdopsjonFormField.farMedmorsFørsteDag}
                                morsSisteDag={ISOStringToDate(formValues.morsSisteDag)}
                                navnMor={navnMor}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={
                                visibility.isAnswered(MorFarAdopsjonFormField.farMedmorsFørsteDag) &&
                                !dateIsSameOrAfter(
                                    ISOStringToDate(formValues.morsSisteDag),
                                    ISOStringToDate(formValues.farMedmorsFørsteDag)
                                ) &&
                                formValues.harAnnenForelderSøktFP === YesOrNo.YES
                            }
                        >
                            <AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål
                                FormComponents={MorFarAdopsjonFormComponents}
                                ukerFieldName={MorFarAdopsjonFormField.antallUkerFellesperiode}
                                dagerFieldName={MorFarAdopsjonFormField.antallDagerFellesperiode}
                                antallDager={formValues.antallDagerFellesperiode}
                                antallUker={formValues.antallUkerFellesperiode}
                                setFieldValue={setFieldValue}
                                ukerMedFellesperiode={tilgjengeligeDager.dagerFelles / 5}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={
                                formValues.startdatoAdopsjonValg !== undefined &&
                                dayjs(ISOStringToDate(latestDate)).isBefore(
                                    dayjs(
                                        finnStartdatoAdopsjon(
                                            formValues.startdatoAdopsjonValg,
                                            formValues.annenStartdatoAdopsjon,
                                            barn.adopsjonsdato,
                                            ankomstdato
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
                                visible={
                                    formValues.startdatoAdopsjonValg !== undefined &&
                                    formValues.harAnnenForelderSøktFP !== YesOrNo.YES
                                }
                            >
                                <FordelingFellesperiodeSpørsmål
                                    setFieldValue={setFieldValue}
                                    fellesperiodeukerMor={formValues.fellesperiodeukerMor || fellesperiodeukerMor}
                                    ukerFellesperiode={Math.floor(getAntallUkerFellesperiode(valgtStønadskonto))}
                                    mor={navnMor}
                                    farMedmor={navnFarMedmor}
                                    annenForelderErFarEllerMedmor={!erSøkerMor}
                                    antallUkerFedreKvote={getAntallUkerFedrekvote(valgtStønadskonto)}
                                    antallUkerMødreKvote={getAntallUkerMødrekvote(valgtStønadskonto)}
                                />
                            </Block>
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                        </Block>
                    </MorFarAdopsjonFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFarAdopsjon;
