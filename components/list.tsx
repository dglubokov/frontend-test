import React from "react"
import {useState, useMemo, useEffect, useContext} from "react"

import styles from "../styles/Home.module.css"

import Item from "./item"
import Pagination from "./pagination"

let PageSize = 10;

const Data = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleKeydown = event => {
    if (event.key == "Enter") handleItems()
  }

  const handleItems = async () => {
    event.preventDefault();
    setErr(null);
    setIsLoading(true);

    try {
      const response = await fetch("https://api.github.com/legacy/repos/search/" + query, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) throw new Error(response.status.toString());
      const result = await response.json();
      const listItems = result.repositories.map((repo) =>
        <li key={repo.toString()}>
          <Item data={repo}/>
        </li>
      );
      setData(listItems);
    } catch (err) {
      setErr(err.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className={styles.main__div}>
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="query..."
          name="search_string"
          id="search_string"
          onChange={handleChange}
          onKeyDown={handleKeydown}
          required />
        <label htmlFor="name" className="form__label">Input query to fetch results</label>
      </div>

      <div className={styles.button__div}>
        <button className={styles.button} onClick={handleItems}>Fetch data</button>
      </div>

      {isLoading && <h2>loading...</h2>}

      {err && <h2>{err}</h2>}

      {data.length > 0 && <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />}

      {<ul className={styles.list}>{currentData}</ul>}
    </div>
  );
}

export default Data;
