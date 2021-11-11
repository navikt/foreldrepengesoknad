import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import React, { FunctionComponent } from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';
import { getNavnGenitivEierform } from 'app/utils/personUtils';
import { Block, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    FarMedmorFødselBeggeHarRettFormComponents,
    FarMedmorFødselBeggeHarRettFormData,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';
import {
    getInitialFarMedmorFødselBeggeHarRettValues,
    mapFarMedmorFødselBeggeHarRettToState,
} from './farMedmorFødselBeggeHarRettUtils';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import farMedmorFødselBeggeHarRettQuestionsConfig from './farMedmorFødselBeggeHarRettQuestionsConfig';
import MorsSisteDagSpørsmål from '../spørsmål/MorsSisteDagSpørsmål';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from '../spørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { Forelder } from 'app/types/Forelder';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import { Hovedknapp } from 'nav-frontend-knapper';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import { FarMedmorFødselBeggeHarRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
}

const FarMedmorFødselFørsteganggsøknadBeggeHarRett: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
}) => {
    const intl = useIntl();
    const { annenForelder, søkersituasjon, barn, dekningsgrad } = useSøknad();
    const { person } = useSøkerinfo();
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const lagretUttaksplanInfo = useUttaksplanInfo<FarMedmorFødselBeggeHarRettUttaksplanInfo>();

    const navnFar = erFarEllerMedmor
        ? person.fornavn
        : isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.fornavn
        : '';
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const navnMor = erFarEllerMedmor && isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : person.fornavn;

    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);
    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
        familiehendelsesdato,
        erMorUfør
    );

    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);

    const onValidSubmitHandler = (values: Partial<FarMedmorFødselBeggeHarRettFormData>) => {
        return [
            actionCreator.setUttaksplanInfo(mapFarMedmorFødselBeggeHarRettToState(values)),
            actionCreator.setDekningsgrad(getDekningsgradFromString(values.dekningsgrad)),
            actionCreator.lagUttaksplanforslag(
                lagUttaksplan({
                    annenForelderErUfør: erMorUfør,
                    erDeltUttak: true,
                    erEndringssøknad: false,
                    erEnkelEndringssøknad: false,
                    familiehendelsesdato: familiehendelsesdatoDate!,
                    førsteUttaksdagEtterSeksUker: Uttaksdagen(familiehendelsesdatoDate!).leggTil(30),
                    situasjon: erFødsel ? 'fødsel' : 'adopsjon',
                    søkerErFarEllerMedmor: erFarEllerMedmor,
                    søkerHarMidlertidigOmsorg: false,
                    tilgjengeligeStønadskontoer:
                        tilgjengeligeStønadskontoer[getDekningsgradFromString(values.dekningsgrad)],
                    uttaksplanSkjema: {},
                })
            ),
        ];
    };
    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTTAKSPLAN);

    return (
        <FarMedmorFødselBeggeHarRettFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorFødselBeggeHarRettValues(lagretUttaksplanInfo, dekningsgrad)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = farMedmorFødselBeggeHarRettQuestionsConfig.getVisbility(formValues);

                const valgtStønadskonto = tilgjengeligeStønadskontoer[formValues.dekningsgrad];
                const tilgjengeligeDager = valgtStønadskonto
                    ? getTilgjengeligeDager(valgtStønadskonto, false, Forelder.farMedmor)
                    : undefined;

                return (
                    <FarMedmorFødselBeggeHarRettFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block padBottom="l">
                            <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.informasjonTilAnnenForelder"
                                    values={{
                                        navn: isAnnenForelderOppgitt(annenForelder)
                                            ? getNavnGenitivEierform(annenForelder.fornavn, intl.locale)
                                            : '',
                                    }}
                                />
                            </Veilederpanel>
                        </Block>
                        <Block padBottom="l">
                            <DekningsgradSpørsmål
                                FormKomponent={FarMedmorFødselBeggeHarRettFormComponents}
                                dekningsgradFeltNavn={FarMedmorFødselBeggeHarRettFormField.dekningsgrad}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                            />
                        </Block>
                        <Block visible={formValues.dekningsgrad !== ''}>
                            {tilgjengeligeDager && (
                                <TilgjengeligeDagerGraf
                                    erDeltUttak={true}
                                    erFarEllerMedmor={true}
                                    navnFarMedmor={navnFar}
                                    navnMor={navnMor}
                                    tilgjengeligeDager={tilgjengeligeDager}
                                />
                            )}
                        </Block>
                        <Block padBottom="l" visible={erFarEllerMedmor && formValues.dekningsgrad !== ''}>
                            <Veilederpanel svg={<VeilederNormal transparentBackground={true} />}>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.farMedmor.infoOmTidsromMellomMorsSisteDagOgFarsFørsteDag"
                                    values={{ navnMor }}
                                />
                            </Veilederpanel>
                        </Block>
                        <Block
                            padBottom="l"
                            visible={visibility.isVisible(FarMedmorFødselBeggeHarRettFormField.morsSisteDag)}
                        >
                            <MorsSisteDagSpørsmål
                                FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                fieldName={FarMedmorFødselBeggeHarRettFormField.morsSisteDag}
                                navnMor={navnMor}
                                familiehendelsesdato={familiehendelsesdato}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={visibility.isVisible(FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag)}
                        >
                            <FarMedmorsFørsteDag
                                FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                fieldName={FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag}
                                familiehendelsesdato={familiehendelsesdato}
                                setFieldValue={setFieldValue}
                                morsSisteDag={ISOStringToDate(formValues.morsSisteDag)}
                                navnMor={navnMor}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={visibility.isVisible(
                                FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode
                            )}
                        >
                            {tilgjengeligeDager && (
                                <AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål
                                    FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                    ukerFieldName={FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode}
                                    dagerFieldName={FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode}
                                    antallDager={formValues.antallDagerFellesperiode}
                                    antallUker={formValues.antallUkerFellesperiode}
                                    setFieldValue={setFieldValue}
                                    ukerMedFellesperiode={tilgjengeligeDager.dagerFelles / 5}
                                />
                            )}
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                        </Block>
                    </FarMedmorFødselBeggeHarRettFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFødselFørsteganggsøknadBeggeHarRett;
