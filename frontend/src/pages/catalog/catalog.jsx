import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { Button } from "antd";

import styles from "./catalog.module.css";

import CatalogCard from "../../components/catalog-card/catalog-card";
import FilterPanel from "../../components/filter-panel/filter-panel";

import { selectUsers } from "../../services/users/reducer";
import { getSearchValue } from "../../services/search/reducer";

function Catalog() {
  const companyStructure = useSelector(selectUsers);

  const [catalogCardsToShow, setcatalogCardsToShow] =
    useState(companyStructure);

  const [filterElements, setFilterElements] = useState(null);
  const [isFilterOpened, setIsFilterOpened] = useState(true);

  const searchValue = useSelector(getSearchValue);

  const searchedCompanyStructure = [];

  companyStructure?.map((item) => {
    if (
      item.first_name.toLowerCase().includes(searchValue) ||
      item.last_name.toLowerCase().includes(searchValue)
    ) {
      searchedCompanyStructure.push(item);
    }
    return searchedCompanyStructure;
  });

  useEffect(() => {
    if (filterElements === null && searchValue === null) {
      setcatalogCardsToShow(companyStructure);
    } else if (filterElements === null && searchValue !== null) {
      setcatalogCardsToShow(searchedCompanyStructure);
    } else if (filterElements !== null && searchValue === null) {
      const filteredCompanyStructure = companyStructure.filter(function (item) {
        for (let key in filterElements) {
          if (item[key] !== null && item[key] !== filterElements[key])
            return false;
        }
        return true;
      });
      setcatalogCardsToShow(filteredCompanyStructure);
    } else if (filterElements !== null && searchValue !== null) {
      const filteredCompanyStructure = searchedCompanyStructure.filter(
        function (item) {
          for (let key in filterElements) {
            if (item[key] !== null && item[key] !== filterElements[key])
              return false;
          }
          return true;
        }
      );
      setcatalogCardsToShow(filteredCompanyStructure);
    }
  }, [filterElements, searchValue]);

  const onFullTimeChange = () => {
    setFilterElements({
      ...filterElements,
      employment_type: "Полная занятость",
    });
  };

  const onOutsourceChange = () => {
    setFilterElements({ ...filterElements, employment_type: "Фриланс" });
  };

  const handleGradeChange = (value) => {
    if (value !== null) {
      setFilterElements({ ...filterElements, grade: value });
    }
  };

  const handleLocationeChange = (value) => {
    setFilterElements({ ...filterElements, timezone: value });
  };

  const handleDepartmentChange = (value) => {
    setFilterElements({ ...filterElements, departmentId: value });
  };

  const handleTeamChange = (value) => {
    setFilterElements({ ...filterElements, teamId: value });
  };

  const handleFormReset = () => {
    setcatalogCardsToShow(searchedCompanyStructure);
    setFilterElements(null);
  };

  const handleFormClose = () => {
    setIsFilterOpened(false);
  };

  const handeleFiltersOpen = () => {
    setIsFilterOpened(true);
  };

  return (
    <div className={styles.catalog}>
      {isFilterOpened ? (
        <FilterPanel
          onFullTimeChange={onFullTimeChange}
          onOutsourceChange={onOutsourceChange}
          handleGradeChange={handleGradeChange}
          handleLocationeChange={handleLocationeChange}
          handleDepartmentChange={handleDepartmentChange}
          handleFormReset={handleFormReset}
          handleFormClose={handleFormClose}
          handleTeamChange={handleTeamChange}
        />
      ) : (
        <Button
          onClick={handeleFiltersOpen}
          className={styles.catalog__open_button}
        >
          Фильтры
        </Button>
      )}
      {catalogCardsToShow?.length > 0 ? (
        <div
          className={
            isFilterOpened
              ? styles.catalog__grid_cover
              : styles.catalog__grid_cover_closed
          }
        >
          <div className={styles.catalog__grid_container}>
            {catalogCardsToShow.map((item) => (
              <CatalogCard item={item} key={uuidv4()} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {filterElements && (
            <p className={styles.catalog__search_fail}>
              "Фильтр не дал результатов"
            </p>
          )}
          {searchValue && (
            <p className={styles.catalog__search_fail}>
              "Поиск не дал результатов"
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Catalog;
