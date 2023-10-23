import {
    NavnPåForeldre,
    Periode,
    Situasjon,
    bemUtils,
    formaterDato,
    getNavnGenitivEierform,
    getPeriodeTittel,
    guid,
} from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort, Label } from '@navikt/ds-react';

import './infoEksisterendePerioder.less';

interface Props {
    oppgittePerioder: Periode[];
    navnForOverskrift?: string;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const InfoEksisterendePerioder: FunctionComponent<Props> = ({
    oppgittePerioder,
    navnForOverskrift,
    navnPåForeldre,
    familiehendelsesdato,
    termindato,
    situasjon,
}) => {
    const intl = useIntl();
    const dateFormat = 'DD. MMM YYYY';
    const bem = bemUtils('infoEksisterendePerioder');

    return (
        <div className={bem.block}>
            {navnForOverskrift && (
                <BodyShort>
                    <FormattedMessage
                        id="eksisterendeSak.label.annenPartsPlan"
                        values={{
                            navn: getNavnGenitivEierform(navnForOverskrift, intl.locale),
                        }}
                    />
                </BodyShort>
            )}
            <ol className={bem.element('list')}>
                {oppgittePerioder.map((periode) => {
                    return (
                        <li key={guid()}>
                            <div className={bem.element('listInfo')}>
                                <Label className={bem.element('listInfoPeriode')}>
                                    <div>{formaterDato(periode.tidsperiode.fom, dateFormat)} -</div>
                                    <div>{formaterDato(periode.tidsperiode.tom, dateFormat)}:</div>
                                </Label>
                                <BodyShort>
                                    {getPeriodeTittel(
                                        intl,
                                        periode,
                                        navnPåForeldre,
                                        familiehendelsesdato,
                                        termindato,
                                        situasjon,
                                    )}
                                </BodyShort>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default InfoEksisterendePerioder;
