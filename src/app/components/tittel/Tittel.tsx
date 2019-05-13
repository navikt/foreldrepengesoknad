import * as React from 'react';
import Infoboks from 'common/components/infoboks/Infoboks';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './tittel.less';
import { Stil } from 'common/components/sirkelknapp/Sirkelknapp';

export interface Props {
    tittel: string;
    info?: {
        tekst: string | React.ReactNode;
        stil?: Stil;
    };
}

const bem = BEMHelper('tekstMedInfotekst');

const Tittel: React.StatelessComponent<Props> = ({ tittel, info }) => {
    return (
        <div className={bem.block}>
            <Element tag="div" className={bem.element('tekst')}>
                {tittel}
            </Element>
            {info && (
                <div className={bem.element('infotekst')}>
                    <Infoboks tekst={info.tekst} stil={info.stil} />
                </div>
            )}
        </div>
    );
};

export default Tittel;
