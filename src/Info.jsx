function Info({ coord }) {
  return (
    <div className="info">
      <div className="sub-info">
        <h4>IP ADDRESS</h4>
        <p>{coord.ip}</p>
      </div>
      <div className="sub-info">
        <h4>LOCATION</h4>
        <p>
          {coord.location.city}, {coord.location.region}{" "}
          {coord.location.postalCode}
        </p>
      </div>
      <div className="sub-info">
        <h4>TIMEZONE</h4>
        <p>UTC {coord.location.timezone}</p>
      </div>
      <div className="sub-info">
        <h4>ISP</h4>
        <p>{coord.isp}</p>
      </div>
    </div>
  );
}

export default Info;
