import { FunctionComponent } from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { bemUtils, NavnPåForeldre, Situasjon, StønadskontoType } from '@navikt/fp-common';
import { getVarighetString } from 'app/utils/dateUtils';
import { StønadskontoUttak } from 'types/StønadskontoUttak';
import { getStønadskontoNavn } from 'utils/stønadskontoerUtils';
import StønadskontoIkon from 'components/stønadskonto-ikon/StønadskontoIkon';
import { BodyShort } from '@navikt/ds-react';
import './kontostatus.less';

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
