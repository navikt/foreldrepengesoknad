import { FunctionComponent } from 'react';
import BEMHelper from 'common/util/bem';

import { UferdigTilrettelegging, Tilretteleggingstype, Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getArbeidsforholdNavnFromId } from 'app/utils/arbeidsforholdUtils';
import { FormattedMessage } from 'react-intl';
import OppsummeringBeskrivelse from '../OppsummeringBeskrivelse';
import Block from 'common/components/block/Block';

import './tilretteleggingOppsummering.less';
import { BodyShort } from '@navikt/ds-react';
import { guid } from '@navikt/fp-common';
import dayjs from 'dayjs';

const cls = BEMHelper('tilretteleggingOppsummering');

interface Props {
    tilrettelegging: UferdigTilrettelegging[];
    arbeidsforhold: Arbeidsforhold[];
}

const TilretteleggingOppsummering: FunctionComponent<Props> = ({ tilrettelegging, arbeidsforhold }) => {
    return (
        <>
            {tilrettelegging.map((tilrett: UferdigTilrettelegging) => (
                <div key={guid()} className={cls.element('container')}>
                    <BodyShort>
                        {getArbeidsforholdNavnFromId(tilrett.arbeidsforhold.id, arbeidsforhold) || tilrett.id}
                    </BodyShort>
                    <Block visible={tilrett.type.includes(Tilretteleggingstype.HEL)} margin="xxs">
                        {tilrett.helTilrettelegging &&
                            tilrett.helTilrettelegging.map((helTil) => (
                                <Block key={guid()} margin="xxs">
                                    <FormattedMessage
                                        id="oppsummering.tilrettelegging.info.jobbeFullt"
                                        values={{
                                            startDato: dayjs(helTil.tilrettelagtArbeidFom).format('dddd D. MMMM YYYY'),
                                            strong: (msg: any) => <strong>{msg}</strong>,
                                        }}
                                    />
                                </Block>
                            ))}
                    </Block>
                    <Block visible={tilrett.type.includes(Tilretteleggingstype.DELVIS)} margin="xxs">
                        {tilrett.delvisTilrettelegging &&
                            tilrett.delvisTilrettelegging.map((delTil) => (
                                <Block key={guid()} margin="xxs">
                                    <FormattedMessage
                                        id="oppsummering.tilrettelegging.info.jobbeDelvis"
                                        values={{
                                            startDato: dayjs(delTil.tilrettelagtArbeidFom).format('dddd D. MMMM YYYY'),
                                            prosent: delTil.stillingsprosent,
                                            strong: (msg: any) => <strong>{msg}</strong>,
                                        }}
                                    />
                                </Block>
                            ))}
                    </Block>
                    <Block visible={tilrett.type.includes(Tilretteleggingstype.INGEN)} margin="xxs">
                        {tilrett.ingenTilrettelegging &&
                            tilrett.ingenTilrettelegging.map((ingenTil) => (
                                <Block key={guid()} margin="xxs">
                                    <FormattedMessage
                                        id="oppsummering.tilrettelegging.info.ikkeJobbe"
                                        values={{
                                            startDato: dayjs(ingenTil.slutteArbeidFom).format('dddd D. MMMM YYYY'),
                                            strong: (msg: any) => <strong>{msg}</strong>,
                                        }}
                                    />
                                </Block>
                            ))}
                    </Block>
                    {(tilrett.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
                        tilrett.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG) && (
                        <>
                            <Block margin="xs">
                                <OppsummeringBeskrivelse
                                    label="Farer for å skade det ufødte barnet:"
                                    innhold={tilrett.risikoFaktorer || ''}
                                />
                            </Block>
                            <Block margin="xs">
                                <OppsummeringBeskrivelse
                                    label="Hvordan du kan jobbe annerledes:"
                                    innhold={tilrett.tilretteleggingstiltak || ''}
                                />
                            </Block>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default TilretteleggingOppsummering;
