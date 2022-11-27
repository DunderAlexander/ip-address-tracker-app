import Submitter from "./Submitter";
import Info from "./Info";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useState } from "react";

function App() {
  const [coord, setCoord] = useState(initialData);
  const coordLatLang = [coord.location.lat, coord.location.lng];

  async function getInfo(ip) {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
    );
    const data = await res.json();
    return data;
  }
  async function pasteInfo(ip) {
    const info = await getInfo(ip);
    setCoord(info);
  }
  function SetViewOnClick({ coordLatLang }) {
    const map = useMap();
    map.setView(coordLatLang, map.getZoom());

    return null;
  }
  return (
    <>
      <div className="container">
        <h1>IP Address Tracker</h1>
        <div className="wrapper">
          <Submitter coord={coord} pasteInfo={pasteInfo} />
          <Info coord={coord} />
        </div>
      </div>
      <MapContainer
        center={coordLatLang}
        zoom={17}
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick coordLatLang={coordLatLang} />
      </MapContainer>
    </>
  );
}
export default App;

const initialData = {
  ip: "123.456.78.9",
  location: {
    country: "US",
    region: "California",
    city: "Mountain View",
    lat: 37.40599,
    lng: -122.078514,
    postalCode: "94043",
    timezone: "-07:00",
    geonameId: 5375481,
  },
  domains: [
    "0d2.net",
    "003725.com",
    "0f6.b0094c.cn",
    "007515.com",
    "0guhi.jocose.cn",
  ],
  as: {
    asn: 15169,
    name: "Google LLC",
    route: "8.8.8.0/24",
    domain: "https://about.google/intl/en/",
    type: "Content",
  },
  isp: "Google LLC",
};
