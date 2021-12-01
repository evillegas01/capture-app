// @flow
import i18n from '@dhis2/d2-i18n';
import { TabBar, Tab, spacersNum } from '@dhis2/ui';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { type ComponentType, useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getProgramAndStageForProgram } from '../../../../metaData';
import { ConfirmDialog } from '../../../Dialogs/ConfirmDialog.component';
import { Widget } from '../../../Widget';
import { WidgetEnrollmentEventNew } from '../../../WidgetEnrollmentEventNew';
import { WidgetEventSchedule } from '../../../WidgetEventSchedule';
import { tabMode } from './newEventWorkspace.constants';
import type { Props } from './newEventWorkspace.types';
import { WidgetStageHeader } from './WidgetStageHeader';


const styles = () => ({
    innerWrapper: {
        padding: `0 ${spacersNum.dp16}px`,
    },
});

const NewEventWorkspacePlain = ({
    stageId,
    programId,
    orgUnitId,
    teiId,
    enrollmentId,
    dataEntryHasChanges,
    classes,
    ...passOnProps
}: Props) => {
    const selectedTab = useSelector(({ router: { location } }) => location.query.tab);
    const { events, enrollmentDate, incidentDate } = useSelector(({ enrollmentDomain }) => enrollmentDomain?.enrollment);
    const [mode, setMode] = useState(selectedTab ?? tabMode.REPORT);
    const [isWarningVisible, setWarningVisible] = useState(false);
    const tempMode = useRef(undefined);
    const { stage } = useMemo(() => getProgramAndStageForProgram(programId, stageId), [programId, stageId]);

    const onHandleSwitchTab = (newMode) => {
        if (dataEntryHasChanges) {
            setWarningVisible(true);
            tempMode.current = newMode;
        } else {
            setMode(newMode);
        }
    };

    return (
        <>
            <Widget
                noncollapsible
                header={
                    <WidgetStageHeader stage={stage} />
                }
            >
                <div className={classes.innerWrapper}>
                    <TabBar dataTest="new-event-tab-bar">
                        <Tab
                            key="report-tab"
                            selected={mode === tabMode.REPORT}
                            onClick={() => onHandleSwitchTab(tabMode.REPORT)}
                            dataTest="new-event-report-tab"
                        >{i18n.t('Report')}</Tab>
                        <Tab
                            key="schedule-tab"
                            selected={mode === tabMode.SCHEDULE}
                            onClick={() => onHandleSwitchTab(tabMode.SCHEDULE)}
                            dataTest="new-event-schedule-tab"
                        >{i18n.t('Schedule')}</Tab>
                        <Tab
                            key="refer-tab"
                            selected={mode === tabMode.REFER}
                            onClick={() => onHandleSwitchTab(tabMode.REFER)}
                            dataTest="new-event-refer-tab"
                        >{i18n.t('Refer')}</Tab>
                    </TabBar>
                    {mode === tabMode.REPORT && <WidgetEnrollmentEventNew
                        programId={programId}
                        stageId={stageId}
                        orgUnitId={orgUnitId}
                        teiId={teiId}
                        enrollmentId={enrollmentId}
                        {...passOnProps}
                    />}
                    {mode === tabMode.SCHEDULE && <WidgetEventSchedule
                        programId={programId}
                        stageId={stageId}
                        orgUnitId={orgUnitId}
                        teiId={teiId}
                        eventData={events}
                        enrollmentId={enrollmentId}
                        enrollmentDate={enrollmentDate}
                        incidentDate={incidentDate}
                    />}
                </div>
            </Widget>
            <ConfirmDialog
                header={i18n.t('Unsaved changes')}
                text={i18n.t('Leaving this page will discard the changes you made to this event.')}
                confirmText={i18n.t('Yes, discard')}
                cancelText={i18n.t('No, stay here')}
                onConfirm={() => { setMode(tempMode.current); setWarningVisible(false); }}
                open={isWarningVisible}
                onCancel={() => setWarningVisible(false)}
            />
        </>
    );
};

export const NewEventWorkspace: ComponentType<
    $Diff<Props, CssClasses>,
> = withStyles(styles)(NewEventWorkspacePlain);
