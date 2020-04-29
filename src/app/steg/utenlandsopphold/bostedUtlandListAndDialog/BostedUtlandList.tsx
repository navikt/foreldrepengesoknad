import React from 'react';
import { useIntl } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik';

import { BostedUtland } from './types';
import ActionLink from 'app/components/elementer/actionLink/ActionLink';
import ItemList from 'app/components/elementer/itemList/ItemList';
import BEMHelper from 'common/util/bem';
import { prettifyDateExtended } from 'app/util/dates/dates';

import './bostedUtlandList.less';

interface Props {
    bosteder: BostedUtland[];
    onEdit?: (opphold: BostedUtland) => void;
    onDelete?: (opphold: BostedUtland) => void;
}

const bem = BEMHelper('bostedUtlandList');

const BostedUtlandList: React.FunctionComponent<Props> = ({ bosteder, onDelete, onEdit }) => {
    const intl = useIntl();
    const renderBostedUtlandLabel = (opphold: BostedUtland): React.ReactNode => {
        const navn = getCountryName(opphold.landkode, intl.locale);
        return (
            <div className={bem.element('label')}>
                <span className={bem.element('land')}>
                    {onEdit && <ActionLink onClick={() => onEdit(opphold)}>{navn}</ActionLink>}
                    {!onEdit && <span>{navn}</span>}
                </span>
                <span className={bem.element('dato')}>
                    {prettifyDateExtended(opphold.fom)} - {prettifyDateExtended(opphold.tom)}
                </span>
            </div>
        );
    };

    return (
        <ItemList<BostedUtland>
            getItemId={(opphold) => opphold.id}
            getItemTitle={(opphold) => getCountryName(opphold.landkode, intl.locale)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderBostedUtlandLabel}
            items={bosteder}
        />
    );
};

export default BostedUtlandList;
