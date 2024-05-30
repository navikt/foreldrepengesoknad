import { FunctionComponent } from 'react';
import { IntlShape, injectIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { NavnPåForeldre, Situasjon, StønadskontoType, bemUtils, getVarighetString } from '@navikt/fp-common';
import { getStønadskontoNavn } from '@navikt/fp-common/src/common/utils/stønadskontoerUtils';
import { Stønadskonto } from '@navikt/fp-types';

import StønadskontoIkon from '../../stønadskonto-ikon/StønadskontoIkon';
import './kontostatus.less';

export interface Props {
    uttak: Stønadskonto;
    navnPåForeldre: NavnPåForeldre;
    erEndringssøknad: boolean;
    intl: IntlShape;
    erFarEllerMedmor: boolean;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
}

const bem = bemUtils('kontostatus');

const Kontostatus: FunctionComponent<Props> = ({
    uttak,
    navnPåForeldre,
    erEndringssøknad,
    intl,
    erFarEllerMedmor,
    situasjon,
    erAleneOmOmsorg,
}) => {
    if (erEndringssøknad && uttak.konto === StønadskontoType.ForeldrepengerFørFødsel) {
        uttak.dager = 0;
    }

    const varighetString = getVarighetString(uttak.dager, intl);
    const kontoErOvertrukket = uttak.dager < 0;

    return (
        <BodyShort className={bem.block} as="div">
            <div className={bem.element('ikon')} aria-hidden={true} role="presentation">
                <StønadskontoIkon
                    konto={uttak.konto}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    situasjon={situasjon}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                />
            </div>
            <div className={bem.element('content')}>
                <div className={kontoErOvertrukket ? bem.element('kontoOvertrukket') : bem.element('konto')}>
                    {getStønadskontoNavn(intl, uttak.konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg)}
                </div>
                <strong
                    className={kontoErOvertrukket ? bem.element('dagerOvertrukket') : bem.element('dager')}
                    data-name={uttak.konto}
                >
                    {kontoErOvertrukket ? `- ${varighetString}` : varighetString}
                </strong>
            </div>
        </BodyShort>
    );
};

export default injectIntl(Kontostatus);
