// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import log from 'loglevel';
import errorCreator from '../../utils/errorCreator';

import D2SectionContainer from './D2Section.container';
import D2Section from './D2Section.component';
import RenderFoundation from '../../metaData/RenderFoundation/RenderFoundation';
import Section from '../../metaData/RenderFoundation/Section';

const styles = () => ({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
    },
});

type Props = {
    formFoundation: RenderFoundation,
    id: string,
    classes: Object,
    formHorizontal: boolean,
};

export class D2Form extends Component<Props> {
    validateForm: () => void;
    sectionInstances: Map<string, D2Section>;

    constructor(props: Props) {
        super(props);

        this.validateForm = this.validateForm.bind(this);

        this.sectionInstances = new Map();
    }

    validateForm() {
        return Array.from(this.sectionInstances.entries())
            .map(entry => entry[1])
            .every((sectionInstance: D2Section) => {
                try {
                    const sectionFieldsInstance = sectionInstance
                        .sectionFieldsInstance
                        .getWrappedInstance();

                    return sectionFieldsInstance.isValid();
                } catch (error) {
                    log.error(
                        errorCreator(
                            'could not get section fields instance')(
                            {
                                method: 'validateForm',
                                object: this,
                            },
                        ),
                    );
                    return true;
                }
            });
    }

    validateFormReturningFailedFields(): Array<any> {
        return Array.from(this.sectionInstances.entries())
            .map(entry => entry[1])
            .reduce((failedFormFields: Array<any>, sectionInstance: D2Section) => {
                try {
                    const sectionFieldsInstance = sectionInstance
                        .sectionFieldsInstance
                        .getWrappedInstance();

                    if (!sectionFieldsInstance.isValid()) {
                        failedFormFields = [...failedFormFields, ...sectionFieldsInstance.getInvalidFields()];
                    }
                } catch (error) {
                    log.error(
                        errorCreator(
                            'could not get section fields instance')(
                            {
                                method: 'validateFormReturningFailedFields',
                                object: this,
                            },
                        ),
                    );
                }
                return failedFormFields;
            }, []);
    }

    validateFormScrollToFirstFailedField() {
        const failedFields = this.validateFormReturningFailedFields();
        if (!failedFields || failedFields.length === 0) {
            return true;
        }

        const firstFailureInstance = failedFields[0].instance;
        firstFailureInstance.goto && firstFailureInstance.goto();
        return false;
    }

    setSectionInstance(instance: ?D2Section, id: string) {
        if (!instance) {
            if (this.sectionInstances.has(id)) {
                this.sectionInstances.delete(id);
            }
        } else {
            this.sectionInstances.set(id, instance);
        }
    }

    getFormId() {
        return this.props.id;
    }

    getFormBuilderId(sectionId: string) {
        return `${this.props.id}-${sectionId}`;
    }

    renderHorizontal = (section: Section, passOnProps: any) => (
        <D2SectionContainer
            key={section.id}
            innerRef={(sectionInstance) => { this.setSectionInstance(sectionInstance, section.id); }}
            sectionMetaData={section}
            customForm={this.props.formFoundation.customForm}
            formId={this.getFormId()}
            formBuilderId={this.getFormBuilderId(section.id)}
            sectionId={section.id}
            {...passOnProps}
        />
    )
    renderVertical = (section: Section, passOnProps: any, classes: any) => (
        <div
            className={classes.container}
            key={section.id}
        >
            <D2SectionContainer
                innerRef={(sectionInstance) => { this.setSectionInstance(sectionInstance, section.id); }}
                sectionMetaData={section}
                customForm={this.props.formFoundation.customForm}
                formId={this.getFormId()}
                formBuilderId={this.getFormBuilderId(section.id)}
                sectionId={section.id}
                {...passOnProps}
            />
        </div>
    )

    render() {
        const { formFoundation, id, classes, ...passOnProps } = this.props;
        const formHorizontal = this.props.formHorizontal;
        const metaDataSectionsAsArray = Array.from(formFoundation.sections.entries()).map(entry => entry[1]);

        const sections = metaDataSectionsAsArray.map(section => (formHorizontal ? this.renderHorizontal(section, passOnProps) : this.renderVertical(section, passOnProps, classes)));

        return (
            <React.Fragment>
                {sections}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(D2Form);
