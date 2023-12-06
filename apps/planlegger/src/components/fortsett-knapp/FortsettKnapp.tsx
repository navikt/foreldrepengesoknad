import './fortsettKnapp.less';
import { Button } from '@navikt/ds-react';

interface FortsettKnappProps {
    location?: string;
    children?: JSX.Element | string;
    onClick?: (e: SubmitEvent) => void;
}

const FortsettKnapp = (props: FortsettKnappProps) => {
    const { children } = props;

    return <Button className="fortsettKnapp">{children}</Button>;
};

export default FortsettKnapp;
