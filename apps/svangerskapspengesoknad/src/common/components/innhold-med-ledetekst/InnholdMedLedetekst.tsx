import { BodyShort, Label } from '@navikt/ds-react';
import { guid } from '@navikt/fp-common';

interface InnholdMedLedetekstProps {
    ledetekst: string;
    children: JSX.Element | JSX.Element[];
    className?: string;
}

const hasListOfChildren = (children: string | string[]): boolean => (Array.isArray(children) ? true : false);

const InnholdMedLedetekst: React.FunctionComponent<InnholdMedLedetekstProps> = ({ ledetekst, children, className }) => {
    return (
        <div className={className}>
            <BodyShort>{ledetekst}</BodyShort>
            {!Array.isArray(children) && hasListOfChildren((children as JSX.Element).props.children)
                ? (children as JSX.Element).props.children.map((child: string) => (
                      <Label className="feltoppsummering__verdi" key={guid()}>
                          {child}
                      </Label>
                  ))
                : children}
        </div>
    );
};

export default InnholdMedLedetekst;
