import * as React from 'react';
import * as classnames from 'classnames';

import './sirkelknapp.less';
import { guid } from 'nav-frontend-js-utils';
import AriaText from '../aria/AriaText';
import preventDoubleTapZoom from 'common/util/preventDoubleTapZoom';

export type Stil = 'hvit' | 'bla' | 'info';

export interface SirkelknappProps {
    /** Tekst som blir lest opp og satt som tittel på knappen */
    ariaLabel: string;
    /** Ikon som brukes inne i knappen */
    ikon: React.ReactNode;
    /** Funksjon som kalles knappen klikkes på */
    onClick: () => void;
    /** Om knappen er disabled eller ikke. Default false. */
    disabled?: boolean;
    /** Om knappen skal ha tilstanded pressed/valgt. Default false. */
    toggle?: {
        pressed: boolean;
    };
    /** Layout varianter */
    stil?: Stil;
    /** Størrelse - default normal */
    size?: 'normal' | 'stor';
    posisjoneringFraHøyre?: number;
}

const Sirkelknapp: React.StatelessComponent<SirkelknappProps> = ({
    onClick,
    ariaLabel,
    ikon,
    toggle,
    disabled,
    stil = 'info',
    size = 'normal',
    posisjoneringFraHøyre,
}) => {
    const labelId = guid();
    return (
        <button
            style={{ left: posisjoneringFraHøyre }}
            type="button"
            onClick={() => onClick()}
            onTouchStart={preventDoubleTapZoom}
            aria-labelledby={labelId}
            className={classnames(`sirkelknapp`, `sirkelknapp--${stil}`, `sirkelknapp--${size}`, {
                'sirkelknapp--pressed': toggle && toggle.pressed,
                'sirkelknapp--disabled': disabled,
            })}
            disabled={disabled}
            aria-pressed={toggle ? toggle.pressed : undefined}
        >
            <span className="sirkelknapp__ikon" role="presentation">
                {ikon}
            </span>
            <AriaText id={labelId}>{ariaLabel}</AriaText>
        </button>
    );
};

export default Sirkelknapp;
