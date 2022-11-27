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
