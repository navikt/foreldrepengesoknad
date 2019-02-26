import React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';

import { Utsettelsesperiode, Uttaksperiode, UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Block from 'common/components/block/Block';

interface OwnProps {
    utsettelser: Utsettelsesperiode[];
    uttak: Uttaksperiode[];
}

type Props = OwnProps & InjectedIntlProps;

const VeilederUtsettelseTilbakeITid = ({ utsettelser, uttak, intl }: Props) => {
    const inneholderUtsettelsePgaFerie = utsettelser.some(
        (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Ferie
    );
    const inneholderUtsettelsePgaArbeid = utsettelser.some(
        (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Arbeid
    );
    const inneholderUttak = uttak.length > 0;

    return (
        <Veilederinfo type="advarsel">
            <Block margin={inneholderUtsettelsePgaArbeid ? 's' : 'none'} visible={inneholderUtsettelsePgaFerie}>
                <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUtsettelser.ferie" />
            </Block>

            <Block margin={inneholderUttak ? 's' : 'none'} visible={inneholderUtsettelsePgaArbeid}>
                <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUtsettelser.arbeid" />
            </Block>

            {uttak.length > 0 && <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUttak" />}
        </Veilederinfo>
    );
};

export default injectIntl(VeilederUtsettelseTilbakeITid);
