"use client";
import { useState, useRef } from "react";
import "./page.css";
import JsonTree from "./components/JsonTree";
import Loader from "./components/Loader";

export default function Home() {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // ---------- File Select ----------
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
      setStatus("idle");
    } else {
      setStatus("error");
    }
  };

  // ---------- Upload ----------
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch(
        "https://csv-to-json-backend-b5wd.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      setData(result);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setData(null);
    setStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="page-container">
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      {/* ---------- Header ---------- */}
      <div className="header-section">
        <div className="badge">
          <span>CSV Tool</span>
        </div>
        <h1 className="title">CSV to JSON Transformer</h1>
        <p className="subtitle">Upload CSV and view JSON structure</p>
      </div>

      {/* ---------- Card ---------- */}
      <div className="card">
        <div
          className="drop-zone"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden-input"
          />

          <div className="drop-content">
            <p className="drop-title">Click to select CSV file</p>
            <p className="drop-subtitle">Only .csv files are supported</p>
          </div>
        </div>

        {file && (
          <div className="file-info">
            <span className="file-name">{file.name}</span>
            <button onClick={clearFile} className="clear-btn">
              ✕
            </button>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="upload-btn"
        >
          {loading ? <Loader message="Please wait… this process may take time" /> : "Convert to json"}
        </button>

        {status === "error" && (
          <div className="message error">
            Please select a valid CSV file
          </div>
        )}

        {status === "success" && (
          <div className="message success">
            File uploaded successfully
          </div>
        )}
      </div>

      {/* ---------- JSON Tree ---------- */}
      {data && <JsonTree data={data} />}
    </div>
  );
}
