import React, { FunctionComponent } from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { bemUtils } from '@navikt/fp-common';
import { Normaltekst } from 'nav-frontend-typografi';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { getVarighetString } from 'app/utils/dateUtils';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { StønadskontoUttak } from 'uttaksplan/types/StønadskontoUttak';
import { getStønadskontoNavn } from 'uttaksplan/utils/stønadskontoerUtils';
import StønadskontoIkon from 'uttaksplan/components/stønadskonto-ikon/StønadskontoIkon';
import './kontostatus.less';
import { Situasjon } from 'app/types/Situasjon';

export interface Props {
    uttak: StønadskontoUttak;
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
        <Normaltekst className={bem.block} tag="div">
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
                    {getStønadskontoNavn(
                        intl,
                        uttak.konto,
                        navnPåForeldre,
                        erFarEllerMedmor,
                        situasjon,
                        erAleneOmOmsorg
                    )}
                </div>
                <strong
                    className={kontoErOvertrukket ? bem.element('dagerOvertrukket') : bem.element('dager')}
                    data-name={uttak.konto}
                >
                    {kontoErOvertrukket ? `- ${varighetString}` : varighetString}
                </strong>
            </div>
        </Normaltekst>
    );
};

export default injectIntl(Kontostatus);
