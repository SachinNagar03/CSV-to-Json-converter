"use client";
import { useState, useRef } from "react";
import "./design2.css";
import JsonTree from "./components/JsonTree";

export default function Home() {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.name.endsWith(".csv")) {
      setFile(droppedFile);
      setStatus("idle");
    } else {
      setStatus("error");
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setStatus("idle");

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setData(result);

    setLoading(false);
    setStatus("success");
  };

  const clearFile = () => {
    setFile(null);
    setData(null);
    setStatus("idle");
  };

  return (
    <div className="page-container">
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      <div className="header-section">
        <div className="badge">
          <span>CSV Tool</span>
        </div>
        <h1 className="title">CSV to JSON Transformer</h1>
        <p className="subtitle">Upload CSV and view JSON structure</p>
      </div>

      <div className="card">
        <div
          className={`drop-zone ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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
            <p className="drop-title">Drop CSV file here</p>
            <p className="drop-subtitle">or click to browse</p>
          </div>
        </div>

        {file && (
          <div className="file-info">
            <span className="file-name">{file.name}</span>
            <button onClick={clearFile} className="clear-btn">✕</button>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="upload-btn"
        >
          {loading ? "Uploading..." : "Upload File"}
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

      {data && <JsonTree data={data} />}
    </div>
  );
}
