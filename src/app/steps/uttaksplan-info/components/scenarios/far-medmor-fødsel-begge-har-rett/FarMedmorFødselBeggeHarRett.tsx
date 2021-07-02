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
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';
import { getInitialFarMedmorFødselBeggeHarRettValues } from './farMedmorFødselBeggeHarRettUtils';
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

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    eksisterendeSakAnnenPart: EksisterendeSak | undefined;
}

const FarMedmorFødselFørsteganggsøknadBeggeHarRett: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
    eksisterendeSakAnnenPart,
}) => {
    const intl = useIntl();
    const { annenForelder, søkersituasjon, barn } = useSøknad();
    const { person } = useSøkerinfo();
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepenger
        : false;

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarRett && eksisterendeSakAnnenPart === undefined;

    if (!shouldRender) {
        return null;
    }

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

    return (
        <FarMedmorFødselBeggeHarRettFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorFødselBeggeHarRettValues()}
            onSubmit={() => null}
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
