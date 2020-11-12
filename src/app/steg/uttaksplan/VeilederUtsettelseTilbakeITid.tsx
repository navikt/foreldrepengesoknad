import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Utsettelsesperiode, Uttaksperiode, UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import Block from 'common/components/block/Block';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';

interface Props {
    utsettelser: Utsettelsesperiode[];
    uttak: Uttaksperiode[];
}

const VeilederUtsettelseTilbakeITid: React.FunctionComponent<Props> = ({ utsettelser, uttak }: Props) => {
    const inneholderUtsettelsePgaFerie = utsettelser.some(
        (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Ferie
    );
    const inneholderUtsettelsePgaArbeid = utsettelser.some(
        (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Arbeid
    );
    const inneholderUttak = uttak.length > 0;

    return (
        <Veilederpanel svg={<Veileder farge="lilla" stil="kompakt" />}>
            <Block margin={inneholderUtsettelsePgaArbeid ? 's' : 'none'} visible={inneholderUtsettelsePgaFerie}>
                <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUtsettelser.ferie" />
            </Block>

            <Block margin={inneholderUttak ? 's' : 'none'} visible={inneholderUtsettelsePgaArbeid}>
                <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUtsettelser.arbeid" />
            </Block>

            {uttak.length > 0 && <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUttak" />}
        </Veilederpanel>
    );
};

export default VeilederUtsettelseTilbakeITid;
