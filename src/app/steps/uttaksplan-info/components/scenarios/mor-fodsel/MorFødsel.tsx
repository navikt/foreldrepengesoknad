import React, { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import VeilederNormal from 'app/assets/VeilederNormal';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import actionCreator from 'app/context/action/actionCreator';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getValgtStønadskontoMengde } from 'app/utils/stønadskontoUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { isFødtBarn } from 'app/context/types/Barn';
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
import {
    getAntallUker,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import uttaksConstants from 'app/constants';
import { Forelder } from 'app/types/Forelder';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import SøknadRoutes from 'app/routes/routes';
import { MorFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { Hovedknapp } from 'nav-frontend-knapper';
import { morFødselQuestionsConfig } from './morFødselQuestionsConfig';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';

const skalViseInfoOmPrematuruker = (fødselsdato: Date | undefined, termindato: Date | undefined): boolean => {
    if (fødselsdato === undefined || termindato === undefined) {
        return false;
    }

    const fødselsdatoEtterEllerLikFørsteJuli = dayjs(fødselsdato).isSameOrAfter(dayjs(new Date('2019-07-01')));

    return (
        dayjs(fødselsdato).add(7, 'weeks').add(3, 'days').isBefore(dayjs(termindato)) &&
        fødselsdatoEtterEllerLikFørsteJuli
    );
};

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const MorFødsel: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
}) => {
    const intl = useIntl();
    const {
        annenForelder,
        søkersituasjon,
        barn,
        søker: { erAleneOmOmsorg },
    } = useSøknad();
    const {
        person: { fornavn, mellomnavn, etternavn },
    } = useSøkerinfo();
    const lagretUttaksplanInfo = useUttaksplanInfo<MorFødselUttaksplanInfo>();

    const erMor = !isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';

    const shouldRender = erMor && erFødsel;

    const onValidSubmitHandler = (values: Partial<MorFødselFormData>) => {
        return [actionCreator.setUttaksplanInfo(mapMorFødselFormToState(values))];
    };

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTTAKSPLAN);

    if (!shouldRender) {
        return null;
    }

    const antallBarn = parseInt(barn.antallBarn, 10);

    const fødselsdato = isFødtBarn(barn) ? ISOStringToDate(barn.fødselsdatoer[0]) : undefined;
    const termindato = isFødtBarn(barn) ? ISOStringToDate(barn.termindato) : undefined;
    const visInfoOmPrematuruker =
        søkersituasjon.situasjon === 'fødsel' ? skalViseInfoOmPrematuruker(fødselsdato, termindato) : false;
    const ekstraDagerGrunnetPrematurFødsel = visInfoOmPrematuruker
        ? Tidsperioden({ fom: fødselsdato!, tom: termindato! }).getAntallUttaksdager() - 1
        : undefined;

    const erMorUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erUfør : false;
    const annenForelderFornavn = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : undefined;
    const harRettPåForeldrepenger = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger
        : false;
    const navnMor = formaterNavn(fornavn, etternavn, mellomnavn);
    const navnFarMedmor = isAnnenForelderOppgitt(annenForelder)
        ? formaterNavn(annenForelder.fornavn, annenForelder.etternavn)
        : '';
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const førsteUttaksdag = Uttaksdagen(ISOStringToDate(familiehendelsesdato)!).denneEllerNeste();
    const defaultPermisjonStartdato = Uttaksdagen(førsteUttaksdag).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5
    );

    const erDeltUttak = erAleneOmOmsorg === false || !annenForelder.kanIkkeOppgis;

    return (
        <MorFødselFormComponents.FormikWrapper
            initialValues={getInitialMorFødselValues(defaultPermisjonStartdato, lagretUttaksplanInfo)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = morFødselQuestionsConfig.getVisbility({
                    ...formValues,
                    harRettPåForeldrepenger,
                    erAleneOmOmsorg,
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

                const harSvartPåStartdato =
                    formValues.permisjonStartdato !== undefined || formValues.skalIkkeHaUttakFørTermin === true;
                return (
                    <MorFødselFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                        <Block padBottom="l">
                            <MorFødselFormComponents.RadioPanelGroup
                                name={MorFødselFormField.dekningsgrad}
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
                                legend="Hvor lang periode med foreldrepenger har dere valgt?"
                                description={
                                    <UtvidetInformasjon apneLabel="Les mer om lengden på foreldrepengeperioden">
                                        Den totale utbetalingen blir høyere hvis du velger 100 prosent. Valget gjelder
                                        dere begge, og kan ikke endres senere.
                                    </UtvidetInformasjon>
                                }
                                useTwoColumns={true}
                            />
                        </Block>
                        <Block padBottom="l" visible={visibility.isAnswered(MorFødselFormField.dekningsgrad)}>
                            <TilgjengeligeDagerGraf
                                erDeltUttak={erDeltUttak}
                                erFarEllerMedmor={false}
                                navnFarMedmor={navnFarMedmor}
                                navnMor={navnMor}
                                tilgjengeligeDager={tilgjengeligeDager}
                            />
                        </Block>
                        <Block padBottom="l" visible={visInfoOmPrematuruker === true}>
                            <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.informasjonPrematuruker"
                                    values={{
                                        antallprematuruker: Math.floor(ekstraDagerGrunnetPrematurFødsel! / 5),
                                        antallprematurdager: ekstraDagerGrunnetPrematurFødsel! % 5,
                                    }}
                                />
                            </Veilederpanel>
                        </Block>
                        <Block visible={visibility.isAnswered(MorFødselFormField.dekningsgrad)}>
                            <StartdatoPermisjonMor
                                permisjonStartdato={formValues.permisjonStartdato}
                                skalIkkeHaUttakFørTermin={formValues.skalIkkeHaUttakFørTermin}
                            />
                        </Block>
                        <Block
                            visible={
                                erAleneOmOmsorg === false &&
                                harRettPåForeldrepenger &&
                                visibility.isAnswered(MorFødselFormField.dekningsgrad)
                            }
                        >
                            <Block padBottom="l" visible={antallBarn > 1 && harSvartPåStartdato}>
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
                                visible={visibility.isVisible(MorFødselFormField.fellesperiodeukerMor)}
                            >
                                <FordelingFellesperiodeSpørsmål
                                    setFieldValue={setFieldValue}
                                    fellesperiodeukerMor={formValues.fellesperiodeukerMor || fellesperiodeukerMor}
                                    ukerFellesperiode={Math.floor(getAntallUkerFellesperiode(valgtStønadskonto))}
                                    mor={navnMor}
                                    farMedmor={navnFarMedmor}
                                    annenForelderErFarEllerMedmor={navnFarMedmor === annenForelderFornavn}
                                    antallUkerFedreKvote={getAntallUkerFedrekvote(valgtStønadskonto)}
                                    antallUkerMødreKvote={getAntallUkerMødrekvote(valgtStønadskonto)}
                                />
                            </Block>
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                        </Block>
                    </MorFødselFormComponents.Form>
                );
            }}
        />
    );
};

export default MorFødsel;
