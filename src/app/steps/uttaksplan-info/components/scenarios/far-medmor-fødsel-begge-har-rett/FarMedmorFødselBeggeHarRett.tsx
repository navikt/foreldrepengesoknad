import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import React, { FunctionComponent } from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';
import { getNavnGenitivEierform } from 'app/utils/personUtils';
import { Block, UtvidetInformasjon } from '@navikt/fp-common';
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
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepenger
        : false;
    const erMorUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erUfør : false;
    const familiehendelsesdato = getFamiliehendelsedato(barn);

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
                                        label: '49 uker med 100 prosent foreldrepenger',
                                        value: Dekningsgrad.HUNDRE_PROSENT,
                                    },
                                    {
                                        label: '59 uker med 80 prosent foreldrepenger',
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
                    </FarMedmorFødselBeggeHarRettFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFødselFørsteganggsøknadBeggeHarRett;
