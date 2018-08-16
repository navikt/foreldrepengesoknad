import * as React from 'react';

interface ListElementProps {
    title: string;
    text: string;
    deleteLinkText: string;
}

export default class ListElement extends React.Component<ListElementProps> {
    render() {
        const { title, text, deleteLinkText } = this.props;
        return (
            <li className="listElement">
                {title} {text} {deleteLinkText}
            </li>
        );
    }
}
