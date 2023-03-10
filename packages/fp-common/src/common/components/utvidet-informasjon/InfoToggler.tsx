import { Collapse, Expand } from '@navikt/ds-icons';
import bemUtils from './../../utils/bemUtils';

import './infoToggler.less';

interface Props {
    children: React.ReactNode;
    onToggle: () => void;
    apen?: boolean;
}

const InfoToggler: React.FunctionComponent<Props> = ({ apen = false, children, onToggle }) => {
    const cls = bemUtils('infoToggler');

    return (
        <button
            className={cls.block}
            onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
                evt.stopPropagation();
                evt.preventDefault();
                onToggle();
            }}
            aria-expanded={apen}
        >
            <span className={cls.element('content')}>
                <span className={cls.element('label')}>{children}</span>
                <span className={cls.element('chevron')}>{apen ? <Collapse /> : <Expand />}</span>
            </span>
        </button>
    );
};

export default InfoToggler;
