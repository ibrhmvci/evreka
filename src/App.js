import React, {useEffect, useState} from 'react';
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import {example_response}from './source/response';
import './assets/styles/main.scss';
import BootstrapTable from 'react-bootstrap-table-next';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ModalPicture from "./components/picturemodal";
import ModalAction from "./components/actionmodal";
import Preloader from "./components/preloader";

function App() {
    const [data,setData] = useState([]);
    const [showList,setShowList] = useState(true);
    const [key, setKey] = useState();
    const [selectedRow,setSelectedRow] = useState();
    const [isActionNeeded,setIsActionNeeded] = useState(true);
    const [showModal,setShowModal] = useState(false);
    const [showActionModal,setShowActionModal] = useState(false);
    const [showPreloader,setShowPreloader] = useState(false);
    const [result,setResult]=useState("fetching");
    const [text,setText] = useState("");
    const [mapConstans,setMapConstans] = useState({
        latitude:0,
        longitude:0
    })

    useEffect(()=>{
        if(showPreloader){
            setTimeout(()=>{
                const res = text.length >= 5 ? "success": "fail";
                setResult(res);
            },3000)
        }
    },[showPreloader , text])

    useEffect(()=>{
        if(data.length === 0){
            setData([...example_response.data]);
            setShowList(true);
        }
    },[])

    useEffect(()=>{
        if(key && key === "location"){
            console.log("loca",mapConstans.latitude,mapConstans.longitude )
            // eslint-disable-next-line no-undef
            if(map !== undefined){
                // eslint-disable-next-line no-undef
                map.remove();
            }
            document.getElementById('map-container').innerHTML = "<div id='map'></div>";
            // eslint-disable-next-line no-undef
            const innerMap = L.map("map",{
                // eslint-disable-next-line no-undef
                center:L.latLng(mapConstans.latitude,mapConstans.longitude),
                zoom:13,
                layers : [
                    // eslint-disable-next-line no-undef
                    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 18,
                        minZoom: 6,
                        attribution:
                            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    }),
                ]
            });
            // eslint-disable-next-line no-undef
            const marker = L.marker([mapConstans.latitude,mapConstans.longitude]).addTo(innerMap);
        }
    },[key])

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        classes:"selected-row",
        onSelect: (row) => {
            const {latitude,longitude} = row.location;
            setMapConstans({
                latitude: latitude,
                longitude: longitude
            });
            if(row.details[4].value === "Aksiyon Gerekmiyor"){
                setIsActionNeeded(false);
            }else{
                setIsActionNeeded(true);
            }
            setSelectedRow(row);
            setKey("details");
        }
    };
    const rowClasses = (row)=> {
        if(row.details[4].value === "-"){
            return "empty-action-row bg-white";
        }else{
            return "bg-white mb-4";
        }
    }


    const removeButtons = async () => {
        if(selectedRow){
            setShowList(false);
            const elIndex = data.findIndex(el => el.id === selectedRow.id);
            const copyData = [...data]
            copyData[elIndex].details[4].value = "Aksiyon Gerekmiyor";
            await setData([...copyData]);
            await setIsActionNeeded(false);
            await setSelectedRow();
            setShowList(true);

        }
    }
    const handlePreloader = async (value,text) => {
       await setText(text);
       await setShowActionModal(false);
       await setResult("fetching");
       await setShowPreloader(value);
    }
    console.log("data",data);
  return (
    <div className="App">
      <header className="App-header">
        <div className="container-fluid list-container">
            {showList &&
            <div className="inner-list">
                <h3 className="text-dark pl-2 pt-2 mb-0">EVENTS</h3>
                <BootstrapTable
                    data={data}
                    keyField="id"
                    selectRow={selectRow}
                    bordered={false}
                    headerClasses={"d-none"}
                    rowClasses={rowClasses}
                    columns={[
                        {
                            dataField: 'details[0]',
                            type: 'text',
                            align:"center",
                            formatter:(value)=>{
                                return <div className={"box"}>
                                    <div className={"title"}>{value.title}</div>
                                    <div className={"value"}>{value.value}</div>
                                </div>
                            },
                            sort: true

                        },
                        {
                            dataField: 'details[1]',
                            type: 'text',
                            align:"center",
                            formatter:(value)=>{
                                return <div className={"box"}>
                                    <div className={"title"}>{value.title}</div>
                                    <div className={"value"}>{value.value}</div>
                                </div>
                            },
                            sort: true

                        },
                        {
                            dataField: 'details[2]',
                            type: 'text',
                            align:"center",
                            formatter:(value)=>{
                                return <div className={"box"}>
                                    <div className={"title"}>{value.title}</div>
                                    <div className={"value"}>{value.value}</div>
                                </div>
                            },
                            sort: true

                        },
                        {
                            dataField: 'details[3]',
                            type: 'text',
                            align:"center",
                            formatter:(value)=>{
                                return <div className={"box"}>
                                    <div className={"title"}>{value.title}</div>
                                    <div className={"value"}>{value.value}</div>
                                </div>
                            },
                            sort: true

                        },
                        {
                            dataField: 'details[4]',
                            type: 'text',
                            align:"center",
                            formatter:(value)=>{
                                return <div className={"box"}>
                                    <div className={"title"}>{value.title}</div>
                                    <div className={"value"}>{value.value}</div>
                                </div>
                            },
                            sort: true

                        },
                    ]
                    }
                />

            </div>
            }
            <div className="inner-detail">
                <h3 className="text-dark pl-2 pt-2 mb-2">EVENT DETAILS</h3>
                <div className="details-container">
                    {isActionNeeded &&
                    <div className="w-100 d-flex justify-content-around mb-3">
                        <button className="no-action-btn btn" onClick={removeButtons}>NO ACTION NEEDED</button>
                        <button className="take-action-btn btn" onClick={()=>setShowActionModal(true)}>TAKE ACTION</button>
                    </div>
                    }

                    <Tabs
                        id="details"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        <Tab eventKey="details" title="DETAILS">
                            <div className="w-100 d-flex justify-content-around pt-3">
                                {selectedRow &&
                                selectedRow.details.map((detail,key) => {
                                    return key <= 4 ? "" : <div className="box">
                                        <div className={"title"}>{detail.title}</div>
                                        <div className={"value"}>{detail.value}</div>
                                    </div>
                                })}
                            </div>

                        </Tab>
                        <Tab eventKey="location" title="LOCATION">
                            <div id={"map-container"} className="pt-3">
                                <div id="map"></div>
                            </div>
                        </Tab>
                        <Tab eventKey="media" title="MEDIA">
                            <div className="w-100 d-flex justify-content-around pt-3">
                                {(selectedRow && selectedRow.media[0].type === "image") &&
                                    <img src={selectedRow.media[0].url} onClick={()=>setShowModal(true)}  className="img-fluid" alt="media photo"/>
                                }
                                {(selectedRow && selectedRow.media[0].type === "audio") &&
                                <audio controls>
                                    <source src={selectedRow.media[0].url} type="audio/ogg"/>
                                    <source src={selectedRow.media[0].url} type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                                </audio>
                                }
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>

        </div>
      </header>
        <ModalPicture show={showModal} onHide={()=>setShowModal(false)} src={selectedRow ? selectedRow.media[0].url:""}/>
        <ModalAction show={showActionModal} onHide={()=>setShowActionModal(false)} callback={(value,text) => { return handlePreloader(value,text)}}/>
        <Preloader show={showPreloader} onHide={()=>setShowPreloader(false)} result={result} />
    </div>
  );
}

export default App;
