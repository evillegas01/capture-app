// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DataEntry from '../../../../components/DataEntry/DataEntry.container';
import withSaveHandler from '../../../../components/DataEntry/withSaveHandler';
import withCancelButton from '../../../../components/DataEntry/withCancelButton';
import withDataEntryField from '../../../../components/DataEntry/dataEntryField/withDataEntryField';
import { placements } from '../../../../components/DataEntry/dataEntryField/dataEntryField.const';
import getEventDateValidatorContainers from './fieldValidators/eventDate.validatorContainersGetter';
import RenderFoundation from '../../../../metaData/RenderFoundation/RenderFoundation';
import withDataEntryFieldIfApplicable from '../../../DataEntry/dataEntryField/withDataEntryFieldIfApplicable';
import withMainButton from './withMainButton';
import withFilterProps from '../../../FormFields/New/HOC/withFilterProps';

import {
    withInternalChangeHandler,
    withLabel,
    withFocusSaver,
    DateField,
    TrueOnlyField,
    CoordinateField,
    PolygonField,
    withCalculateMessages,
    withDisplayMessages,
    withDefaultFieldContainer,
    withDefaultShouldUpdateInterface,
} from '../../../FormFields/New';

import inMemoryFileStore from '../../../DataEntry/file/inMemoryFileStore';
import withNotes from '../../../DataEntry/withNotes';
import withIndicatorOutput from '../../../DataEntry/dataEntryOutput/withIndicatorOutput';
import withFeedbackOutput from '../../../DataEntry/dataEntryOutput/withFeedbackOutput';
import withErrorOutput from '../../../DataEntry/dataEntryOutput/withErrorOutput';
import withWarningOutput from '../../../DataEntry/dataEntryOutput/withWarningOutput';
import labelTypeClasses from './dataEntryFieldLabels.mod.css';

const getStyles = (theme: Theme) => ({
    dataEntryContainer: {
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: theme.typography.pxToRem(2),
        padding: theme.typography.pxToRem(20),
    },
});

const overrideMessagePropNames = {
    errorMessage: 'validationError',
};


const baseComponentStyles = {
    labelContainerStyle: {
        flexBasis: 200,
    },
    inputContainerStyle: {
        flexBasis: 150,
    },
};

const baseComponentStylesVertical = {
    labelContainerStyle: {
        width: 150,
    },
    inputContainerStyle: {
        width: 150,
    },
};

function defaultFilterProps(props: Object) {
    const { formHorizontal, fieldOptions, validationError, modified, ...passOnProps } = props;
    return passOnProps;
}

const getCancelOptions = () => ({
    color: 'primary',
});

const getBaseComponentProps = (props: Object) => ({
    fieldOptions: props.fieldOptions,
    formHorizontal: props.formHorizontal,
    styles: props.formHorizontal ? baseComponentStylesVertical : baseComponentStyles,
});

const createComponentProps = (props: Object, componentProps: Object) => ({
    ...getBaseComponentProps(props),
    ...componentProps,
});

const buildReportDateSettingsFn = () => {
    const reportDateComponent =
        withCalculateMessages(overrideMessagePropNames)(
            withFocusSaver()(
                withDefaultFieldContainer()(
                    withDefaultShouldUpdateInterface()(
                        withLabel({
                            onGetUseVerticalOrientation: (props: Object) => props.formHorizontal,
                            onGetCustomFieldLabeClass: (props: Object) =>
                                `${props.fieldOptions.fieldLabelMediaBasedClass} ${labelTypeClasses.dateLabel}`,
                        })(
                            withDisplayMessages()(
                                withInternalChangeHandler()(withFilterProps(defaultFilterProps)(DateField)),
                            ),
                        ),
                    ),
                ),
            ),
        );
    const reportDateSettings = (props: Object) => ({
        component: reportDateComponent,
        componentProps: createComponentProps(props, {
            width: 350,
            label: props.formFoundation.getLabel('eventDate'),
            required: true,
        }),
        propName: 'eventDate',
        validatorContainers: getEventDateValidatorContainers(),
    });

    return reportDateSettings;
};

const pointComponent = withCalculateMessages(overrideMessagePropNames)(
    withFocusSaver()(
        withDefaultFieldContainer()(
            withDefaultShouldUpdateInterface()(
                withLabel({
                    onGetUseVerticalOrientation: (props: Object) => props.formHorizontal,
                    onGetCustomFieldLabeClass: (props: Object) => `${props.fieldOptions.fieldLabelMediaBasedClass} ${labelTypeClasses.coordinateLabel}`,
                })(
                    withDisplayMessages()(
                        withInternalChangeHandler()(withFilterProps(defaultFilterProps)(CoordinateField)),
                    ),
                ),
            ),
        ),
    ),
);

