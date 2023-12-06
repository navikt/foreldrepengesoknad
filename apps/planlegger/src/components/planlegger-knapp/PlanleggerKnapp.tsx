import { Button } from '@navikt/ds-react';

interface PlanleggerKnappProps {
    children?: JSX.Element | string;
    onClick?: () => void;
}

const PlanleggerKnapp = (props: PlanleggerKnappProps) => {
    const { children, onClick } = props;

    return (
        <Button variant="secondary" className="planleggerKnapp" onClick={onClick}>
            {children}
        </Button>
    );
};

export default PlanleggerKnapp;
