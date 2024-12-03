export class ITableStructure{
    tableName:string;
    columnName:string;
    dataType:string;
    maxLength:string;
    isNullable:string;
    defaultValue:string;
    columnDescription:string;
    isPrimaryKey:string;
    isForeignKey:string;
    schemaName:string;

    constructor(){
        this.tableName = "";
        this.columnName = "";
        this.dataType = "";
        this.maxLength = "";
        this.isNullable = "";
        this.defaultValue = "";
        this.columnDescription = "";
        this.isPrimaryKey = "";
        this.isForeignKey = "";
        this.schemaName = "";
    }
}