import React, { useEffect, useState } from 'react'
import { menuItemModel } from '../../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../../apis/menuItemApi';
import { setMenuItem } from '../../../../storage/redux/menuItemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MainLoader } from '../CommonComponents';
import { SD_SortTypes } from '../../../../Utilities/staticDetails';

function MenuItemList() {
    const [menuItems,setMenuItems] = useState<menuItemModel[]>(useSelector((state : any) => state.menuItemStore.menuItem));
    const [categoryList,setCategoryList] = useState([""]);
    const [selectedCategories,setSelectedCategories] = useState("All");
    const [sortType,setSortType] = useState<SD_SortTypes>(SD_SortTypes.NAME_A_Z);

    const {data, isLoading,isSuccess,isError,error} = useGetMenuItemsQuery(null);

    const dispatch = useDispatch();
    const searchVal = useSelector((state : any) => state.menuItemStore.search);

    const compFnNameAToZ = (a : any,b : any) =>  { if (a.name < b.name) { return -1; } else if (a.name > b.name) { return 1;} else {return 0;}  }
    const compFnNameZToA = (a : any,b : any) =>  { if (a.name < b.name) { return 1; } else if (a.name > b.name) { return -1;} else {return 0;}  };
    const compFnHiLowPrice = (a : any,b : any) =>  { return b.price - a.price };
    const compFnLowHiPrice = (a : any,b : any) =>  { return a.price - b.price  };
    

    useEffect(() => {
        console.log("in useEffect for isloading");
        if (!isLoading){
            dispatch(setMenuItem(data.result));

            var categories : string[] = [];
            data.result.forEach((res: any) => {
                if (!categories.includes(res.category)){
                    categories.push(res.category);
                }
            });
            setCategoryList(categories);
            
            var dataRes = data.result;
            dataRes = dataRes.slice().sort(compFnNameAToZ);

            setMenuItems(dataRes.filter((res : any) => 
                res.name.toLowerCase().includes(searchVal.toLowerCase()) && 
                selectedCategories.includes(res.category) || selectedCategories == "All"
            ));
        }
    }, [isLoading]);
    useEffect(() => {
        if (data && data.result){

            var dataRes = data.result;
            switch (sortType){
                case SD_SortTypes.PRICE_LOW_HIGH: dataRes = dataRes.slice().sort(compFnLowHiPrice); break;
                case SD_SortTypes.PRICE_HIGH_LOW: dataRes = dataRes.slice().sort(compFnHiLowPrice); break;
                case SD_SortTypes.NAME_A_Z: dataRes = dataRes.slice().sort(compFnNameAToZ); break;
                case SD_SortTypes.NAME_Z_A: dataRes = dataRes.slice().sort(compFnNameZToA); break;
            }

            setMenuItems(dataRes.filter((res : any) => 
                res.name.toLowerCase().includes(searchVal.toLowerCase()) && 
                selectedCategories.includes(res.category) || selectedCategories == "All"
            )); 
        }
    }, [searchVal,selectedCategories])
    useEffect(() => {
        var tempMenuItems = menuItems.slice();
        switch (sortType){
            case SD_SortTypes.PRICE_LOW_HIGH: tempMenuItems.sort(compFnLowHiPrice); break;
            case SD_SortTypes.PRICE_HIGH_LOW: tempMenuItems.sort(compFnHiLowPrice); break;
            case SD_SortTypes.NAME_A_Z: tempMenuItems.sort(compFnNameAToZ); break;
            case SD_SortTypes.NAME_Z_A: tempMenuItems.sort(compFnNameZToA); break;
        }
        setMenuItems(tempMenuItems);
    }, [sortType])

    return (
        !isLoading ? 
        (<div className='row container mb-5'>
            <ul className='nav w-100 d-flex justify-content-center'>
            <span style={{cursor:"pointer"}} onClick={() => setSelectedCategories("All")} className={`nav-link text-${selectedCategories == "All" ? ("success"):("info")} h2`}>All<span className="sr-only"></span></span>
                {categoryList.map((category : string, i:number) => {
                    return <span style={{cursor:"pointer"}} onClick={() => setSelectedCategories(category)} key={i} className={`nav-link text-${selectedCategories == category ? ("success"):("info")} h2`}>{category}<span className="sr-only"></span></span>
                })}
            </ul>
            <div className='d-flex justify-content-end'>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {sortType}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a style={{cursor:"pointer"}} onClick={() => setSortType(SD_SortTypes.PRICE_LOW_HIGH)} className="dropdown-item">{SD_SortTypes.PRICE_LOW_HIGH}</a>
                    <a style={{cursor:"pointer"}} onClick={() => setSortType(SD_SortTypes.PRICE_HIGH_LOW)} className="dropdown-item">{SD_SortTypes.PRICE_HIGH_LOW}</a>
                    <a style={{cursor:"pointer"}} onClick={() => setSortType(SD_SortTypes.NAME_A_Z)} className="dropdown-item">{SD_SortTypes.NAME_A_Z}</a>
                    <a style={{cursor:"pointer"}} onClick={() => setSortType(SD_SortTypes.NAME_Z_A)} className="dropdown-item">{SD_SortTypes.NAME_Z_A}</a>
                </div>
            </div>
            {data.result.length > 0 && menuItems.map((menuItem : menuItemModel, i : number) => {
                return <MenuItemCard menuItem={menuItem} key={i}/>
            })}
        </div>) : (<MainLoader/>) 
    )
}

export default MenuItemList