'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3030'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [downloadUrl, setDownloadUrl] = useState('')

  const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files.length > 0) {
      setFile(ev.target.files[0])
    }
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post(
        BASE_URL + '/api/ocr/convert',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // Ensure the response is treated as a Blob
        }
      )

      // Create a URL for the blob object and set it as the download URL
      const url = window.URL.createObjectURL(new Blob([response.data]))
      setDownloadUrl(url)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <div>
      <h1>Upload Image to Convert to PDF</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload and Convert</button>
      </form>
      {downloadUrl && (
        <div>
          <h2>Converted PDF:</h2>
          <a href={downloadUrl} download="converted.pdf">
            Download PDF
          </a>
        </div>
      )}
    </div>
  )
}
