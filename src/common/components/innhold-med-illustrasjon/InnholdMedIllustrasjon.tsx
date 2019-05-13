import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './innholdMedIllustrasjon.less';

interface Props {
    tittel: string;
    illustrasjoner?: React.ReactNode;
}

const bem = BEMHelper('innholdMedIllustrasjon');

const InnholdMedIllustrasjon: React.StatelessComponent<Props> = ({ tittel, illustrasjoner, children }) => (
    <div
        className={bem.classNames(
            bem.block,
            bem.modifierConditional('medIllustrasjoner', illustrasjoner !== undefined)
        )}>
        <div className={bem.element('contentWrapper')}>
            <header>
                <Systemtittel tag="h3" className={bem.element('tittel')}>
                    {tittel}
                </Systemtittel>
            </header>
            <div className={bem.element('content')}>{children}</div>
        </div>
        {illustrasjoner && (
            <div className={bem.element('illustrasjoner')} role="presentation" aria-hidden={true}>
                {React.Children.map(illustrasjoner, (ill, index) => (
                    <div className={bem.element('illustrasjon')} key={index}>
                        {ill}
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default InnholdMedIllustrasjon;
