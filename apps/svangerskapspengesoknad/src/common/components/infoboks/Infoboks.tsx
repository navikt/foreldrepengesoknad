import React, { useState, useEffect } from 'react';
import Sirkelknapp, { Stil } from 'common/components/sirkelknapp/Sirkelknapp';
import LukkInfoIkon from 'common/components/ikoner/LukkInfoIkon';
import InfoIkon from 'common/components/ikoner/InfoIkon';
import { Collapse } from 'react-collapse';
const classNames = require('classnames');
import getMessage from 'common/util/i18nUtils';
import { useIntl } from 'react-intl';

import './infoboks.less';

interface InfoboksProps {
    tekst: string | React.ReactNode;
    stil?: Stil;
    contentFullWidth?: boolean;
    fieldsetClsName?: string;
}

const Infoboks: React.FunctionComponent<InfoboksProps> = ({
    tekst,
    stil = 'info',
    contentFullWidth,
    fieldsetClsName,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [windowPos, setWindowPos] = useState<number>(0);
    const intl = useIntl();

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const getComponentSize = () => {
        const cls = fieldsetClsName ? fieldsetClsName : '';
        if (cls.length > 1) {
            const overskriftTilblockElement = document.querySelector('.' + cls + ' .skjema__legend');
            const overskriftTilblockElementBredde = overskriftTilblockElement
                ? overskriftTilblockElement.clientWidth + 16
                : 0;
            setWindowPos(overskriftTilblockElementBredde);
        }
    };

    useEffect(() => {
        getComponentSize();
        window.addEventListener('resize', getComponentSize);
        return () => {
            window.removeEventListener('resize', getComponentSize);
        };
    }, [getComponentSize]);

    const ikon = isExpanded ? <LukkInfoIkon /> : <InfoIkon />;

    return (
        <React.Fragment>
            <span className="infoboks__sirkel">
                <Sirkelknapp
                    posisjoneringFraHøyre={windowPos !== 0 ? windowPos : undefined}
                    stil={stil}
                    ariaLabel={getMessage(intl, 'infoboks.sirkeltekst')}
                    onClick={toggleIsExpanded}
                    ikon={ikon}
                    toggle={{ pressed: isExpanded }}
                />
            </span>
            <Collapse
                className={classNames('infoboks', {
                    'infoboks--open': isExpanded,
                    'infoboks__content--fullWidth': contentFullWidth,
                })}
                isOpened={isExpanded}
            >
                {isExpanded ? <div className="infoboks__wrapper typo-normal">{tekst}</div> : <span />}
            </Collapse>
        </React.Fragment>
    );
};
export default Infoboks;
