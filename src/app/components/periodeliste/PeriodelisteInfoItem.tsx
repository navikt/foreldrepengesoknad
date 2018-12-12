import * as React from 'react';
import { periodelisteBem } from './Periodeliste';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import AdvarselIkonÅpen from '../uttaksplan-ikon/ikoner/AdvarselIkonÅpen';
import { Normaltekst } from 'nav-frontend-typografi';
import Knapperad from 'common/components/knapperad/Knapperad';

export interface Props {
    ariaLabel: React.ReactNode;
    infoText: React.ReactNode;
    icon: React.ReactNode;
    buttons?: React.ReactNode[];
}

const PeriodelisteInfoItem: React.StatelessComponent<Props & InjectedIntlProps> = ({
    ariaLabel,
    infoText,
    buttons
}) => {
    return (
        <article className={periodelisteBem.element('infoItem')}>
            <h1 className="sr-only">{ariaLabel}</h1>
            <span className={periodelisteBem.element('infoItem__icon')} role="presentation">
                <AdvarselIkonÅpen />
            </span>
            <Normaltekst tag="span" className={periodelisteBem.element('infoItem__text')}>
                {infoText}
                {buttons &&
                    buttons.length > 0 && (
                        <div className={periodelisteBem.element('infoItem__buttons')}>
                            <Knapperad align="left">{buttons}</Knapperad>
                        </div>
                    )}
            </Normaltekst>
        </article>
    );
};
export default injectIntl(PeriodelisteInfoItem);
