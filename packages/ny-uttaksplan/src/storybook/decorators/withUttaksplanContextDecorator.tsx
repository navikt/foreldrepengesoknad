import { UttaksplanDataContext } from '../../context/UttaksplanDataContext';

export const withUttaksplanContextDecorator = (Story: any, { parameters }: any) => {
    const { context } = parameters;

    return (
        <UttaksplanDataContext initialState={context}>
            <Story />
        </UttaksplanDataContext>
    );
};
