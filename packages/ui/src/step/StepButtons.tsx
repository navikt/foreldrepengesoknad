import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { Button, HGrid } from '@navikt/ds-react';

import { StepFooter } from './page-step/step-footer/StepFooter';

interface Props {
    goToPreviousStep: () => void;
    nextButtonOnClick?: () => void;
    onFortsettSenere?: () => void;
    onAvsluttOgSlett?: () => void;
    isDisabledAndLoading?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    isNextButtonVisible?: boolean;
    isSendButton?: boolean;
    useSimplifiedTexts?: boolean;
    isJumpToEndButton?: boolean;
}

export const StepButtons = ({
    goToPreviousStep,
    nextButtonOnClick,
    onFortsettSenere,
    onAvsluttOgSlett,
    isDisabledAndLoading = false,
    isDisabled = false,
    isLoading = false,
    isNextButtonVisible = true,
    isSendButton = false,
    useSimplifiedTexts = false,
    isJumpToEndButton = false,
}: Props) => {
    return (
        <HGrid gap={{ xs: '4', sm: '8 4' }} columns={{ xs: 1, sm: 2 }} width={{ sm: 'fit-content' }}>
            <Button
                type="button"
                variant="secondary"
                onClick={goToPreviousStep}
                icon={<ArrowLeftIcon aria-hidden />}
                iconPosition="left"
                className="ax-sm:order-1 order-2"
            >
                {useSimplifiedTexts ? (
                    <FormattedMessage id="StepButtons.ForrigeSimple" />
                ) : (
                    <FormattedMessage id="StepButtons.Forrige" />
                )}
            </Button>
            {isNextButtonVisible ? (
                <Button
                    icon={isSendButton ? <PaperplaneIcon aria-hidden /> : <ArrowRightIcon aria-hidden />}
                    iconPosition="right"
                    type={nextButtonOnClick ? 'button' : 'submit'}
                    onClick={nextButtonOnClick}
                    disabled={isDisabled || isDisabledAndLoading}
                    loading={isLoading || isDisabledAndLoading}
                    className="ax-sm:order-2 order-1"
                >
                    {isSendButton && <FormattedMessage id={'StepButtons.Send'} />}
                    {!isSendButton && !useSimplifiedTexts && !isJumpToEndButton && (
                        <FormattedMessage id={'StepButtons.Neste'} />
                    )}
                    {!isSendButton && useSimplifiedTexts && !isJumpToEndButton && (
                        <FormattedMessage id={'StepButtons.NesteSimple'} />
                    )}
                    {isJumpToEndButton && !useSimplifiedTexts && (
                        <FormattedMessage id={'StepButtons.GåTilOppsummering'} />
                    )}
                    {isJumpToEndButton && useSimplifiedTexts && (
                        <FormattedMessage id={'StepButtons.GåTilOppsummeringSimple'} />
                    )}
                </Button>
            ) : (
                <div />
            )}
            <StepFooter onFortsettSenere={onFortsettSenere} onAvsluttOgSlett={onAvsluttOgSlett} />
        </HGrid>
    );
};
