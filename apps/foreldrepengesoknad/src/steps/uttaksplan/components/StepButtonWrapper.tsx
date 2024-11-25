import classNames from 'classnames';

import { bemUtils } from '@navikt/fp-utils';

import './step-button-wrapper.css';

type Props = {
    children: React.ReactNode;
    lastStep?: boolean;
    singleButton?: boolean;
};

export const StepButtonWrapper = ({ children, lastStep = false, singleButton = false }: Props) => {
    const bem = bemUtils('step-button-wrapper');

    return (
        <div
            className={classNames(
                bem.block,
                lastStep ? bem.modifier('last-step') : undefined,
                singleButton ? bem.modifier('single-button') : undefined,
            )}
        >
            {children}
        </div>
    );
};
