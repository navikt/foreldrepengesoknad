import { ForeldreparForelder, ForeldreparIllustrasjonsvariant } from '@navikt/fp-common';

import planBemUtils from '../../utils/planBemUtils';
import './foreldrepar.less';
import { getForeldreparIkon } from './foreldreparUtils';

interface Props {
    forelder1: ForeldreparForelder;
    forelder2?: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
    kompakt?: boolean;
}

const bem = planBemUtils('foreldrepar');

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const Foreldrepar: React.FunctionComponent<Props> = ({ forelder1, forelder2, variant, kompakt }) => {
    return (
        <div role="presentation" className={bem.classNames(bem.block, bem.modifierConditional('kompakt', kompakt))}>
            {getForeldreparIkon(
                forelder1,
                bem.classNames(
                    bem.element('firstParent'),
                    bem.modifierConditional('halfOpacity', variant === 'førsteForelderHalvtSynlig'),
                ),
                31,
                45,
            )}
            {forelder2 &&
                getForeldreparIkon(
                    forelder2,
                    bem.classNames(
                        bem.element('secondParent'),
                        bem.modifierConditional('halfOpacity', variant === 'andreForelderHalvtSynlig'),
                    ),
                    31,
                    45,
                )}
        </div>
    );
};

// eslint-disable-next-line import/no-default-export
export default Foreldrepar;