const polygonComponent = withCalculateMessages(overrideMessagePropNames)(
    withFocusSaver()(
        withDefaultFieldContainer()(
            withDefaultShouldUpdateInterface()(
                withLabel({
                    onGetUseVerticalOrientation: (props: Object) => props.formHorizontal,
                    onGetCustomFieldLabeClass: (props: Object) => `${props.fieldOptions.fieldLabelMediaBasedClass} ${labelTypeClasses.polygonLabel}`,
                })(
                    withDisplayMessages()(
                        withInternalChangeHandler()(withFilterProps(defaultFilterProps)(PolygonField)),
                    ),
                ),
            ),
        ),
    ),
);


const buildGeometrySettingsFn = () => (props: Object) => {
    const featureType = props.formFoundation.featureType;
    if (featureType === 'Polygon') {
        return {
            component: polygonComponent,
            componentProps: createComponentProps(props, {
                width: props && props.formHorizontal ? 150 : 350,
                label: 'Location',
                required: false,
            }),
            propName: 'geometry',
            validatorContainers: [
            ],
            meta: {
                placement: placements.TOP,
            },
        };
    }
    if (featureType === 'Point') {
        return {
            component: pointComponent,
            componentProps: createComponentProps(props, {
                width: props && props.formHorizontal ? 150 : 350,
                label: 'Coordinate',
                required: false,
            }),
            propName: 'geometry',
            validatorContainers: [
            ],
            meta: {
                placement: placements.TOP,
            },
        };
    }
    return null;
};

const buildCompleteFieldSettingsFn = () => {
    const completeComponent =
        withCalculateMessages(overrideMessagePropNames)(
            withFocusSaver()(
                withDefaultFieldContainer()(
                    withDefaultShouldUpdateInterface()(
                        withLabel({
                            onGetUseVerticalOrientation: (props: Object) => props.formHorizontal,
                            onGetCustomFieldLabeClass: (props: Object) =>
                                `${props.fieldOptions.fieldLabelMediaBasedClass} ${labelTypeClasses.trueOnlyLabel}`,
                        })(
                            withDisplayMessages()(
                                withInternalChangeHandler()(TrueOnlyField),
                            ),
                        ),
                    ),
                ),
            ),
        );
    const completeSettings = (props: Object) => ({
        component: completeComponent,
        componentProps: createComponentProps(props, {
            label: 'Complete event',
        }),
        propName: 'complete',
        validatorContainers: [
        ],
        meta: {
            placement: placements.BOTTOM,
        },
    });

    return completeSettings;
};

const GeometryField = withDataEntryFieldIfApplicable(buildGeometrySettingsFn())(DataEntry);
const ReportDateField = withDataEntryField(buildReportDateSettingsFn())(GeometryField);
const CompleteField = withDataEntryField(buildCompleteFieldSettingsFn())(ReportDateField);
const FeedbackOutput = withFeedbackOutput()(CompleteField);
const IndicatorOutput = withIndicatorOutput()(FeedbackOutput);
const WarningOutput = withWarningOutput()(IndicatorOutput);
const ErrorOutput = withErrorOutput()(WarningOutput);
const SaveableDataEntry = withSaveHandler()(withMainButton()(ErrorOutput));
const NotesDataEntry = withNotes()(SaveableDataEntry);
const CancelableDataEntry = withCancelButton(getCancelOptions)(NotesDataEntry);

type Props = {
    formFoundation: ?RenderFoundation,
    onUpdateField: (innerAction: ReduxAction<any, any>) => void,
    onStartAsyncUpdateField: Object,
    onSave: (eventId: string, dataEntryId: string, formFoundation: RenderFoundation) => void,
    onCancel: () => void,
    onAddNote: (itemId: string, dataEntryId: string, note: string) => void,
    classes: {
        dataEntryContainer: string,
        fieldLabelMediaBased?: ?string,
    },
    theme: any,
};

class EditEventDataEntry extends Component<Props> {
    fieldOptions: { theme: Theme };

    constructor(props: Props) {
        super(props);
        this.fieldOptions = {
            theme: props.theme,
            fieldLabelMediaBasedClass: props.classes.fieldLabelMediaBased,
        };
    }
    componentWillUnmount() {
        inMemoryFileStore.clear();
    }
    render() {
        const {
            formFoundation,
            onUpdateField,
            onAddNote,
            onSave,
            onCancel,
            onStartAsyncUpdateField,
            classes,
        } = this.props;
        return (
            <div className={classes.dataEntryContainer}>
                <CancelableDataEntry
                    id={'singleEvent'}
                    formFoundation={formFoundation}
                    onUpdateFormField={onUpdateField}
                    onUpdateFormFieldAsync={onStartAsyncUpdateField}
                    onCancel={onCancel}
                    onSave={onSave}
                    onAddNote={onAddNote}
                    fieldOptions={this.fieldOptions}
                />
            </div>
        );
    }
}


export default withStyles(getStyles)(EditEventDataEntry);
