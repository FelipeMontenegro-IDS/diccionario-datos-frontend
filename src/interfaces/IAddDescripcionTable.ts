export interface IAddDescripcionTable{
    schema:string;
    table:string;
    column:string;
    description:string;
}

export interface IAddDescripcionTableWrite extends IAddDescripcionTable{

}

export interface IAddDescripcionTableRead extends IAddDescripcionTable{
    dataType:string;
    maxLength:string;
}