import * as React from 'react';
const { EtikettLiten, Element } = require('nav-frontend-typografi');

import './displayTextWithLabel.less';

interface Props {
    label: string;
    text: string | string[];
}

const DisplayTextWithLabel: React.StatelessComponent<Props> = (props) => (
    <div className="textWithLabel">
        {props.label && <EtikettLiten className="textWithLabel__label">{props.label}</EtikettLiten>}
        {Array.isArray(props.text) &&
            props.text.map((textElement, index) => (
                <Element key={`${textElement}-${index}`} className="textWithLabel__text">
                    {textElement}
                </Element>
            ))}
        {!Array.isArray(props.text) && <Element className="textWithLabel__text">{props.text}</Element>}
    </div>
);
export default DisplayTextWithLabel;
