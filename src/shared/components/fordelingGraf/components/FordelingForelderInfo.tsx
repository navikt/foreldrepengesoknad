import * as React from 'react';
import ForelderIkon from 'shared/components/foreldrepar/ForelderIkon';
import Personkort from 'shared/components/personkort/Personkort';
import HighlightContent from 'common/components/highlightContent/HighlightContent';
import { fordelingGrafBem } from '../FordelingGraf';
import { FordelingsinfoEnForelder } from '../types';

interface Props {
    info: FordelingsinfoEnForelder;
    invertert?: boolean;
    highlightChanges?: boolean;
}

const FordelingForelderInfo: React.FunctionComponent<Props> = ({ info, highlightChanges, invertert }) => {
    const tittelBem = fordelingGrafBem.child('tittel');
    const { antallDager, ikonRef, navn: navn, tittel, harForMangeDager } = info;
    return (
        <Personkort ikon={<ForelderIkon forelder={ikonRef} />} tittel={navn} invertert={invertert}>
            <div
                className={tittelBem.classNames(
                    tittelBem.element('dager'),
                    tittelBem.modifierConditional('formangedager', harForMangeDager)
                )}
            >
                {highlightChanges ? (
                    <HighlightContent watchValue={antallDager} invalid={antallDager < 0}>
                        {tittel}
                    </HighlightContent>
                ) : (
                    <>{tittel}</>
                )}
            </div>
        </Personkort>
    );
};

export default FordelingForelderInfo;
