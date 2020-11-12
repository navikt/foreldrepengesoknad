import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/util/bem';
import { useIntl } from 'react-intl';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';
import getMessage from 'common/util/i18nUtils';

import './varighet.less';

interface OwnProps {
    dager: number;
    separator?: React.ReactNode;
    layout?: 'vertical';
}

const bem = BEMHelper('varighet');

type Props = OwnProps;

const Varighet: React.FunctionComponent<Props> = ({ dager, layout, separator }) => {
    const intl = useIntl();
    const ud = getUkerOgDagerFromDager(dager);
    return (
        <span className={classNames(bem.block, layout ? bem.modifier(layout) : undefined)}>
            {dager < 0 ? (
                <span className={bem.element('uker')}>
                    <span className={bem.element('value')}>{dager}</span>
                    <span className={bem.element('title')}>
                        {getMessage(intl, 'common.varighet.dagerTekst', { dager })}
                    </span>
                </span>
            ) : (
                <>
                    {ud.uker > 0 && (
                        <span className={bem.element('uker')}>
                            <span className={bem.element('value')}>{ud.uker}</span>
                            <span className={bem.element('title')}>
                                {getMessage(intl, 'common.varighet.ukerTekst', { uker: ud.uker })}
                            </span>
                        </span>
                    )}
                    {ud.uker > 0 && ud.dager > 0 && (
                        <span className={bem.element('separator')}>{separator || ', '}</span>
                    )}
                    {(ud.dager > 0 || ud.uker === 0) && (
                        <span className={bem.element('dager')}>
                            <span className={bem.element('value')}>{ud.dager}</span>
                            <span className={bem.element('title')}>
                                {getMessage(intl, 'common.varighet.dagerTekst', { dager: ud.dager })}
                            </span>
                        </span>
                    )}
                </>
            )}
        </span>
    );
};

export default Varighet;
