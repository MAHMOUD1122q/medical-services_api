import Doctor from "../Models/doctor.js";

export const addDoctor = async (req, res) => {
  const { name, specialization, schedule, img } = req.body;

  if (!name) {
    return res.json({
      success: false,
      message: "please enter the name",
    });
  }
  if (!specialization) {
    return res.json({
      success: false,
      message: "please enter the specialization",
    });
  }
  if (!img) {
    return res.json({
      success: false,
      message: "please enter the img",
    });
  }
  if (!schedule) {
    return res.json({
      success: false,
      message: "please enter the schedule",
    });
  }

  const newDoctor = await Doctor.create({
    name,
    specialization,
    schedule,
    img,
  });
  if (newDoctor) {
    res.json({
      success: true,
      message: "Add successful",
      newDoctor,
    });
  }
};
export const allDoctor = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;

  const doctorCount = await Doctor.countDocuments();
  const extractAlldoctors = await Doctor.find()
    .skip(page * limit)
    .limit(limit);

  const pageCount = parseInt(doctorCount / limit);

  if (extractAlldoctors) {
    return res.json({
      success: true,
      doctorCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAlldoctors,
    });
  } else {
    return res.json({
      success: false,
      message: "No found user",
    });
  }
};

export const SingleDocotor = async (req, res) => {
  const { id } = req.params;

  const extractDoctor = await Doctor.findById(id);

  if (extractDoctor) {
    return res.json({
      success: true,
      data: extractDoctor,
    });
  } else {
    return res.json({
      success: false,
      message: "No found Doctor",
    });
  }
};

export const deleteDocotor = async (req, res) => {
  const { id } = req.params;

  const doctor = await Doctor.findByIdAndDelete(id);

  if (doctor) {
    return res.json({
      success: true,
      message: "the doctor was deleted",
    });
  }
  if (!doctor) {
    return res.json({
      success: false,
      message: "No doctor found with this ID",
    });
  }
};

export const updateDoctor = async (req, res) => {
  const { id } = req.params;

  const doctor = await Doctor.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (doctor) {
    return res.json({
      success: true,
      message: "the doctor was updated",
    });
  }
  if (!doctor) {
    return res.json({
      success: false,
      message: "No doctor found with this ID",
    });
  }
};

