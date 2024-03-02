import Medicen from "../Models/medicen.js";

export const AddMedicen = async (req, res) => {
  const { title, price, img, link } = req.body;

  if (!title) {
    return res.json({
      success: false,
      message: "please enter the title",
    });
  }
  if (!price) {
    return res.json({
      success: false,
      message: "please enter the price",
    });
  }
  if (!img) {
    return res.json({
      success: false,
      message: "please enter the img",
    });
  }
  if (!link) {
    return res.json({
      success: false,
      message: "please enter the medicen link",
    });
  }

  const newMedicen = await Medicen.create({
    title,
    price,
    img,
    link,
  });
  if (newMedicen) {
    res.json({
      success: true,
      message: "Add successful",
      newMedicen,
    });
  }
};

export const allMedicen = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;
  const search = req.query.search || "";
  const extractAllMedicen = await Medicen.find({
    title: { $regex: ".*" + search + ".*", $options: "i" },
  })
    .skip(page * limit)
    .limit(limit);

  const medicenCount = await Medicen.countDocuments({
    title: { $regex: search, $options: "i" },
  });

  const pageCount = parseInt(medicenCount / limit);

  if (extractAllMedicen) {
    return res.json({
      success: true,
      medicenCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllMedicen,
    });
  } else {
    return res.json({
      success: false,
      message: "No found Medicen",
    });
  }
};

export const singleMedicen = async (req, res) => {
  const { id } = req.params;

  const extractMedicen = await Medicen.findById(id);

  if (extractMedicen) {
    return res.json({
      success: true,
      data: extractMedicen,
    });
  } else {
    return res.json({
      success: false,
      message: "No found blog",
    });
  }
};

export const deleteMedicen = async (req, res) => {
  const { id } = req.params;

  const medicen = await Medicen.findByIdAndDelete(id);

  if (medicen) {
    return res.json({
      success: true,
      message: "the medicen was deleted",
    });
  }
  if (!medicen) {
    return res.json({
      success: false,
      message: "No medicen found with this ID",
    });
  }
};
export const updateMedicen = async (req, res) => {
  const { id } = req.params;

  const medicen = await Medicen.findByIdAndUpdate({_id:id},req.body,{new:true});

  if (medicen) {
    return res.json({
      success: true,
      message: "the medicen was updated",
    });
  }
  if (!medicen) {
    return res.json({
      success: false,
      message: "No medicen found with this ID",
    });
  }
};