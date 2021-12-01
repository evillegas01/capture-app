// @flow
import * as React from 'react';
import type { CustomForm as MetadataCustomForm } from '../../../metaData';
import { D2CustomForm } from './D2CustomForm.component';


type Props = {
    customForm: MetadataCustomForm,
};

export const withCustomForm = () => (InnerComponent: React.ComponentType<any>) =>
    class CustomFormHOC extends React.Component<Props> {
        render() {
            const { customForm: customFormSpecs, ...passOnProps } = this.props;
            return (
                <InnerComponent
                    {...passOnProps}
                >
                    {
                        customFormSpecs ? (onRenderField, fields) => (
                            <D2CustomForm
                                onRenderField={onRenderField}
                                fields={fields}
                                specs={customFormSpecs}
                            />
                        ) : null
                    }
                </InnerComponent>
            );
        }
    };
