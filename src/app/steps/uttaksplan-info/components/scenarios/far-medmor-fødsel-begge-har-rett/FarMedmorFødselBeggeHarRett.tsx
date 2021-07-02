import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import React, { FunctionComponent } from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';
import { getNavnGenitivEierform } from 'app/utils/personUtils';
import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    FarMedmorFødselBeggeHarRettFormComponents,
    FarMedmorFødselBeggeHarRettFormField,
} from './farMedmorFødselBeggeHarRettFormConfig';
import { getInitialFarMedmorFødselBeggeHarRettValues } from './farMedmorFødselBeggeHarRettUtils';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getValgtStønadskontoMengde } from 'app/utils/stønadskontoUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import farMedmorFødselBeggeHarRettQuestionsConfig from './farMedmorFødselBeggeHarRettQuestionsConfig';
import MorsSisteDagSpørsmål from '../spørsmål/MorsSisteDagSpørsmål';
import FarMedmorsFørsteDag from '../spørsmål/FarMedmorsFørsteDag';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from '../spørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { Forelder } from 'app/types/Forelder';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
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
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const navnMor = erFarEllerMedmor && isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : person.fornavn;
    const navnFar = erFarEllerMedmor
        ? person.fornavn
        : isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.fornavn
        : '';
    const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarRett && eksisterendeSakAnnenPart === undefined;

    if (!shouldRender) {
        return null;
    }

    return (
        <FarMedmorFødselBeggeHarRettFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorFødselBeggeHarRettValues()}
            onSubmit={() => null}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = farMedmorFødselBeggeHarRettQuestionsConfig.getVisbility(formValues);
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
                            <FarMedmorFødselBeggeHarRettFormComponents.RadioPanelGroup
                                name={FarMedmorFødselBeggeHarRettFormField.dekningsgrad}
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
                                erDeltUttak={true}
                                erFarEllerMedmor={true}
                                navnFarMedmor={navnFar}
                                navnMor={navnMor}
                                tilgjengeligeDager={tilgjengeligeDager}
                            />
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
                                farMedmorsFørsteDag={FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag}
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
                            <AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål
                                FormComponents={FarMedmorFødselBeggeHarRettFormComponents}
                                ukerFieldName={FarMedmorFødselBeggeHarRettFormField.antallUkerFellesperiode}
                                dagerFieldName={FarMedmorFødselBeggeHarRettFormField.antallDagerFellesperiode}
                                antallDager={formValues.antallDagerFellesperiode}
                                antallUker={formValues.antallUkerFellesperiode}
                                setFieldValue={setFieldValue}
                                ukerMedFellesperiode={tilgjengeligeDager.dagerFelles / 5}
                            />
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
