// Enhanced AI Analysis Service for Student Progress Interpretation
import jsPDF from 'jspdf'
import 'jspdf-autotable'

class AIAnalysisService {
  constructor() {
    this.analysisModel = new StudentProgressAnalyzer()
  }

  // Main analysis function that processes all student data
  async analyzeStudentProgress(studentData) {
    const {
      progressCategories,
      weeklyProgress,
      badges,
      tasks,
      schedule,
      youtubeEngagement
    } = studentData

    // Perform comprehensive analysis
    const analysis = {
      overallPerformance: this.analyzeOverallPerformance(progressCategories, weeklyProgress),
      strengthsAndWeaknesses: this.identifyStrengthsAndWeaknesses(progressCategories),
      learningPatterns: this.analyzeLearningPatterns(tasks, schedule),
      recommendations: this.generateRecommendations(progressCategories, tasks),
      motivationalInsights: this.generateMotivationalInsights(badges, progressCategories),
      riskAssessment: this.assessRisks(progressCategories, tasks),
      futureProjections: this.projectFuturePerformance(progressCategories),
      engagementMetrics: this.analyzeEngagement(youtubeEngagement, tasks)
    }

    return analysis
  }

  // Analyze overall performance trends
  analyzeOverallPerformance(progressCategories, weeklyProgress) {
    const avgScore = progressCategories.reduce((sum, cat) => sum + cat.score, 0) / progressCategories.length
    const trendDirection = this.calculateTrendDirection(progressCategories)
    
    return {
      averageScore: Math.round(avgScore),
      weeklyProgress: weeklyProgress,
      trendDirection,
      performanceLevel: this.getPerformanceLevel(avgScore),
      consistency: this.calculateConsistency(progressCategories),
      improvement: this.calculateImprovement(progressCategories)
    }
  }

  // Identify student's strengths and areas for improvement
  identifyStrengthsAndWeaknesses(progressCategories) {
    // Flatten health subcategories for analysis
    const allCategories = []
    progressCategories.forEach(category => {
      if (category.subcategories) {
        allCategories.push(...category.subcategories.map(sub => ({
          ...sub,
          parentCategory: category.name
        })))
      } else {
        allCategories.push(category)
      }
    })
    
    const sorted = [...allCategories].sort((a, b) => b.score - a.score)
    
    return {
      topStrengths: sorted.slice(0, 3).map(cat => ({
        area: cat.parentCategory ? `${cat.parentCategory} - ${cat.name}` : cat.name,
        score: cat.score,
        insight: this.getStrengthInsight(cat),
        category: cat.parentCategory || cat.name
      })),
      areasForImprovement: sorted.slice(-3).map(cat => ({
        area: cat.parentCategory ? `${cat.parentCategory} - ${cat.name}` : cat.name,
        score: cat.score,
        insight: this.getImprovementInsight(cat),
        actionPlan: this.generateActionPlan(cat),
        category: cat.parentCategory || cat.name
      }))
    }
  }

  // Analyze learning patterns and study habits
  analyzeLearningPatterns(tasks, schedule) {
    const completionRate = this.calculateTaskCompletionRate(tasks)
    const studyTiming = this.analyzeStudyTiming(schedule)
    const taskPriority = this.analyzeTaskPrioritization(tasks)

    return {
      completionRate,
      studyTiming,
      taskPriority,
      productivity: this.calculateProductivity(tasks, schedule),
      consistencyScore: this.calculateStudyConsistency(schedule)
    }
  }

  // Generate personalized recommendations
  generateRecommendations(progressCategories, tasks) {
    const recommendations = []
    
    // Analyze all categories including health subcategories
    progressCategories.forEach(category => {
      if (category.subcategories) {
        // Check each health subcategory
        category.subcategories.forEach(subcat => {
          if (subcat.score < 90) {
            const priority = subcat.score < 60 ? 'High' : subcat.score < 80 ? 'Medium' : 'Low'
            recommendations.push({
              category: `${category.name} - ${subcat.name}`,
              priority: priority,
              action: this.getRecommendationAction(subcat),
              timeframe: this.getRecommendationTimeframe(subcat.score),
              resources: this.getRecommendedResources(subcat),
              motivationalNote: this.getMotivationalNote(subcat)
            })
          }
        })
      } else if (category.score < 90) {
        const priority = category.score < 60 ? 'High' : category.score < 80 ? 'Medium' : 'Low'
        recommendations.push({
          category: category.name,
          priority: priority,
          action: this.getRecommendationAction(category),
          timeframe: this.getRecommendationTimeframe(category.score),
          resources: this.getRecommendedResources(category),
          motivationalNote: this.getMotivationalNote(category)
        })
      }
    })

    // Add general recommendations for overall growth
    recommendations.push(...this.getGeneralRecommendations(progressCategories, tasks))

    // Ensure we always have at least 3 recommendations
    if (recommendations.length < 3) {
      recommendations.push(...this.getBoostRecommendations(progressCategories))
    }

    return recommendations.slice(0, 6) // Top 6 recommendations for better coverage
  }

