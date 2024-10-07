'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { usePDF } from 'react-to-pdf'

export default function NewCoverLetter() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [recipient, setRecipient] = useState('')
  const [company, setCompany] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [content, setContent] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()
  const { toPDF, targetRef } = usePDF({filename: 'cover-letter.pdf'});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowPreview(true)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const renderCoverLetter = () => {
    return (
      <div ref={targetRef} className="bg-white w-full max-w-[8.5in] mx-auto" style={{ minHeight: '11in' }}>
        <div className="bg-blue-900 text-white w-full py-6">
          <h1 className="text-4xl font-bold text-center mb-2">{name.toUpperCase()}</h1>
          <p className="text-sm text-center">{email} | {location}</p>
        </div>
        <div className="px-8 py-6">
          <p>{formatDate(new Date())}</p>
          <p className="mt-4">{recipient}</p>
          <p>{company}</p>
          <p>{companyAddress}</p>
          <p className="mt-4">RE: {jobTitle}</p>
          <p className="mt-4">Dear Hiring Manager,</p>
          <div className="mt-4 whitespace-pre-wrap">{content}</div>
          <p className="mt-4">Thank you for considering my application. I have attached my resume for your review. I am available for an interview at your convenience.</p>
          <p className="mt-4">Sincerely,</p>
          <p className="mt-2 font-bold">{name}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {!showPreview ? (
        <div className="relative py-3 sm:max-w-xl sm:mx-auto text-black">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-semibold mb-6">Create New Cover Letter</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient</label>
                  <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                  <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">Company Address</label>
                  <input type="text" id="companyAddress" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input type="text" id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows={5} required></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Create Cover Letter
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative py-3 sm:max-w-[8.5in] sm:mx-auto text-black">
          <div className="relative bg-white shadow-lg">
            {renderCoverLetter()}
            <div className="mt-8 flex justify-center space-x-4 p-4">
              <button onClick={() => toPDF()} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Download PDF
              </button>
              <button onClick={() => setShowPreview(false)} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}