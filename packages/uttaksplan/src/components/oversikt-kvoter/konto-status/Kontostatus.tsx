import { FunctionComponent } from 'react';
import { IntlShape, injectIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { NavnPåForeldre, Situasjon } from '@navikt/fp-common';
import { KontoDto } from '@navikt/fp-types';

import { getVarighetString } from '../../../components/periodeliste-item-header/PeriodelisteItemHeader';
import planBemUtils from '../../../utils/planBemUtils';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';
import StønadskontoIkon from '../../stønadskonto-ikon/StønadskontoIkon';
import './kontostatus.less';

interface Props {
    uttak: KontoDto;
    navnPåForeldre: NavnPåForeldre;
    erEndringssøknad: boolean;
    intl: IntlShape;
    erFarEllerMedmor: boolean;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
}

const bem = planBemUtils('kontostatus');

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const Kontostatus: FunctionComponent<Props> = ({
    uttak,
    navnPåForeldre,
    erEndringssøknad,
    intl,
    erFarEllerMedmor,
    situasjon,
    erAleneOmOmsorg,
}) => {
    if (erEndringssøknad && uttak.konto === 'FORELDREPENGER_FØR_FØDSEL') {
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
// eslint-disable-next-line import/no-default-export
export default injectIntl(Kontostatus);
