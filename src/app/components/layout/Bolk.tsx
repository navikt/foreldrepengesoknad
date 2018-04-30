import * as React from 'react';

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
            <h1 className="bolk__tittel">{tittel || 'bolk'}</h1>
            {render && render()}
        </section>
    );
};

export default Bolk;
