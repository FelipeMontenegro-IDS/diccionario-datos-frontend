import React, { useId, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ResultTable } from './components/ResultTable';
import { Button, Combobox, ComboboxProps, Field, useComboboxFilter } from '@fluentui/react-components';
import { useQuery } from '@tanstack/react-query';
import { GetAllSchemas, GetAllTableStructureByNameAndSchema, GetAllTablesByNameAndSchema } from './http-client/http.database';
import { Table } from './interfaces/Table';
import { Schema } from './interfaces/Schema';

// const options = [
//   { children: "Alligator", value: "Alligator" },
//   { children: "Bee", value: "Bee" },
//   { children: "Bird", value: "Bird" },
//   { children: "Cheetah", disabled: true, value: "Cheetah" },
//   { children: "Dog", value: "Dog" },
//   { children: "Dolphin", value: "Dolphin" },
//   { children: "Ferret", value: "Ferret" },
//   { children: "Firefly", value: "Firefly" },
//   { children: "Fish", value: "Fish" },
//   { children: "Goat", value: "Goat" },
//   { children: "Horse", value: "Horse" },
//   { children: "Lion", value: "Lion" },
// ];

function App() {



  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedSchema, setSelectedSchema] = useState<string>("");

  const { isLoading: isLoadingSchemas, isError: isErrorShemas, data: dataSchemas, error: errorSchemas } = useQuery({
    queryKey: ["schemas"], queryFn: GetAllSchemas
  })
  const { isLoading: isLoadingTables, isError: isErrorTables, data: dataTables, error: errorTables } = useQuery({
    queryKey: ["tables",selectedSchema], queryFn: () => GetAllTablesByNameAndSchema(selectedSchema),enabled:!!selectedSchema,
  })

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['table-structure', selectedTable, selectedSchema],
    queryFn: () => GetAllTableStructureByNameAndSchema(selectedTable, selectedSchema),
    enabled: false, // Esto previene que la query se ejecute automáticamente
  });

  const comboId = useId();

  const [querySchema, setQuerySchema] = useState<string>("");
  const [queryTable, setQueryTable] = useState<string>("");


  const optionsSchemas = React.useMemo(() => {
    return dataSchemas
      ? dataSchemas.data.map((schema: Schema) => ({
        children: schema.name, // Asigna el nombre del esquema
        value: schema.id, // Asigna el valor como el nombre del esquema
      }))
      : [];
  }, [dataSchemas]);

  const optionsTables = React.useMemo(() => {
    return dataTables
      ? dataTables.data.map((table: Table) => ({
        children: table.tableName, // Asigna el nombre del esquema
        value: table.tableId, // Asigna el valor como el nombre del esquema
      }))
      : [];
  }, [dataTables]);

  const childrenSchemas = useComboboxFilter(querySchema, optionsSchemas, {
    noOptionsMessage: "No se encontró el esquema.",
  });
  const onOptionSelectSchema: ComboboxProps["onOptionSelect"] = (e, data) => {
    setQuerySchema(data.optionText ?? "");
    setSelectedSchema(data.optionValue!);
  };
  const childrenTable = useComboboxFilter(queryTable, optionsTables, {
    noOptionsMessage: "No se encontró la tabla.",
  });

  const onOptionSelectTable: ComboboxProps["onOptionSelect"] = (e, data) => {
    setQueryTable(data.optionText ?? "");
    setSelectedTable(data.optionValue!);
  };

  const onClickBuscar = () => { 
    refetch();
  }

  return (

    <div className='container mt-4'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-md-4'>
          <Field
            label="Schema"
            validationState="none"
            validationMessage=""
          >
            <Combobox
              onOptionSelect={onOptionSelectSchema}
              aria-labelledby={comboId}
              placeholder="Seleccione un esquema"
              onChange={(ev) => setQuerySchema(ev.target.value)}
              value={querySchema}
            >
              {childrenSchemas}
            </Combobox>
          </Field>
        </div>
        <div className='col-md-4'>
          <Field
            label="Table"
            validationState="none"
            validationMessage=""
          >
            <Combobox
              onOptionSelect={onOptionSelectTable}
              aria-labelledby={comboId}
              placeholder="Seleccione una tabla"
              onChange={(ev) => setQueryTable(ev.target.value)}
              value={queryTable}
              disabled={selectedSchema === ""}
            >
              {childrenTable}
            </Combobox>
          </Field>
        </div>
        <div className='col-md-4'>
          <Button appearance='primary' onClick={onClickBuscar}  className='mt-4 mb-4 mb-lg-0 mb-md-0'>Search</Button>
        </div>
        <div className='col-md-12 mt-md-4 mt-lg-4'>
          {
            data && data.data.length > 0 && (
              <ResultTable items={data?.data ?? []}/>
            )
          }
          {
            isLoading && (
              <div className='d-flex justify-content-center align-items-center' style={{height:"50vh"}}>
                <div className="loader"></div>
              </div>
            )
          
          }
        </div>
      </div>
    </div>
  );
}

export default App;
