import Doctor from "../Models/doctor.js";
import Appointment from "../Models/appointment.js";

export const addAppointment = async (req, res) => {
  const { mobile, name, email } = req.body;
  const { id } = req.params;
  const { day, time } = req.query;

  const doctorFound = await Doctor.findById(id);

  if (doctorFound) {
    if (!mobile) {
      return res.json({
        success: false,
        message: "please enter the name",
      });
    }
    if (!name) {
      return res.json({
        success: false,
        message: "please enter the specialization",
      });
    }
    if (!email) {
      return res.json({
        success: false,
        message: "please enter the schedule",
      });
    }
    const newAppointment = await Appointment.create({
      name,
      mobile,
      email,
      doctorName:doctorFound.name,
      appointmentTime:time,
      appointmentDay:day
    });
    if (newAppointment) {
      res.json({
        success: true,
        message: "Add successful",
        newAppointment,
      });
    }
  }
  if (!doctorFound) {
    return res.json({
      success: false,
      message: "No doctor found with this ID",
    });
  }
};
export const allAppointment = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;

  const AppointmentCount = await Appointment.countDocuments();
  const extractAllAppointment = await Appointment.find()
  .skip(page * limit)
  .limit(limit);

  const pageCount = parseInt(AppointmentCount / limit);

  if (extractAllAppointment) {
    return res.json({
      success: true,
      AppointmentCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllAppointment,
    });
  } else {
    return res.json({
      success: false,
      message: "No found blog",
    });
  }
};

export const deleteAppointment = async (req, res) => {
  const {id} = req.params

  const appointment = await Appointment.findByIdAndDelete(id);
  
  if(appointment) {
    return  res.json({
      success: true,
      message: "the appointment was deleted",
    });
  }
  if (!appointment) {
    return  res.json({
      success: false,
      message: "No appointment found with this ID",
    });
  }
}