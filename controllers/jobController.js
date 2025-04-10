const Job = require('../models/Job');

// @desc    Get all job applications
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const status = req.query.status;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // Build filter object
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (startDate && endDate) {
      filter.applicationDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      filter.applicationDate = { $gte: new Date(startDate) };
    } else if (endDate) {
      filter.applicationDate = { $lte: new Date(endDate) };
    }

    const jobs = await Job.find(filter).sort({ applicationDate: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new job application
// @route   POST /api/jobs
// @access  Public
const createJob = async (req, res) => {
  try {
    const { company, role, status, applicationDate, link } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: 'Please provide company and role' });
    }

    const job = await Job.create({
      company,
      role,
      status,
      applicationDate: applicationDate || Date.now(),
      link,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job application
// @route   PUT /api/jobs/:id
// @access  Public
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a job application
// @route   DELETE /api/jobs/:id
// @access  Public
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
};