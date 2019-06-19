import React from 'react';
import { Søknadsinfo } from 'app/selectors/types';
import { Periode, TilgjengeligStønadskonto, Stønadskontouttak } from 'app/types/uttaksplan/periodetyper';
import { NavnPåForeldre } from 'common/types';
import Uttaksoppsummering from '../uttaksoppsummering/Uttaksoppsummering';
import BEMHelper from 'common/util/bem';
import { Undertittel } from 'nav-frontend-typografi';
import { getBrukteDager } from '../uttakFordeling/brukteDagerUtils';
import { getVarighetString } from 'common/util/intlUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Personkort from 'shared/components/personkort/Personkort';
import ForelderIkon from 'shared/components/foreldrepar/ForelderIkon';
import { getSituasjonForelderSvg } from 'shared/components/foreldrepar/foreldreparUtils';
import { getForeldreparSituasjonFraSøknadsinfo } from 'app/util/foreldreparSituasjonUtils';
import TilesList from 'app/components/elementer/tilesList/TilesList';

import './oversiktBrukteDager.less';
import getMessage from 'common/util/i18nUtils';

interface Props {
    søknadsinfo: Søknadsinfo;
    perioder: Periode[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttak: Stønadskontouttak[];
    navnPåForeldre: NavnPåForeldre;
}

const bem = BEMHelper('oversiktBrukteDager');

const OversiktBrukteDager: React.StatelessComponent<Props & InjectedIntlProps> = ({
    søknadsinfo,
    perioder,
    tilgjengeligeStønadskontoer,
    uttak,
    navnPåForeldre,
    intl
}) => {
    const situasjon = getForeldreparSituasjonFraSøknadsinfo(søknadsinfo);

    const {
        søker,
        søknaden: { erDeltUttak, familiehendelsesdato }
    } = søknadsinfo;

    const brukteDager = getBrukteDager(tilgjengeligeStønadskontoer, perioder, familiehendelsesdato);
    const info = getSituasjonForelderSvg(situasjon);

    return (
        <div className={bem.block}>
            <div className={bem.element('brukteDager')}>
                <Undertittel tag="h2" className="blokk-xs">
                    <FormattedMessage
                        id="oversiktBrukteDager.tittel.brukteDager"
                        values={{ antall: erDeltUttak ? 2 : 1 }}
                    />
                </Undertittel>
                <TilesList columns={'flex'}>
                    {(erDeltUttak || søker.erMor) && (
                        <Personkort ikon={<ForelderIkon forelder={info.mor} />} tittel={søknadsinfo.navn.mor.fornavn}>
                            <strong>{getVarighetString(brukteDager.mor.dagerTotalt, intl)}</strong>
                        </Personkort>
                    )}
                    {(erDeltUttak || søker.erFarEllerMedmor) && (
                        <Personkort
                            ikon={<ForelderIkon forelder={info.farMedmor} />}
                            tittel={søknadsinfo.navn.farMedmor.fornavn}>
                            <strong>{getVarighetString(brukteDager.farMedmor.dagerTotalt, intl)}</strong>
                        </Personkort>
                    )}
                </TilesList>
            </div>
            <div className={bem.element('ikkeBrukteDager')}>
                <Uttaksoppsummering
                    navnPåForeldre={navnPåForeldre}
                    uttak={uttak}
                    tittel={getMessage(intl, 'oversiktBrukteDager.tittel.ikkeBrukteDager', {
                        antall: erDeltUttak ? 2 : 1
                    })}
                />
            </div>
        </div>
    );
};

export default injectIntl(OversiktBrukteDager);