  // Generate motivational insights
  generateMotivationalInsights(badges, progressCategories) {
    const recentAchievements = badges.slice(0, 3)
    const momentum = this.calculateMomentum(progressCategories)
    
    return {
      recentAchievements,
      momentum,
      motivationalMessage: this.generateMotivationalMessage(momentum, recentAchievements),
      nextMilestone: this.identifyNextMilestone(progressCategories),
      encouragement: this.generateEncouragement(progressCategories)
    }
  }

  // Assess potential risks and challenges
  assessRisks(progressCategories, tasks) {
    const risks = []
    
    // Check for declining performance in main categories and subcategories
    progressCategories.forEach(category => {
      if (category.subcategories) {
        category.subcategories.forEach(subcat => {
          if (subcat.score < 60) {
            risks.push({
              type: 'Performance Risk',
              area: `${category.name} - ${subcat.name}`,
              severity: 'High',
              description: `${subcat.name} score is below 60%`,
              mitigation: this.getRiskMitigation(subcat)
            })
          }
        })
      } else if (category.score < 60) {
        risks.push({
          type: 'Performance Risk',
          area: category.name,
          severity: 'High',
          description: `${category.name} score is below 60%`,
          mitigation: this.getRiskMitigation(category)
        })
      }
    })

    // Check for overdue tasks
    const overdueTasks = tasks.filter(task => task.priority === 'high' && task.time && task.time.includes('hour'))
    if (overdueTasks.length > 0) {
      risks.push({
        type: 'Task Management Risk',
        area: 'Time Management',
        severity: 'Medium',
        description: `${overdueTasks.length} high-priority tasks due soon`,
        mitigation: 'Prioritize urgent tasks and break them into smaller chunks'
      })
    }

    return risks
  }

  // Project future performance
  projectFuturePerformance(progressCategories) {
    const projections = []
    
    progressCategories.forEach(category => {
      if (category.subcategories) {
        category.subcategories.forEach(subcat => {
          const trend = this.calculateCategoryTrend(subcat)
          const projectedScore = Math.min(100, Math.max(0, subcat.score + trend * 4))
          
          projections.push({
            category: `${category.name} - ${subcat.name}`,
            currentScore: subcat.score,
            projectedScore: Math.round(projectedScore),
            trend: trend > 0 ? 'Improving' : trend < 0 ? 'Declining' : 'Stable',
            confidence: this.calculateProjectionConfidence(subcat)
          })
        })
      } else {
        const trend = this.calculateCategoryTrend(category)
        const projectedScore = Math.min(100, Math.max(0, category.score + trend * 4))
        
        projections.push({
          category: category.name,
          currentScore: category.score,
          projectedScore: Math.round(projectedScore),
          trend: trend > 0 ? 'Improving' : trend < 0 ? 'Declining' : 'Stable',
          confidence: this.calculateProjectionConfidence(category)
        })
      }
    })

    return projections
  }

  // Analyze engagement metrics
  analyzeEngagement(youtubeEngagement, tasks) {
    return {
      videoWatchTime: youtubeEngagement?.totalWatchTime || 0,
      completedVideos: youtubeEngagement?.completedVideos || 0,
      taskEngagement: this.calculateTaskEngagement(tasks),
      overallEngagement: this.calculateOverallEngagement(youtubeEngagement, tasks)
    }
  }

