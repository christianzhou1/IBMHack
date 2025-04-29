import { useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/watsonx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response || data.error);
    } catch (err) {
      console.error(err);
      setResponse("error contacting the backend");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Watsonx Prompt Tester</h1>
      <textarea
        className="w-full p-2 border mt-2"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <Button onClick={handleSubmit}>Generate</Button>
      <div className="mt-4">
        <h2 className="font-semibold">Response:</h2>
        <pre className="bg-gray-500 p-2">{response}</pre>
      </div>
    </div>
  );
}

export default App;
