import React from 'react';
import { Søknadsinfo } from 'app/selectors/types';
import { Periode, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
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
import { Uttaksstatus } from 'app/util/uttaksplan/uttaksstatus';

import './oversiktBrukteDager.less';

interface Props {
    søknadsinfo: Søknadsinfo;
    perioder: Periode[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksstatus: Uttaksstatus;
    navnPåForeldre: NavnPåForeldre;
    morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg: boolean;
}

const bem = BEMHelper('oversiktBrukteDager');

const OversiktBrukteDager: React.StatelessComponent<Props & InjectedIntlProps> = ({
    søknadsinfo,
    perioder,
    tilgjengeligeStønadskontoer,
    uttaksstatus,
    navnPåForeldre,
    morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg,
    intl
}) => {
    const situasjon = getForeldreparSituasjonFraSøknadsinfo(søknadsinfo);

    const {
        søker,
        søknaden: { erDeltUttak, familiehendelsesdato, erEndringssøknad }
    } = søknadsinfo;

    const brukteDager = getBrukteDager(tilgjengeligeStønadskontoer, perioder, familiehendelsesdato);
    const info = getSituasjonForelderSvg(situasjon);

    return (
        <div className={bem.block}>
            <div className={bem.element('brukteDager')}>
                <Undertittel tag="h2" className="blokk-xs">
                    <FormattedMessage id="oversiktBrukteDager.tittel.foreldre" />
                </Undertittel>
                <TilesList columns={'flex'}>
                    {((erDeltUttak && !morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg) || søker.erMor) && (
                        <Personkort ikon={<ForelderIkon forelder={info.mor} />} tittel={søknadsinfo.navn.mor.fornavn}>
                            <strong>{getVarighetString(brukteDager.mor.dagerTotalt, intl)}</strong>
                        </Personkort>
                    )}
                    {((erDeltUttak && !morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg) ||
                        søker.erFarEllerMedmor) && (
                        <Personkort
                            ikon={<ForelderIkon forelder={info.farMedmor} />}
                            tittel={søknadsinfo.navn.farMedmor.fornavn}
                        >
                            <strong>{getVarighetString(brukteDager.farMedmor.dagerTotalt, intl)}</strong>
                        </Personkort>
                    )}
                </TilesList>
            </div>
            <div className={bem.element('ikkeBrukteDager')}>
                <Uttaksoppsummering
                    navnPåForeldre={navnPåForeldre}
                    uttaksstatus={uttaksstatus}
                    erDeltUttak={erDeltUttak && !morHarAleneomsorgMenFarmedmorHarMidlertidligOmsorg}
                    erEndringssøknad={erEndringssøknad}
                />
            </div>
        </div>
    );
};

export default injectIntl(OversiktBrukteDager);
