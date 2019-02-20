import React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';

import { Utsettelsesperiode, Uttaksperiode, UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

interface OwnProps {
    utsettelser: Utsettelsesperiode[];
    uttak: Uttaksperiode[];
}

type Props = OwnProps & InjectedIntlProps;

const VeilederUtsettelseTilbakeITid = ({ utsettelser, uttak, intl }: Props) => {
    const inneholderUtsettelsePgaFerie = utsettelser.find(
        (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Ferie
    );
    const inneholderUtsettelsePgaArbeid = utsettelser.find(
        (utsettelse) => utsettelse.årsak === UtsettelseÅrsakType.Arbeid
    );

    return (
        <Veilederinfo type="feil">
            {inneholderUtsettelsePgaFerie && (
                <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUtsettelser.ferie" />
            )}

            {inneholderUtsettelsePgaArbeid && (
                <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUtsettelser.arbeid" />
            )}

            {uttak.length > 0 && <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUttak" />}
        </Veilederinfo>
    );
};

export default injectIntl(VeilederUtsettelseTilbakeITid);
