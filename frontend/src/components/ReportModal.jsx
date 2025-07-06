import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, FileText, Calendar, TrendingUp, Award } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const ReportModal = ({ isOpen, onClose, category, timeRange }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportFormat, setReportFormat] = useState('pdf')

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      // Create a temporary container for the report
      const reportContainer = document.createElement('div')
      reportContainer.style.position = 'absolute'
      reportContainer.style.left = '-9999px'
      reportContainer.style.width = '800px'
      reportContainer.style.padding = '40px'
      reportContainer.style.backgroundColor = 'white'
      reportContainer.style.fontFamily = 'Arial, sans-serif'
      
      // Generate report content
      reportContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1f2937; margin-bottom: 10px;">EduTracker Progress Report</h1>
          <p style="color: #6b7280;">Student Progress Analysis - ${category.toUpperCase()}</p>
          <p style="color: #6b7280; font-size: 14px;">${timeRange.toUpperCase()} REPORT</p>
          <hr style="margin: 20px 0; border: 1px solid #e5e7eb;">
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #374151; margin-bottom: 15px;">📊 Key Metrics</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              <div>
                <p style="font-weight: bold; color: #059669;">Overall Score: 87%</p>
                <p style="color: #6b7280; font-size: 14px;">↗️ +12% improvement</p>
              </div>
              <div>
                <p style="font-weight: bold; color: #dc2626;">Attendance: 95%</p>
                <p style="color: #6b7280; font-size: 14px;">↗️ +5% improvement</p>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #374151; margin-bottom: 15px;">🎯 Achievements</h2>
          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 5px 0;"><strong>✅ Perfect Attendance Week:</strong> No absences in Week 3</p>
            <p style="margin: 5px 0;"><strong>📚 Study Streak:</strong> 7 consecutive days of study sessions</p>
            <p style="margin: 5px 0;"><strong>🏆 Top Performer:</strong> Ranked #3 in Mathematics</p>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #374151; margin-bottom: 15px;">💡 Recommendations</h2>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 5px 0;"><strong>Keep working on:</strong> Consistent sleep schedule (detected late nights)</p>
            <p style="margin: 5px 0;"><strong>You're doing great on:</strong> Assignment completion and engagement</p>
            <p style="margin: 5px 0;"><strong>Suggestion:</strong> Consider joining study groups for enhanced learning</p>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #374151; margin-bottom: 15px;">📈 Progress Summary</h2>
          <table style="width: 100%; border-collapse: collapse; background: white;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: left; border: 1px solid #d1d5db;">Metric</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">Current</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">Previous</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 12px; border: 1px solid #d1d5db;">Academic Performance</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">87%</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">75%</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db; color: #059669;">+12%</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 12px; border: 1px solid #d1d5db;">Health & Wellness</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">92%</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">88%</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db; color: #059669;">+4%</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #d1d5db;">Goal Achievement</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">78%</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">70%</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db; color: #059669;">+8%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
          <p style="color: #6b7280; font-size: 12px;">EduTracker - Empowering Education Through Data</p>
        </div>
      `
      
      document.body.appendChild(reportContainer)
      
      // Convert to canvas and generate PDF
      const canvas = await html2canvas(reportContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      // Download the PDF
      pdf.save(`progress-report-${category}-${timeRange}.pdf`)
      
      // Clean up
      document.body.removeChild(reportContainer)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="modal-backdrop" onClick={onClose} />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-panel w-full max-w-lg p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Download Report</h3>
                  <p className="text-sm text-gray-600">Export your {category} progress</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Report Preview */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-8 w-8 text-primary-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {category.charAt(0).toUpperCase() + category.slice(1)} Report
                    </h4>
                    <p className="text-sm text-gray-600">{timeRange} analysis</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>Progress charts and metrics</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    <span>Achievements and badges earned</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Detailed timeline analysis</span>
                  </div>
                </div>
              </div>

              {/* Format Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Report Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setReportFormat('pdf')}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      reportFormat === 'pdf'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileText className="h-6 w-6 mx-auto mb-1" />
                    <span className="text-sm font-medium">PDF Report</span>
                  </button>
                  
                  <button
                    onClick={() => setReportFormat('summary')}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      reportFormat === 'summary'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                    <span className="text-sm font-medium">Quick Summary</span>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Download Report</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ReportModal