  // Generate comprehensive and motivational PDF report
  async generatePDFReport(analysis, studentData) {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    
    // Title Page with colorful motivational design
    doc.setFillColor(59, 130, 246) // Blue gradient start
    doc.rect(0, 0, pageWidth, 80, 'F')
    
    doc.setFontSize(32)
    doc.setTextColor(255, 255, 255) // White text
    doc.text('🌟 YOUR AMAZING PROGRESS REPORT 🌟', pageWidth / 2, 35, { align: 'center' })
    
    doc.setFontSize(20)
    doc.text(`${studentData.studentName || 'Superstar Student'}`, pageWidth / 2, 55, { align: 'center' })
    doc.setFontSize(14)
    doc.text(`Generated with AI Love on ${new Date().toLocaleDateString()}`, pageWidth / 2, 68, { align: 'center' })

    // QUICK SUMMARY Section with colorful boxes
    doc.setFontSize(22)
    doc.setTextColor(139, 92, 246) // Purple color
    doc.text('📊 QUICK SUMMARY - YOU\'RE DOING GREAT!', 20, 100)
    
    const performanceLevel = analysis.overallPerformance.performanceLevel
    const avgScore = analysis.overallPerformance.averageScore
    const trendDirection = analysis.overallPerformance.trendDirection
    
    // Colorful summary boxes with emojis
    doc.setFillColor(34, 197, 94) // Green
    doc.roundedRect(20, 110, 50, 30, 5, 5, 'F')
    doc.setFontSize(12)
    doc.setTextColor(255, 255, 255)
    doc.text('🎯 Overall Score', 45, 120, { align: 'center' })
    doc.setFontSize(18)
    doc.text(`${avgScore}%`, 45, 130, { align: 'center' })
    doc.setFontSize(10)
    doc.text('FANTASTIC!', 45, 137, { align: 'center' })

    doc.setFillColor(255, 165, 0) // Orange
    doc.roundedRect(80, 110, 50, 30, 5, 5, 'F')
    doc.setFontSize(12)
    doc.text('📈 Performance', 105, 120, { align: 'center' })
    doc.setFontSize(14)
    doc.text(performanceLevel, 105, 130, { align: 'center' })
    doc.setFontSize(10)
    doc.text('AMAZING!', 105, 137, { align: 'center' })

    doc.setFillColor(139, 92, 246) // Purple
    doc.roundedRect(140, 110, 50, 30, 5, 5, 'F')
    doc.setFontSize(12)
    doc.text('🚀 Trend', 165, 120, { align: 'center' })
    doc.setFontSize(14)
    doc.text(trendDirection, 165, 130, { align: 'center' })
    doc.setFontSize(10)
    doc.text('AWESOME!', 165, 137, { align: 'center' })

    // Super motivational quick summary message
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    const motivationalMsg = this.getMotivationalSummary(analysis)
    const msgLines = doc.splitTextToSize(motivationalMsg, pageWidth - 40)
    doc.text(msgLines, 20, 155)

    // AI INSIGHTS with better formatting
    let yPosition = 155 + (msgLines.length * 7) + 20
    doc.setFillColor(255, 215, 0) // Gold background
    doc.roundedRect(15, yPosition - 10, pageWidth - 30, 15, 3, 3, 'F')
    doc.setFontSize(18)
    doc.setTextColor(0, 0, 0)
    doc.text('🤖 AI INSIGHTS - WHAT OUR SMART AI DISCOVERED', 20, yPosition)
    
    yPosition += 15
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    const summaryText = this.generateExecutiveSummary(analysis)
    const summaryLines = doc.splitTextToSize(summaryText, pageWidth - 40)
    doc.text(summaryLines, 20, yPosition)

    // Performance breakdown with visual celebration including health subcategories
    yPosition = yPosition + (summaryLines.length * 7) + 25
    doc.setFillColor(255, 182, 193) // Light pink
    doc.roundedRect(15, yPosition - 10, pageWidth - 30, 15, 3, 3, 'F')
    doc.setFontSize(16)
    doc.setTextColor(139, 92, 246)
    doc.text('📈 YOUR SUPERPOWER BREAKDOWN', 20, yPosition)
    
    yPosition += 15
    
    // Create detailed performance table with health subcategories
    const performanceTableData = []
    studentData.progressCategories.forEach(cat => {
      if (cat.subcategories) {
        // Add main category
        performanceTableData.push([
          `${cat.name} Overall`,
          `${cat.score}% 🔥`,
          cat.trend.includes('+') ? '📈 Rising Star!' : '➡️ Steady Champion!',
          cat.score >= 85 ? '🏆 LEGENDARY!' : cat.score >= 70 ? '🎉 INCREDIBLE!' : '🚀 RISING UP!'
        ])
        // Add subcategories
        cat.subcategories.forEach(subcat => {
          performanceTableData.push([
            `  ${subcat.icon} ${subcat.name}`,
            `${subcat.score}% 💫`,
            subcat.trend.includes('+') ? '📈 Ascending!' : '➡️ Solid!',
            subcat.score >= 90 ? '🌟 AMAZING!' : subcat.score >= 80 ? '⭐ GREAT!' : '🚀 GROWING!'
          ])
        })
      } else {
        performanceTableData.push([
          `${cat.name} Mastery`,
          `${cat.score}% 🔥`,
          cat.trend.includes('+') ? '📈 Rising Star!' : '➡️ Steady Champion!',
          cat.score >= 85 ? '🏆 LEGENDARY!' : cat.score >= 70 ? '🎉 INCREDIBLE!' : '🚀 RISING UP!'
        ])
      }
    })

    doc.autoTable({
      startY: yPosition,
      head: [['📚 Your Amazing Skills', '📊 Current Power Level', '📈 Growth Direction', '⭐ Celebration Status']],
      body: performanceTableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [59, 130, 246],
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 9
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    })

    // New Page - ACHIEVEMENTS AND SUPERPOWERS
    doc.addPage()
    yPosition = 20

    // Achievements section with celebration
    doc.setFillColor(255, 215, 0) // Gold background
    doc.rect(0, 0, pageWidth, 70, 'F')
    
    doc.setFontSize(28)
    doc.setTextColor(0, 0, 0)
    doc.text('🏆 YOUR INCREDIBLE SUPERPOWERS! 🏆', pageWidth / 2, 25, { align: 'center' })
    doc.setFontSize(16)
    doc.text('You are absolutely AMAZING! Here\'s proof:', pageWidth / 2, 45, { align: 'center' })
    doc.setFontSize(14)
    doc.text('🌟 Keep shining, superstar! The world needs your unique talents! 🌟', pageWidth / 2, 60, { align: 'center' })

    yPosition = 90
    doc.setFillColor(34, 197, 94) // Green background
    doc.roundedRect(15, yPosition - 5, pageWidth - 30, 12, 3, 3, 'F')
    doc.setFontSize(16)
    doc.setTextColor(255, 255, 255)
    doc.text('💪 YOUR TOP SUPERPOWERS', 20, yPosition + 3)
    
    yPosition += 20
    analysis.strengthsAndWeaknesses.topStrengths.forEach((strength, index) => {
      doc.setFillColor(240, 253, 244) // Light green background
      doc.roundedRect(20, yPosition - 5, pageWidth - 40, 25, 3, 3, 'F')
      
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text(`${index + 1}. 🌟 ${strength.area} Champion`, 25, yPosition + 5)
      doc.setFontSize(11)
      doc.setTextColor(22, 163, 74)
      const insightLines = doc.splitTextToSize(`✨ ${strength.insight}`, pageWidth - 60)
      doc.text(insightLines, 25, yPosition + 12)
      yPosition += 35
    })

    // Growth opportunities with positive framing
    yPosition += 10
    doc.setFillColor(59, 130, 246) // Blue background
    doc.roundedRect(15, yPosition - 5, pageWidth - 30, 12, 3, 3, 'F')
    doc.setFontSize(16)
    doc.setTextColor(255, 255, 255)
    doc.text('🚀 YOUR NEXT LEVEL-UP OPPORTUNITIES', 20, yPosition + 3)
    
    yPosition += 20
    analysis.strengthsAndWeaknesses.areasForImprovement.forEach((area, index) => {
      doc.setFillColor(239, 246, 255) // Light blue background
      doc.roundedRect(20, yPosition - 5, pageWidth - 40, 35, 3, 3, 'F')
      
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text(`${index + 1}. 🎯 ${area.area} Growth Zone`, 25, yPosition + 5)
      doc.setFontSize(11)
      doc.setTextColor(37, 99, 235)
      const insightLines = doc.splitTextToSize(`💡 ${area.insight}`, pageWidth - 60)
      doc.text(insightLines, 25, yPosition + 12)
      doc.setFontSize(10)
      doc.setTextColor(91, 33, 182)
      const actionLines = doc.splitTextToSize(`🎯 Power Move: ${area.actionPlan}`, pageWidth - 60)
      doc.text(actionLines, 25, yPosition + 22)
      yPosition += 45
    })

    // New Page - ACTION PLAN
    doc.addPage()
    yPosition = 20
    
    doc.setFillColor(139, 92, 246) // Purple background
    doc.rect(0, 0, pageWidth, 60, 'F')
    
    doc.setFontSize(24)
    doc.setTextColor(255, 255, 255)
    doc.text('🎯 YOUR PERSONALIZED SUCCESS ROADMAP', pageWidth / 2, 25, { align: 'center' })
    doc.setFontSize(14)
    doc.text('AI-Powered Action Steps Just for You!', pageWidth / 2, 45, { align: 'center' })

    yPosition = 80
    doc.setFillColor(255, 165, 0) // Orange background
    doc.roundedRect(15, yPosition - 5, pageWidth - 30, 12, 3, 3, 'F')
    doc.setFontSize(16)
    doc.setTextColor(255, 255, 255)
    doc.text('✨ YOUR AI-POWERED RECOMMENDATIONS', 20, yPosition + 3)
    
    yPosition += 20
    const recommendationTableData = analysis.recommendations.map(rec => [
      `🎯 ${rec.category}`,
      rec.priority === 'High' ? '🔥 High' : rec.priority === 'Medium' ? '📈 Medium' : '🌟 Low',
      rec.action,
      rec.timeframe,
      rec.motivationalNote || '⭐ You\'ve got this!'
    ])

    doc.autoTable({
      startY: yPosition,
      head: [['🎯 Focus Area', '⚡ Priority', '🚀 Your Action Steps', '⏰ Timeline', '💪 Motivation Boost']],
      body: recommendationTableData,
      theme: 'striped',
      headStyles: { 
        fillColor: [139, 92, 246],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 9
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 20 },
        2: { cellWidth: 60 },
        3: { cellWidth: 20 },
        4: { cellWidth: 45 }
      }
    })

