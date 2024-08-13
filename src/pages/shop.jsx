import React, { useEffect, useState } from "react";

function Shop() {
    const [show,setShow] = useState(false)

    const [list, setList] = useState([])
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(json => {
                setList(json)
            });
    }, [])

    const [url,setUrl] = useState("https://dummyjson.com/products")
        useEffect(() => {
            fetch(url)
                .then(res => res.json())
                .then(json=> {
                    return setData(json.products)
                });
        },[url])
        
    const [value, setValue] = useState("")
    const [search, setSearch] = useState("")

    function onSubmit(e) {
        e.preventDefault()
        setSearch(value)
        setValue("")
    }

    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${search}`)
            .then(res => res.json())
            .then(json => {
                return setData(json.products)
            });
    }, [search])

    const [data, setData] = useState([])
    
    const [sortData, setSortData] = useState(0)
    
    useEffect(()=>{
        if (sortData===2) {
            data.sort((a,b)=>a.price-b.price)
        } else {data.sort((a,b)=>b.price-a.price)}
    },[sortData])

    return (
        <main>
            <div>
            <h1>Shop</h1>

            <div style={{ display: "flex" }}>
                <form onSubmit={onSubmit}>
                    <input className="inp" placeholder="Search..." type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                </form>
                <div>
                    <button className="sortbtn" onClick={()=>setSortData(2)}>Sort by price (decrease)</button>
        
                    <button className="sortbtn" onClick={()=>setSortData(3)}>Sort by price (increase)</button>
                </div>
                <div>
                    <button onClick={()=>setShow(!show)} className="btnFilter">
                        Categories
                    </button>
                    <div style={{display:show?"block":"none"}}>
                        <ul className="filterlist">
                            {list.map((e, i) => {
                                return (
                                    <li onClick={()=>{
                                        setShow(!show)
                                        setUrl(e.url)}} key={i}>{e.name}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="shopdiv">

                {data.map((e) => {
                    return (
                        <div key={e.id} className="card">
                            <img src={e.images[0]} alt="" />
                            <p>{e.title}</p>
                            <h3>${e.price}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
        </main>
    )
}

export default Shop