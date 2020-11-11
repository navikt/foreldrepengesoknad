import React from 'react';
import { RecursivePartial } from 'app/types/Partial';
import Block from 'common/components/block/Block';
import { Tidsperiode } from 'common/types';
import BEMHelper from 'common/util/bem';
import { formaterDato } from 'common/util/datoUtils';
import { Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import './tidsperiodeDisplay.less';

interface Props {
    tidsperiode: RecursivePartial<Tidsperiode> | undefined;
    toggleVisTidsperiode: () => void;
}

const bem = BEMHelper('tidsperiodeDisplay');

const formaterTidsperiodeDato = (dato: RecursivePartial<Date> | undefined) => {
    if (dato) {
        return formaterDato(dato as Date);
    }

    return 'Ingen valgt dato';
};

const renderTidsperiode = (tidsperiode: RecursivePartial<Tidsperiode> | undefined) => {
    if (tidsperiode) {
        return `Fra ${formaterTidsperiodeDato(tidsperiode.fom as Date)} til ${formaterTidsperiodeDato(
            tidsperiode.tom as Date
        )}`;
    }

    return 'Ingen valgt tidsperiode';
};

const TidsperiodeDisplay: React.FunctionComponent<Props> = ({ tidsperiode, toggleVisTidsperiode }) => {
    return (
        <Block margin="xs">
            <div className={bem.block}>
                <Element>{renderTidsperiode(tidsperiode)}</Element>
                <Lenke
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleVisTidsperiode();
                    }}
                >
                    Endre periode
                </Lenke>
            </div>
        </Block>
    );
};

export default TidsperiodeDisplay;
