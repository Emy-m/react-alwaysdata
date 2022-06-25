import React, { useState, useEffect } from "react";
import { environment } from "../environment";

function Test() {
  const [get, setGet] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(environment.API_URL)
      .then((res) => res.json())
      .then((data) => {
        setGet(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{get.message}</div>;
}

export default Test;