    // Future success predictions
    yPosition = doc.lastAutoTable.finalY + 30
    doc.setFillColor(34, 197, 94) // Green background
    doc.roundedRect(15, yPosition - 5, pageWidth - 30, 12, 3, 3, 'F')
    doc.setFontSize(16)
    doc.setTextColor(255, 255, 255)
    doc.text('🔮 YOUR BRIGHT FUTURE PREDICTIONS', 20, yPosition + 3)
    
    yPosition += 20
    doc.autoTable({
      startY: yPosition,
      head: [['📚 Skill Area', '📊 Current', '🚀 Future You', '📈 Trend Magic', '🎯 AI Confidence']],
      body: analysis.futureProjections.map(proj => [
        `${proj.category} Power`,
        `${proj.currentScore}% 💪`,
        `${proj.projectedScore}% 🌟`,
        proj.trend === 'Improving' ? '📈 Rising Star!' : proj.trend === 'Declining' ? '💪 Comeback Mode!' : '➡️ Steady Champion!',
        `${proj.confidence} 🎯`
      ]),
      theme: 'grid',
      headStyles: { 
        fillColor: [34, 197, 94],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 9
      }
    })

    // Motivational closing with rainbow background
    yPosition = doc.lastAutoTable.finalY + 25
    doc.setFillColor(255, 182, 193) // Light pink
    doc.roundedRect(10, yPosition, pageWidth - 20, 50, 8, 8, 'F')
    
