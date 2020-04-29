import * as React from 'react';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import CustomSVG from 'common/components/customSvg/CustomSVG';
import BEMHelper from 'common/util/bem';
import { default as Etikett, EtikettBaseProps } from 'nav-frontend-etiketter';
import { injectIntl, IntlShape } from 'react-intl';

import './interactiveListElement.less';
import getMessage from 'common/util/i18nUtils';
const pencil = require('./pencil.svg').default;

export interface InteractiveListElementProps {
    onEdit: () => void;
    onDelete: () => void;
    editButtonAriaText?: string;
    deleteButtonAriaText?: string;
}

interface IntlProp {
    intl: IntlShape;
}

interface AllListElementProps extends InteractiveListElementProps {
    title: string;
    text: string;
    deleteLinkText: string;
    etikettProps?: EtikettBaseProps;
}

const bem = BEMHelper('interactiveListElement');

class InteractiveListElement extends React.Component<AllListElementProps & IntlProp> {
    render() {
        const {
            title,
            text,
            deleteLinkText,
            etikettProps,
            deleteButtonAriaText,
            editButtonAriaText,
            onDelete,
            onEdit,
            intl,
        } = this.props;
        return (
            <li className={bem.block}>
                <div className={bem.element('top')}>
                    <Normaltekst className="title">{title}</Normaltekst>
                    <button
                        type="button"
                        className={bem.element('editButton')}
                        onClick={onEdit}
                        aria-label={editButtonAriaText || getMessage(intl, 'rediger')}
                    >
                        <CustomSVG className={bem.element('editButton__icon')} iconRef={pencil} size={24} />
                    </button>
                </div>
                <Normaltekst className={bem.element('text')}>{text}</Normaltekst>
                <div className={bem.element('bottom')}>
                    {etikettProps !== undefined && <Etikett {...etikettProps} />}
                    <button
                        className={bem.element('deleteButton')}
                        onClick={onDelete}
                        type="button"
                        aria-label={deleteButtonAriaText}
                    >
                        {deleteLinkText}
                    </button>
                </div>
            </li>
        );
    }
}

export default injectIntl(InteractiveListElement);
