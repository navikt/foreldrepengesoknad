import { ForeldreparForelder, ForeldreparIllustrasjonsvariant } from '../../types';
import bemUtils from '../../utils/bemUtils';
import { getForeldreparIkon } from './foreldreparUtils';

import './foreldrepar.less';

interface Props {
    forelder1: ForeldreparForelder;
    forelder2?: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
    kompakt?: boolean;
}

const bem = bemUtils('foreldrepar');

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

export default Foreldrepar;
