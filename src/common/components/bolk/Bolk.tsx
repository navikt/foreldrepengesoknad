import * as React from 'react';
import { Element } from 'nav-frontend-typografi';

interface Props {
    tittel?: string;
    render?: () => React.ReactNode;
    synlig?: boolean;
}

const Bolk: React.StatelessComponent<Props> = ({
    tittel,
    synlig = true,
    render
}) => {
    if (!synlig) {
        return null;
    }
    return (
        <section className="bolk">
            {tittel && (
                <Element tag="h1" className="bolk__tittel">
                    {tittel || 'bolk'}
                </Element>
            )}
            {render && render()}
        </section>
    );
};

export default Bolk;
