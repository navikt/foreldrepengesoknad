import * as React from 'react';
import { ButtonProps } from '@navikt/ds-react';
import './slettKnapp.less';
export interface SlettKnappProps extends ButtonProps {
    ariaLabel: string;
    onClick: () => void;
}
declare const SlettKnapp: React.FunctionComponent<SlettKnappProps>;
export default SlettKnapp;
