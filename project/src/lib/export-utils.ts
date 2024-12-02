import { Parser } from 'papaparse'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportToCSV(data: any[], filename: string) {
  const csv = Parser.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToPDF(
  data: any[],
  filename: string,
  title: string,
  headers: string[]
) {
  const doc = new jsPDF()
  
  // Add title
  doc.setFontSize(16)
  doc.text(title, 14, 15)
  
  // Add timestamp
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 25)
  
  // Create table
  autoTable(doc, {
    head: [headers],
    body: data.map(item => headers.map(header => item[header.toLowerCase()])),
    startY: 35,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [59, 130, 246] }
  })
  
  doc.save(`${filename}.pdf`)
}