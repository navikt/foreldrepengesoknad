import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import classnames from 'classnames';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import SlettKnapp from '../slett-knapp/SlettKnapp';
import getMessage from '../../util/i18nUtils';
import { ISODateToMaskedInput } from '../../util/dates';
import { UtenlandsoppholdPeriode } from '../../types/søknad/Utenlandsopphold';
import LinkButton from '../link-button/LinkButton';

import './utenlandsoppholdPeriodeListeElement.less';

interface UtenlandsoppholdPeriodeListeElementProps {
    periode: UtenlandsoppholdPeriode;
    onTrashClick?: (periode: UtenlandsoppholdPeriode) => void;
    onLinkClick?: (periode: UtenlandsoppholdPeriode) => void;
}

type Props = UtenlandsoppholdPeriodeListeElementProps & InjectedIntlProps;

const UtenlandsoppholdPeriodeListeElement: React.StatelessComponent<Props> = (
    props
) => {
    const { varighet, land } = props.periode;
    const { onTrashClick, onLinkClick } = props;
    const onEditClickHandler = () => {
        if (onLinkClick !== undefined) {
            onLinkClick(props.periode);
        }
    };

    return (
        <li
            className={classnames('utenlandsoppholdPeriodeListeElement', {
                utenlandsoppholdPeriodeListeElement__editable:
                    onLinkClick !== undefined
            })}>
            <div className="utenlandsoppholdPeriodeListeElement__stay">
                <LinkButton onClick={onEditClickHandler}>
                    <div className="utenlandsoppholdPeriodeListeElement__navnOgDato">
                        <div className="utenlandsoppholdPeriodeListeElement__land">
                            {countries.getName(land, 'nb')}
                        </div>
                        <div className="utenlandsoppholdPeriodeListeElement__dato">
                            {getMessage(props.intl, 'tidsintervall', {
                                fom: ISODateToMaskedInput(varighet.fom),
                                tom: ISODateToMaskedInput(varighet.tom)
                            })}
                        </div>
                    </div>
                </LinkButton>
            </div>
            {onTrashClick && (
                <span className="utenlandsoppholdPeriodeListeElement__slettIkon">
                    <SlettKnapp
                        ariaLabel="Slett utenlandsopphold"
                        onClick={() => onTrashClick(props.periode)}
                    />
                </span>
            )}
        </li>
    );
};

export default injectIntl(UtenlandsoppholdPeriodeListeElement);
