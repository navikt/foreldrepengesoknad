import React from 'react';
import Block from 'common/components/block/Block';
import { Tidsperiode } from 'common/types';
import BEMHelper from 'common/util/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import './tidsperiodeDisplay.less';
import getMessage from 'common/util/i18nUtils';
import { IntlShape, useIntl } from 'react-intl';
import { formatDate } from '@navikt/fp-common';

interface Props {
    tidsperiode: Partial<Tidsperiode> | undefined;
    toggleVisTidsperiode: () => void;
}

const bem = BEMHelper('tidsperiodeDisplay');

const formaterTidsperiodeDato = (dato: Date | undefined) => {
    if (dato) {
        return formatDate(dato);
    }

    return 'Ingen valgt dato';
};

const renderTidsperiode = (tidsperiode: Partial<Tidsperiode> | undefined, intl: IntlShape) => {
    if (tidsperiode) {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '22rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                    <Element>{`${getMessage(intl, 'fraogmed')}:`}</Element>
                    <Normaltekst>{formaterTidsperiodeDato(tidsperiode.fom)}</Normaltekst>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                    <Element>{`${getMessage(intl, 'tilogmed')}:`}</Element>
                    <Normaltekst>{formaterTidsperiodeDato(tidsperiode.tom)}</Normaltekst>
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
