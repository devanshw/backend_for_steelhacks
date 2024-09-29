const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: false,
    },

    courseName: {
      type: String,
      required: false,
    },

    departmentName: {
      type: String,
      required: false,
    },

    prevCourses: {
      type: [String],
      required: false,
    },

    professorName: {
        type: String,
        required: false,
    },

    email:{
        type:String,
        required: false
    },
    virtual:{
        type: Boolean,
        required:false,

    },

    inPerson:{
        type: Boolean,
        required:false,

    },




   knowledgeOfSubject: {
    type: [Number],   // Change to an array of numbers
    validate: {
      validator: function(arr) {
        return arr.every(num => num >= 1 && num <= 10);  // Validate each value to be between 1 and 10
      },
      message: 'Each value must be an integer between 1 and 10.'
    },
    required: false,
  },

  approachability: {
    type: [Number],  // Change to an array of numbers
    validate: {
      validator: function(arr) {
        return arr.every(num => num >= 1 && num <= 10);  // Validate each value to be between 1 and 10
      },
      message: 'Each value must be an integer between 1 and 10.'
    },
    required: false,
  },

  preparedness: {
    type: [Number],  // Change to an array of numbers
    validate: {
      validator: function(arr) {
        return arr.every(num => num >= 1 && num <= 10);  // Validate each value to be between 1 and 10
      },
      message: 'Each value must be an integer between 1 and 10.'
    },
    required: false,
  },

  availability: {
    type: [Number],  // Change to an array of numbers
    validate: {
      validator: function(arr) {
        return arr.every(num => num >= 1 && num <= 10);  // Validate each value to be between 1 and 10
      },
      message: 'Each value must be an integer between 1 and 10.'
    },
    required: false,
  },

   // Add fields to store the average for each rating array
   averageKnowledgeOfSubject: {
    type: Number,
    default: 0, // Default to 0
  },
  averageApproachability: {
    type: Number,
    default: 0, // Default to 0
  },
  averagePreparedness: {
    type: Number,
    default: 0, // Default to 0
  },
  averageAvailability: {
    type: Number,
    default: 0, // Default to 0
  },

 


    reviews: [
      {
        reviewerName: { type: String, required: false },
        comment: { type: String, required: false },
        ratingDate: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: false,
  }
);


 // Pre-save hook to calculate the average before saving the document
 userSchema.pre('save', function(next) {
    // Helper function to calculate average
    const calculateAverage = (arr) => {
      if (arr.length === 0) return 0; // Avoid division by zero
      const sum = arr.reduce((total, num) => total + num, 0);
      return sum / arr.length;
    };
  
    // Calculate and set averages for each field
    this.averageKnowledgeOfSubject = calculateAverage(this.knowledgeOfSubject);
    this.averageApproachability = calculateAverage(this.approachability);
    this.averagePreparedness = calculateAverage(this.preparedness);
    this.averageAvailability = calculateAverage(this.availability);
  
    next(); // Proceed with saving
});


const User = mongoose.model("User", userSchema);

module.exports = User;
