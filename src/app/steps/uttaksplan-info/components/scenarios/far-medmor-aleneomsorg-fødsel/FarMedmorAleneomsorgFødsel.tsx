import { Block, intlUtils } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import actionCreator from 'app/context/action/actionCreator';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { FarMedmorAleneomsorgFødselUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import SøknadRoutes from 'app/routes/routes';
import { Forelder } from 'app/types/Forelder';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { formaterDatoUtenDag } from 'app/utils/dateUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
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
    const { søkersituasjon, søker, annenForelder, barn, dekningsgrad } = useSøknad();
    const { person } = useSøkerinfo();
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const intl = useIntl();

    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const lagretUttaksplanInfo = useUttaksplanInfo<FarMedmorAleneomsorgFødselUttaksplanInfo>();

    const onValidSubmitHandler = (values: Partial<FarMedmorAleneomsorgFødselFormData>) => {
        const uttaksplanInfo: FarMedmorAleneomsorgFødselUttaksplanInfo = mapFarMedmorAleneomsorgFødselFormToState(
            values,
            familiehendelsesdato
        );
        return [
            actionCreator.setUttaksplanInfo(uttaksplanInfo),
            actionCreator.setDekningsgrad(getDekningsgradFromString(values.dekningsgrad)),
        ];
    };

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTTAKSPLAN);

    const shouldRender = erFødsel && erFarEllerMedmor && (!!søker.erAleneOmOmsorg || annenForelder.kanIkkeOppgis);

    if (!shouldRender) {
        return null;
    }

    const navnFar = erFarEllerMedmor
        ? person.fornavn
        : isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.fornavn
        : '';

    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
        familiehendelsesdato,
        erMorUfør
    );

    return (
        <FarMedmorAleneomsorgFødselFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorAleneomsorgFødselValues(
                lagretUttaksplanInfo,
                familiehendelsesdato,
                dekningsgrad
            )}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = farMedmorAleneomsorgFødselAdopsjonQuestionsConfig.getVisbility(formValues);

                const valgtStønadskonto = tilgjengeligeStønadskontoer[formValues.dekningsgrad];

                return (
                    <FarMedmorAleneomsorgFødselFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block
                            padBottom="xxl"
                            visible={visibility.isVisible(FarMedmorAleneomsorgFødselFormField.dekningsgrad)}
                        >
                            <DekningsgradSpørsmål
                                FormKomponent={FarMedmorAleneomsorgFødselFormComponents}
                                dekningsgradFeltNavn={FarMedmorAleneomsorgFødselFormField.dekningsgrad}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                            />
                        </Block>
                        <Block visible={formValues.dekningsgrad !== ''}>
                            {valgtStønadskonto && (
                                <TilgjengeligeDagerGraf
                                    erDeltUttak={false}
                                    erFarEllerMedmor={true}
                                    navnFarMedmor={navnFar}
                                    navnMor=""
                                    tilgjengeligeDager={getTilgjengeligeDager(
                                        valgtStønadskonto,
                                        false,
                                        Forelder.farMedmor
                                    )}
                                />
                            )}
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
