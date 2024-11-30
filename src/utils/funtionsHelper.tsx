import * as React from 'react';
import {
    NumberSymbol20Regular,
    TextT20Regular,
    CalendarDate20Regular,
    DocumentPageNumber20Regular,
    Timer20Regular
} from '@fluentui/react-icons';

export const GetIconsByDataType = (dataType: string): React.ReactNode => {

    switch (dataType) {
        case "int":
            return <NumberSymbol20Regular />;
        case "bit":
            return <NumberSymbol20Regular />;
        case "varchar":
            return <TextT20Regular />
        case "nvarchar":
            return <TextT20Regular />
        case "datetime2":
            return <CalendarDate20Regular />
        case "uniqueidentifier":
            return <DocumentPageNumber20Regular />
        case "timestamp":
            return <Timer20Regular />
        default:
            console.log("No Existe.")
            break;
    }
} 
