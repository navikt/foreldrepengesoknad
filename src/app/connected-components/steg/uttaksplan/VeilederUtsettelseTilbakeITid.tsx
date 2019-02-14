import React from 'react';
import { InjectedIntlProps, injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';

import { Utsettelsesperiode, Uttaksperiode } from 'app/types/uttaksplan/periodetyper';
import getMessage from 'common/util/i18nUtils';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { dagOgMåned } from 'common/util/datoUtils';

interface OwnProps {
    utsettelser: Utsettelsesperiode[];
    uttak: Uttaksperiode[];
}

type Props = OwnProps & InjectedIntlProps;

const translateÅrsak = (utsettelse: Utsettelsesperiode, intl: InjectedIntl) =>
    getMessage(intl, `utsettelsesårsak.${utsettelse.årsak}`).toLowerCase();

const VeilederUtsettelseTilbakeITid = ({ utsettelser, intl }: Props) => {
    let content;
    if (utsettelser.length > 1) {
        content = (
            <>
                <FormattedMessage id="uttaksplan.veileder.planenAdvarerOmUtsettelser.flereUtsettelser" />
                {utsettelser
                    .map((utsettelse) => (
                        <FormattedMessage
                            id="uttaksplan.veileder.planenAdvarerOmUtsettelser.enAvFlereUtsettelser"
                            values={{
                                fom: dagOgMåned(utsettelse.tidsperiode.fom),
                                tom: dagOgMåned(utsettelse.tidsperiode.tom),
                                årsak: utsettelse.årsak
                            }}
                        />
                    ))
                    .join(', ')
                    .concat('.')}
            </>
        );
    } else if (utsettelser.length === 1) {
        content = (
            <FormattedMessage
                id="uttaksplan.veileder.planenAdvarerOmUtsettelser.enUtsettelse"
                values={{
                    fom: dagOgMåned(utsettelser[0].tidsperiode.fom),
                    tom: dagOgMåned(utsettelser[0].tidsperiode.tom)
                }}
            />
        );
    }

    return (
        <Veilederinfo type="advarsel">
            <FormattedMessage
                id="uttaksplan.veileder.planenAdvarerOmUtsettelser"
                values={{
                    årsak: utsettelser.map((utsettelse) => translateÅrsak(utsettelse, intl)).join(', ')
                }}
            />
            {content}
        </Veilederinfo>
    );
};

export default injectIntl(VeilederUtsettelseTilbakeITid);
