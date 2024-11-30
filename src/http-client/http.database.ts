import { AxiosRequestConfig } from "axios";
import { Schema } from "../interfaces/Schema";
import { Table } from "../interfaces/Table";
import api from "./http.common"
import { TableStructure } from "../interfaces/TableStructure";

export const GetAllSchemas = async () => {
    const response = api.get<Schema[]>(`/schema`);
    return response;
}

export const GetAllTablesByNameAndSchema = async (schema: string = "per",config?: AxiosRequestConfig ) => {
    const response = api.get<Table[]>(`/tables/${schema}`,config);
    return response;
}

export const GetAllTableStructureByNameAndSchema = async (name:string,schema: string) => {
    const response = api.get<TableStructure[]>(`/tables-structure/${name}/${schema}`);
    return response;
}