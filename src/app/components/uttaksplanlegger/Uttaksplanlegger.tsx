import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { Systemtittel } from 'nav-frontend-typografi';
import Periodeliste from '../periodeliste/Periodeliste';
import NyPeriodeBolk from '../../bolker/ny-periode-bolk/NyPeriodeBolk';

import './uttaksplanlegger.less';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import LinkButton from '../link-button/LinkButton';
import FamiliehendelsedatoInfo from './FamiliehendelsedatoInfo';
import { Søkersituasjon } from '../../types/søknad/Søknad';
import { Barn } from '../../types/søknad/Barn';
import { NavnPåForeldre } from 'common/types';

export interface Props {
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    uttaksplan: Periode[];
    navnPåForeldre: NavnPåForeldre;
    onAdd: (periode: Periode) => void;
    onUpdate?: (periode: Periode) => void;
    onDelete?: (periode: Periode) => void;
    onRequestReset?: () => void;
}

const BEM = BEMHelper('uttaksplanlegger');

class Uttaksplanlegger extends React.Component<Props, {}> {
    render() {
        const { søkersituasjon, barn, uttaksplan, navnPåForeldre, onAdd, onRequestReset } = this.props;
        return (
            <article className={BEM.className}>
                <header className={BEM.element('header')}>
                    <Systemtittel tag="h1" className={BEM.element('header__title')}>
                        Din uttaksplan
                    </Systemtittel>
                    {onRequestReset &&
                        uttaksplan.length > 0 && (
                            <div className={BEM.element('header__reset')}>
                                <LinkButton className={BEM.element('resetLink')} onClick={() => onRequestReset()}>
                                    Nullstill
                                </LinkButton>
                            </div>
                        )}
                    <span className={BEM.element('header__details')}>
                        <FamiliehendelsedatoInfo barn={barn} søkersituasjon={søkersituasjon} />
                    </span>
                </header>
                <Block visible={uttaksplan.length > 0}>
                    <Periodeliste perioder={uttaksplan} navnPåForeldre={navnPåForeldre} />
                </Block>
                <div className={BEM.element('addFormContainer')}>
                    <NyPeriodeBolk onSubmit={onAdd} />
                </div>
            </article>
        );
    }
}
export default Uttaksplanlegger;
