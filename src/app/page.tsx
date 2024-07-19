'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://png-to-pdf-production.up.railway.app'
    : 'http://localhost:3030'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

    setLoading(true)
    setError('')
    setDownloadUrl('')

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
      setError('Failed to upload and convert the file. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">
        Upload Image to Convert to PDF
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Uploading...' : 'Upload and Convert'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {downloadUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Converted PDF:</h2>
          <br />
          <a
            href={downloadUrl}
            download="converted.pdf"
            className=" hover:underline m-t-3 `w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  )
}
