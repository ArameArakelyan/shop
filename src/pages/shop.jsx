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
    // useEffect(() => {
    //     fetch('https://dummyjson.com/products')
    //         .then(res => res.json())
    //         .then(json => {
    //             setData(json.products)
    //         });
    // }, [])
    return (
        <div>
            <h1>Shop</h1>

            <div style={{ display: "flex" }}>
                <form onSubmit={onSubmit}>
                    <input placeholder="Search..." type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                </form>

                <div>
                    <button onClick={()=>setShow(!show)} className="btnFilter">
                        Filter
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
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Shop