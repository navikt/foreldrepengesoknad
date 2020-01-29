import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './innholdMedIllustrasjon.less';

interface Props {
    tittel: string;
    illustrasjoner?: React.ReactNode;
    infoboks?: React.ReactNode;
}

const bem = BEMHelper('innholdMedIllustrasjon');

const InnholdMedIllustrasjon: React.StatelessComponent<Props> = ({ tittel, illustrasjoner, infoboks, children }) => (
    <div
        className={bem.classNames(
            bem.block,
            bem.modifierConditional('medIllustrasjoner', illustrasjoner !== undefined)
        )}
    >
        <div className={bem.element('contentWrapper')}>
            <div className={bem.element('headerWrapper')}>
                <header>
                    <Systemtittel tag="h2" className={bem.element('tittel')}>
                        {tittel}
                    </Systemtittel>
                    {infoboks !== undefined && infoboks}
                </header>
            </div>
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
