import React, { useState, useEffect } from "react";
import { ChevronDown, Calendar, User, X } from "lucide-react";

const MonthlyReport = ({ classId }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    interactionWithPeers: { rating: "", remark: "" },
    extracurricularActivities: { rating: "", remark: "" },
    extraAcademicActivities: { rating: "", remark: "" },
    sportsParticipation: { rating: "", remark: "" },
    empathy: { rating: "", remark: "" },
    interpersonalSkills: { rating: "", remark: "" },
    communicationSkills: { rating: "", remark: "" },
    leadership: { rating: "", remark: "" },
    foodConsumingHabits: { rating: "", remark: "" },
    academicInterest: { rating: "", remark: "" },
    academicEfforts: { rating: "", remark: "" },
  });

  // Mock student data
  const generateMockStudents = () => {
    const mockStudents = [];
    for (let i = 1; i <= 50; i++) {
      mockStudents.push({
        id: i,
        name: `Student ${i}`,
        rollNumber: `R${String(i).padStart(3, "0")}`,
      });
    }
    return mockStudents;
  };

  useEffect(() => {
    setStudents(generateMockStudents());
  }, [classId]);

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  const years = [2023, 2024, 2025, 2026];

  const formFields = [
    { key: "interactionWithPeers", label: "Interaction with Peers" },
    { key: "extracurricularActivities", label: "Participation in Extra Curricular Activities" },
    { key: "extraAcademicActivities", label: "Participation in Extra Academic Activities" },
    { key: "sportsParticipation", label: "Participation in Sports" },
    { key: "empathy", label: "Empathy" },
    { key: "interpersonalSkills", label: "Interpersonal Skills" },
    { key: "communicationSkills", label: "Communication Skills" },
    { key: "leadership", label: "Leadership" },
    { key: "foodConsumingHabits", label: "Food Consuming Habits" },
    { key: "academicInterest", label: "Academic Interest" },
    { key: "academicEfforts", label: "Academic Efforts Put" },
  ];

  const handleStudentSelect = (studentId) => {
    setSelectedStudent(studentId);
    if (studentId) {
      setShowForm(true);
      // Reset form data
      const resetData = {};
      formFields.forEach((field) => {
        resetData[field.key] = { rating: "", remark: "" };
      });
      setFormData(resetData);
    } else {
      setShowForm(false);
    }
  };

  const handleRatingChange = (fieldKey, rating) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: {
        ...prev[fieldKey],
        rating: rating,
      },
    }));
  };

  const handleRemarkChange = (fieldKey, remark) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: {
        ...prev[fieldKey],
        remark: remark,
      },
    }));
  };

  const validateForm = () => {
    return formFields.every((field) => formData[field.key].rating !== "");
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert("Please provide ratings for all fields before submitting.");
      return;
    }

    const selectedStudentData = students.find(
      (s) => s.id === parseInt(selectedStudent)
    );
    const reportData = {
      student: selectedStudentData,
      month: months[selectedMonth],
      year: selectedYear,
      ratings: formData,
    };

    console.log("Submitting monthly report:", reportData);
    alert(
      `Monthly report submitted successfully for ${selectedStudentData?.name}!`
    );

    // Reset form
    setSelectedStudent("");
    setShowForm(false);
  };

  const getRatingColor = (rating) => {
    const numRating = parseInt(rating);
    if (numRating >= 8) return "text-green-600 dark:text-green-400";
    if (numRating >= 6) return "text-yellow-600 dark:text-yellow-400";
    if (numRating >= 4) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getRatingBackground = (rating) => {
    const numRating = parseInt(rating);
    if (numRating >= 8) return "bg-green-100 dark:bg-green-900/30";
    if (numRating >= 6) return "bg-yellow-100 dark:bg-yellow-900/30";
    if (numRating >= 4) return "bg-orange-100 dark:bg-orange-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <Calendar className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
        Monthly Student Report
      </h2>

      {/* Month, Year and Student Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Month
          </label>
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={16} />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Year
          </label>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={16} />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Select Student
          </label>
          <div className="relative">
            <select
              value={selectedStudent}
              onChange={(e) => handleStudentSelect(e.target.value)}
              className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
            >
              <option value="">Choose a student...</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.rollNumber})
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={16} />
          </div>
        </div>
      </div>

      {/* Report Form */}
      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
              <User className="mr-2 text-blue-600 dark:text-blue-400" size={20} />
              <span>
                Monthly Report for{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {students.find((s) => s.id === parseInt(selectedStudent))?.name}
                </span>{" "}
                - {months[selectedMonth]} {selectedYear}
              </span>
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {formFields.map((field) => (
              <div
                key={field.key}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
              >
                <h4 className="font-medium text-gray-800 dark:text-white mb-4">
                  {field.label}
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Rating Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Rating (1-10) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            handleRatingChange(field.key, rating.toString())
                          }
                          className={`w-10 h-10 rounded-full border-2 font-medium transition-all transform hover:scale-105 ${
                            formData[field.key].rating === rating.toString()
                              ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md"
                              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                    {formData[field.key].rating && (
                      <div className="flex items-center mt-3">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRatingBackground(formData[field.key].rating)} ${getRatingColor(formData[field.key].rating)}`}>
                          Rating: {formData[field.key].rating}/10
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Remark Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Remark (Optional)
                    </label>
                    <textarea
                      value={formData[field.key].remark}
                      onChange={(e) =>
                        handleRemarkChange(field.key, e.target.value)
                      }
                      placeholder="Add any additional comments..."
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 resize-none transition-colors"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSubmit}
              disabled={!validateForm()}
              className={`px-6 py-3 rounded-lg font-medium shadow-sm transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                validateForm()
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 focus:ring-blue-300 dark:focus:ring-blue-800"
                  : "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
              }`}
            >
              {validateForm() ? "Submit Monthly Report" : "Complete All Fields"}
            </button>
          </div>
        </div>
      )}

      {/* Instructions when no student is selected */}
      {!showForm && (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 transition-all duration-300">
          <div className="text-5xl mb-6 opacity-80">📋</div>
          <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-white">Create Monthly Report</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Select a student from the dropdown above to create their monthly assessment report
            for {months[selectedMonth]} {selectedYear}.
          </p>
        </div>
      )}
    </div>
  );
};

export default MonthlyReport;