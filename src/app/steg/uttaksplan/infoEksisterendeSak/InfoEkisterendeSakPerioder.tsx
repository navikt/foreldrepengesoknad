import * as React from 'react';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { FormattedHTMLMessage } from 'react-intl';
import { guid } from 'nav-frontend-js-utils';
import BEMHelper from 'common/util/bem';

import './infoEkisterendeSakPerioder.less';

interface InfoEkisterendeSakPerioderProps {
    ekisterendeSak: EksisterendeSak;
    navn: string;
}

const InfoEkisterendeSakPerioder: React.StatelessComponent<InfoEkisterendeSakPerioderProps> = ({
    ekisterendeSak,
    navn
}) => {
    const bem = BEMHelper('infoEkisterendeSakPerioder');
    return (
        <>
            <FormattedHTMLMessage
                id="ekisterendeSak.label.annenPartsPlan"
                values={{
                    navn
                }}
            />
            <ol className={bem.element('list')}>
                {ekisterendeSak.saksperioder!.map((periode) => (
                    <li key={guid()}>
                        <FormattedHTMLMessage
                            id="ekisterendeSak.listeElement.periode"
                            values={{
                                fom: periode.tidsperiode.fom.toDateString(),
                                tom: periode.tidsperiode.tom.toDateString(),
                                stønadskontotype: periode.stønadskontotype
                            }}
                        />
                    </li>
                ))}
            </ol>
        </>
    );
};

export default InfoEkisterendeSakPerioder;
