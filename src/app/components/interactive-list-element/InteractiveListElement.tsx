import * as React from 'react';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import CustomSVG from 'common/components/custom-svg/CustomSVG';
import BEMHelper from 'common/util/bem';
import { default as Etikett, EtikettBaseProps } from 'nav-frontend-etiketter';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './interactiveListElement.less';
import getMessage from 'common/util/i18nUtils';
const pencil = require('./pencil.svg').default;

export interface InteractiveListElementProps {
    onEdit: () => void;
    onDelete: () => void;
}

interface AllListElementProps extends InteractiveListElementProps {
    title: string;
    text: string;
    deleteLinkText: string;
    etikettProps?: EtikettBaseProps;
}

const cls = BEMHelper('interactiveListElement');

class InteractiveListElement extends React.Component<
    AllListElementProps & InjectedIntlProps
> {
    render() {
        const {
            title,
            text,
            deleteLinkText,
            etikettProps,
            onDelete,
            onEdit,
            intl
        } = this.props;
        return (
            <li className={cls.className}>
                <div className={cls.element('top')}>
                    <Normaltekst className="title">{title}</Normaltekst>
                    <button
                        className="interactiveListElement__top__editButton"
                        onClick={onEdit}
                        {...{ 'aria-label': getMessage(intl, 'rediger') }}
                        type="button">
                        <CustomSVG
                            className="interactiveListElement__top__editButton__icon"
                            iconRef={pencil}
                            size={24}
                        />
                    </button>
                </div>
                <Normaltekst className={cls.element('text')}>
                    {text}
                </Normaltekst>
                <div className={cls.element('bottom')}>
                    {etikettProps !== undefined && (
                        <Etikett {...etikettProps} />
                    )}
                    <button
                        className="interactiveListElement__bottom__deleteButton"
                        onClick={onDelete}
                        type="button">
                        {deleteLinkText}
                    </button>
                </div>
            </li>
        );
    }
}

export default injectIntl(InteractiveListElement);
