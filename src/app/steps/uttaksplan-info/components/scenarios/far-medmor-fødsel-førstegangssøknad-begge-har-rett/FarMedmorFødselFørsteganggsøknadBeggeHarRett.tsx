import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';
import { getNavnGenitivEierform } from 'app/utils/personUtils';
import { Block } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { FormattedMessage, useIntl } from 'react-intl';

const FarMedmorFødselFørsteganggsøknadBeggeHarRett = () => {
    const intl = useIntl();
    const { annenForelder, søkersituasjon } = useSøknad();
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepenger
        : false;

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarRett;

    if (!shouldRender) {
        return null;
    }

    return (
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
    );
};

export default FarMedmorFødselFørsteganggsøknadBeggeHarRett;