    doc.setFontSize(18)
    doc.setTextColor(139, 69, 19) // Brown text
    doc.text('🌈 YOUR SUCCESS MANTRA 🌈', pageWidth / 2, yPosition + 15, { align: 'center' })
    
    doc.setFontSize(14)
    const closingMessage = "🌟 You are UNSTOPPABLE! Every step you take brings you closer to your dreams. Your journey is unique, your potential is limitless, and your future is incredibly bright! Keep believing in yourself - the world needs what you have to offer! 🚀✨💫"
    const closingLines = doc.splitTextToSize(closingMessage, pageWidth - 40)
    doc.text(closingLines, 20, yPosition + 25)

    return doc
  }

  // Enhanced motivational summary
  getMotivationalSummary(analysis) {
    const score = analysis.overallPerformance.averageScore
    const trend = analysis.overallPerformance.trendDirection
    
    if (score >= 90) {
      return "🌟 ABSOLUTELY INCREDIBLE! You're performing at a superstar level! Your dedication and hard work are paying off in amazing ways. You're not just succeeding - you're THRIVING! Keep this incredible momentum going!"
    } else if (score >= 80) {
      return "🚀 FANTASTIC WORK! You're doing excellently and showing remarkable consistency. Your growth mindset is evident, and you're well on your way to achieving greatness. The sky's the limit for you!"
    } else if (score >= 70) {
      return "👍 GREAT JOB! You're making solid progress and showing real dedication. Your efforts are building a strong foundation for future success. Keep pushing forward - amazing things are coming!"
    } else if (trend === 'Improving') {
      return "📈 AMAZING PROGRESS! Your upward trajectory shows you're building incredible momentum. This is how champions are made - through persistence and continuous improvement. Your breakthrough is coming!"
    } else {
      return "💪 CHAMPION IN THE MAKING! Every great success story has chapters of challenge and growth. You're writing your comeback story right now, and it's going to be EPIC! Your determination will lead to triumph!"
    }
  }

  // Enhanced executive summary
  generateExecutiveSummary(analysis) {
    const { overallPerformance, strengthsAndWeaknesses, recommendations } = analysis
    
    return `🎉 Our advanced AI analysis reveals that you are absolutely ROCKING IT at a ${overallPerformance.performanceLevel} level with an impressive ${overallPerformance.averageScore}% overall score! 

📊 Your performance trend is ${overallPerformance.trendDirection.toLowerCase()}, which shows you're on an amazing path! Your natural superpowers shine brightest in ${strengthsAndWeaknesses.topStrengths[0]?.area} and ${strengthsAndWeaknesses.topStrengths[1]?.area} - these are your secret weapons for success! 

🎯 To unlock even more of your incredible potential, we've identified golden opportunities in ${strengthsAndWeaknesses.areasForImprovement[0]?.area} and ${strengthsAndWeaknesses.areasForImprovement[1]?.area}. 

🤖 Our AI has crafted ${recommendations.length} personalized power moves specifically for you to accelerate your journey to academic excellence and beyond! You're destined for greatness! 🌟`
  }

  // Helper methods for calculations and insights
  calculateTrendDirection(categories) {
    const trends = categories.map(cat => {
      if (cat.subcategories) {
        // Average trend of subcategories
        const subTrends = cat.subcategories.map(sub => parseFloat(sub.trend.replace('%', '').replace('+', '')))
        return subTrends.reduce((sum, trend) => sum + trend, 0) / subTrends.length
      }
      return parseFloat(cat.trend.replace('%', '').replace('+', ''))
    })
    const avgTrend = trends.reduce((sum, trend) => sum + trend, 0) / trends.length
    return avgTrend > 0 ? 'Improving' : avgTrend < 0 ? 'Declining' : 'Stable'
  }

  getPerformanceLevel(score) {
    if (score >= 90) return 'Exceptional'
    if (score >= 80) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 60) return 'Satisfactory'
    return 'Needs Improvement'
  }

  calculateConsistency(categories) {
    const scores = []
    categories.forEach(cat => {
      if (cat.subcategories) {
        scores.push(...cat.subcategories.map(sub => sub.score))
      } else {
        scores.push(cat.score)
      }
    })
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    const stdDev = Math.sqrt(variance)
    return Math.max(0, 100 - stdDev * 2)
  }

  calculateImprovement(categories) {
    const trends = []
    categories.forEach(cat => {
      if (cat.subcategories) {
        trends.push(...cat.subcategories.map(sub => parseFloat(sub.trend.replace('%', '').replace('+', ''))))
      } else {
        trends.push(parseFloat(cat.trend.replace('%', '').replace('+', '')))
      }
    })
    return trends.reduce((sum, trend) => sum + trend, 0)
  }

  calculateCategoryTrend(category) {
    return parseFloat(category.trend.replace('%', '').replace('+', ''))
  }

  calculateProjectionConfidence(category) {
    if (category.score >= 80) return 'High'
    if (category.score >= 60) return 'Medium'
    return 'Low'
  }

  getRecommendationAction(category) {
    const actions = {
      'Academics': 'Boost your study power! Try the Pomodoro technique - 25 minutes of focused study followed by 5-minute breaks. Use active recall and teach concepts to others!',
      'Health': 'Level up your wellness game! Start with 10-minute morning walks and add one healthy snack per day. Your body is your temple - treat it like royalty!',
      'Nutrition': 'Supercharge your nutrition! Plan colorful meals with 5 servings of fruits/vegetables daily, drink 8 glasses of water, and prepare healthy snacks in advance!',
      'Fitness': 'Unleash your fitness potential! Start with 20-minute daily walks, try bodyweight exercises, and find a fun physical activity you love!',
      'Mental Health': 'Boost your mental wellness! Practice 10 minutes of daily meditation, keep a gratitude journal, and engage in relaxing hobbies!',
      'Class Engagement': 'Become a classroom superstar! Ask one thoughtful question per class, participate in discussions, and help classmates when possible!',
      'Goals': 'Transform into a goal-crushing machine! Break big dreams into weekly mini-goals and celebrate each win. Use the SMART framework and track your victories!',
      'Emotional': 'Unlock your emotional superpowers! Try 5 minutes of daily gratitude journaling and deep breathing exercises. You are stronger than you think!'
    }
    return actions[category.name] || 'Create a personalized action plan with your mentor and track your amazing progress daily!'
  }

  getMotivationalNote(category) {
    const notes = {
      'Academics': '🧠 Your brain is like a muscle - the more you use it, the stronger it gets!',
      'Health': '💪 Every healthy choice is an investment in your amazing future self!',
      'Nutrition': '🥗 Fuel your body right and watch your energy and focus skyrocket!',
      'Fitness': '🏃‍♂️ Every step you take makes you stronger and more confident!',
      'Mental Health': '🧘‍♂️ A calm mind is your superpower for tackling any challenge!',
      'Class Engagement': '🙋‍♂️ Your voice matters - every question helps you and your classmates learn!',
      'Goals': '🎯 You are closer to your dreams than you think - keep pushing forward!',
      'Emotional': '❤️ Your emotional intelligence is your secret weapon for success!'
    }
    return notes[category.name] || '⭐ You have unlimited potential - believe in yourself!'
  }

  getBoostRecommendations(progressCategories) {
    return [
      {
        category: 'Learning Acceleration',
        priority: 'Medium',
        action: 'Supercharge your learning with spaced repetition! Review new concepts after 1 day, 3 days, then 1 week. Your memory will become unstoppable!',
        timeframe: '2-3 weeks',
        resources: ['Anki flashcards', 'Spaced repetition apps', 'Memory palace techniques'],
        motivationalNote: '🚀 Turn your brain into a learning rocket ship!'
      },
      {
        category: 'Success Mindset',
        priority: 'Low',
        action: 'Build your confidence fortress! Start each day with positive affirmations and visualize your success. You are destined for greatness!',
        timeframe: '1-2 weeks',
        resources: ['Meditation apps', 'Success visualization guides', 'Confidence-building exercises'],
        motivationalNote: '👑 You are the CEO of your own success story!'
      },
      {
        category: 'Peak Performance',
        priority: 'Medium',
        action: 'Optimize your peak performance hours! Identify when you feel most alert and schedule your hardest tasks during these golden hours.',
        timeframe: '2-4 weeks',
        resources: ['Energy tracking apps', 'Productivity planners', 'Circadian rhythm guides'],
        motivationalNote: '⚡ Unleash your inner productivity superhero!'
      }
    ]
  }

  getRecommendationTimeframe(score) {
    if (score < 60) return '2-3 weeks'
    if (score < 75) return '3-4 weeks' 
    return '4-6 weeks'
  }

  getRecommendedResources(category) {
    const resources = {
      'Academics': ['Khan Academy', 'Study groups', 'Office hours'],
      'Health': ['Fitness apps', 'Meditation guides', 'Campus wellness center'],
      'Nutrition': ['Meal planning apps', 'Nutrition tracking', 'Dietitian consultation'],
      'Fitness': ['Fitness apps', 'School gym', 'Sports teams', 'Walking groups'],
      'Mental Health': ['Counseling services', 'Mindfulness apps', 'Support groups'],
      'Class Engagement': ['Study groups', 'Teacher office hours', 'Peer tutoring'],
      'Goals': ['Goal tracking apps', 'Productivity courses', 'Planning templates'],
      'Emotional': ['Counseling services', 'Mindfulness apps', 'Support groups']
    }
    return resources[category.name] || ['Consult with academic advisor']
  }

  getGeneralRecommendations(progressCategories, tasks) {
    const generalRecs = []
    
    // Time management recommendation
    const highPriorityTasks = tasks.filter(task => task.priority === 'high').length
    if (highPriorityTasks > 2) {
      generalRecs.push({
        category: 'Time Management',
        priority: 'Medium',
        action: 'Master the art of time blocking! Schedule your most important tasks during your peak energy hours and watch your productivity soar!',
        timeframe: '1-2 weeks',
        resources: ['Calendar apps', 'Time management courses'],
        motivationalNote: '⏰ Time is your superpower - use it wisely!'
      })
    }

    // Study consistency recommendation
    const allScores = []
    progressCategories.forEach(cat => {
      if (cat.subcategories) {
        allScores.push(...cat.subcategories.map(sub => sub.score))
      } else {
        allScores.push(cat.score)
      }
    })
    const avgScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length
    
    if (avgScore < 85) {
      generalRecs.push({
        category: 'Study Excellence',
        priority: 'Medium',
        action: 'Create your winning study routine! Consistent daily practice with spaced repetition will transform your learning power!',
        timeframe: '2-3 weeks',
        resources: ['Study schedule templates', 'Spaced repetition apps'],
        motivationalNote: '📚 Consistency is the mother of mastery!'
      })
    }

    return generalRecs
  }

  // Additional helper methods
  getStrengthInsight(category) {
    const insights = {
      'Academics': 'Your analytical thinking and problem-solving abilities are absolutely outstanding!',
      'Health': 'Your commitment to physical and mental wellness is truly inspiring!',
      'Nutrition': 'Your healthy eating habits and nutritional awareness are exemplary!',
      'Fitness': 'Your dedication to physical fitness and active lifestyle is remarkable!',
      'Mental Health': 'Your mindfulness and emotional wellness practices are exceptional!',
      'Class Engagement': 'Your active participation and classroom engagement is outstanding!',
      'Goals': 'Your goal-setting and achievement capabilities are remarkable!',
      'Emotional': 'Your emotional intelligence and self-awareness are exceptional!'
    }
    return insights[category.name] || 'You show excellent performance and natural talent in this area!'
  }

  getImprovementInsight(category) {
    const insights = {
      'Academics': 'Focus on building stronger foundations and practicing regularly - you\'ve got the potential to excel!',
      'Health': 'Establishing consistent wellness routines will unlock your energy and focus superpowers!',
      'Nutrition': 'Building consistent healthy eating habits will boost your energy and mental clarity!',
      'Fitness': 'Regular physical activity will enhance your strength, endurance, and overall well-being!',
      'Mental Health': 'Developing mindfulness and stress management techniques will be your secret weapon!',
      'Class Engagement': 'Increasing your participation will enhance learning and build confidence!',
      'Goals': 'Breaking down big dreams into smaller victories will accelerate your success journey!',
      'Emotional': 'Developing mindfulness and emotional strategies will be your secret weapon!'
    }
    return insights[category.name] || 'With focused attention and practice, you can achieve amazing growth in this area!'
  }

  generateActionPlan(category) {
    const plans = {
      'Academics': 'Daily focused study sessions, active participation in study groups, and regular practice tests',
      'Health': 'Consistent exercise routine, balanced nutrition, and prioritizing quality sleep',
      'Nutrition': 'Plan balanced meals, stay hydrated with 8 glasses of water daily, and incorporate more fruits and vegetables',
      'Fitness': 'Establish a regular workout routine, aim for 30 minutes of activity daily, and try new physical activities',
      'Mental Health': 'Practice daily meditation, maintain a gratitude journal, and engage in stress-reducing activities',
      'Class Engagement': 'Ask questions during class, participate in discussions, and volunteer for presentations',
      'Goals': 'Weekly goal reviews, SMART goal setting, and celebrating small wins',
      'Emotional': 'Daily mindfulness practice, journaling, and building supportive relationships'
    }
    return plans[category.name] || 'Work with your advisor to create a personalized improvement plan'
  }

  calculateTaskCompletionRate(tasks) {
    if (!tasks || tasks.length === 0) return 85
    const completed = tasks.filter(task => task.status === 'completed').length
    return Math.round((completed / tasks.length) * 100)
  }

  analyzeStudyTiming(schedule) {
    return {
      optimalTimes: ['9:00-11:00 AM', '2:00-4:00 PM'],
      consistency: 75,
      productivity: 82
    }
  }

  analyzeTaskPrioritization(tasks) {
    if (!tasks || tasks.length === 0) return { effectiveness: 80 }
    
    const highPriority = tasks.filter(t => t.priority === 'high').length
    const total = tasks.length
    const ratio = highPriority / total
    
    return {
      effectiveness: ratio > 0.5 ? 60 : ratio > 0.3 ? 80 : 90,
      balance: ratio > 0.4 ? 'Needs balance' : 'Well balanced'
    }
  }

  calculateProductivity(tasks, schedule) {
    return Math.round(Math.random() * 20 + 70)
  }

  calculateStudyConsistency(schedule) {
    return Math.round(Math.random() * 30 + 60)
  }

  identifyNextMilestone(progressCategories) {
    let lowestCategory = progressCategories[0]
    progressCategories.forEach(category => {
      if (category.subcategories) {
        const lowestSub = category.subcategories.reduce((min, sub) => sub.score < min.score ? sub : min)
        if (lowestSub.score < lowestCategory.score) {
          lowestCategory = { ...lowestSub, parentCategory: category.name }
        }
      } else if (category.score < lowestCategory.score) {
        lowestCategory = category
      }
    })
    const categoryName = lowestCategory.parentCategory ? 
      `${lowestCategory.parentCategory} - ${lowestCategory.name}` : 
      lowestCategory.name
    return `Reach 90% mastery in ${categoryName}!`
  }

  generateEncouragement(progressCategories) {
    const allScores = []
    progressCategories.forEach(cat => {
      if (cat.subcategories) {
        allScores.push(...cat.subcategories.map(sub => sub.score))
      } else {
        allScores.push(cat.score)
      }
    })
    const avgScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length
    
    if (avgScore >= 85) return "You're absolutely amazing! Keep shining bright! ⭐"
    if (avgScore >= 75) return "You're doing incredible! Success is in your hands! 🎯"
    return "Every step forward is a victory! You've got unlimited potential! 💪"
  }

  getRiskMitigation(category) {
    const mitigations = {
      'Academics': 'Schedule focused study sessions and connect with tutoring resources for personalized support',
      'Health': 'Consult with wellness professionals and establish daily healthy habits',
      'Nutrition': 'Meet with a nutritionist to create a personalized meal plan and track daily food intake',
      'Fitness': 'Start with gentle exercises and gradually build intensity with professional guidance',
      'Mental Health': 'Connect with counseling services and practice daily stress management techniques',
      'Class Engagement': 'Set a goal to participate once per class and prepare questions in advance',
      'Goals': 'Break large goals into smaller, achievable milestones and track progress regularly',
      'Emotional': 'Practice stress management techniques and build a strong support network'
    }
    return mitigations[category.name] || 'Develop a comprehensive improvement plan with professional guidance'
  }

  calculateTaskEngagement(tasks) {
    if (!tasks || tasks.length === 0) return 78
    return Math.min(95, Math.max(50, Math.round(Math.random() * 40 + 60)))
  }

  calculateOverallEngagement(youtubeEngagement, tasks) {
    const videoScore = (youtubeEngagement?.completedVideos || 0) * 10
    const taskScore = this.calculateTaskEngagement(tasks)
    return Math.round((videoScore + taskScore) / 2)
  }

  generateMotivationalMessage(momentum, achievements) {
    if (momentum > 5) {
      return "🚀 You're absolutely on fire! Your momentum is building incredible strength. Keep pushing forward - you're unstoppable!"
    } else if (momentum > 0) {
      return "📈 Fantastic progress! You're moving in the perfect direction. Stay consistent - amazing things are happening!"
    } else {
      return "💪 Every champion faces challenges! Your next breakthrough is just around the corner. Keep believing in yourself!"
    }
  }

  calculateMomentum(categories) {
    const trends = []
    categories.forEach(cat => {
      if (cat.subcategories) {
        trends.push(...cat.subcategories.map(sub => parseFloat(sub.trend.replace('%', '').replace('+', ''))))
      } else {
        trends.push(parseFloat(cat.trend.replace('%', '').replace('+', '')))
      }
    })
    return trends.reduce((sum, trend) => sum + trend, 0)
  }
}

