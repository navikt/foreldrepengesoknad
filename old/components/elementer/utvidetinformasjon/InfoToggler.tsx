import * as React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';

import BEMHelper from 'common/util/bem';

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
                <span className={cls.element('chevron')}>
                    <NavFrontendChevron type={apen ? 'opp' : 'ned'} />
                </span>
            </span>
        </button>
    );
};

export default InfoToggler;
