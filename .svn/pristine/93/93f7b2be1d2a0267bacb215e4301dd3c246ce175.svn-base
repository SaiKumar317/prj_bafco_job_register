async function focusFetchDataFromApi(
  endpoint,
  requestData,
  sessionId,
  setLoading
) {
  try {
    if (typeof setLoading === "function") setLoading(true);

    var focusUrl = window.focusUrl;
    const response = await fetch(`${focusUrl}${endpoint}`, {
      ...(requestData !== "" ? { method: "POST" } : { method: "GET" }),
      headers: {
        "Content-Type": "application/json",
        fSessionId: sessionId,
      },
      ...(requestData !== "" && { body: JSON.stringify(requestData) }),
    });

    if (!response.ok) {
      return { error: "Network response was not ok" };
    }

    const data = await response.json();
    if (data.result === 1) {
      console.log("JsonData", data);
      return data;
    } else {
      return { error: data };
    }
  } catch (error) {
    console.error("There was a problem with the fetch request:", error);
    return { error };
  } finally {
    if (typeof setLoading === "function") setLoading(false);
  }
}
export { focusFetchDataFromApi };
