import BEMHelper from 'common/util/bem';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';

import './infoToggler.less';

const cls = BEMHelper('infoToggler');

interface Props {
    children: React.ReactNode;
    onToggle: () => void;
    apen?: boolean;
}

const InfoToggler = (props: Props) => {
    const { apen = false, children, onToggle } = props;
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
                <span className={cls.element('chevron')}>{apen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
            </span>
        </button>
    );
};

export default InfoToggler;
