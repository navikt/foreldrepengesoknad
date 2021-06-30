import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import actionCreator from 'app/context/action/actionCreator';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { FarMedmorAleneomsorgFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import SøknadRoutes from 'app/routes/routes';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { Forelder } from 'app/types/Forelder';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { formaterDatoUtenDag } from 'app/utils/dateUtils';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getValgtStønadskontoMengde } from 'app/utils/stønadskontoUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import {
    FarMedmorAleneomsorgFødselFormComponents,
    FarMedmorAleneomsorgFødselFormData,
    FarMedmorAleneomsorgFødselFormField,
} from './farMedmorAleneomsorgFødselFormConfig';
import farMedmorAleneomsorgFødselAdopsjonQuestionsConfig from './farMedmorAleneomsorgFødselQuestionsConfig';
import {
    getInitialFarMedmorAleneomsorgFødselValues,
    mapFarMedmorAleneomsorgFødselFormToState,
} from './farMedmorAleneomsorgFødselUtils';
import { validateStartdatoUttakFarMedmorAleneomsorgFødsel } from './validation/farMedmorAleneomsorgFødselValidation';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const FarMedmorAleneomsorgFødsel: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
}) => {
    const { søkersituasjon, søker, annenForelder, barn } = useSøknad();
    const { person } = useSøkerinfo();
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const intl = useIntl();
    const navnFar = erFarEllerMedmor
        ? person.fornavn
        : isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.fornavn
        : '';
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const lagretUttaksplanInfo = useUttaksplanInfo<FarMedmorAleneomsorgFødselUttaksplanInfo>();

    const onValidSubmitHandler = (values: Partial<FarMedmorAleneomsorgFødselFormData>) => {
        const uttaksplanInfo: FarMedmorAleneomsorgFødselUttaksplanInfo = mapFarMedmorAleneomsorgFødselFormToState(
            values,
            familiehendelsesdato
        );
        return [actionCreator.setUttaksplanInfo(uttaksplanInfo)];
    };

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTTAKSPLAN);

    const shouldRender = erFødsel && erFarEllerMedmor && (!!søker.erAleneOmOmsorg || annenForelder.kanIkkeOppgis);

    if (!shouldRender) {
        return null;
    }

    return (
        <FarMedmorAleneomsorgFødselFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorAleneomsorgFødselValues(lagretUttaksplanInfo, familiehendelsesdato)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = farMedmorAleneomsorgFødselAdopsjonQuestionsConfig.getVisbility(formValues);
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

                return (
                    <FarMedmorAleneomsorgFødselFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block
                            padBottom="xxl"
                            visible={visibility.isVisible(FarMedmorAleneomsorgFødselFormField.dekningsgrad)}
                        >
                            <FarMedmorAleneomsorgFødselFormComponents.RadioPanelGroup
                                name={FarMedmorAleneomsorgFødselFormField.dekningsgrad}
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
                        <Block visible={formValues.dekningsgrad !== ''}>
                            <TilgjengeligeDagerGraf
                                erDeltUttak={false}
                                erFarEllerMedmor={true}
                                navnFarMedmor={navnFar}
                                navnMor=""
                                tilgjengeligeDager={tilgjengeligeDager}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={visibility.isVisible(
                                FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse
                            )}
                        >
                            <FarMedmorAleneomsorgFødselFormComponents.YesOrNoQuestion
                                name={FarMedmorAleneomsorgFødselFormField.startPåOmsorgsovertakelse}
                                legend={intlUtils(intl, 'uttaksplaninfo.startdatoAleneomsorgFarMedmor.spørsmål')}
                                labels={{
                                    yes: intlUtils(
                                        intl,
                                        'uttaksplaninfo.startdatoAdopsjon.alternativ.omsorgsovertakelse',
                                        {
                                            dato: formaterDatoUtenDag(ISOStringToDate(familiehendelsesdato)!),
                                        }
                                    ),
                                    no: intlUtils(intl, 'uttaksplaninfo.startdatoAleneomsorgFarMedmor.annenDato'),
                                }}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={visibility.isVisible(FarMedmorAleneomsorgFødselFormField.startdatoUttak)}
                        >
                            <FarMedmorAleneomsorgFødselFormComponents.DatePicker
                                name={FarMedmorAleneomsorgFødselFormField.startdatoUttak}
                                label="Startdato"
                                validate={validateStartdatoUttakFarMedmorAleneomsorgFødsel(intl, familiehendelsesdato)}
                                minDate={ISOStringToDate(familiehendelsesdato)}
                            />
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                        </Block>
                    </FarMedmorAleneomsorgFødselFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorAleneomsorgFødsel;
