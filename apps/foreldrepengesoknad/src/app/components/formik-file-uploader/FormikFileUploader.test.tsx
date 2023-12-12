import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { composeStories } from '@storybook/react';
import * as stories from './FormikFileUploader.stories';

const { Default, FilSomErLastetOpp } = composeStories(stories);

describe('<FormikFileUploader>', () => {
    it('skal vise opplastingskomponent men ingen opplastede vedlegg', () => {
        render(
            <Formik initialValues={{}} onSubmit={() => undefined}>
                <Default />
            </Formik>,
        );

        expect(screen.getByText('Opplastingsikon')).toBeInTheDocument();
        expect(screen.getByText('Hvordan ta bilde av et dokument med mobilen')).toBeInTheDocument();
    });

    it('skal vise allerede opplastet vedlegg', () => {
        render(
            <Formik initialValues={{}} onSubmit={() => undefined}>
                <FilSomErLastetOpp />
            </Formik>,
        );

        expect(screen.getByText('Fil som er lastet opp')).toBeInTheDocument();
    });
});
