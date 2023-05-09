import classNames from 'classnames';
import { SummaryError } from '../types/index';

import '../styles/validering-styles.less';
import { Component } from 'react';

interface Props {
    title: string;
    show: boolean;
    className?: string;
    errors: SummaryError[];
    onErrorClick?: (error: SummaryError, evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

const cls = (show: boolean, className?: string) =>
    classNames('feil-oppsummering-boks', className, {
        'feil-oppsummering-boks--visible': show,
    });

class Feiloppsummering extends Component<Props, unknown> {
    element: HTMLElement | null = null;
    componentDidMount() {
        if (this.element) {
            this.element.focus();
        }
    }
    render() {
        const { className, show, errors, title, onErrorClick, ...other } = this.props;

        const listItems = errors.map((error) => {
            const link = '#' + error.name;
            return (
                <li key={error.name}>
                    <a
                        className="feil-oppsummering-boks__lenke"
                        href={link}
                        onClick={onErrorClick ? (evt) => onErrorClick(error, evt) : undefined}
                    >
                        {error.text as string}
                    </a>
                </li>
            );
        });

        return (
            <article
                ref={(node) => {
                    this.element = node;
                }}
                tabIndex={-1}
                className={cls(show, className)}
                {...other}
            >
                <h1 className="typo-undertittel">{title}</h1>
                <ul className="feil-oppsummering-boks__liste">{listItems}</ul>
            </article>
        );
    }
}

export default Feiloppsummering;
