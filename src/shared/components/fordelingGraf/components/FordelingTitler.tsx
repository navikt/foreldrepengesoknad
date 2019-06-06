import * as React from 'react';
import { InjectedIntl, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import ForelderIkon from 'shared/components/foreldrepar/ForelderIkon';
import { getVarighetString } from 'common/util/intlUtils';
import Varighet from 'common/components/varighet/Varighet';
import getMessage from 'common/util/i18nUtils';
import Personkort from 'shared/components/personkort/Personkort';
import HighlightContent from 'common/components/highlightContent/HighlightContent';
import { fordelingGrafBem } from '../FordelingGraf';
import { ForeldreparForelder } from 'shared/types';

interface TittelProps {
    navn: string;
    ikon: React.ReactNode;
    dager: number;
    dagerForMye: number;
    dagerForLite: number;
    invertert?: boolean;
    intl: InjectedIntl;
}

const Tittel: React.StatelessComponent<TittelProps> = ({
    navn,
    ikon,
    dager,
    dagerForLite,
    dagerForMye,
    invertert,
    intl
}) => {
    const tittelBem = fordelingGrafBem.child('tittel');

    const getTittelVarighet = (): React.ReactNode => {
        if (dagerForLite > 0) {
            return (
                <FormattedMessage
                    id="fordeling.status.person.forLite"
                    values={{ dager: getVarighetString(dagerForLite, intl, 'full') }}
                />
            );
        }
        if (dagerForMye) {
            return (
                <FormattedMessage
                    id="fordeling.status.person.forMye"
                    values={{ dager: getVarighetString(dagerForMye, intl, 'full') }}
                />
            );
        }
        return <Varighet dager={Math.abs(dager | 0)} separator={` ${getMessage(intl, 'common.varighet.og')} `} />;
    };

    return (
        <Personkort ikon={ikon} tittel={navn} invertert={invertert}>
            <div
                className={tittelBem.classNames(
                    tittelBem.element('dager'),
                    tittelBem.modifierConditional('formangedager', dagerForMye > 0)
                )}>
                <HighlightContent watchValue={dager} invalid={dager < 0}>
                    {getTittelVarighet()}
                </HighlightContent>
            </div>
        </Personkort>
    );
};

export interface FordelingTitlerProps {
    mor?: {
        navn: string;
        ikonRef: ForeldreparForelder;
        dagerTotalt: number;
        dagerForLite: number;
        dagerForMye: number;
    };
    farMedmor?: {
        navn: string;
        ikonRef: ForeldreparForelder;
        dagerTotalt: number;
        dagerForLite: number;
        dagerForMye: number;
    };
}

const FordelingTitler: React.StatelessComponent<FordelingTitlerProps & InjectedIntlProps> = ({
    mor,
    farMedmor,
    intl
}) => {
    return (
        <div className={fordelingGrafBem.element('titler')}>
            {mor && (
                <Tittel
                    navn={mor.navn}
                    ikon={<ForelderIkon forelder={mor.ikonRef} />}
                    dager={mor.dagerTotalt}
                    dagerForLite={mor.dagerForLite}
                    dagerForMye={mor.dagerForMye}
                    intl={intl}
                />
            )}
            {farMedmor && (
                <Tittel
                    navn={farMedmor.navn}
                    ikon={<ForelderIkon forelder={farMedmor.ikonRef} />}
                    dager={farMedmor.dagerTotalt}
                    dagerForLite={farMedmor.dagerForLite}
                    dagerForMye={farMedmor.dagerForMye}
                    invertert={!mor}
                    intl={intl}
                />
            )}
        </div>
    );
};

export default injectIntl(FordelingTitler);
