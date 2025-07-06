import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, Calendar, User, Search, Filter, Plus, Download, Smile, Frown, Meh } from 'lucide-react';
import TeacherLayout from './components/TeacherLayout';

const BehavioralReport = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIncident, setNewIncident] = useState({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    type: 'positive',
    description: '',
    actionTaken: '',
    severity: 'low'
  });

  useEffect(() => {
    // In a real app, fetch actual data from your API
    fetchData();
  }, [classId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // This would be your actual API call in a real app
      // const res = await axios.get(`/api/class/${classId}/behavior`);
      // setStudents(res.data.students);
      // setIncidents(res.data.incidents);
      
      // Mock data for demonstration
      setTimeout(() => {
        setStudents(generateMockStudents());
        setIncidents(generateMockIncidents());
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Failed to fetch behavioral data:', error);
      setLoading(false);
    }
  };

  const generateMockStudents = () => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: `student-${i + 1}`,
      name: `Student ${i + 1}`,
      rollNo: `R${String(i + 1).padStart(3, '0')}`,
      behavioralScore: Math.floor(Math.random() * 5) + 1, // 1-5
    }));
  };

  const generateMockIncidents = () => {
    const types = ['positive', 'negative', 'neutral'];
    const positiveDescriptions = [
      'Helped classmate with assignment',
      'Volunteered to clean classroom',
      'Showed exceptional leadership',
      'Participated enthusiastically in class',
      'Improved academic performance significantly'
    ];
    const negativeDescriptions = [
      'Disrupted class',
      'Missing homework',
      'Argumentative with teacher',
      'Late to class',
      'Inappropriate behavior during assembly'
    ];
    const neutralDescriptions = [
      'Requested counseling',
      'Seemed distracted in class',
      'Parent meeting scheduled',
      'Change in social interactions',
      'Requested extra academic help'
    ];
    
    const actions = [
      'Verbal appreciation',
      'Called parents',
      'Sent to principal',
      'Detention assigned',
      'Extra assignment given',
      'Counselor referral',
      'Positive note sent home'
    ];
    
    const mockIncidents = [];
    const today = new Date();
    
    for (let i = 0; i < 35; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const studentId = `student-${Math.floor(Math.random() * 15) + 1}`;
      
      // Generate a date within the last 30 days
      const date = new Date(today);
      date.setDate(today.getDate() - Math.floor(Math.random() * 30));
      
      let description;
      if (type === 'positive') {
        description = positiveDescriptions[Math.floor(Math.random() * positiveDescriptions.length)];
      } else if (type === 'negative') {
        description = negativeDescriptions[Math.floor(Math.random() * negativeDescriptions.length)];
      } else {
        description = neutralDescriptions[Math.floor(Math.random() * neutralDescriptions.length)];
      }
      
      mockIncidents.push({
        id: `incident-${i + 1}`,
        studentId,
        date: date.toISOString().split('T')[0],
        type,
        description,
        actionTaken: actions[Math.floor(Math.random() * actions.length)],
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
      });
    }
    
    return mockIncidents.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const handleAddIncident = (e) => {
    e.preventDefault();
    
    // Add the new incident to the list
    const newIncidentWithId = {
      ...newIncident,
      id: `incident-${Date.now()}`,
    };
    
    setIncidents([newIncidentWithId, ...incidents]);
    
    // Reset form
    setNewIncident({
      studentId: '',
      date: new Date().toISOString().split('T')[0],
      type: 'positive',
      description: '',
      actionTaken: '',
      severity: 'low'
    });
    
    setShowAddForm(false);
  };

  const getFilteredIncidents = () => {
    let filtered = [...incidents];
    
    // Filter by student
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(incident => incident.studentId === selectedStudent);
    }
    
    // Filter by date range
    const today = new Date();
    let cutoffDate = new Date(today);
    
    if (dateRange === 'week') {
      cutoffDate.setDate(today.getDate() - 7);
    } else if (dateRange === 'month') {
      cutoffDate.setMonth(today.getMonth() - 1);
    } else if (dateRange === 'quarter') {
      cutoffDate.setMonth(today.getMonth() - 3);
    }
    
    filtered = filtered.filter(incident => new Date(incident.date) >= cutoffDate);
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(incident => {
        const student = students.find(s => s.id === incident.studentId);
        return (
          incident.description.toLowerCase().includes(term) ||
          incident.actionTaken.toLowerCase().includes(term) ||
          (student && student.name.toLowerCase().includes(term))
        );
      });
    }
    
    return filtered;
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'positive':
        return <Smile className="text-green-500" size={20} />;
      case 'negative':
        return <Frown className="text-red-500" size={20} />;
      default:
        return <Meh className="text-yellow-500" size={20} />;
    }
  };

  const getIncidentColor = (type) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'negative':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
    }
  };

  const getTypeDescription = (type) => {
    switch (type) {
      case 'positive':
        return 'Positive Behavior';
      case 'negative':
        return 'Needs Improvement';
      default:
        return 'Neutral / Observation';
    }
  };

  const filteredIncidents = getFilteredIncidents();

  const incidentsByType = {
    positive: incidents.filter(i => i.type === 'positive').length,
    negative: incidents.filter(i => i.type === 'negative').length,
    neutral: incidents.filter(i => i.type === 'neutral').length
  };

  return (
    <TeacherLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Behavioral Report</h1>
        <p className="text-gray-600 dark:text-gray-400">Track and analyze student behavior and incidents</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 flex items-center">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
            <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Positive Incidents</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{incidentsByType.positive}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 flex items-center">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full mr-4">
            <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Negative Incidents</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{incidentsByType.negative}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 flex items-center">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
            <Clock size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Period</p>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400 capitalize">{dateRange}</div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Students</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
            <User size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
          
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="all">All Time</option>
            </select>
            <Calendar size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
          
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search incidents..."
              className="pl-10 pr-4 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            <Plus size={16} className="mr-2" />
            Record Incident
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      {/* Add Incident Form */}
      {showAddForm && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Record New Behavioral Incident</h2>
          
          <form onSubmit={handleAddIncident}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student</label>
                <select
                  value={newIncident.studentId}
                  onChange={(e) => setNewIncident({...newIncident, studentId: e.target.value})}
                  className="w-full border dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  value={newIncident.date}
                  onChange={(e) => setNewIncident({...newIncident, date: e.target.value})}
                  className="w-full border dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="positive"
                      checked={newIncident.type === 'positive'}
                      onChange={() => setNewIncident({...newIncident, type: 'positive'})}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Positive</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="negative"
                      checked={newIncident.type === 'negative'}
                      onChange={() => setNewIncident({...newIncident, type: 'negative'})}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Negative</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="neutral"
                      checked={newIncident.type === 'neutral'}
                      onChange={() => setNewIncident({...newIncident, type: 'neutral'})}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Neutral</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Severity</label>
                <select
                  value={newIncident.severity}
                  onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
                  className="w-full border dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                  className="w-full border dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  required
                  placeholder="Describe the incident or behavior observed..."
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action Taken</label>
                <textarea
                  value={newIncident.actionTaken}
                  onChange={(e) => setNewIncident({...newIncident, actionTaken: e.target.value})}
                  className="w-full border dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="What actions were taken in response to this incident?"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Save Incident
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Incidents List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white">Behavioral Incidents</h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-3"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading incidents...</p>
          </div>
        ) : filteredIncidents.length === 0 ? (
          <div className="p-8 text-center">
            <AlertTriangle size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No incidents found for the selected filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredIncidents.map(incident => {
              const student = students.find(s => s.id === incident.studentId);
              const formattedDate = new Date(incident.date).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'short', day: 'numeric' 
              });
              
              return (
                <div key={incident.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                        {student?.name.charAt(0) || '?'}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{student?.name || 'Unknown Student'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{student?.rollNo}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                        {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)} Severity
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formattedDate}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-13 pl-13">
                    <div className="flex items-center mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3 ${getIncidentColor(incident.type)}`}>
                        <span className="mr-1">{getIncidentIcon(incident.type)}</span>
                        {getTypeDescription(incident.type)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{incident.description}</p>
                    
                    {incident.actionTaken && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Action taken:</span> {incident.actionTaken}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </TeacherLayout>
  );
};

export default BehavioralReport;