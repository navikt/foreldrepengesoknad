import { BodyShort, Heading } from '@navikt/ds-react';

export interface DisplayTextWithLabelProps {
    label: string;
    text: string | string[];
}

const DisplayTextWithLabel: React.FunctionComponent<DisplayTextWithLabelProps> = (props) => (
    <div className="textWithLabel">
        {props.label && (
            <Heading size="xsmall" level="3">
                {props.label}
            </Heading>
        )}
        {Array.isArray(props.text) &&
            props.text.map((textElement, index) => (
                <BodyShort key={`${textElement}-${index}`}>{textElement}</BodyShort>
            ))}
        {!Array.isArray(props.text) && <BodyShort>{props.text}</BodyShort>}
    </div>
);
export default DisplayTextWithLabel;
