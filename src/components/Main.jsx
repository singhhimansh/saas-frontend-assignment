import React, { useEffect } from "react";
import { Tabularise } from "./Tabularise/Tabularise";
import { useFetch } from "../hooks/useFetch.hooks";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { getColumn } from "../utils/table.util";

const PAGE_SIZE = 5;
const url =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
const errorMessage =
  "Unable to fetch projects at the moment. Please try again later.";

const Main = () => {
  const {
    data: projectsList = [],
    isFetching,
    error,
  } = useFetch(url, errorMessage);


  const columns = getColumn();
  return (
    <main className="container" aria-live="polite" >
      {isFetching && <Loader />}
      {!isFetching && !error && projectsList?.length > 0 && (
        <Tabularise
          columns={columns}
          data={projectsList}
          pageSize={PAGE_SIZE}
        />
      )}
      {error && <Error text={error} />}
    </main>
  );
};

export default Main;
