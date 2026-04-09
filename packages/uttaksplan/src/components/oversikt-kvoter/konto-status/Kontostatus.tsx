import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { KontoDto } from '@navikt/fp-types';

import planBemUtils from '../../../utils/planBemUtils';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';
import { getVarighetString } from '../../periodeliste-item-header/PeriodelisteItemHeader.tsx';
import StønadskontoIkon from '../../stønadskonto-ikon/StønadskontoIkon';
import './kontostatus.less';

interface Props {
    uttak: KontoDto;
    navnPåForeldre: NavnPåForeldre;
    erEndringssøknad: boolean;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
}

const bem = planBemUtils('kontostatus');

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const Kontostatus: FunctionComponent<Props> = ({
    uttak,
    navnPåForeldre,
    erEndringssøknad,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();
    if (erEndringssøknad && uttak.konto === 'FORELDREPENGER_FØR_FØDSEL') {
        //eslint-disable-next-line react-hooks/immutability -- Fiksar ikkje sidan denne koden blir sletta snart
        uttak.dager = 0;
    }

    const varighetString = getVarighetString(uttak.dager, intl);
    const kontoErOvertrukket = uttak.dager < 0;

    return (
        <BodyShort className={bem.block} as="div">
            <div className={bem.element('ikon')} aria-hidden={true}>
                <StønadskontoIkon
                    konto={uttak.konto}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
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

//eslint-disable-next-line import/no-default-export -- Fiksar ikkje sidan denne koden blir sletta snart
export default Kontostatus;
