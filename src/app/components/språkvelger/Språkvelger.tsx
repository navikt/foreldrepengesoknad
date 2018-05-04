import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Språkkode } from '../../intl/types';

import './språkvelger.less';

interface Props {
    kode: Språkkode;
    setSpråkkode: (kode: Språkkode) => void;
}

const Språkvelger: React.StatelessComponent<Props & InjectedIntlProps> = ({
    intl,
    kode,
    setSpråkkode
}) => {
    return (
        <div className="sprakvelger">
            <a
                className="lenke"
                onClick={(evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    kode === 'nb' ? setSpråkkode('nn') : setSpråkkode('nb');
                }}
                href="#">
                {intl.formatMessage({
                    id: 'komponent.språkvelger.endreMålform'
                })}
            </a>
        </div>
    );
};
export default injectIntl(Språkvelger);
