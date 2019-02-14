import React from 'react';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import moment from 'moment';

import { Utsettelsesperiode } from 'app/types/uttaksplan/periodetyper';
import getMessage from 'common/util/i18nUtils';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

interface OwnProps {
    utsettelser: Utsettelsesperiode[];
}

type Props = OwnProps & InjectedIntlProps;

const translateÅrsak = (utsettelse: Utsettelsesperiode, intl: InjectedIntl) =>
    getMessage(intl, `utsettelsesårsak.${utsettelse.årsak}`).toLowerCase();

const formatDate = (date: Date) => moment(date).format('DD.MM');

const VeilederUtsettelseTilbakeITid = ({ utsettelser, intl }: Props) => {
    let veiledertekst = getMessage(intl, 'uttaksplan.veileder.planenAdvarerOmUtsettelser', {
        årsak: utsettelser.map((utsettelse) => translateÅrsak(utsettelse, intl)).join(', ')
    });

    if (utsettelser.length > 1) {
        veiledertekst += getMessage(intl, 'uttaksplan.veileder.planenAdvarerOmUtsettelser.flereUtsettelser');
        veiledertekst += utsettelser
            .map((utsettelse) =>
                getMessage(intl, 'uttaksplan.veileder.planenAdvarerOmUtsettelser.enAvFlereUtsettelser', {
                    fom: formatDate(utsettelse.tidsperiode.fom),
                    tom: formatDate(utsettelse.tidsperiode.tom),
                    årsak: utsettelse.årsak
                })
            )
            .join(', ')
            .concat('.');
    } else {
        veiledertekst += getMessage(intl, 'uttaksplan.veileder.planenAdvarerOmUtsettelser.enUtsettelse', {
            fom: formatDate(utsettelser[0].tidsperiode.fom),
            tom: formatDate(utsettelser[0].tidsperiode.tom)
        });
    }

    return <Veilederinfo type="advarsel">{veiledertekst}</Veilederinfo>;
};

export default injectIntl(VeilederUtsettelseTilbakeITid);
