import { PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { FunctionComponent } from 'react';

import { LocaleAll } from '@navikt/fp-types';

import PlanleggerRouter from './PlanleggerRouter';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const Planlegger: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return (
        <PlanleggerDataContext>
            <PlanleggerRouter locale={locale} changeLocale={changeLocale} />
        </PlanleggerDataContext>
    );
};

export default Planlegger;
