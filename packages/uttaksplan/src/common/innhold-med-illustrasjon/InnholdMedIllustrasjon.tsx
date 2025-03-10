import { Children } from 'react';

import { Heading } from '@navikt/ds-react';

import { guid } from '../../utils/guid';
import planBemUtils from '../../utils/planBemUtils';
import './innholdMedIllustrasjon.less';

interface Props {
    tittel: string;
    illustrasjoner?: React.ReactNode;
    infoboks?: React.ReactNode;
    children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const InnholdMedIllustrasjon: React.FunctionComponent<Props> = ({ tittel, illustrasjoner, infoboks, children }) => {
    const bem = planBemUtils('innholdMedIllustrasjon');

    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('medIllustrasjoner', illustrasjoner !== undefined),
            )}
        >
            <div className={bem.element('contentWrapper')}>
                <div className={bem.element('headerWrapper')}>
                    <header>
                        <Heading size="medium" level="3" className={bem.element('tittel')}>
                            {tittel}
                        </Heading>
                        {infoboks !== undefined && infoboks}
                    </header>
                </div>
                <div className={bem.element('content')}>{children}</div>
            </div>
            {illustrasjoner && (
                <div className={bem.element('illustrasjoner')} role="presentation" aria-hidden={true}>
                    {Children.map(illustrasjoner, (ill) => (
                        <div className={bem.element('illustrasjon')} key={guid()}>
                            {ill}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// eslint-disable-next-line import/no-default-export
export default InnholdMedIllustrasjon;
