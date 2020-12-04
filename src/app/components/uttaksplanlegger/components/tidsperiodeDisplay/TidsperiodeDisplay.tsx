import React from 'react';
import { RecursivePartial } from 'app/types/Partial';
import Block from 'common/components/block/Block';
import { Tidsperiode } from 'common/types';
import BEMHelper from 'common/util/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { formatDate } from 'app/util/dates/dates';

import './tidsperiodeDisplay.less';
import getMessage from 'common/util/i18nUtils';
import { IntlShape, useIntl } from 'react-intl';

interface Props {
    tidsperiode: RecursivePartial<Tidsperiode> | undefined;
    toggleVisTidsperiode: () => void;
}

const bem = BEMHelper('tidsperiodeDisplay');

const formaterTidsperiodeDato = (dato: RecursivePartial<Date> | undefined) => {
    if (dato) {
        return formatDate(dato as Date);
    }

    return 'Ingen valgt dato';
};

const renderTidsperiode = (tidsperiode: RecursivePartial<Tidsperiode> | undefined, intl: IntlShape) => {
    if (tidsperiode) {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '22rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                    <Element>{`${getMessage(intl, 'fraogmed')}:`}</Element>
                    <Normaltekst>{formaterTidsperiodeDato(tidsperiode.fom as Date)}</Normaltekst>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                    <Element>{`${getMessage(intl, 'tilogmed')}:`}</Element>
                    <Normaltekst>{formaterTidsperiodeDato(tidsperiode.tom as Date)}</Normaltekst>
                </div>
            </div>
        );
    }

    return 'Ingen valgt tidsperiode';
};

const TidsperiodeDisplay: React.FunctionComponent<Props> = ({ tidsperiode, toggleVisTidsperiode }) => {
    const intl = useIntl();

    return (
        <Block margin="xs">
            <Element>Tidsrom</Element>
            <div className={bem.block}>
                {renderTidsperiode(tidsperiode, intl)}
                <Lenke
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleVisTidsperiode();
                    }}
                >
                    Endre tidsrom
                </Lenke>
            </div>
        </Block>
    );
};

export default TidsperiodeDisplay;
