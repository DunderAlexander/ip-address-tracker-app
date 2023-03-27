import Submitter from "./Submitter";
import Info from "./Info";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useState, useEffect } from "react";

function App() {
  const [coord, setCoord] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function getMyInfo() {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      const myInfo = await getInfo(data.ip);
      setCoord(myInfo);
      setLoading(false);
    }
    getMyInfo();
  }, []);

  async function getInfo(ip) {
    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async function pasteInfo(ip) {
    const info = await getInfo(ip);
    if (info.code) {
      alert(`Invalid IP address. Code: ${info.code}`);
      return;
    }
    setCoord(info);
  }
  function SetViewOnClick() {
    const map = useMap();
    map.setView([coord.location.lat, coord.location.lng], map.getZoom());

    return null;
  }
  return (
    <>
      <div className="container">
        <h1>IP Address Tracker</h1>
        <div className="wrapper">
          <Submitter pasteInfo={pasteInfo} />
          {!loading && <Info coord={coord} />}
        </div>
      </div>

      {!loading && (
        <MapContainer
          center={[coord.location.lat, coord.location.lng]}
          zoom={16}
          scrollWheelZoom={false}
          style={{
            width: "100%",
            height: "60%",
            position: "absolute",
            top: "40%",
            zIndex: 1,
          }}
        >
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=9aoW2uiPwYwQifPW4uKL"
          />
          <SetViewOnClick
            coordLatLang={[coord.location.lat, coord.location.lng]}
          />
        </MapContainer>
      )}
    </>
  );
}
export default App;
