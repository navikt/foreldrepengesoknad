import { IntlShape, useIntl } from 'react-intl';
import { formatDate, Block, intlUtils, TidsperiodeDate, bemUtils } from '@navikt/fp-common';
import { BodyShort, Label, Link } from '@navikt/ds-react';

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
                    <Label>{`${intlUtils(intl, 'fraogmed')}:`}</Label>
                    <BodyShort>{formaterTidsperiodeDato(tidsperiode.fom)}</BodyShort>
                </div>
                <div className={bem.element('dato')}>
                    <Label>{`${intlUtils(intl, 'tilogmed')}:`}</Label>
                    <BodyShort>{formaterTidsperiodeDato(tidsperiode.tom)}</BodyShort>
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
            <Label>Tidsrom</Label>
            <div className={bem.block}>
                {renderTidsperiode(tidsperiode, intl)}
                <Link
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleVisTidsperiode();
                    }}
                >
                    <BodyShort>Endre tidsrom</BodyShort>
                </Link>
            </div>
        </Block>
    );
};

export default TidsperiodeDisplay;
