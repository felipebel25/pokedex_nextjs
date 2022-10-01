import { useEffect, useState } from "react";

export default function useFilter(data: any, key: any, search: any) {
  const [dataFiltered, setDataFiltered] = useState([]);
  useEffect(() => {
    if (search.trim() === "") setDataFiltered(data);
    if (search.trim().length > 2) {
      setDataFiltered(
        data.filter((item: string) =>
          item[key].toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, key, search]);
  return dataFiltered;
}