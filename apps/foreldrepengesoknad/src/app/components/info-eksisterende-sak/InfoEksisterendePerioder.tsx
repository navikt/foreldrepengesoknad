import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Label } from '@navikt/ds-react';

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

import './infoEksisterendePerioder.less';
import dayjs from 'dayjs';

interface Props {
    oppgittePerioder: Periode[];
    navnForOverskrift?: string;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
    erFarEllerMedmor: boolean;
}

const InfoEksisterendePerioder: FunctionComponent<Props> = ({
    oppgittePerioder,
    navnForOverskrift,
    navnPåForeldre,
    familiehendelsesdato,
    termindato,
    situasjon,
    erFarEllerMedmor,
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
                                        dayjs(familiehendelsesdato).toDate(),
                                        termindato ? dayjs(termindato).toDate() : undefined,
                                        situasjon,
                                        erFarEllerMedmor,
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
