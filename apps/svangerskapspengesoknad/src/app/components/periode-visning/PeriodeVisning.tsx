import { FunctionComponent } from 'react';
import { TilretteleggingPeriode } from 'app/types/Tilrettelegging';
import { Block, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { BodyShort, Label } from '@navikt/ds-react';

import './periodeVisning.css';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

interface Props {
    periode: TilretteleggingPeriode;
    sisteDagForSvangerskapspenger: Date;
}

const PeriodeVisning: FunctionComponent<Props> = ({ periode, sisteDagForSvangerskapspenger }) => {
    const intl = useIntl();

    const tilTreUkerFørFødsel = dayjs(periode.tom).isSame(sisteDagForSvangerskapspenger);
    const labelText = tilTreUkerFørFødsel
        ? intlUtils(intl, 'oppsummering.periode.fraTil', {
              fraDato: formatDate(periode.fom),
              tilDato: formatDate(periode.tom),
          })
        : intlUtils(intl, 'oppsummering.periode.fraTilFødsel', {
              fraDato: formatDate(periode.fom),
          });
    let stillingsprosentText = intlUtils(intl, 'oppsummering.periode.stillingsprosent', {
        stillingsprosent: periode.stillingsprosent,
    });
    if (periode.stillingsprosent === 0) {
        stillingsprosentText = intlUtils(intl, 'oppsummering.periode.ikkeJobbe');
    }
    if (periode.stillingsprosent === periode.arbeidsforhold.opprinneligstillingsprosent) {
        stillingsprosentText = intlUtils(intl, 'oppsummering.periode.tilbakeIFullJobb');
    }
    const bem = bemUtils('periodeVisningInfoBox');

    return (
        <ul className={bem.element('periodeVisningList')}>
            <li>
                <div className={bem.block}>
                    <div className={bem.element('topRow')}>
                        <Label>{labelText}</Label>
                        <div className={bem.element('arbeidsgiverNavn')}>
                            <BodyShort>
                                <BodyShort>{periode.arbeidsforhold.navn.toUpperCase()}</BodyShort>
                            </BodyShort>
                        </div>
                    </div>
                    <Block padBottom="m">
                        <BodyShort className={bem.element('stillingsprosent')}>{stillingsprosentText}</BodyShort>
                    </Block>
                </div>
            </li>
        </ul>
    );
};

export default PeriodeVisning;
