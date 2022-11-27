import { useState } from "react";

function Submitter({ pasteInfo }) {
  const [val, setVal] = useState("");
  return (
    <div className="submitter">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pasteInfo(val);
        }}
      >
        <input
          type="text"
          minLength="7"
          maxLength="15"
          size="15"
          pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
          placeholder="Search for any address..."
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button type="submit">&gt;</button>
      </form>
    </div>
  );
}

export default Submitter;
