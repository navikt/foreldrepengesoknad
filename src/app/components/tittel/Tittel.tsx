import * as React from 'react';
import Infoboks from 'common/components/infoboks/Infoboks';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './tittel.less';

export interface Props {
    tittel: string;
    info?: {
        tekst: string;
        rikTekst?: React.ReactNode;
    };
}

const bem = BEMHelper('tekstMedInfotekst');

const Tittel: React.StatelessComponent<Props> = ({ tittel, info }) => {
    return (
        <div className={bem.className}>
            <Element tag="div" className={bem.element('tekst')}>
                {tittel}
            </Element>
            {info && (
                <div className={bem.element('infotekst')}>
                    <Infoboks tekst={info.tekst}>{info.rikTekst || info.tekst}</Infoboks>
                </div>
            )}
        </div>
    );
};

export default Tittel;
