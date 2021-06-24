import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ISOStringToDate, YesOrNo } from '@navikt/sif-common-formik/lib';
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
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { MorFarAdopsjonFormComponents, MorFarAdopsjonFormField } from './morFarAdopsjonFormConfig';
import { morFarAdopsjonQuestionsConfig } from './morFarAdopsjonQuestionsConfig';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import StartdatoAdopsjon from './StartdatoAdopsjon';
import MorsSisteDagSpørsmål from '../spørsmål/MorsSisteDagSpørsmål';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import { dateIsSameOrAfter } from 'app/utils/dateUtils';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from '../spørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import { isAdoptertAnnetBarn } from 'app/context/types/Barn';
import FordelingFellesperiodeSpørsmål from '../../fordelingFellesperiode/FordelingFellesperiodeSpørsmål';
import { getFlerbarnsuker } from 'app/steps/uttaksplan-info/utils/uttaksplanHarForMangeFlerbarnsuker';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';

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

    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const søkerErAleneOmOmsorg = !!erAleneOmOmsorg;
    const annenForelderOppgittIkkeAleneOmOmsorg = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger !== undefined
        : false;

    const shouldRender =
        erAdopsjon && (annenForelderOppgittIkkeAleneOmOmsorg || annenForelder.kanIkkeOppgis || søkerErAleneOmOmsorg);

    if (!shouldRender) {
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

    const erAdoptertIUtlandet = isAdoptertAnnetBarn(barn) ? barn.adoptertIUtlandet : false;
    const antallBarn = parseInt(barn.antallBarn, 10);

    return (
        <MorFarAdopsjonFormComponents.FormikWrapper
            initialValues={getInitialMorFarAdopsjonValues()}
            onSubmit={() => undefined}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = morFarAdopsjonQuestionsConfig.getVisbility({
                    ...formValues,
                });

                const tilgjengeligeStønadskontoer = getValgtStønadskontoMengde(
                    formValues.dekningsgrad as Dekningsgrad,
                    tilgjengeligeStønadskontoer80DTO,
                    tilgjengeligeStønadskontoer100DTO,
                    familiehendelsesdato,
                    erMorUfør
                );

                const fellesperiodeukerMor = Math.round(
                    (getAntallUkerFellesperiode(tilgjengeligeStønadskontoer) || 0) / 2
                );

                return (
                    <MorFarAdopsjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                        <Block padBottom="l" visible={harAnnenForeldreRettPåForeldrepenger} textAlignCenter={true}>
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
                                        label: intlUtils(intl, 'uttaksplaninfo.49Uker'),
                                        value: Dekningsgrad.HUNDRE_PROSENT,
                                    },
                                    {
                                        label: intlUtils(intl, 'uttaksplaninfo.59Uker'),
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
                                navnFarMedmor={erSøkerMor ? navnAnnenPart : navnSøker}
                                navnMor={erSøkerMor ? navnSøker : navnAnnenPart}
                                tilgjengeligeDager={getTilgjengeligeDager(
                                    tilgjengeligeStønadskontoer,
                                    erDeltUttak,
                                    erSøkerMor ? Forelder.mor : Forelder.farMedmor
                                )}
                            />
                        </Block>
                        <Block
                            visible={
                                visibility.isAnswered(MorFarAdopsjonFormField.dekningsgrad) &&
                                formValues.harAnnenForelderSøktFP !== YesOrNo.YES
                            }
                        >
                            <StartdatoAdopsjon />
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
                                navnMor={erSøkerMor ? navnSøker : navnAnnenPart}
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
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            /* visible={
                                startdatoPermisjon !== undefined &&
                                moment(ISOStringToDate(latestDate)).isBefore(
                                    moment(ISOStringToDate(startdatoPermisjon))
                                ) &&
                                stebarnsadopsjon !== true
                            }*/
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
                                    /*skjema.startdatoPermisjon !== undefined && */ formValues.harAnnenForelderSøktFP ===
                                        YesOrNo.YES
                                }
                            >
                                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                    <FormattedMessage
                                        id="uttaksplaninfo.veileder.flerbarnsInformasjon"
                                        values={{
                                            uker: getFlerbarnsuker(formValues.dekningsgrad!, antallBarn),
                                            navnFar: erSøkerMor ? navnAnnenPart : navnSøker,
                                            navnMor: erSøkerMor ? navnSøker : navnAnnenPart,
                                        }}
                                    />
                                </Veilederpanel>
                            </Block>
                            <FordelingFellesperiodeSpørsmål
                                setFieldValue={setFieldValue}
                                fellesperiodeukerMor={formValues.fellesperiodeukerMor || fellesperiodeukerMor}
                                ukerFellesperiode={Math.floor(getAntallUkerFellesperiode(tilgjengeligeStønadskontoer))}
                                mor={erSøkerMor ? navnSøker : navnAnnenPart}
                                farMedmor={erSøkerMor ? navnAnnenPart : navnSøker}
                                annenForelderErFarEllerMedmor={!erSøkerMor}
                                antallUkerFedreKvote={getAntallUkerFedrekvote(tilgjengeligeStønadskontoer)}
                                antallUkerMødreKvote={getAntallUkerMødrekvote(tilgjengeligeStønadskontoer)}
                            />
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