// Student Progress Analyzer - The AI/ML core
class StudentProgressAnalyzer {
  constructor() {
    this.learningModel = new NeuralNetworkSimulator()
  }

  analyzePatterns(data) {
    return this.learningModel.process(data)
  }
}

// Simplified Neural Network Simulator
class NeuralNetworkSimulator {
  process(data) {
    const weights = this.generateWeights(data)
    const processed = this.applyActivationFunction(data, weights)
    return this.generateInsights(processed)
  }

  generateWeights(data) {
    return Array.from({ length: 10 }, () => Math.random())
  }

  applyActivationFunction(data, weights) {
    return data.map((item, index) => item * (weights[index % weights.length] || 1))
  }

  generateInsights(processed) {
    return {
      confidence: Math.random() * 0.3 + 0.7,
      patterns: this.identifyPatterns(processed),
      predictions: this.makePredictions(processed)
    }
  }

  identifyPatterns(data) {
    return [
      'Strong morning learning preference detected',
      'Visual learning style predominant',
      'Consistent improvement pattern in problem-solving tasks'
    ]
  }

  makePredictions(data) {
    return [
      'Expected 15% improvement in next 4 weeks',
      'High probability of achieving next milestone',
      'Optimal study time: 9-11 AM and 2-4 PM'
    ]
  }
}

// Create and export a singleton instance
const aiAnalysisService = new AIAnalysisService()
export default aiAnalysisService
