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
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import dayjs from 'dayjs';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const FarMedmorFødselFørsteganggsøknadBeggeHarRett: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer100DTO,
    tilgjengeligeStønadskontoer80DTO,
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
    const erMorUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erUfør : false;
    const familiehendelsesdatoDate = dayjs(familiehendelsesdato).toDate();

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarRett;

    if (!shouldRender) {
        return null;
    }

    return (
        <FarMedmorFødselBeggeHarRettFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorFødselBeggeHarRettValues()}
            onSubmit={() => null}
            renderForm={({ values: formValues }) => {
                const tilgjengeligeStønadskontoer = getValgtStønadskontoMengde(
                    formValues.dekningsgrad as Dekningsgrad,
                    tilgjengeligeStønadskontoer80DTO,
                    tilgjengeligeStønadskontoer100DTO,
                    familiehendelsesdato,
                    erMorUfør
                );
                const visibility = farMedmorFødselBeggeHarRettQuestionsConfig.getVisbility(formValues);

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
                                        label: intlUtils(intl, 'uttaksplaninfo.49Uker'),
                                        value: Dekningsgrad.HUNDRE_PROSENT,
                                    },
                                    {
                                        label: intlUtils(intl, 'uttaksplaninfo.59Uker'),
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
                        <Block padBottom="l" visible={formValues.dekningsgrad !== ''}>
                            <TilgjengeligeDagerGraf
                                erDeltUttak={true}
                                erFarEllerMedmor={true}
                                navnFarMedmor="Ola"
                                navnMor="Kari"
                                tilgjengeligeDager={getTilgjengeligeDager(tilgjengeligeStønadskontoer, true, undefined)}
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
                            <FarMedmorFødselBeggeHarRettFormComponents.DatePicker
                                name={FarMedmorFødselBeggeHarRettFormField.morsSisteDag}
                                label={intlUtils(intl, 'uttaksplaninfo.morSinSisteUttaksdag.label')}
                                maxDate={ISOStringToDate(
                                    uttaksplanDatoavgrensninger.morsSisteUttaksdag(familiehendelsesdatoDate).maxDate
                                )}
                                minDate={ISOStringToDate(
                                    uttaksplanDatoavgrensninger.morsSisteUttaksdag(familiehendelsesdatoDate).minDate
                                )}
                                showYearSelector={true}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={visibility.isVisible(FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag)}
                        >
                            <FarMedmorFødselBeggeHarRettFormComponents.DatePicker
                                name={FarMedmorFødselBeggeHarRettFormField.farMedmorsFørsteDag}
                                label={intlUtils(intl, 'uttaksplaninfo.farSinFørsteUttaksdagSpørsmål.label')}
                                maxDate={ISOStringToDate(
                                    uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdatoDate)
                                        .maxDate
                                )}
                                minDate={ISOStringToDate(
                                    uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdatoDate)
                                        .minDate
                                )}
                                showYearSelector={true}
                            />
                        </Block>
                    </FarMedmorFødselBeggeHarRettFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFødselFørsteganggsøknadBeggeHarRett;
