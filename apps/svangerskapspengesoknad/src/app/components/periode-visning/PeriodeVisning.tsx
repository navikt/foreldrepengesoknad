import { FunctionComponent } from 'react';
import { TilretteleggingPeriode, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { Block, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { BodyShort, Label } from '@navikt/ds-react';

import './periodeVisning.css';
import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

interface Props {
    periode: TilretteleggingPeriode;
    sisteDagForSvangerskapspenger: Date;
    kanHaSvpFremTilTreUkerFørTermin: boolean;
}

const getDatoText = (
    intl: IntlShape,
    sisteDagForSvangerskapspenger: Date,
    periode: TilretteleggingPeriode,
    kanHaSvpFremTilTreUkerFørTermin: boolean,
) => {
    const varerTilSisteDagMedSvp = dayjs(periode.tom).isSame(sisteDagForSvangerskapspenger, 'd');

    if (!varerTilSisteDagMedSvp) {
        return intlUtils(intl, 'oppsummering.periode.fraTil', {
            fraDato: formatDate(periode.fom),
            tilDato: formatDate(periode.tom),
        });
    } else if (kanHaSvpFremTilTreUkerFørTermin) {
        return intlUtils(intl, 'oppsummering.periode.fremTilTreUkerFørTermin', {
            fraDato: formatDate(periode.fom),
        });
    } else {
        return intlUtils(intl, 'oppsummering.periode.fremTilFødsel', {
            fraDato: formatDate(periode.fom),
        });
    }
};

const getStillingsprosentTekst = (periode: TilretteleggingPeriode, intl: IntlShape): string => {
    if (periode.type === Tilretteleggingstype.HEL) {
        return intlUtils(intl, 'oppsummering.periode.tilbakeIFullJobb');
    }
    if (periode.type === Tilretteleggingstype.INGEN) {
        return intlUtils(intl, 'oppsummering.periode.ikkeJobbe');
    }
    return intlUtils(intl, 'oppsummering.periode.stillingsprosent', {
        stillingsprosent: periode.stillingsprosent,
    });
};

const PeriodeVisning: FunctionComponent<Props> = ({
    periode,
    sisteDagForSvangerskapspenger,
    kanHaSvpFremTilTreUkerFørTermin,
}) => {
    const intl = useIntl();
    const labelText = getDatoText(intl, sisteDagForSvangerskapspenger, periode, kanHaSvpFremTilTreUkerFørTermin);

    const stillingsprosentText = getStillingsprosentTekst(periode, intl);
    const bem = bemUtils('periodeVisningInfoBox');

    return (
        <div className={bem.block}>
            <div className={bem.element('topRow')}>
                <Label>{labelText}</Label>
                <div className={bem.element('arbeidsgiverNavn')}>
                    <BodyShort>{periode.arbeidsforhold.navn.toUpperCase()}</BodyShort>
                </div>
            </div>
            <Block padBottom="m">
                <BodyShort className={bem.element('stillingsprosent')}>{stillingsprosentText}</BodyShort>
            </Block>
        </div>
    );
};

export default PeriodeVisning;
