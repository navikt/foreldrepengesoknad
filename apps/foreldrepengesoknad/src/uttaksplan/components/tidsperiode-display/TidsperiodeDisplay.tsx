import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { IntlShape, useIntl } from 'react-intl';
import { formatDate, Block, intlUtils, TidsperiodeDate, bemUtils } from '@navikt/fp-common';

import './tidsperiodeDisplay.less';

interface Props {
    tidsperiode: Partial<TidsperiodeDate> | undefined;
    toggleVisTidsperiode: () => void;
}

const bem = bemUtils('tidsperiodeDisplay');

const formaterTidsperiodeDato = (dato: Date | undefined) => {
    if (dato) {
        return formatDate(dato);
    }

    return 'Ingen valgt dato';
};

const renderTidsperiode = (tidsperiode: Partial<TidsperiodeDate> | undefined, intl: IntlShape) => {
    if (tidsperiode) {
        return (
            <div className={bem.element('dato-container')}>
                <div className={bem.element('dato')}>
                    <Element>{`${intlUtils(intl, 'fraogmed')}:`}</Element>
                    <Normaltekst>{formaterTidsperiodeDato(tidsperiode.fom)}</Normaltekst>
                </div>
                <div className={bem.element('dato')}>
                    <Element>{`${intlUtils(intl, 'tilogmed')}:`}</Element>
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
        <Block padBottom="l">
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
                    <Normaltekst>Endre tidsrom</Normaltekst>
                </Lenke>
            </div>
        </Block>
    );
};

export default TidsperiodeDisplay;
